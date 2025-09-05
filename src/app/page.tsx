import type { Metadata } from "next";
import { LINKS_PAGE_METADATA } from "@/config";
import { LinksPageContainer } from "@/features/links/components";

/**
 * 首页元数据
 * 使用链接页面的元数据
 */
export const metadata: Metadata = LINKS_PAGE_METADATA;

/**
 * 首页组件
 * 直接渲染链接页面内容，而不是重定向到登录页面
 */
export default function Home() {
  return <LinksPageContainer />;
}
