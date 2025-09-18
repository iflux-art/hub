"use client";

import dynamicImport from "next/dynamic";
import { PageContainer } from "@/components/layout";

// 使用动态导入来加载网址管理页面组件
const LinksAdminComponent = dynamicImport(
  () => import("@/features/admin/components").then((mod) => mod.LinksAdminPage),
  {
    ssr: false, // 管理页面不需要服务端渲染
  },
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
