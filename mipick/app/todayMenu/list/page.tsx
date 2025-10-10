"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { MenuService } from "@/lib/menuService";
import { StoreService } from "@/lib/storeService";
import { type Menu, type Store } from "@/lib/supabase";
import styled from "styled-components";

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
          <CloseBtn onClick={handleBack}>←</CloseBtn>
          <HeaderTitle>주문하기</HeaderTitle>
        </Header>

        <StoreImageContainer>
          <img
            src={store.thumbnail}
            alt={store.name}
          />
          <ImageOverlay />
          <StoreInfoOverlay>
            <StoreName>{store.name}</StoreName>
            {/* <StoreRating>⭐ 4.7 · 리뷰 1,069개 〉</StoreRating> */}
            <StoreDeliveryTime>{store.description}</StoreDeliveryTime>
            
          </StoreInfoOverlay>
        </StoreImageContainer>

        <Body>
          <Section>
            <SectionTitle>메뉴 ({menus.length})</SectionTitle>
            
            {menus.length === 0 ? (
              <NoMenus>등록된 메뉴가 없습니다.</NoMenus>
            ) : (
              <List>
                {menus.map((menu) => (
                  <Row
                    key={menu.id}
                    onClick={() => handleMenuClick(menu.id)}
                  >
                    <Thumb>
                      {menu.thumbnail ? (
                        <img src={menu.thumbnail} alt={menu.title} />
                      ) : (
                        <ThumbPlaceholder>☕</ThumbPlaceholder>
                      )}
                    </Thumb>
                    <RowInfo>
                      <RowTitle>{menu.title}</RowTitle>
                      <RowDescription>{menu.description || "에스프레소와 스팀 밀크의 부드러운 조화"}</RowDescription>
                      <RowPrice>₩{menu.price.toLocaleString()}</RowPrice>
                    </RowInfo>
                    <RowArrow>→</RowArrow>
                  </Row>
                ))}
              </List>
            )}
          </Section>
        </Body>
      </Sheet>
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffedd5, #ffffff, #fff7ed);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Sheet = styled.div`
  background: #fff;
  border: 1px solid #fed7aa;
  border-radius: 20px;
  max-width: 420px;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  position: relative;
  padding: 18px 48px;
  text-align: center;
  border-bottom: 1px solid #ffe4cc;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #111827;
`;

const HeaderSubtitle = styled.p`
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #6b7280;
`;

const CloseBtn = styled.button`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #fff7ed;
  color: #111827;
  font-size: 18px;
  cursor: pointer;
`;

const StoreImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background: #e5e7eb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
  pointer-events: none;
`;

const StoreInfoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  color: white;
`;

const StoreName = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: white;
  margin: 0 0 8px 0;
`;

const StoreRating = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin: 0 0 6px 0;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StoreDeliveryTime = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
`;

const Body = styled.div`
  flex: 1;
  overflow: auto;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Section = styled.section``;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 12px 0;
`;

const StoreHashtags = styled.p`
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
  margin: 0 0 12px 0;
`;

const StoreInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #374151;
  font-weight: 500;
  margin-top: 8px;
`;

const InfoIcon = styled.span`
  margin-right: 8px;
  font-size: 14px;
`;

const InfoText = styled.span`
  font-weight: 600;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #f97316;
    box-shadow: 0 2px 8px rgba(249, 115, 22, 0.1);
  }
`;

const Thumb = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 10px;
  overflow: hidden;
  background: #f3f4f6;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbPlaceholder = styled.div`
  font-size: 22px;
  color: #9ca3af;
`;

const RowInfo = styled.div`
  flex: 1;
`;

const RowTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 4px 0;
`;

const RowDescription = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const RowPrice = styled.div`
  font-size: 12px;
  color: #f97316;
  font-weight: 700;
`;

const RowArrow = styled.div`
  font-size: 16px;
  color: #9ca3af;
  font-weight: bold;
  margin-left: 8px;
`;

const NoMenus = styled.div`
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  padding: 40px 20px;
`;
