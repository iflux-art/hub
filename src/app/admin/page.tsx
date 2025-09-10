"use client";

import { PageContainer } from "@/components/layout";
import dynamicImport from "next/dynamic";
import { useEffect, useState } from "react";

// 进度条加载组件（内联实现）
const ProgressBarLoading = () => {
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(0.8);

  useEffect(() => {
    // 进度条动画
    const initialProgress = setTimeout(() => {
      setProgress(30);
    }, 100);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        const increment = Math.max(0.5, (100 - prev) / 15);
        return Math.min(90, prev + increment);
      });
    }, 300);

    const opacityInterval = setInterval(() => {
      setOpacity(prev => (prev === 0.8 ? 1 : 0.8));
    }, 800);

    return () => {
      clearTimeout(initialProgress);
      clearInterval(progressInterval);
      clearInterval(opacityInterval);
    };
  }, []);

  // 显示进度条
  return (
    <div className="fixed top-16 right-0 left-0 z-50">
      <div className="h-1 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
        <div
          className="h-full bg-primary dark:bg-primary"
          style={{
            width: `${progress}%`,
            opacity,
            transition: "width 300ms ease-out",
            transform: "translateZ(0)",
            boxShadow: "0 0 12px color-mix(in srgb, var(--color-primary) 70%, transparent)",
          }}
        />
      </div>
    </div>
  );
};

// 使用动态导入来加载网址管理页面组件
const LinksAdminComponent = dynamicImport(
  () => import("@/features/admin/components").then(mod => mod.LinksAdminPage),
  {
    ssr: false, // 管理页面不需要服务端渲染
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <ProgressBarLoading />
      </div>
    ),
  }
);

/**
 * 管理后台主入口
 * 直接显示链接管理界面，使用全宽布局
 */
export default function AdminPage() {
  return (
    <PageContainer config={{ layout: "full-width" }}>
      <div className="mt-4">
        {/* 管理内容 */}
        <LinksAdminComponent />
      </div>
    </PageContainer>
  );
}
