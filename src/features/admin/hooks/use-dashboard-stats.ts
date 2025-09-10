/**
 * 仪表盘统计数据相关钩子函数
 * @module hooks/use-dashboard-stats
 */

"use client";

import { useLinksData } from "@/features/links/hooks";
import { useMemo } from "react";

/**
 * 仪表盘统计数据接口
 */
export interface DashboardStats {
  // 内容统计
  linkCount: number;
  // friendCount: number;  // 删除友链统计
  // 新增内容
  newLinkCount: number;
  // 用户统计
  userCount: number;
  // 访问统计
  visitCount: number;
  // 加载状态
  loading: boolean;
  error: string | null;
  // 刷新函数
  refresh: () => void;
}

/**
 * 获取仪表盘统计数据
 * @returns 网站各模块的统计数据
 */
export function useDashboardStats(): DashboardStats {
  // 获取链接数据
  const { allItems: linkItems, loading: linkLoading, error: linkError } = useLinksData();

  // 计算统计数据
  const stats = useMemo(() => {
    // 导航链接数量
    const linkCount = linkItems?.length ?? 0;

    // 本月新增网址数 (示例计算 - 实际需要根据创建日期计算)
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const newLinkCount =
      linkItems?.filter(item => {
        // 如果item有创建日期字段，则判断是否为本月创建
        // 这里假设有createdAt字段，实际项目中可能需要调整
        if (item.createdAt) {
          const createDate = new Date(item.createdAt);
          return createDate >= firstDayOfMonth;
        }
        return false;
      }).length ?? 24; // 如果无法计算，则返回默认值24

    // 用户数量 (示例值，实际需要从用户系统获取)
    const userCount = 573;

    // 访问量 (示例值，实际需要从分析系统获取)
    const visitCount = 45231;

    return {
      linkCount,
      // friendCount,  // 删除友链统计
      newLinkCount,
      userCount,
      visitCount,
    };
  }, [linkItems]);

  const loading = linkLoading;
  const error = linkError ?? null;

  return {
    ...stats,
    loading,
    error,
    refresh: () => {
      // Links data will be refreshed automatically through the hook
    },
  };
}
