"use client";

import { useCallback, useEffect, useMemo } from "react";

import { useNavbarStore } from "@/stores";

/**
 * 节流滚动事件处理函数类型（带 cancel 方法）
 */
type ThrottledScrollHandler = ((event: Event) => void) & {
  cancel: () => void;
};

/**
 * 导航栏滚动配置项
 */
const THROTTLE_DELAY = 16; // 约60fps的节流响应

/**
 * 导航栏滚动效果 Hook
 *
 * 使用 Zustand 状态管理，根据页面滚动行为控制导航栏的显示状态：
 * - 监听滚动方向，自动切换导航栏显示状态
 * - 动态获取并显示当前页面标题
 * - 提供回到顶部功能
 *
 * @returns 返回导航栏状态和控制函数对象
 */
export function useNavbarScroll() {
  // pathname removed as it's not needed after simplification
  const {
    direction,
    position,
    showTitle,
    pageTitle,
    lastDirectionChange,
    isInitialized,
    setScrollPosition,
    setPageTitle: _setPageTitle, // Keep for potential future use
    scrollToTop,
    initialize,
  } = useNavbarStore();

  // 初始化 navbar store
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  const handleScroll = useCallback(
    (_: Event) => {
      setScrollPosition(window.scrollY);
    },
    [setScrollPosition],
  );

  const throttledHandleScroll = useMemo(() => {
    let lastCall = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    const throttled = function (this: Window, _: Event) {
      const now = Date.now();
      const timeSinceLastCall = now - lastCall;

      if (timeSinceLastCall >= THROTTLE_DELAY) {
        lastCall = now;
        handleScroll.call(this, _);
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          lastCall = Date.now();
          handleScroll.call(this, _);
        }, THROTTLE_DELAY - timeSinceLastCall);
      }
    } as ThrottledScrollHandler;

    throttled.cancel = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    return throttled;
  }, [handleScroll]);

  // 检查当前页面是否应该显示页面标题
  const shouldShowPageTitle = useCallback(() => {
    // Since blog and docs pages are removed, no pages should show page title in navbar
    return false;
  }, []);

  // 设置页面标题
  const updatePageTitle = useCallback(() => {
    // Since no pages should show page title, this function does nothing
    // Keeping the structure for potential future use
  }, []);

  // 监听滚动事件
  useEffect(() => {
    if (typeof window === "undefined" || !isInitialized) return;

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      throttledHandleScroll.cancel();
    };
  }, [throttledHandleScroll, isInitialized]);

  // 路径变化时更新标题
  useEffect(() => {
    if (typeof window === "undefined" || !isInitialized) return;
    updatePageTitle();
  }, [updatePageTitle, isInitialized]);

  const showNavMenu = useMemo(() => {
    // Since no pages show page titles anymore, always show navigation menu
    // NAV_ITEMS now contains the links page, so the menu will show navigation items
    return true;
  }, []);

  return {
    direction,
    position,
    showTitle, // 直接使用store中的showTitle状态
    showNavMenu, // 导航菜单显示状态
    pageTitle,
    lastDirectionChange,
    scrollToTop,
    shouldShowPageTitle: shouldShowPageTitle(),
  } as const;
}
