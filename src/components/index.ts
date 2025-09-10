/**
 * 组件库统一导出
 * 按功能模块组织导出，便于按需导入
 */

// 布局组件
export {
  PageContainer,
  // ProgressBarLoading 组件已合并到全局loading页面，不再导出
  // NotFound 组件已合并到全局404页面，不再导出
} from "./layout";

// 底栏组件
export { Footer } from "./footer";

// 按钮组件
export { GitHubButton } from "./button";

// UI 组件
export {
  BackButton,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
  Switch,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui";

// 类型导出
export type { PageContainerProps } from "./layout";
