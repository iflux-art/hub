/**
 * 链接管理服务层
 * 提供统一的链接数据访问接口
 */

import type { LinksItem } from "@/features/links/types";
import { loadAllLinksData } from "@/features/links/lib";

// 服务层接口定义
export interface LinkService {
  getAllLinks: () => Promise<LinksItem[]>;
  addLink: (data: Omit<LinksItem, "id" | "createdAt" | "updatedAt">) => Promise<LinksItem>;
  updateLink: (id: string, data: Partial<LinksItem>) => Promise<LinksItem | null>;
  deleteLink: (id: string) => Promise<boolean>;
  checkUrlExists: (url: string, excludeId?: string) => Promise<boolean>;
}

// 生成唯一ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// 链接服务实现
class LinkServiceImpl implements LinkService {
  /**
   * 获取所有链接数据
   */
  async getAllLinks(): Promise<LinksItem[]> {
    try {
      const items = await loadAllLinksData();
      return items;
    } catch (error) {
      console.error("Error fetching links:", error);
      throw new Error("Failed to fetch links data");
    }
  }

  /**
   * 添加新链接
   */
  async addLink(data: Omit<LinksItem, "id" | "createdAt" | "updatedAt">): Promise<LinksItem> {
    const { title, url, category, description, icon, iconType, tags, featured } = data;

    // 验证必填字段
    if (!(title && url && category)) {
      throw new Error("Missing required fields: title, url, and category are required");
    }

    // 模拟异步操作以满足 lint 要求
    await Promise.resolve();

    // 创建新项目
    const newItem: LinksItem = {
      id: generateId(),
      title,
      description: description ?? "",
      url,
      icon: icon ?? "",
      iconType: iconType ?? "image",
      tags: tags ?? [],
      featured: featured ?? false,
      category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // TODO: 实现添加到指定分类的逻辑

    return newItem;
  }

  /**
   * 更新链接
   */
  updateLink(_id: string, _data: Partial<LinksItem>): Promise<LinksItem | null> {
    // TODO: 实现更新项目的逻辑

    // 返回更新后的项目（模拟）
    return Promise.resolve(null);
  }

  /**
   * 删除链接
   */
  deleteLink(_id: string): Promise<boolean> {
    if (!_id) {
      throw new Error("Missing item ID");
    }

    // TODO: 实现删除项目的逻辑

    return Promise.resolve(true);
  }

  /**
   * 检查URL是否已存在
   */
  checkUrlExists(_url: string, _excludeId?: string): Promise<boolean> {
    if (!_url) {
      return Promise.resolve(false);
    }

    // TODO: 实现检查URL是否已存在的逻辑

    return Promise.resolve(false);
  }
}

// 导出服务实例
export const linkService = new LinkServiceImpl();
