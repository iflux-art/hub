"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import type { AdminAction } from "@/features/admin/types";

export interface AdminActionsProps {
  actions: (Omit<AdminAction, "icon"> & {
    icon?: React.ComponentType<{ className?: string }>;
    key?: string;
  })[];
  className?: string;
}

export const AdminActions = ({
  actions,
  className = "",
}: AdminActionsProps) => (
  <div className={`flex flex-wrap gap-2 ${className}`}>
    {actions.map((action, index) => {
      const IconComponent = action.icon;
      // 使用 action.key 或 index 作为 key，如果都没有则生成唯一 key
      const key = action.key || `${action.label}-${index}`;
      return (
        <Button
          key={key}
          variant={action.variant ?? "default"}
          onClick={action.onClick}
          disabled={action.disabled ?? action.loading}
          className="flex items-center gap-2"
          type="button"
        >
          {action.loading ? (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            IconComponent && <IconComponent className="h-4 w-4" />
          )}
          {action.label}
        </Button>
      );
    })}
  </div>
);
