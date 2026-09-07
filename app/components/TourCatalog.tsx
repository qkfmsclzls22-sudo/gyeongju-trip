"use client";
import { useState } from "react";
import { TOUR_LIST } from "@/lib/tours";
import TourCard from "./TourCard";
export default function TourCatalog() {
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const tours = TOUR_LIST.filter(
    (t) =>
      (category === "전체" || t.category === category) &&
      [t.name, t.description, ...t.tags]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <div className="search-box">
        <label className="visually-hidden" htmlFor="tour-search">
          투어 검색
        </label>
        <input
          id="tour-search"
          type="search"
          placeholder="투어 이름이나 관심사를 검색해 보세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="filter-bar" role="group" aria-label="투어 종류">
        {["전체", "박물관", "야경", "불국사"].map((c) => (
          <button
            className="filter-chip"
            key={c}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p
        style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20 }}
        aria-live="polite"
      >
        총 {tours.length}개의 투어
      </p>
      {tours.length ? (
        <div className="tour-grid">
          {tours.map((t) => (
            <TourCard key={t.id} tour={t} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>조건에 맞는 투어가 없어요</h2>
          <p>검색어를 줄이거나 전체 투어를 확인해 보세요.</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setCategory("전체");
              setQuery("");
            }}
          >
            전체 투어 보기
          </button>
        </div>
      )}
    </>
  );
}
