import type { ReactNode } from "react";

/** 侧边栏项目 */
export interface SidebarItem {
  id: string;
  title: string;
  href?: string;
  children?: SidebarItem[];
  isActive?: boolean;
  isExternal?: boolean;
  description?: string;
  icon?: ReactNode;
}

/** 侧边栏属性 */
export interface SidebarProps {
  /** 侧边栏项目列表 */
  items: SidebarItem[];
  /** 当前选中的项目ID */
  currentItem?: string;
  /** 项目点击回调 */
  onItemClick?: (itemId: string) => void;
  /** 自定义类名 */
  className?: string;
  /** 本地存储键前缀 */
  storageKey?: string;
  /** 是否显示全部选项 */
  showAllOption?: boolean;
  /** 全部选项的标题 */
  allOptionTitle?: string;
}
