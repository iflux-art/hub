/**
 * 页面容器和网格布局相关工具函数
 */

import type { GridColsMap, GridGapMap, PageContainerConfig, PageLayoutType } from "@/types";
import {
  getResponsiveClasses as baseGetResponsiveClasses,
  gridColsMap as baseGridColsMap,
  gridGapMap as baseGridGapMap,
} from "./responsive-utils";

// 重新导出以保持向后兼容性
export const gridColsMap: GridColsMap = baseGridColsMap;
export const gridGapMap: GridGapMap = baseGridGapMap;
export const getResponsiveClasses = baseGetResponsiveClasses;

/**
 * 获取布局对应的CSS类名
 */
export function getLayoutClassName(layout: PageLayoutType): string {
  const baseClasses = "min-h-screen bg-background";

  switch (layout) {
    case "full-width":
      return `${baseClasses} w-full`;
    default:
      return baseClasses;
  }
}

/**
 * 获取容器CSS类名
 */
export function getContainerClassName(config: PageContainerConfig = {}): string {
  const { layout = "full-width", className = "", minHeight = "min-h-screen" } = config;

  const baseClasses = minHeight;
  const layoutClasses = getLayoutClassName(layout);

  return `${baseClasses} ${layoutClasses} ${className}`.trim();
}

/**
 * 获取主内容区域的响应式类名
 * 支持两种布局类型：
 * 1. 单侧栏布局(single-sidebar)：左侧栏占2列，主内容占10列
 * 2. 宽布局(full-width)：主内容占满12列
 */
export function getMainContentClasses(layout: PageLayoutType): string {
  const baseClasses = "min-w-0";

  switch (layout) {
    case "single-sidebar":
      // 单侧栏布局：左侧栏占2列，主内容占10列
      return `${baseClasses} md:col-span-10 lg:col-span-10 xl:col-span-10 md:col-start-3 lg:col-start-3 xl:col-start-3`;
    default:
      // 宽布局：主内容占满12列
      return `${baseClasses} md:col-span-12 lg:col-span-12 xl:col-span-12`;
  }
}

/**
 * 获取侧边栏的响应式类名
 * 根据布局类型和侧边栏位置返回相应的类名
 */
export function getSidebarClasses(position: "left" | "right", layout: PageLayoutType): string {
  switch (layout) {
    case "single-sidebar":
      // 单侧栏布局：侧边栏占2列
      if (position === "left") {
        return "md:col-span-2 lg:col-span-2 xl:col-span-2 md:col-start-1 lg:col-start-1 xl:col-start-1";
      }
      // 右侧边栏在单侧栏布局中不显示
      return "hidden";
    default:
      // 宽布局不显示侧边栏
      return "hidden";
  }
}

/**
 * 侧边栏默认配置常量
 */
export const DEFAULT_SIDEBAR_CONFIG = {
  sticky: true,
  stickyTop: "80px",
  maxHeight: "calc(100vh - 5rem - env(safe-area-inset-bottom))",
  responsive: {
    hideOnMobile: true,
    hideOnTablet: false,
    hideOnDesktop: false,
  },
} as const;
