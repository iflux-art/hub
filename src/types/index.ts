// 布局相关类型
export type {
  AppGridProps,
  GridColsMap,
  GridGapMap,
  NotFoundProps,
  PageContainerConfig,
  PageContainerProps,
  PageLayoutProps,
  PageLayoutType,
  PageProps,
  SidebarConfig,
  SidebarWrapperProps,
  ThreeColumnGridProps,
  ThreeColumnLayoutProps,
} from "./layout-types";

// 导航相关类型
// 搜索相关类型已移除，因为未被使用

// 配置相关类型
export type { IosConfig, SiteMetadata, WindowsConfig } from "./config-types";
// SEO相关类型
export type {
  GenerateMetadataOptions,
  IconConfig,
  JsonLdConfig,
  SEOPageOptions,
  SiteConfig,
  SocialConfig,
  VerificationConfig,
} from "./seo-types";

// Props相关类型 (已全部迁移到各自的功能模块)
// CardProps 和 ButtonProps 已迁移到各自使用的地方
// PageHeaderProps 已迁移到 src/features/layout/types
// SearchFilterProps 已迁移到 src/features/search/types
// DataTableColumn, DataTableAction, DataTablePagination, DataTableProps 已迁移到 src/features/admin/types
// UserInfo, UserInfoCardProps, AccountDetailsCardProps 已迁移到 src/features/auth/types
// TocHeading, TableOfContentsCardProps 已迁移到 src/features/navbar/types
