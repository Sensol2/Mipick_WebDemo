"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Clock, Coffee, Check } from "lucide-react";
import { StoreService } from "@/lib/storeService";
import { Store } from "@/lib/supabase";
import "./todayMenu.css";

// Countdown 훅
function useCountdown(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0 && intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
  }, [secondsLeft]);

  const formatted = useMemo(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }, [secondsLeft]);

  return { secondsLeft, formatted };
}

export default function Home() {
  const { formatted } = useCountdown(211); // 03:31
  const currentOrders = 35;
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  // 스토어 데이터 가져오기
  useEffect(() => {
    const getTodayStore = async () => {
      try {
        setLoading(true);
        const storeData = await StoreService.getTodayStore();
        setStore(storeData);
      } catch (error) {
        console.error('Failed to fetch today store:', error);
      } finally {
        setLoading(false);
      }
    };

    getTodayStore();
  }, []);

  const steps = [
    { num: 0, reward: "배달비 무료" },
    { num: 30, reward: "300원 할인" },
    { num: 50, reward: "500원 할인" },
    { num: 100, reward: "음료 무료" },
  ];

  // 로딩 상태
  if (loading) {
    return (
      <div className="page">
        <div className="card">
          <div className="card-header">
            <h2 className="title">오늘의 메뉴</h2>
            <p className="subtitle">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!store) {
    return (
      <div className="page">
        <div className="card">
          <div className="card-header">
            <h2 className="title">오늘의 메뉴</h2>
            <p className="subtitle">준비 중입니다</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <h2 className="title">오늘의 메뉴</h2>
          <p className="subtitle">매일 바뀌는 오늘의 픽</p>
        </div>

        <div className="media">
          <img
            src={store.thumbnail || "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250813_132%2F1755070254048Vr7FN_JPEG%2F%25C1%25A6%25C1%25D6%25BB%25F3%25C8%25B8_%25B8%25DE%25C0%25CE%25BB%25E7%25C1%25F8.jpg"}
            alt="오늘의 메뉴"
          />
          <div className="badge">{store.name}</div>
        </div>

        <div className="content">
          <div className="content-header">
            <h1 className="menu-title">{store.name}</h1>
            <div className="countdown">
              <Clock size={14} />
              <span>{formatted} 뒤에 사라져요!</span>
            </div>
          </div>

          <p className="description">{store.description || "#맛집 #가성비 #든든한끼"}</p>

          <div className="info">
            <MapPin size={14} className="icon" />
            <span>{store.location || "위치 정보 없음"}</span>
          </div>

          <div className="info">
            <Coffee size={14} className="icon" />
            <span className="bold">(픽업장소) 한경직 기념관</span>
          </div>

          <div className="progress-section">
            <p className="current-orders">현재 {currentOrders}명 주문중</p>
            <div className="steps">
              {steps.map((step, idx) => (
                <div key={step.num} className="step">
                  <p className="step-label">{step.num}명</p>
                  <div
                    className={`circle ${
                      currentOrders >= step.num ? "active" : ""
                    }`}
                  >
                    {currentOrders >= step.num ? <Check size={14} /> : idx + 1}
                  </div>
                  <p className="reward">{step.reward}</p>
                </div>
              ))}
              <div className="progress-line">
                <div
                  className="progress-fill"
                  style={{ width: `${((currentOrders - 0) / 100) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <a 
            href={`/todayMenu/list?storeId=${store.id}`}
            className="order-btn"
          >
            주문하고 학교에서 먹기
          </a>
        </div>
      </div>
    </div>
  );
}
