"use client";
import { useState } from "react";
import Link from "next/link";
import {
  calcAmount,
  koreaToday,
  STORE_URL,
  tourTimes,
  type Tour,
} from "@/lib/tours";
import { IconArrow } from "./icons";
export default function BookingPanel({
  tour,
  checkoutEnabled = false,
}: {
  tour: Tour;
  checkoutEnabled?: boolean;
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const times = tourTimes(tour, date);
  const selectedTime = times.includes(time) ? time : times[0];
  const amount = calcAmount(tour, adults, children);
  const checkout =
    "/checkout?" +
    new URLSearchParams({
      tour: tour.id,
      date,
      time: selectedTime,
      adults: String(adults),
      children: String(children),
    });
  return (
    <>
      <aside
        id="booking"
        className="booking-panel"
        aria-label="투어 요금 계산 및 예약"
      >
        <div className="eyebrow">함께할 여행을 골라보세요</div>
        <div className="price">
          {tour.adultPrice.toLocaleString("ko-KR")}
          <span>원</span>
        </div>
        <p className="price-caption">
          {tour.childPrice
            ? "성인 1인 · 어린이 " +
              tour.childPrice.toLocaleString("ko-KR") +
              "원"
            : "36개월 이상 1인 · 연령 공통"}
        </p>
        <div className="field">
          <label htmlFor="travel-date">희망 날짜</label>
          <input
            id="travel-date"
            type="date"
            min={koreaToday()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <small>실제 예약 가능 여부는 예약 단계에서 확인해 주세요.</small>
        </div>
        <div className="field">
          <label htmlFor="travel-time">시작 시간</label>
          <select
            id="travel-time"
            value={selectedTime}
            onChange={(e) => setTime(e.target.value)}
          >
            {times.map((t) => (
              <option value={t} key={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        {[
          {
            id: "adults",
            name: "성인",
            count: adults,
            set: setAdults,
            min: 1,
            unit: tour.adultPrice,
          },
          {
            id: "children",
            name: tour.childPrice ? "어린이" : "어린이·청소년",
            count: children,
            set: setChildren,
            min: 0,
            unit: tour.childPrice ?? tour.adultPrice,
          },
        ].map((c) => (
          <div className="counter-row" key={c.id}>
            <label id={c.id + "-label"}>
              {c.name}
              <small>1인 {c.unit.toLocaleString("ko-KR")}원</small>
            </label>
            <div
              className="counter"
              role="group"
              aria-labelledby={c.id + "-label"}
            >
              <button
                type="button"
                aria-label={c.name + " 1명 줄이기"}
                disabled={c.count <= c.min}
                onClick={() => c.set(c.count - 1)}
              >
                −
              </button>
              <output aria-label={c.name + " 인원"} aria-live="polite">
                {c.count}
              </output>
              <button
                type="button"
                aria-label={c.name + " 1명 늘리기"}
                disabled={adults + children >= tour.maxPeople}
                onClick={() => c.set(c.count + 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
        <div className="total-row">
          <span>총 {adults + children}명 예상 금액</span>
          <strong aria-live="polite">{amount.toLocaleString("ko-KR")}원</strong>
        </div>
        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-naver btn-wide"
        >
          N · 네이버에서 예약하기
          <IconArrow />
        </a>
        <p className="booking-note">
          선택 내용은 요금 계산용입니다. 네이버에서 날짜와 인원을 다시 선택해
          주세요. 예약 확정 여부와 최종 결제 금액은 해당 상품 기준입니다.
        </p>
        {checkoutEnabled && date && (
          <Link href={checkout} className="btn btn-outline btn-wide">
            자체 결제 테스트
          </Link>
        )}
        <Link href="/quote" className="btn btn-outline btn-wide">
          단체·맞춤 견적 문의
        </Link>
        <p className="booking-note" style={{ marginBottom: 0 }}>
          최소 {tour.minPeople}명 모집 시 진행 · 한 조 최대 {tour.maxPeople}명
          <br />
          36개월 미만 무료 참여는 예약 전 문의해 주세요.
        </p>
      </aside>
      <div className="mobile-booking">
        <div>
          <small>{tour.childPrice ? "성인 1인" : "1인"}</small>
          <strong>{tour.adultPrice.toLocaleString("ko-KR")}원</strong>
        </div>
        <a href="#booking" className="btn btn-primary">
          날짜·요금 확인
        </a>
      </div>
    </>
  );
}
