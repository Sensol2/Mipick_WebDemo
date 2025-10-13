"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { MenuService } from "@/lib/menuService";
import { StoreService } from "@/lib/storeService";
import { type Menu, type Store } from "@/lib/supabase";
import styled from "styled-components";
import { Page, Sheet, Header, HeaderTitle, HeaderSubtitle, BackButton, Body } from "../components/ui";
import { StoreHeaderImage, MenuListItem } from "./components";

export default function MenuListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams?.get("storeId");
  
  const [store, setStore] = useState<Store | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (storeId) {
      loadStoreAndMenus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  const handleMenuClick = (menuId: string) => {
    router.push(`/todayMenu/detail?menuId=${menuId}&storeId=$${storeId}`);
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <Page>
        <Sheet>
          <Header>
            <HeaderTitle>주문하기</HeaderTitle>
          </Header>
        </Sheet>
      </Page>
    );
  }

  if (!store) {
    return (
      <Page>
        <Sheet>
          <Header>
            <HeaderTitle>오류</HeaderTitle>
            <HeaderSubtitle>매장 정보를 찾을 수 없습니다.</HeaderSubtitle>
          </Header>
        </Sheet>
      </Page>
    );
  }

  return (
    <Page>
      <Sheet>
        <Header>
          <BackButton onClick={handleBack}>←</BackButton>
          <HeaderTitle>주문하기</HeaderTitle>
        </Header>

        <StoreHeaderImage store={store} />

        <Body>
          <Section>
            <SectionTitle>메뉴 ({menus.length})</SectionTitle>
            
            {menus.length === 0 ? (
              <NoMenus>등록된 메뉴가 없습니다.</NoMenus>
            ) : (
              <List>
                {menus.map((menu) => (
                  <MenuListItem
                    key={menu.id}
                    menu={menu}
                    onClick={handleMenuClick}
                  />
                ))}
              </List>
            )}
          </Section>
        </Body>
      </Sheet>
    </Page>
  );
}

const Section = styled.section``;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 12px 0;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NoMenus = styled.div`
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  padding: 40px 20px;
`;
