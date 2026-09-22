import assert from "node:assert/strict";
import { spawn } from "node:child_process";
const base = "http://127.0.0.1:3135";
const child = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--port",
    "3135",
    "--hostname",
    "127.0.0.1",
  ],
  {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NEXTAUTH_URL: base },
  },
);
let log = "";
child.stderr.on("data", (c) => {
  log += c;
});
try {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Server did not start: " + log)),
      20000,
    );
    child.stdout.on("data", (c) => {
      log += c;
      if (log.includes("Ready in")) {
        clearTimeout(timeout);
        resolve();
      }
    });
    child.on("exit", (code) =>
      reject(new Error(`Server exited ${code}: ${log}`)),
    );
  });
  for (const [path, expected] of [
    ["/", "경주트립"],
    ["/login", "네이버로 시작하기"],
    ["/checkout/museum", "날짜와 인원"],
    ["/checkout/night", "16,900"],
    ["/checkout/bulguksa", "24,800"],
    ["/terms", "취소·환불"],
    ["/privacy", "개인정보처리방침"],
    ["/account", "네이버로 시작하기"],
  ]) {
    const res = await fetch(base + path);
    assert.equal(res.status, 200, path);
    assert.ok((await res.text()).includes(expected), path);
    console.log("Page OK:", path);
  }
  for (const [path, origin, expected] of [
    ["/api/bookings", "https://foreign.test", 403],
    ["/api/bookings", base, 503],
    ["/api/payments/confirm", base, 401],
    ["/api/admin/sessions", base, 401],
    ["/api/admin/bookings", base, 401],
    ["/api/account", base, 401],
  ]) {
    const res = await fetch(base + path, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: origin },
      body: "{}",
    });
    assert.equal(res.status, expected, path);
    console.log("Guard OK:", path, res.status);
  }
  assert.deepEqual(
    await (await fetch(base + "/api/tour-sessions?tourId=museum")).json(),
    { enabled: false, sessions: [] },
  );
  assert.equal((await fetch(base + "/checkout/toString")).status, 404);
  const authResponse = await fetch(base + "/api/auth/providers");
  assert.equal(authResponse.status, 503);
  assert.ok((await authResponse.json()).message.includes("준비"));
  console.log("Closed checkout and unknown tour OK");
} finally {
  child.kill("SIGTERM");
}
