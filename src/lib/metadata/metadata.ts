/**
 * 元数据生成工具
 * 集中管理网站的元数据生成逻辑，包括SEO、OpenGraph、Twitter Cards等
 */

import type { Metadata, Viewport } from "next";
import { SITE_METADATA, VIEWPORT_CONFIG } from "@/config/metadata";

/**
 * 生成视口配置
 */
export function generateViewport(): Viewport {
  return VIEWPORT_CONFIG;
}

/**
 * 创建 robots 配置
 */
function createRobotsConfig(noindex: boolean, nofollow: boolean) {
  return {
    index: !noindex,
    follow: !nofollow,
    googleBot: {
      index: !noindex,
      follow: !nofollow,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  };
}

/**
 * 创建 Open Graph 配置
 */
function createOpenGraphConfig(options: {
  title: string | undefined;
  description: string;
  type: "website" | "article";
  url: string | undefined;
  image: string | undefined;
  publishedTime: string | undefined;
  modifiedTime: string | undefined;
}) {
  const { title, description, type, url, image, publishedTime, modifiedTime } = options;

  return {
    title: title ?? SITE_METADATA.title,
    description,
    type,
    url,
    images: image ? [{ url: image }] : undefined,
    publishedTime,
    modifiedTime,
    siteName: SITE_METADATA.title,
  };
}

/**
 * 创建 Twitter Cards 配置
 */
function createTwitterConfig(options: {
  title: string | undefined;
  description: string;
  image: string | undefined;
}) {
  const { title, description, image } = options;

  return {
    title: title ?? SITE_METADATA.title,
    description,
    images: image ? [{ url: image }] : undefined,
    card: "summary_large_image",
    site: SITE_METADATA.twitter,
  };
}

/**
 * 添加 JSON-LD 结构化数据到元数据
 */
function addJsonLdToMetadata(metadata: Metadata, jsonLd: Record<string, string | undefined>) {
  if (!jsonLd) return;

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": jsonLd.type,
    name: jsonLd.name,
    description: jsonLd.description,
    url: jsonLd.url,
    image: jsonLd.image,
    author: jsonLd.author
      ? {
          "@type": "Person",
          name: jsonLd.author,
        }
      : undefined,
    datePublished: jsonLd.datePublished,
    dateModified: jsonLd.dateModified,
    ...jsonLd,
  };

  // 创建一个新的对象来避免类型冲突
  const otherData: Record<string, string> = {};
  otherData["application/ld+json"] = JSON.stringify(jsonLdData);

  metadata.other = {
    ...metadata.other,
    ...otherData,
  };
}

/**
 * 更新社交媒体元数据
 */
function updateSocialMetadata(metadata: Metadata, social: GenerateMetadataOptions["social"]) {
  if (!social) return;

  if (social.twitter && metadata.twitter) {
    metadata.twitter = {
      ...metadata.twitter,
      site: social.twitter,
    };
  }

  if (social.facebook && metadata.openGraph) {
    metadata.openGraph = {
      ...metadata.openGraph,
      siteName: social.facebook,
    };
  }
}

/**
 * 生成基础元数据
 */
export function generateMetadata(options: GenerateMetadataOptions = {}): Metadata {
  const {
    title,
    description = SITE_METADATA.description,
    keywords = SITE_METADATA.keywords,
    author = SITE_METADATA.author,
    type = "website",
    date: publishedTime,
    modified: modifiedTime,
    image,
    url,
    noindex = false,
    nofollow = false,
    icons,
    verification,
    jsonLd,
    social,
  } = options;

  // 基础元数据
  const metadata: Metadata = {
    title: title ? `${title} | ${SITE_METADATA.title}` : SITE_METADATA.title,
    description,
    keywords: keywords.join(", "),
    authors: author ? [{ name: author }] : undefined,
    creator: author,
    publisher: SITE_METADATA.title,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_METADATA.url),
    alternates: {
      canonical: url,
    },
    verification,
    icons,
    robots: createRobotsConfig(noindex, nofollow),
    openGraph: createOpenGraphConfig({
      title,
      description,
      type,
      url,
      image,
      publishedTime,
      modifiedTime,
    }),
    twitter: createTwitterConfig({
      title,
      description,
      image,
    }),
  };

  // 添加 JSON-LD 结构化数据
  if (jsonLd) {
    addJsonLdToMetadata(metadata, jsonLd);
  }

  // 处理社交媒体配置
  if (social) {
    updateSocialMetadata(metadata, social);
  }

  // 过滤掉 undefined 值
  return filterUndefinedValues(metadata as Record<string, unknown>);
}

/**
 * 生成文章类型的元数据
 */
export function generateArticleMetadata(options: Omit<GenerateMetadataOptions, "type">): Metadata {
  return generateMetadata({ ...options, type: "article" });
}

/**
 * 过滤掉 undefined 值的辅助函数
 */
function filterUndefinedValues(obj: Record<string, unknown>): Record<string, unknown> {
  const filtered: Record<string, unknown> = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key) && obj[key] !== undefined) {
      filtered[key] = obj[key];
    }
  }
  return filtered;
}

// 类型定义
interface IconConfig {
  icon?: string;
  shortcut?: string;
  apple?: string;
  mask?: string;
  manifest?: string;
}

interface VerificationConfig {
  google?: string;
  yandex?: string;
  yahoo?: string;
  other?: Record<string, string[]>;
}

interface JsonLdConfig {
  type: string;
  name?: string;
  description?: string;
  url?: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  [key: string]: string | undefined;
}

interface SocialConfig {
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
}

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  author?: string;
  date?: string;
  modified?: string;
  locale?: string;
  url?: string;
  noindex?: boolean;
  nofollow?: boolean;
  icons?: IconConfig;
  verification?: VerificationConfig;
  jsonLd?: JsonLdConfig;
  social?: SocialConfig;
}
