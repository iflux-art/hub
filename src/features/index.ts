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

export type {
  AddDialogProps,
  AdminAction,
  DataTableAction,
  DataTableColumn,
  DataTablePagination,
  DataTableProps,
  DeleteDialogProps,
  EditDialogProps,
  LinksFormData as AdminLinksFormData,
} from "./admin";
// Admin 功能模块 - 使用具体导出避免冲突
export {
  AddDialog,
  AdminActions,
  AdminLayout,
  DeleteDialog,
  EditDialog,
  LinksAdminPage,
  useDebouncedValue,
} from "./admin";
// Auth 功能模块
export { AuthButtons } from "./auth";
export type {
  CategoryId,
  LinkDataService,
  LinkService,
  LinksCategory,
  LinksContentProps,
  LinksFormData,
  LinksItem,
  LinksSidebarProps,
  LinksSubCategory,
} from "./links";
// Links 功能模块 - 使用具体导出避免冲突
export {
  categoryStructure,
  clearCategoryCache,
  DataTable,
  generateCategoriesData,
  getPageActions,
  getTableActions,
  getTableColumns,
  LinkCard,
  LinksContent,
  LinksForm,
  LinksPageContainer,
  LinksSidebar,
  LinksSidebarCard,
  linkDataService,
  linkService,
  loadAllLinksData,
  preloadCriticalCategories,
  useCategories,
  useFilterState,
  useLinksData,
} from "./links";
// Admin 模块的 LinksItem 使用别名导出
export type { LinksItem as AdminLinksItem } from "./links/types";
// Search 功能模块
export type { SearchOptions, SearchResponse, SearchResult } from "./search";
export {
  getSearchSuggestions,
  highlightSearchTerm,
  performSearch,
  SearchBar,
  SearchButton,
  SearchDialog,
  SearchResults,
  useSearch,
  useSearchState,
} from "./search";

// Website Parser 功能模块
export type {
  CacheItem,
  ParseOptions,
  ParseResult,
  WebsiteMetadata,
} from "./website-parser";
export {
  clearCache,
  getCacheSize,
  parseWebsite,
  parseWebsites,
  useWebsiteParser,
} from "./website-parser";
