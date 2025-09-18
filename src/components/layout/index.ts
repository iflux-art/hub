/**
 * 通用布局组件导出
 * 集中导出所有通用布局组件，便于引用
 */

// 布局结构组件
export { AppGrid } from "./app-grid";
// 新增的多布局组件和响应式网格组件
export {
  MultiLayout,
  ThreeColumnLayout as MultiColumnLayout,
} from "./multi-layout";
export { PageContainer, type PageContainerProps } from "./page-container";
export {
  ResponsiveGrid,
  ThreeColumnGrid as FlexibleGrid,
} from "./responsive-grid";
export {
  ThreeColumnGrid,
  type ThreeColumnGridProps,
} from "./three-column-grid";
export {
  type SidebarConfig,
  ThreeColumnLayout,
  type ThreeColumnLayoutProps,
} from "./three-column-layout";

// 导航相关组件
export { Footer } from "@/components/footer";
// 配置信息
export {
  ADMIN_MENU_ITEMS,
  NAV_DESCRIPTIONS,
  NAV_ITEMS,
  NAV_PATHS,
} from "@/features/navbar/types/nav-config";
export { Sidebar, SidebarWrapper } from "@/features/sidebar/components";
