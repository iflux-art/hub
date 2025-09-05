/**
 * 服务端搜索工具函数
 * 仅用于 API routes 和其他服务端环境，不应在客户端导入
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { glob } from "fast-glob";
import type { SearchResult } from "../types";

interface LinkItem {
  title: string;
  description?: string;
  url?: string;
  tags?: string[];
}

// 内存缓存
let contentCache: {
  links: SearchResult[];
  timestamp: number;
} | null = null;

const CACHE_TTL = 5 * 60 * 1000; // 5分钟缓存

/**
 * 扫描链接文件
 */
async function scanLinkFiles(): Promise<SearchResult[]> {
  const linksDir = path.join(process.cwd(), "src/content/links");
  const results: SearchResult[] = [];

  try {
    // 读取根目录下的JSON文件
    const rootFiles = await fs.readdir(linksDir);
    for (const file of rootFiles) {
      if (file.endsWith(".json") && file !== "index.js") {
        const filePath = path.join(linksDir, file);
        const fileContent = await fs.readFile(filePath, "utf8");
        const items: LinkItem[] = JSON.parse(fileContent);

        items.forEach(item => {
          results.push({
            type: "link",
            title: item.title,
            description: item.description,
            url: item.url,
            tags: item.tags,
          });
        });
      }
    }

    // 读取分类目录下的JSON文件
    const categoryDir = path.join(linksDir, "category");
    if (
      await fs
        .stat(categoryDir)
        .then(stat => stat.isDirectory())
        .catch(() => false)
    ) {
      const categoryFiles = await glob("**/*.json", { cwd: categoryDir });
      for (const file of categoryFiles) {
        const filePath = path.join(categoryDir, file);
        const fileContent = await fs.readFile(filePath, "utf8");
        const items: LinkItem[] = JSON.parse(fileContent);

        items.forEach(item => {
          results.push({
            type: "link",
            title: item.title,
            description: item.description,
            url: item.url,
            tags: item.tags,
          });
        });
      }
    }
  } catch (error) {
    console.error("Error scanning link files:", error);
  }

  return results;
}

/**
 * 获取缓存的内容
 */
export async function getCachedContent() {
  const now = Date.now();
  if (contentCache && now - contentCache.timestamp < CACHE_TTL) {
    return contentCache;
  }

  const links = await scanLinkFiles();

  contentCache = { links, timestamp: now };
  return contentCache;
}

/**
 * 执行服务端搜索
 */
export async function performServerSearch(
  query: string,
  type = "all",
  limit = 10
): Promise<{ results: SearchResult[]; total: number }> {
  if (!query.trim()) {
    return { results: [], total: 0 };
  }

  const { links } = await getCachedContent();
  const results: SearchResult[] = [];
  const queryLower = query.toLowerCase();

  // 搜索链接
  if (type === "all" || type === "links") {
    const linkResults = links
      .filter(link => {
        const searchText =
          `${link.title} ${link.description} ${link.tags?.join(" ")}`.toLowerCase();
        return searchText.includes(queryLower);
      })
      .slice(0, limit);
    results.push(...linkResults);
  }

  // 按匹配度排序
  results.sort((a, b) => {
    const aScore = a.title.toLowerCase().includes(queryLower) ? 1 : 0;
    const bScore = b.title.toLowerCase().includes(queryLower) ? 1 : 0;
    return bScore - aScore;
  });

  return {
    results: results.slice(0, limit),
    total: results.length,
  };
}
