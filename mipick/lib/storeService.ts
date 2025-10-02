import { supabase, type Store, type Menu } from './supabase';

export class StoreService {
  // 모든 활성 스토어 가져오기 (홈 화면용)
  static async getAllStores(): Promise<Store[]> {
    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching stores:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getAllStores:', error);
      return [];
    }
  }

  // 특정 스토어 정보 가져오기
  static async getStoreById(storeId: string): Promise<Store | null> {
    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('id', storeId)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching store by id:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getStoreById:', error);
      return null;
    }
  }

  // ID로 특정 매장의 메뉴 목록 조회
  static async getStoreMenus(storeId: string): Promise<Menu[]> {
    try {
      const { data, error } = await supabase
        .from('menus')
        .select('*')
        .eq('store_id', storeId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('매장 메뉴 조회 실패:', error);
        throw new Error(`매장 메뉴 조회 실패: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('매장 메뉴 조회 중 오류:', error);
      throw error;
    }
  }
}