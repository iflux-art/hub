import type { ReactNode } from "react";
import { DEFAULT_SIDEBAR_CONFIG } from "@/lib/layout/layout-utils";
import type { PageLayoutType, SidebarConfig } from "@/types";
import { PageContainer } from "./page-container";

interface MultiLayoutProps {
  /**
   * 左侧边栏内容
   */
  leftSidebar?: ReactNode;
  /**
   * 主内容
   */
  children: ReactNode;
  /**
   * 右侧边栏内容（已弃用）
   */
  rightSidebar?: ReactNode;
  /**
   * 布局类型
   */
  layout?: PageLayoutType;
  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * 多布局组件
 * 提供两种不同的布局选项:
 *
 * 1. single-sidebar: 单侧栏布局，左侧栏占2列，右侧主内容区占10列（后台管理系统）
 * 2. full-width: 宽布局，占满全部的12列（首页）
 */
export const MultiLayout = ({
  leftSidebar,
  children,
  rightSidebar: _rightSidebar, // 标记为已弃用但保留参数以保持接口兼容性
  layout = "full-width",
  className = "",
}: MultiLayoutProps) => {
  const sidebars: SidebarConfig[] = [];

  // 左侧边栏配置 - 只在单侧栏布局中添加
  if (leftSidebar && layout === "single-sidebar") {
    sidebars.push({
      content: leftSidebar,
      position: "left",
      ...DEFAULT_SIDEBAR_CONFIG,
    });
  }

  // 右侧边栏配置 - 不再支持右侧边栏

  return (
    <PageContainer
      config={{ layout }}
      sidebars={sidebars}
      className={className}
    >
      {children}
    </PageContainer>
  );
};

// 为了向后兼容，保留ThreeColumnLayout的导出
export const ThreeColumnLayout = MultiLayout;
