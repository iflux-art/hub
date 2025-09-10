import { Home, FileText, BookOpen, Link, type LucideIcon } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

/** 基础导航项 */
export interface BaseNavItem {
  /** 导航项标识 */
  key: string;
  /** 显示标签 */
  label: string;
  /** 链接地址 */
  href?: string;
  /** 图标 */
  icon?: ComponentType<{ className?: string }> | ReactNode;
  /** 是否为外部链接 */
  external?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
}

/** 嵌套导航项 */
export interface NestedNavItem extends BaseNavItem {
  /** 子导航项 */
  children?: NestedNavItem[];
  /** 是否默认展开 */
  defaultOpen?: boolean;
}

/** 导航配置项接口 */
export interface NavConfigItem extends BaseNavItem {
  /** 描述文本 */
  description: string;
  /** 是否在特定场景下隐藏 */
  hidden?: boolean;
  /** 子菜单项 */
  children?: readonly NavConfigItem[];
  /** 图标 */
  icon?: LucideIcon;
}

export const NAV_ITEMS: readonly NavConfigItem[] = [
  {
    key: "blog",
    label: "博客",
    href: "https://blog.iflux.art/",
    description: "访问我们的技术博客",
    icon: FileText,
    external: true,
  },
  {
    key: "docs",
    label: "文档",
    href: "https://docs.iflux.art/",
    description: "查看详细技术文档",
    icon: BookOpen,
    external: true,
  },
  {
    key: "home",
    label: "导航",
    description: "网站导航",
    icon: Home,
  },
  {
    key: "friends",
    label: "友链",
    href: "https://blog.iflux.art/friends/",
    description: "查看我们的友情链接",
    icon: Link,
    external: true,
  },
] as const;

export const ADMIN_MENU_ITEMS = [
  {
    key: "admin",
    label: "管理",
    description: "查看系统概览和统计信息",
    icon: Home,
    permission: "admin.dashboard.view",
  },
] as const satisfies (NavConfigItem & {
  permission?: string;
})[];

// 扁平化所有导航项（包括子项）以便路径映射
const flattenNavItems = (items: readonly NavConfigItem[]): NavConfigItem[] => {
  const result: NavConfigItem[] = [];
  items.forEach(item => {
    result.push(item);
    if (item.children) {
      result.push(...item.children);
    }
  });
  return result;
};

const FLAT_NAV_ITEMS: NavConfigItem[] = flattenNavItems(NAV_ITEMS);

export const NAV_PATHS: Record<string, string> = {
  home: "/",
} as const;

/**
 * 检查导航配置完整性
 */
// Navigation configuration validation removed for production

export const NAV_DESCRIPTIONS = Object.fromEntries(
  FLAT_NAV_ITEMS.map(item => [item.key, item.description])
) as Record<string, string>;
