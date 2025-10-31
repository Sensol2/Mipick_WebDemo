import React from "react";
import styled from "styled-components";
import { type Store } from "@/lib/api/supabase";

interface StoreHeaderImageProps {
  store: Store;
}

export default function StoreHeaderImage({ store }: StoreHeaderImageProps) {
  return (
    <StoreImageContainer>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={store.thumbnail} alt={store.name} />
      <ImageOverlay />
      <StoreInfoOverlay>
        <StoreName>{store.name}</StoreName>
        <StoreDeliveryTime>{store.description}</StoreDeliveryTime>
      </StoreInfoOverlay>
    </StoreImageContainer>
  );
}

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

const StoreDeliveryTime = styled.div`
  font-size: 16px;
  color: #ffffff;
  font-weight: 500;
`;
