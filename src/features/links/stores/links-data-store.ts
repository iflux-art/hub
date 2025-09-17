import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { LinksItem } from "@/features/links/types";

// 链接数据状态类型
export interface LinksDataState {
  // 所有链接数据
  items: LinksItem[];

  // 加载状态
  loading: boolean;

  // 错误信息
  error: string | null;

  // 数据版本信息
  version: string;

  // 最后更新时间
  lastUpdated: number;

  // 派生状态：过滤后的链接（排除friends分类）
  filteredItems: LinksItem[];
  // 派生状态：分类统计
  categoriesCount: Record<string, number>;
  // 派生状态：标签统计
  tagsCount: Record<string, number>;
}

// 链接数据状态管理动作
export interface LinksDataActions {
  setItems: (items: LinksItem[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateItem: (updatedItem: LinksItem) => void;
  updateItems: (updatedItems: LinksItem[]) => void;
  updateVersion: (version: string) => void;
  resetLinksDataState: () => void;
  // 选择性更新方法
  updateCategoriesCount: (categoriesCount: Record<string, number>) => void;
  updateTagsCount: (tagsCount: Record<string, number>) => void;
  updateFilteredItems: (filteredItems: LinksItem[]) => void;
}

export interface LinksDataStore extends LinksDataState, LinksDataActions {}

// 计算派生状态的辅助函数
const computeFilteredItems = (items: LinksItem[]): LinksItem[] => {
  return items;
};

const computeCategoriesCount = (items: LinksItem[]): Record<string, number> => {
  const categoriesCount: Record<string, number> = {};
  items.forEach((item) => {
    if (item.category) {
      categoriesCount[item.category] =
        (categoriesCount[item.category] || 0) + 1;
    }
  });
  return categoriesCount;
};

const computeTagsCount = (items: LinksItem[]): Record<string, number> => {
  const tagsCount: Record<string, number> = {};
  items.forEach((item) => {
    item.tags?.forEach((tag) => {
      tagsCount[tag] = (tagsCount[tag] || 0) + 1;
    });
  });
  return tagsCount;
};

export const useLinksDataStore = create<LinksDataStore>()(
  persist(
    (set, get) => ({
      // 初始状态
      items: [],
      loading: true,
      error: null,
      version: "0",
      lastUpdated: 0,
      filteredItems: [],
      categoriesCount: {},
      tagsCount: {},

      // Actions
      setItems: (items) => {
        // 计算派生状态
        const filteredItems = computeFilteredItems(items);
        const categoriesCount = computeCategoriesCount(items);
        const tagsCount = computeTagsCount(items);

        set({
          items,
          filteredItems,
          categoriesCount,
          tagsCount,
          loading: false,
          error: null,
          version: get().version,
          lastUpdated: Date.now(),
        });
      },

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error, loading: false }),

      updateItem: (updatedItem) => {
        const currentItems = get().items;
        const updatedItems = currentItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item,
        );

        // 重新计算派生状态
        const filteredItems = computeFilteredItems(updatedItems);
        const categoriesCount = computeCategoriesCount(updatedItems);
        const tagsCount = computeTagsCount(updatedItems);

        set({
          items: updatedItems,
          filteredItems,
          categoriesCount,
          tagsCount,
          version: get().version,
          lastUpdated: Date.now(),
        });
      },

      updateItems: (updatedItems) => {
        const currentItems = get().items;
        const newItems = updatedItems.filter(
          (updatedItem) =>
            !currentItems.some((item) => item.id === updatedItem.id),
        );
        const mergedItems = [...currentItems, ...newItems];

        // 重新计算派生状态
        const filteredItems = computeFilteredItems(mergedItems);
        const categoriesCount = computeCategoriesCount(mergedItems);
        const tagsCount = computeTagsCount(mergedItems);

        set({
          items: mergedItems,
          filteredItems,
          categoriesCount,
          tagsCount,
          version: get().version,
          lastUpdated: Date.now(),
        });
      },

      updateVersion: (version) => set({ version }),

      resetLinksDataState: () => {
        set({
          items: [],
          loading: true,
          error: null,
          version: "0",
          lastUpdated: 0,
          filteredItems: [],
          categoriesCount: {},
          tagsCount: {},
        });
      },

      // 选择性更新方法
      updateCategoriesCount: (categoriesCount) => set({ categoriesCount }),
      updateTagsCount: (tagsCount) => set({ tagsCount }),
      updateFilteredItems: (filteredItems) => set({ filteredItems }),
    }),
    {
      name: "links-data-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        version: state.version,
        lastUpdated: state.lastUpdated,
      }),
    },
  ),
);
