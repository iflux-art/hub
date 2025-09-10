import "./globals.css";
import { Footer } from "@/components/layout";
import { MainNavbar } from "@/features/navbar/components/main-navbar";
import { ThemeProvider } from "@/features/theme";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

/**
 * 导入集中管理的元数据配置
 * Next.js要求这些配置必须从layout.tsx中导出，这是一个约定
 * 1. 先从配置文件导入 - 便于集中管理和复用
 * 2. 然后再导出 - 满足Next.js的约定要求
 */
import { generateMetadata, generateViewport } from "@/lib/metadata";

// 导出元数据配置 - Next.js会在构建时处理这些导出
export const metadata = generateMetadata();
export const viewport = generateViewport();

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <ClerkProvider>
    <html
      lang="zh-CN"
      // 禁用hydration warning提示 - next-themes要求
      suppressHydrationWarning
    >
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* 页面主体布局容器 */}
          <div className="flex flex-col">
            <MainNavbar className="flex-shrink-0" />
            {/* 主内容区域 */}
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
