import React from "react";
import styled from "styled-components";
import { type Menu } from "@/lib/supabase";

interface MenuListItemProps {
  menu: Menu;
  onClick: (menuId: string) => void;
}

export default function MenuListItem({ menu, onClick }: MenuListItemProps) {
  return (
    <Row onClick={() => onClick(menu.id)}>
      <Thumb>
        {menu.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={menu.thumbnail} alt={menu.title} />
        ) : (
          <ThumbPlaceholder>☕</ThumbPlaceholder>
        )}
      </Thumb>
      <RowInfo>
        <RowTitle>{menu.title}</RowTitle>
        <RowDescription>
          {menu.description || "에스프레소와 스팀 밀크의 부드러운 조화"}
        </RowDescription>
        <RowPrice>₩{menu.price.toLocaleString()}</RowPrice>
      </RowInfo>
      <RowArrow>→</RowArrow>
    </Row>
  );
}

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
