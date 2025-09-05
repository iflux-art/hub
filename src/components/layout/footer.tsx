"use client";

import { GitHubButton } from "@/components/button";
import { AuthButtons } from "@/features/auth/components/auth-buttons";
import { cn } from "@/utils";

/**
 * 底栏组件
 * 版权信息左对齐，右侧显示登录和GitHub按钮
 */
export const Footer = () => (
  <footer className={cn("w-full py-4 md:py-6", "border-t border-border/30", "bg-transparent")}>
    <div className="container mx-auto flex items-center justify-between px-4">
      <div className="text-sm text-muted-foreground">© 2025 iFluxArt 保留所有权利</div>
      <div className="flex items-center gap-1">
        <AuthButtons />
        <GitHubButton />
      </div>
    </div>
  </footer>
);
