"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { MenuService } from "@/lib/menuService";
import { StoreService } from "@/lib/storeService";
import { type Menu, type Store } from "@/lib/supabase";
import "./menuList.css";

export default function MenuListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams?.get("storeId");
  
  const [store, setStore] = useState<Store | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (storeId) {
      loadStoreAndMenus();
    }
  }, [storeId]);

  const loadStoreAndMenus = async () => {
    try {
      setLoading(true);
      if (!storeId) return;
      
      const [storeData, menusData] = await Promise.all([
        StoreService.getStoreById(storeId),
        MenuService.getMenusByStoreId(storeId)
      ]);

      setStore(storeData);
      setMenus(menusData);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (menuId: string) => {
    router.push(`/todayMenu/detail?menuId=${menuId}&storeId=${storeId}`);
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="page">
        <div className="card">
          <div className="card-header">
            <h2 className="title">매장 정보</h2>
            <p className="subtitle">메뉴를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="page">
        <div className="card">
          <div className="card-header">
            <h2 className="title">오류</h2>
            <p className="subtitle">매장 정보를 찾을 수 없습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <button className="back-button" onClick={handleBack}>
            ←
          </button>
          <div className="header-content">
            <h2 className="title">오늘의 메뉴</h2>
            <p className="subtitle">매일 바뀌는 오늘의 픽</p>
          </div>
        </div>

        <div className="media">
          <img
            src={store.thumbnail}
            alt={store.name}
          />
          <div className="badge">{store.name}</div>
        </div>

        <div className="content">
          <div className="content-header">
            <h1 className="menu-title">{store.name}</h1>
          </div>

          <p className="hashtags">{store.description || "#스페셜티커피 #가성비 #든든한끼"}</p>

          <div className="info">
            <span className="icon">📍</span>
            <span>{store.address || "서울특별시 강남구 테헤란로 123"}</span>
          </div>

          <div className="info">
            <span className="icon">☕</span>
            <span className="bold">"(픽업장소) 한경직 기념관"</span>
          </div>

          <div className="menu-list-section">
            <h3 className="menu-section-title">메뉴 ({menus.length})</h3>
            
            {menus.length === 0 ? (
              <div className="no-menus">등록된 메뉴가 없습니다.</div>
            ) : (
              <div className="menu-items">
                {menus.map((menu) => (
                  <div
                    key={menu.id}
                    className="menu-item"
                    onClick={() => handleMenuClick(menu.id)}
                  >
                    <div className="menu-item-image">
                      {menu.thumbnail ? (
                        <img src={menu.thumbnail} alt={menu.title} />
                      ) : (
                        <div className="placeholder-menu-image">☕</div>
                      )}
                    </div>
                    <div className="menu-item-info">
                      <h4 className="menu-item-name">{menu.title}</h4>
                      <p className="menu-item-description">{menu.description || "에스프레소와 스팀 밀크의 부드러운 조화"}</p>
                      <div className="menu-item-price">₩{menu.price.toLocaleString()}</div>
                    </div>
                    <div className="menu-item-arrow">→</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
