import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MenuService } from "@/lib/api/menuService";
import { StoreService } from "@/lib/api/storeService";
import { type Menu, type Store } from "@/lib/api/supabase";

export function useMenuList(storeId: string | null) {
  const router = useRouter();
  
  const [store, setStore] = useState<Store | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  // 매장과 메뉴 데이터 로드
  useEffect(() => {
    const loadStoreAndMenus = async () => {
      try {
        setLoading(true);
        if (!storeId) return;

        const [storeData, menusData] = await Promise.all([
          StoreService.getStoreById(storeId),
          MenuService.getMenusByStoreId(storeId),
        ]);

        setStore(storeData);
        setMenus(menusData);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    if (storeId) {
      loadStoreAndMenus();
    }
  }, [storeId]);

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menuId: string) => {
    router.push(`/todayMenu/detail?menuId=${menuId}&storeId=${storeId}`);
  };

  return {
    store,
    menus,
    loading,
    handleMenuClick,
  };
}
