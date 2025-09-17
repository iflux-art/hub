/**
 * 组件库统一导出
 * 按功能模块组织导出，便于按需导入
 */

// 按钮组件
export { GitHubButton } from "./button";

// 底栏组件
export { Footer } from "./footer";
// 类型导出
export type { PageContainerProps } from "./layout";
// 布局组件
export {
  PageContainer,
  // ProgressBarLoading 组件已合并到全局loading页面，不再导出
  // NotFound 组件已合并到全局404页面，不再导出
} from "./layout";
// UI 组件
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  BackButton,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Switch,
} from "./ui";
