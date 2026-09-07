"use client";
import { useId, useState } from "react";
import { TOUR_LIST } from "@/lib/tours";
import TourCard from "./TourCard";

export default function TourCatalog() {
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const searchId = useId();
  const tours = TOUR_LIST.filter(
    (tour) =>
      (category === "전체" || tour.category === category) &&
      [tour.name, tour.description, ...tour.tags]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <div className="catalog-toolbar">
        <div className="filter-bar" role="group" aria-label="투어 종류">
          {["전체", "박물관", "야경", "불국사"].map((item) => (
            <button
              className="filter-chip"
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item === "야경" ? "야경투어" : item}
              <span>
                {item === "전체"
                  ? TOUR_LIST.length
                  : TOUR_LIST.filter((tour) => tour.category === item).length}
              </span>
            </button>
          ))}
        </div>
        <div className="search-box">
          <label className="visually-hidden" htmlFor={searchId}>
            투어 검색
          </label>
          <input
            id={searchId}
            type="search"
            placeholder="투어 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <p className="visually-hidden" aria-live="polite">
        검색 결과 {tours.length}개
      </p>
      {tours.length ? (
        <div className="tour-grid">
          {tours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} prioritizeImage={index === 0} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>검색 결과가 없습니다</h2>
          <p>검색어를 줄이거나 전체 투어를 확인해 주세요.</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setCategory("전체");
              setQuery("");
            }}
          >
            검색 초기화
          </button>
        </div>
      )}
    </>
  );
}
