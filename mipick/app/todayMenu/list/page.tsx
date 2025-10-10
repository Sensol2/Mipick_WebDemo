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
      <Page>
        <Card>
          <CardHeader>
            <Title>매장 정보</Title>
            <Subtitle>메뉴를 불러오는 중...</Subtitle>
          </CardHeader>
        </Card>
      </Page>
    );
  }

  if (!store) {
    return (
      <Page>
        <Card>
          <CardHeader>
            <Title>오류</Title>
            <Subtitle>매장 정보를 찾을 수 없습니다.</Subtitle>
          </CardHeader>
        </Card>
      </Page>
    );
  }

  return (
    <Page>
      <Card>
        <CardHeader>
          <BackButton onClick={handleBack}>
            ←
          </BackButton>
          <HeaderContent>
            <Title>오늘의 메뉴</Title>
            <Subtitle>매일 바뀌는 오늘의 픽</Subtitle>
          </HeaderContent>
        </CardHeader>

        <Media>
          <img
            src={store.thumbnail}
            alt={store.name}
          />
          <Badge>{store.name}</Badge>
        </Media>

        <Content>
          <ContentHeader>
            <MenuTitle>{store.name}</MenuTitle>
          </ContentHeader>

          <Hashtags>{store.description || "#스페셜티커피 #가성비 #든든한끼"}</Hashtags>

          <Info>
            <span className="icon">📍</span>
            <span>{store.address || "서울특별시 강남구 테헤란로 123"}</span>
          </Info>

          <Info>
            <span className="icon">☕</span>
            <Bold>"(픽업장소) 한경직 기념관"</Bold>
          </Info>

          <MenuListSection>
            <MenuSectionTitle>메뉴 ({menus.length})</MenuSectionTitle>
            
            {menus.length === 0 ? (
              <NoMenus>등록된 메뉴가 없습니다.</NoMenus>
            ) : (
              <MenuItems>
                {menus.map((menu) => (
                  <MenuItem
                    key={menu.id}
                    onClick={() => handleMenuClick(menu.id)}
                  >
                    <MenuItemImage>
                      {menu.thumbnail ? (
                        <img src={menu.thumbnail} alt={menu.title} />
                      ) : (
                        <PlaceholderMenuImage>☕</PlaceholderMenuImage>
                      )}
                    </MenuItemImage>
                    <MenuItemInfo>
                      <MenuItemName>{menu.title}</MenuItemName>
                      <MenuItemDescription>{menu.description || "에스프레소와 스팀 밀크의 부드러운 조화"}</MenuItemDescription>
                      <MenuItemPrice>₩{menu.price.toLocaleString()}</MenuItemPrice>
                    </MenuItemInfo>
                    <MenuItemArrow>→</MenuItemArrow>
                  </MenuItem>
                ))}
              </MenuItems>
            )}
          </MenuListSection>
        </Content>
      </Card>
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffedd5, #ffffff, #fff7ed);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Card = styled.div`
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #fed7aa;
  max-width: 420px;
  width: 100%;
`;

const CardHeader = styled.div`
  padding: 24px;
  text-align: center;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #ea580c;
  font-weight: bold;
`;

const HeaderContent = styled.div``;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: #ea580c;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 4px 0 0 0;
`;

const Media = styled.div`
  position: relative;
  width: 100%;
  height: 260px;
  background: #e5e7eb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`;

const Content = styled.div`
  padding: 24px;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuTitle = styled.h1`
  font-size: 20px;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
`;

const Hashtags = styled.p`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  margin-top: 8px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #374151;
  font-weight: 500;
  margin-top: 8px;

  .icon {
    margin-right: 8px;
    font-size: 14px;
  }
`;

const Bold = styled.span`
  font-weight: 600;
`;

const MenuListSection = styled.div`
  margin-top: 24px;
`;

const MenuSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #f97316;
    box-shadow: 0 2px 8px rgba(249, 115, 22, 0.1);
  }
`;

const MenuItemImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaceholderMenuImage = styled.div`
  font-size: 24px;
  color: #9ca3af;
`;

const MenuItemInfo = styled.div`
  flex: 1;
`;

const MenuItemName = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 4px 0;
`;

const MenuItemDescription = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const MenuItemPrice = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #f97316;
`;

const MenuItemArrow = styled.div`
  font-size: 16px;
  color: #9ca3af;
  font-weight: bold;
`;

const NoMenus = styled.div`
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  padding: 40px 20px;
`;