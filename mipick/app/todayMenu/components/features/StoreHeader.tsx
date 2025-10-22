import styled from "styled-components";
import { Store } from "@/lib/api/supabase";

interface StoreHeaderProps {
  store: Store;
}

export default function StoreHeader({ store }: StoreHeaderProps) {
  return (
    <StoreImageContainer>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={store.thumbnail || "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250813_132%2F1755070254048Vr7FN_JPEG%2F%25C1%25A6%25C1%25D6%25BB%25F3%25C8%25B8_%25B8%25DE%25C0%25CE%25BB%25E7%25C1%25F8.jpg"}
        alt="오늘의 메뉴"
      />
      <StoreBadge>{store.name}</StoreBadge>
    </StoreImageContainer>
  );
}

const StoreImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background: #e5e7eb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StoreBadge = styled.div`
  position: absolute;
  top: 14px;
  left: 14px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 12px;
  font-weight: 600;
`;
