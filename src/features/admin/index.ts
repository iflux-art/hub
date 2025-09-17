/**
 * Admin 功能模块统一导出
 */

// 组件导出
export {
  AddDialog,
  AdminActions,
  AdminLayout,
  DeleteDialog,
  EditDialog,
  LinksAdminPage,
} from "./components";
// Hooks 导出
export { useDebouncedValue } from "./hooks/use-debounced-value";
// 类型导出
export type {
  AddDialogProps,
  AdminAction,
  DataTableAction,
  DataTableColumn,
  DataTablePagination,
  DataTableProps,
  DeleteDialogProps,
  EditDialogProps,
  LinksFormData,
} from "./types";
