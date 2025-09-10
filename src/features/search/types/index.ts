/**
 * 搜索相关类型定义
 */

/**
 * 搜索过滤组件 Props
 */
export interface SearchFilterProps<T> {
  /** 当前搜索词 */
  searchTerm: string;
  /** 搜索词变化回调 */
  onSearchChange: (value: string) => void;
  /** 当前选中的分类 */
  selectedCategory: string;
  /** 分类变化回调 */
  onCategoryChange: (value: string) => void;
  /** 可选的分类列表 */
  categories: T[];
}

export interface SearchResult {
  type: "link" | "tool" | "command" | "navigation" | "history";
  title: string;
  description?: string;
  url?: string;
  path?: string;
  tags?: string[];
  /** 摘要（用于高级搜索结果） */
  excerpt?: string;
  /** 相关性评分 */
  score?: number;
  /** 是否为外部链接 */
  isExternal?: boolean;
  /** 高亮信息 */
  highlights?: {
    title?: string;
    content?: string[];
  };
}

export interface SearchOptions {
  type?: "all" | "links";
  limit?: number;
  includeContent?: boolean;
  useCache?: boolean;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  type: string;
}
