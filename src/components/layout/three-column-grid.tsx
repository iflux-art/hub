import type { ThreeColumnGridProps } from "@/types";
import { cn } from "@/lib/utils";

export type { ThreeColumnGridProps } from "@/types";

import { SidebarWrapper } from "@/features/sidebar/components";
import {
  getMainContentClasses,
  getSidebarClasses,
} from "@/lib/layout/layout-utils";
import { useLayoutStore } from "@/stores";

/**
 * 网格布局组件
 * 支持两种布局类型：
 * 1. 单侧栏布局(single-sidebar)：左侧栏占2列，主内容占10列
 * 2. 宽布局(full-width)：主内容占满12列，不显示侧边栏
 */
export const ThreeColumnGrid = ({
  children,
  sidebars,
}: ThreeColumnGridProps) => {
  const { layoutType } = useLayoutStore();

  const leftSidebars = sidebars.filter((s) => s.position === "left");

  return (
    <div className="grid grid-cols-1 gap-4 py-6 sm:gap-6 md:grid-cols-12 md:gap-6 lg:gap-8 lg:py-8 xl:gap-10">
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
      <main className={cn(getMainContentClasses(layoutType))}>{children}</main>
    </div>
  );
};
