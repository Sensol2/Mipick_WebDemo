import React from "react";
import styled from "styled-components";
import { type Menu } from "@/lib/api/supabase";

interface MenuImageProps {
  menu: Menu;
}

export default function MenuImage({ menu }: MenuImageProps) {
  return (
    <MenuImageContainer>
      {menu.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={menu.thumbnail} alt={menu.title} />
      ) : (
        <ThumbPlaceholder>{menu.title}</ThumbPlaceholder>
      )}
    </MenuImageContainer>
  );
}

const MenuImageContainer = styled.div`
  width: 100%;
  height: 240px;
  border-radius: 12px;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbPlaceholder = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #9ca3af;
  text-align: center;
  padding: 20px;
`;
