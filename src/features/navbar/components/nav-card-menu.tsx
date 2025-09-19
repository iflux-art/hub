"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useActiveSection } from "@/features/navbar/hooks/use-active-section";
import type { NavConfigItem } from "@/features/navbar/types/nav-config";
import {
  ADMIN_MENU_ITEMS,
  NAV_DESCRIPTIONS,
  NAV_ITEMS,
  NAV_PATHS,
} from "@/features/navbar/types/nav-config";
import { cn } from "@/lib/utils";

interface NavProps {
  /**
   * 点击后的回调函数（用于关闭移动菜单）
   */
  onClose?: () => void;

  /**
   * 自定义类名
   */
  className?: string;
}

const NavCards = ({ onClose, className }: NavProps) => {
  // Always call hooks at the top level, even if we might not use the result
  const isActiveSection = useActiveSection(
    NAV_ITEMS.map((item: NavConfigItem) => item.key),
  );

  // 如果没有导航项，则不渲染导航卡片
  if (NAV_ITEMS.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {NAV_ITEMS.map((item: NavConfigItem) => {
          const Icon = item.icon;
          const href = NAV_PATHS[item.key] ?? "/";
          return (
            <Link
              key={item.key}
              href={href}
              onClick={onClose}
              className={cn(
                "group relative overflow-hidden rounded-lg border bg-card p-6 transition-colors duration-300 hover:bg-accent hover:text-accent-foreground",
                isActiveSection === item.key
                  ? "border-primary bg-accent text-accent-foreground"
                  : "border-border",
              )}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="h-5 w-5" />} {/* 添加条件渲染 */}
                  <h3 className="text-base font-medium">{item.label}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {NAV_DESCRIPTIONS[item.key]}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const AdminMenu = ({ onClose }: NavProps) => {
  const isActiveSection = useActiveSection(
    ADMIN_MENU_ITEMS.map((item: NavConfigItem) => item.key),
  );

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">管理后台</h3>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ADMIN_MENU_ITEMS.map((item: NavConfigItem) => {
          const Icon = item.icon; // 移除类型注解，让TypeScript自动推断
          return (
            <Link
              key={item.key}
              href={`/${item.key}`}
              onClick={onClose}
              className={cn(
                "group relative overflow-hidden rounded-lg border bg-card p-6 transition-colors duration-300 hover:bg-accent hover:text-accent-foreground",
                isActiveSection === item.key
                  ? "border-primary bg-accent text-accent-foreground"
                  : "border-border",
              )}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="h-5 w-5" />} {/* 添加条件渲染 */}
                  <h3 className="text-base font-medium">{item.label}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const NavCardMenu = ({ onClose, className }: NavProps) => {
  const { isSignedIn } = useUser();

  return (
    <div className={cn("space-y-6", className)}>
      <NavCards onClose={onClose} />
      {isSignedIn && <AdminMenu onClose={onClose} />}
    </div>
  );
};
