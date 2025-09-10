/**
 * 页面元数据配置
 *
 * 集中管理各个页面的元数据配置，便于统一维护和更新
 */

import type { Metadata } from "next";

/**
 * 链接页面元数据配置
 */
export const LINKS_PAGE_METADATA: Metadata = {
  title: "网址导航",
  description: "收集整理各类优质网站资源，方便快速访问",
  openGraph: {
    title: "网址导航",
    description: "收集整理各类优质网站资源，方便快速访问",
    type: "website",
  },
};

/**
 * 页面元数据配置映射
 */
export const PAGE_METADATA_MAP = {
  links: LINKS_PAGE_METADATA,
};
