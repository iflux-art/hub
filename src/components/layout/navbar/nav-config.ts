import type { BaseNavItem } from "@/types";
import { Home, type LucideIcon } from "lucide-react";

/**
 * 导航配置项接口
 */
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
    key: "home",
    label: "首页",
    description: "网站主页",
    icon: Home,
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
