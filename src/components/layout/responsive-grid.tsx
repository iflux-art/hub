import type { ReactNode } from "react";
import { SidebarWrapper } from "@/features/sidebar/components";
import {
  getMainContentClasses,
  getSidebarClasses,
} from "@/lib/layout/layout-utils";
import { useLayoutStore } from "@/stores";
import type { PageLayoutType, SidebarConfig } from "@/types";
import { cn } from "@/utils";

interface ResponsiveGridProps {
  /**
   * 网格内容
   */
  children: ReactNode;
  /**
   * 侧边栏配置
   */
  sidebars: SidebarConfig[];
  /**
   * 手动指定布局类型（可选）
   */
  layoutType?: PageLayoutType;
  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * 响应式网格布局组件
 * 支持两种布局类型：
 * 1. 单侧栏布局(single-sidebar)：左侧栏占2列，主内容占10列
 * 2. 宽布局(full-width)：主内容占满12列，不显示侧边栏
 */
export const ResponsiveGrid = ({
  children,
  sidebars,
  layoutType: propLayoutType,
  className = "",
}: ResponsiveGridProps) => {
  const { layoutType: storeLayoutType } = useLayoutStore();

  // 优先使用传入的布局类型，否则使用 store 中的类型
  const layoutType = propLayoutType || storeLayoutType;

  const leftSidebars = sidebars.filter((s) => s.position === "left");

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-12 md:gap-6 lg:gap-8 xl:gap-10",
        className,
      )}
    >
      {/* 左侧边栏区域 */}
      {leftSidebars.length > 0 && (
        <div className={getSidebarClasses("left", layoutType)}>
          {leftSidebars.map((sidebar, index) => (
            <SidebarWrapper
              key={sidebar.id || `left-${index}`}
              config={sidebar}
            >
              {sidebar.content}
            </SidebarWrapper>
          ))}
        </div>
      )}

      {/* 主内容区域 */}
      <main className={getMainContentClasses(layoutType)}>{children}</main>

      {/* 右侧边栏区域 - 不再支持 */}
    </div>
  );
};

// 为了向后兼容，保留ThreeColumnGrid的导出
export const ThreeColumnGrid = ResponsiveGrid;
