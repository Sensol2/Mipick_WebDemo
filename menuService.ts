import { supabase, type Menu, type MenuOption, type MenuOptionGroup } from '../lib/supabase';

// 메뉴 옵션 그룹과 옵션 타입을 재정의하여 export
export type { MenuOptionGroup, MenuOption } from '../lib/supabase';

export class MenuService {
  // 특정 스토어의 모든 메뉴 가져오기
  static async getMenusByStoreId(storeId: string): Promise<Menu[]> {
    try {
      const { data, error } = await supabase
        .from('menus')
        .select('*')
        .eq('store_id', storeId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching menus by store id:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getMenusByStoreId:', error);
      return [];
    }
  }

  // 특정 메뉴 정보 가져오기 (단일 메뉴) - 호환성을 위해 유지
  static async getMenuById(menuId: string): Promise<Menu | null> {
    try {
      const { data, error } = await supabase
        .from('menus')
        .select('*')
        .eq('id', menuId)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching menu by id:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getMenuById:', error);
      return null;
    }
  }

  // 메뉴 옵션 가져오기
  static async getMenuOptions(menuId: string): Promise<MenuOptionGroup[]> {
    try {
      const { data, error } = await supabase
        .from('menu_option_groups')
        .select(`
          *,
          options:menu_options(*)
        `)
        .eq('menu_id', menuId);

      if (error) {
        console.error('Error fetching menu options:', error);
        return [];
      }

      return data?.map(group => ({
        id: group.id,
        name: group.name,
        isRequired: group.is_required,
        maxSelections: group.max_selections,
        options: group.options?.map((option: MenuOption) => ({
          id: option.id,
          name: option.name,
          price: option.price
        })) || []
      })) || [];
    } catch (error) {
      console.error('Error in getMenuOptions:', error);
      return [];
    }
  }
}
