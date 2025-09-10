/**
 * 通用布局组件导出
 * 集中导出所有通用布局组件，便于引用
 */

// 布局结构组件
export { AppGrid } from "./app-grid";
export { PageContainer, type PageContainerProps } from "./page-container";
export {
  ThreeColumnGrid,
  type ThreeColumnGridProps,
} from "./three-column-grid";
export {
  ThreeColumnLayout,
  type ThreeColumnLayoutProps,
  type SidebarConfig,
} from "./three-column-layout";

// 新增的多布局组件和响应式网格组件
export { MultiLayout, ThreeColumnLayout as MultiColumnLayout } from "./multi-layout";
export { ResponsiveGrid, ThreeColumnGrid as FlexibleGrid } from "./responsive-grid";

// 状态和错误处理
// ProgressBarLoading 组件已合并到全局loading页面，不再导出
// NotFound 组件已合并到全局404页面，不再导出

// 导航相关组件
export { Footer } from "@/components/footer";
export { Sidebar, SidebarWrapper } from "@/features/sidebar/components";

// 配置信息
export {
  NAV_ITEMS,
  NAV_PATHS,
  NAV_DESCRIPTIONS,
  ADMIN_MENU_ITEMS,
} from "@/features/navbar/types/nav-config";

// // 客户端初始化组件  // 删除这行
// export { InitClient } from "./init-client";  // 删除这行
