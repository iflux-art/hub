/**
 * Features 模块统一导出
 *
 * 保留的核心功能模块：
 * - admin: 管理功能
 * - auth: 认证功能
 * - search: 搜索功能
 * - links: 链接管理功能
 * - website-parser: 网站解析功能
 */

// Admin 功能模块 - 使用具体导出避免冲突
export {
  AdminLayout,
  AddDialog,
  EditDialog,
  DeleteDialog,
  AdminActions,
  LinksAdminPage,
  useDebouncedValue,
} from "./admin";

export type {
  LinksFormData as AdminLinksFormData,
  AddDialogProps,
  EditDialogProps,
  DeleteDialogProps,
  AdminAction,
  DataTableColumn,
  DataTableAction,
  DataTablePagination,
  DataTableProps,
} from "./admin";

// Admin 模块的 LinksItem 使用别名导出
export type { LinksItem as AdminLinksItem } from "./links/types";

// Auth 功能模块
export { AuthButtons } from "./auth";

// Search 功能模块
export type { SearchResult, SearchOptions, SearchResponse } from "./search";
export {
  performSearch,
  getSearchSuggestions,
  highlightSearchTerm,
  useSearch,
  useSearchState,
  SearchDialog,
  SearchBar,
  SearchResults,
  SearchButton,
} from "./search";

// Links 功能模块 - 使用具体导出避免冲突
export {
  LinksSidebar,
  LinksSidebarCard,
  LinksContent,
  LinksForm,
  DataTable,
  LinkCard,
  LinksPageContainer,
  getTableColumns,
  getTableActions,
  getPageActions,
  useLinksData,
  useCategories,
  useFilterState,
  loadAllLinksData,
  generateCategoriesData,
  categoryStructure,
  clearCategoryCache,
  preloadCriticalCategories,
  linkService,
  linkDataService,
} from "./links";

export type {
  LinksContentProps,
  LinksSidebarProps,
  CategoryId,
  LinksSubCategory,
  LinksCategory,
  LinksItem,
  LinksFormData,
  LinkService,
  LinkDataService,
} from "./links";

// Website Parser 功能模块
export type {
  WebsiteMetadata,
  CacheItem,
  ParseOptions,
  ParseResult,
} from "./website-parser";
export {
  parseWebsite,
  parseWebsites,
  clearCache,
  getCacheSize,
  useWebsiteParser,
} from "./website-parser";
