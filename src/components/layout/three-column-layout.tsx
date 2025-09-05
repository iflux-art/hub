import type { SidebarConfig, ThreeColumnLayoutProps, PageLayoutType } from "@/types";
export type { ThreeColumnLayoutProps, SidebarConfig } from "@/types";
import { DEFAULT_SIDEBAR_CONFIG } from "@/lib/layout/layout-utils";
import { PageContainer } from "./page-container";

/**
 * 简化的布局组件
 * 快速创建不同布局类型的页面容器
 *
 * 使用场景：
 * - 后台管理系统：单侧栏布局（左侧菜单 + 主内容）
 * - 首页：宽布局（主内容占满全屏）
 */
export const ThreeColumnLayout = ({
  leftSidebar,
  children,
  rightSidebar: _rightSidebar, // 标记为已弃用但保留参数以保持接口兼容性
  className = "",
  layout = "full-width", // 默认使用宽布局
}: ThreeColumnLayoutProps & { layout?: PageLayoutType }) => {
  const sidebars: SidebarConfig[] = [];

  // 左侧边栏配置 - 只在单侧栏布局中添加
  if (leftSidebar && layout === "single-sidebar") {
    sidebars.push({
      content: leftSidebar,
      position: "left",
      ...DEFAULT_SIDEBAR_CONFIG,
    });
  }

  // 右侧边栏配置 - 不再支持

  return (
    <PageContainer config={{ layout }} sidebars={sidebars} className={className}>
      {children}
    </PageContainer>
  );
};
