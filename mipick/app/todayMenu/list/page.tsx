"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import { Header, HeaderTitle, HeaderSubtitle, BackButton, Body } from "../components/ui";
import { StoreHeaderImage, MenuListItem } from "./components";
import { useMenuList } from "./hooks/useMenuList";

export default function MenuListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams?.get("storeId");

  const { store, menus, loading, handleMenuClick } = useMenuList(storeId);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <>
        <Header>
          <HeaderTitle>주문하기</HeaderTitle>
        </Header>
      </>
    );
  }

  if (!store) {
    return (
      <>
        <Header>
          <HeaderTitle>오류</HeaderTitle>
          <HeaderSubtitle>매장 정보를 찾을 수 없습니다.</HeaderSubtitle>
        </Header>
      </>
    );
  }

  return (
    <>
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
                <MenuListItem key={menu.id} menu={menu} onClick={handleMenuClick} />
              ))}
            </List>
          )}
        </Section>
      </Body>
    </>
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
