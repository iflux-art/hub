import type { ReactNode } from "react";
import type { LinksItem } from "@/features/links/types";

/**
 * 链接表单数据
 */
export interface LinksFormData {
  /** 标题 */
  title: string;
  /** 描述 */
  description: string;
  /** URL */
  url: string;
  /** 分类ID */
  category: string;
  /** 标签 */
  tags: string[];
}

/**
 * 添加对话框 Props
 */
export interface AddDialogProps {
  /** 是否打开 */
  open: boolean;
  /** 打开状态变化回调 */
  onOpenChange: (open: boolean) => void;
  /** 成功回调 */
  onSuccess: (item: LinksItem) => void;
  /** 错误回调 */
  onError: (error: string) => void;
}

/**
 * 编辑对话框 Props
 */
export interface EditDialogProps {
  /** 是否打开 */
  open: boolean;
  /** 要编辑的项 */
  item: LinksItem | null;
  /** 打开状态变化回调 */
  onOpenChange: (open: boolean) => void;
  /** 成功回调 */
  onSuccess: () => void;
  /** 错误回调 */
  onError: (error: string) => void;
}

/**
 * 删除对话框 Props
 */
export interface DeleteDialogProps {
  /** 要删除的项 */
  item: LinksItem | null;
  /** 打开状态变化回调 */
  onOpenChange: (open: boolean) => void;
  /** 成功回调 */
  onSuccess: () => void;
  /** 错误回调 */
  onError: (error: string) => void;
}

/**
 * 管理操作项
 */
export interface AdminAction {
  /** 操作标签 */
  label: string;
  /** 操作图标 */
  icon?: React.ComponentType<{ className?: string }>;
  /** 点击事件处理函数 */
  onClick: () => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否正在加载 */
  loading?: boolean;
  /** 按钮变体 */
  variant?: "default" | "outline" | "ghost" | "destructive";
}

/**
 * 数据表格列配置
 */
export interface DataTableColumn<T> {
  /** 列对应的键 */
  key: keyof T;
  /** 列标题 */
  title: string;
  /** 列宽度 */
  width?: string | number;
  /** 文本对齐方式 */
  align?: "left" | "center" | "right";
  /** 自定义渲染函数 */
  render?: (value: unknown, record: T, index: number) => ReactNode;
}

/**
 * 数据表格操作项
 */
export interface DataTableAction<T> {
  /** 操作标签 */
  label: string;
  /** 操作图标 */
  icon?: React.ComponentType<{ className?: string }>;
  /** 点击事件处理函数 */
  onClick: (record: T, index: number) => void;
  /** 是否禁用 */
  disabled?: (record: T) => boolean;
  /** 按钮变体 */
  variant?: "default" | "outline" | "ghost" | "destructive";
}

/**
 * 数据表格分页配置
 */
export interface DataTablePagination {
  /** 当前页码 */
  current: number;
  /** 每页条数 */
  pageSize: number;
  /** 总条数 */
  total: number;
  /** 页码变化回调 */
  onChange: (page: number) => void;
}

/**
 * 数据表格 Props
 */
export interface DataTableProps<T> {
  /** 表格标题 */
  title?: string;
  /** 表格数据 */
  data: T[];
  /** 列配置 */
  columns: DataTableColumn<T>[];
  /** 操作项 */
  actions?: DataTableAction<T>[];
  /** 分页配置 */
  pagination?: DataTablePagination;
  /** 自定义类名 */
  className?: string;
}
