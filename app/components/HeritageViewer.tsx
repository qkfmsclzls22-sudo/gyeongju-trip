"use client";

import { useEffect, useRef, useState } from "react";

export interface HeritageModel {
  id: string;
  src: string;
  name: string;
  note: string;
  /** 모델을 살짝 기울여 보여줄 때 (라디안) */
  tilt?: number;
}

/**
 * 신라 문화유산 3D 뷰어. three.js는 섹션이 화면 근처에 왔을 때만 불러옵니다.
 * 좌우로 끌면 회전하고, 세로 스크롤은 그대로 페이지가 움직입니다.
 */
export default function HeritageViewer({
  models,
  poster,
  hint = "좌우로 끌어서 돌려보세요",
  loadingText = "3D 모델 불러오는 중…",
}: {
  models: HeritageModel[];
  poster: string;
  hint?: string;
  loadingText?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{ show: (m: HeritageModel) => void } | null>(null);
  const [active, setActive] = useState(models[0].id);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      try {
        const THREE = await import("three");
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
        const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
        const { MeshoptDecoder } = await import("three/examples/jsm/libs/meshopt_decoder.module.js");
        if (disposed) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        stage.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const pmrem = new THREE.PMREMGenerator(renderer);
        scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
        camera.position.set(0, 0.35, 6.2);

        const key = new THREE.DirectionalLight(0xffffff, 2.2);
        key.position.set(3, 5, 4);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xd9b35c, 1.4);
        rim.position.set(-4, 2, -3);
        scene.add(rim);

        // 라임색 받침 링
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(1.42, 1.46, 96),
          new THREE.MeshBasicMaterial({ color: 0xd9b35c, side: THREE.DoubleSide }),
        );
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = -1.12;
        scene.add(ring);
        const ring2 = new THREE.Mesh(
          new THREE.RingGeometry(1.75, 1.76, 96),
          new THREE.MeshBasicMaterial({ color: 0xd9b35c, side: THREE.DoubleSide, transparent: true, opacity: 0.35 }),
        );
        ring2.rotation.x = -Math.PI / 2;
        ring2.position.y = -1.12;
        scene.add(ring2);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.autoRotate = !reduce;
        controls.autoRotateSpeed = 1.6;
        controls.target.set(0, 0, 0);
        const polar = Math.PI / 2 - 0.06;
        controls.minPolarAngle = polar;
        controls.maxPolarAngle = polar;
        // 세로 스와이프는 페이지 스크롤에 양보
        renderer.domElement.style.touchAction = "pan-y";

        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);
        const holder = new THREE.Group();
        scene.add(holder);
        const cache = new Map<string, import("three").Object3D>();
        let token = 0;

        const fit = (obj: import("three").Object3D, tilt = 0) => {
          const wrap = new THREE.Group();
          wrap.add(obj);
          obj.rotation.x = tilt;
          const box = new THREE.Box3().setFromObject(wrap);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          const scale = Math.min(2.1 / size.y, 2.5 / Math.max(size.x, size.z));
          obj.position.sub(center);
          wrap.scale.setScalar(scale);
          wrap.position.y = (size.y * scale) / 2 - 1.08;
          return wrap;
        };

        const show = (m: HeritageModel) => {
          const mine = ++token;
          setReady(false);
          const place = (obj: import("three").Object3D) => {
            if (mine !== token || disposed) return;
            holder.clear();
            holder.add(obj);
            setReady(true);
          };
          const hit = cache.get(m.id);
          if (hit) return place(hit);
          loader.load(
            m.src,
            (gltf) => {
              const obj = fit(gltf.scene, m.tilt);
              cache.set(m.id, obj);
              place(obj);
            },
            undefined,
            () => {
              if (mine === token) setFailed(true);
            },
          );
        };
        apiRef.current = { show };
        show(models[0]);

        const resize = () => {
          const w = stage.clientWidth;
          const h = stage.clientHeight;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          // 세로로 긴 화면에서는 조금 더 물러나서 전체가 보이게
          camera.position.setLength(w / h < 0.95 ? 7.4 : 6.2);
          camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(stage);

        let visible = true;
        let raf = 0;
        const loop = () => {
          raf = requestAnimationFrame(loop);
          if (!visible) return;
          controls.update();
          renderer.render(scene, camera);
        };
        loop();
        // 여러 알림이 한꺼번에 올 수 있으므로 가장 마지막 상태를 쓴다
        const vis = new IntersectionObserver((entries) => {
          visible = entries[entries.length - 1].isIntersecting;
        });
        vis.observe(stage);

        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          vis.disconnect();
          controls.dispose();
          pmrem.dispose();
          renderer.dispose();
          renderer.domElement.remove();
          apiRef.current = null;
        };
      } catch {
        if (!disposed) setFailed(true);
      }
    };

    // 화면 근처에 왔을 때만 3D 엔진을 불러온다
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "500px 0px" },
    );
    io.observe(stage);

    return () => {
      disposed = true;
      io.disconnect();
      cleanup();
    };
    // 모델 목록은 고정 데이터라 최초 1회만 초기화한다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pick = (m: HeritageModel) => {
    setActive(m.id);
    apiRef.current?.show(m);
  };

  return (
    <div className="gt-heritage">
      <div ref={stageRef} className={`gt-stage${failed ? "" : " ready"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="gt-stage-poster" src={poster} alt="" loading="lazy" />
        <span className="gt-stage-badge">3D</span>
        <span className="gt-stage-hint" aria-live="polite">
          {failed ? "이 기기에서는 3D를 표시할 수 없어 이미지로 보여드립니다" : ready ? hint : loadingText}
        </span>
      </div>
      <div>
        <div className="gt-tabs" role="group" aria-label="3D 모델 선택">
          {models.map((m) => (
            <button key={m.id} type="button" aria-pressed={active === m.id} onClick={() => pick(m)}>
              <strong>{m.name}</strong>
              <small>{m.note}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
