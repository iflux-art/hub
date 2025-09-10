import type { CategoryId, LinksCategory, LinksItem } from "@/features/links/types";

// 定义分类结构，基于实际文件夹结构
const categoryStructure = {
  ai: {
    name: "人工智能",
    children: {
      // 修复文件路径，确保它们与实际文件夹结构匹配
      api: {
        name: "API",
        file: () => safeImport(() => import("@/content/links/category/ai/api.json")),
      },
      chat: {
        name: "聊天",
        file: () => safeImport(() => import("@/content/links/category/ai/chat.json")),
      },
      creative: {
        name: "创意",
        file: () => safeImport(() => import("@/content/links/category/ai/creative.json")),
      },
      models: {
        name: "模型",
        file: () => safeImport(() => import("@/content/links/category/ai/models.json")),
      },
      platforms: {
        name: "平台",
        file: () => safeImport(() => import("@/content/links/category/ai/platforms.json")),
      },
      resources: {
        name: "资源",
        file: () => safeImport(() => import("@/content/links/category/ai/resources.json")),
      },
      services: {
        name: "服务",
        file: () => safeImport(() => import("@/content/links/category/ai/services.json")),
      },
      tools: {
        name: "工具",
        file: () => safeImport(() => import("@/content/links/category/ai/tools.json")),
      },
    },
  },
  audio: {
    name: "音频处理",
    children: {
      daw: {
        name: "数字音频工作站",
        file: () => safeImport(() => import("@/content/links/category/audio/daw.json")),
      },
      distribution: {
        name: "音乐发行",
        file: () => safeImport(() => import("@/content/links/category/audio/distribution.json")),
      },
      processing: {
        name: "音频处理",
        file: () => safeImport(() => import("@/content/links/category/audio/processing.json")),
      },
    },
  },
  design: {
    name: "设计工具",
    children: {
      colors: {
        name: "配色工具",
        file: () => safeImport(() => import("@/content/links/category/design/colors.json")),
      },
      fonts: {
        name: "字体资源",
        file: () => safeImport(() => import("@/content/links/category/design/fonts.json")),
      },
      "image-processing": {
        name: "图像处理",
        file: () =>
          safeImport(() => import("@/content/links/category/design/image-processing.json")),
      },
      tools: {
        name: "设计工具",
        file: () => safeImport(() => import("@/content/links/category/design/tools.json")),
      },
    },
  },
  development: {
    name: "开发工具",
    children: {
      apis: {
        name: "API",
        file: () => safeImport(() => import("@/content/links/category/development/apis.json")),
      },
      cloud: {
        name: "云服务",
        file: () => safeImport(() => import("@/content/links/category/development/cloud.json")),
      },
      containers: {
        name: "容器化",
        file: () =>
          safeImport(() => import("@/content/links/category/development/containers.json")),
      },
      databases: {
        name: "数据库",
        file: () => safeImport(() => import("@/content/links/category/development/databases.json")),
      },
      frameworks: {
        name: "开发框架",
        file: () =>
          safeImport(() => import("@/content/links/category/development/frameworks.json")),
      },
      git: {
        name: "版本控制",
        file: () => safeImport(() => import("@/content/links/category/development/git.json")),
      },
      hosting: {
        name: "托管服务",
        file: () => safeImport(() => import("@/content/links/category/development/hosting.json")),
      },
      monitoring: {
        name: "监控工具",
        file: () =>
          safeImport(() => import("@/content/links/category/development/monitoring.json")),
      },
      security: {
        name: "安全工具",
        file: () => safeImport(() => import("@/content/links/category/development/security.json")),
      },
      tools: {
        name: "开发工具",
        file: () => safeImport(() => import("@/content/links/category/development/tools.json")),
      },
    },
  },
  media: {
    name: "媒体处理",
    children: {
      audio: {
        name: "音频处理",
        file: () => safeImport(() => import("@/content/links/category/media/audio.json")),
      },
    },
  },
  office: {
    name: "办公软件",
    children: {
      documents: {
        name: "文档处理",
        file: () => safeImport(() => import("@/content/links/category/office/documents.json")),
      },
      pdf: {
        name: "PDF 工具",
        file: () => safeImport(() => import("@/content/links/category/office/pdf.json")),
      },
    },
  },
  operation: {
    name: "运营工具",
    children: {
      ecommerce: {
        name: "电商工具",
        file: () => safeImport(() => import("@/content/links/category/operation/ecommerce.json")),
      },
      marketing: {
        name: "营销工具",
        file: () => safeImport(() => import("@/content/links/category/operation/marketing.json")),
      },
    },
  },
  productivity: {
    name: "效率工具",
    children: {
      browsers: {
        name: "浏览器",
        file: () => safeImport(() => import("@/content/links/category/productivity/browsers.json")),
      },
      "cloud-storage": {
        name: "云存储",
        file: () =>
          safeImport(() => import("@/content/links/category/productivity/cloud-storage.json")),
      },
      documents: {
        name: "文档处理",
        file: () =>
          safeImport(() => import("@/content/links/category/productivity/documents.json")),
      },
      email: {
        name: "邮箱服务",
        file: () => safeImport(() => import("@/content/links/category/productivity/email.json")),
      },
      pdf: {
        name: "PDF 工具",
        file: () => safeImport(() => import("@/content/links/category/productivity/pdf.json")),
      },
      search: {
        name: "搜索引擎",
        file: () => safeImport(() => import("@/content/links/category/productivity/search.json")),
      },
      "system-tools": {
        name: "系统工具",
        file: () =>
          safeImport(() => import("@/content/links/category/productivity/system-tools.json")),
      },
    },
  },
  video: {
    name: "视频处理",
    children: {
      editing: {
        name: "视频编辑",
        file: () => safeImport(() => import("@/content/links/category/video/editing.json")),
      },
    },
  },
};

/**
 * 安全导入模块的辅助函数
 */
async function safeImport<T>(importFn: () => Promise<T>): Promise<T | null> {
  try {
    // 添加调试日志
    console.log("尝试导入模块...");
    const result = await importFn();
    console.log("模块导入成功:", result ? "有数据" : "无数据");
    return result;
  } catch (error) {
    // 在开发环境中，Turbopack HMR可能会导致导入失败
    // 我们记录错误但不中断执行
    console.error("Failed to import module:", error);
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to import module, this may be due to Turbopack HMR:", error);
    } else {
      console.error("Failed to import module:", error);
    }
    return null;
  }
}

/**
 * 处理根目录分类文件
 */
async function loadRootCategoryItems(
  categoryId: string,
  categoryInfo:
    | { file: () => Promise<{ default: unknown[] } | null> }
    | { children: Record<string, { file: () => Promise<{ default: unknown[] } | null> }> }
): Promise<LinksItem[]> {
  // 添加类型检查
  if (!("file" in categoryInfo)) {
    return [];
  }

  try {
    const moduleData = await categoryInfo.file();
    if (!moduleData) {
      return [];
    }

    const items = moduleData.default;

    return items.map((item: unknown) => {
      const typedItem = item as Record<string, unknown>;
      return {
        ...(typedItem as unknown as LinksItem),
        category: categoryId as CategoryId,
        iconType: (typedItem.iconType ?? "image") as "image" | "text",
      };
    });
  } catch (error) {
    console.warn(`Failed to load ${categoryId}:`, error);
    return [];
  }
}

/**
 * 处理子分类文件
 */
async function loadSubCategoryItems(
  categoryId: string,
  subCategoryId: string,
  subCategoryInfo: { file: () => Promise<{ default: unknown[] } | null> }
): Promise<LinksItem[]> {
  try {
    const moduleData = await subCategoryInfo.file();
    if (!moduleData) {
      return [];
    }

    const items = moduleData.default;

    return items.map((item: unknown) => {
      const typedItem = item as Record<string, unknown>;
      return {
        ...(typedItem as unknown as LinksItem),
        category: `${categoryId}/${subCategoryId}` as CategoryId,
        iconType: (typedItem.iconType ?? "image") as "image" | "text",
      };
    });
  } catch (error) {
    console.warn(`Failed to load ${categoryId}/${subCategoryId}:`, error);
    return [];
  }
}

/**
 * 处理有子分类的分类目录
 */
async function loadCategoryWithChildren(
  categoryId: string,
  categoryInfo: {
    children: Record<string, { file: () => Promise<{ default: unknown[] } | null> }>;
  }
): Promise<LinksItem[]> {
  const items: LinksItem[] = [];

  for (const [subCategoryId, subCategoryInfo] of Object.entries(categoryInfo.children)) {
    const subItems = await loadSubCategoryItems(categoryId, subCategoryId, subCategoryInfo);
    items.push(...subItems);
  }

  return items;
}

// 添加缓存变量
let cachedLinksData: LinksItem[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

// 为每个分类添加单独的缓存
const categoryCache: Record<string, { data: LinksItem[]; timestamp: number }> = {};

/**
 * 生成缓存键
 */
function generateCacheKey(categoryId?: string): string {
  return categoryId ? `links-category-${categoryId}` : "links-all-data";
}

/**
 * 从localStorage获取缓存数据
 */
function getCachedDataFromStorage(categoryId?: string): LinksItem[] | null {
  try {
    if (typeof window === "undefined") return null; // 服务端不使用localStorage

    const key = generateCacheKey(categoryId);
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    // 检查缓存是否过期
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }

    return data as LinksItem[];
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to get cached data from localStorage:", error);
    }
    return null;
  }
}

/**
 * 将数据存储到localStorage
 */
function setCachedDataToStorage(data: LinksItem[], categoryId?: string): void {
  try {
    if (typeof window === "undefined") return; // 服务端不使用localStorage

    const key = generateCacheKey(categoryId);
    const cacheData = {
      data,
      timestamp: Date.now(),
    };

    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to set cached data to localStorage:", error);
    }
  }
}

/**
 * 清除特定分类的缓存
 */
function clearCategoryCache(categoryId?: string): void {
  try {
    if (typeof window === "undefined") return;

    const key = generateCacheKey(categoryId);
    localStorage.removeItem(key);

    if (categoryId) {
      delete categoryCache[categoryId];
    } else {
      cachedLinksData = null;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to clear cache:", error);
    }
  }
}

/**
 * 预热关键分类的缓存
 */
async function preloadCriticalCategories(): Promise<void> {
  const criticalCategories: (keyof typeof categoryStructure)[] = ["development"];

  for (const categoryId of criticalCategories) {
    try {
      const categoryInfo = categoryStructure[categoryId];
      if (!categoryInfo) continue;

      if ("file" in categoryInfo) {
        // 根目录文件
        const items = await loadRootCategoryItems(categoryId, categoryInfo);
        categoryCache[categoryId] = {
          data: items,
          timestamp: Date.now(),
        };
        setCachedDataToStorage(items, categoryId);
      } else if ("children" in categoryInfo) {
        // 有子分类的目录
        const items = await loadCategoryWithChildren(categoryId, categoryInfo);
        categoryCache[categoryId] = {
          data: items,
          timestamp: Date.now(),
        };
        setCachedDataToStorage(items, categoryId);
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Failed to preload category ${categoryId}:`, error);
      }
    }
  }
}

// 动态导入所有分类数据
async function loadAllLinksData(_cacheKey = ""): Promise<LinksItem[]> {
  console.log("loadAllLinksData 被调用，缓存键:", _cacheKey);

  // 首先尝试从内存缓存获取
  const now = Date.now();
  if (cachedLinksData && now - cacheTimestamp < CACHE_DURATION) {
    console.log("使用内存缓存的数据，条目数:", cachedLinksData.length);
    // 返回去重的数据
    return Array.from(new Map(cachedLinksData.map(item => [item.id, item])).values());
  }

  // 尝试从localStorage获取缓存
  const storageCachedData = getCachedDataFromStorage();
  if (storageCachedData && storageCachedData.length > 0) {
    console.log("使用localStorage缓存的数据，条目数:", storageCachedData.length);
    cachedLinksData = storageCachedData;
    cacheTimestamp = now;
    // 返回去重的数据
    return Array.from(new Map(storageCachedData.map(item => [item.id, item])).values());
  }

  console.log("没有找到缓存数据，开始加载所有链接...");
  const allItems: LinksItem[] = [];

  try {
    // 记录开始加载的分类总数
    console.log("开始加载分类，总分类数:", Object.keys(categoryStructure).length);

    // 遍历所有分类
    for (const [categoryId, categoryInfo] of Object.entries(categoryStructure)) {
      console.log(`处理分类: ${categoryId}`);

      // 检查是否有分类级别的缓存
      const categoryCached = categoryCache[categoryId];
      if (categoryCached && now - categoryCached.timestamp < CACHE_DURATION) {
        console.log(`使用缓存的分类数据: ${categoryId}, 条目数:`, categoryCached.data.length);
        allItems.push(...categoryCached.data);
        continue;
      }

      // 尝试从localStorage获取分类缓存
      const storageCategoryCached = getCachedDataFromStorage(categoryId);
      if (storageCategoryCached && storageCategoryCached.length > 0) {
        console.log(
          `使用localStorage缓存的分类数据: ${categoryId}, 条目数:`,
          storageCategoryCached.length
        );
        categoryCache[categoryId] = {
          data: storageCategoryCached,
          timestamp: now,
        };
        allItems.push(...storageCategoryCached);
        continue;
      }

      if ("file" in categoryInfo) {
        // 根目录文件
        console.log(`加载根目录文件: ${categoryId}`);
        const items = await loadRootCategoryItems(categoryId, categoryInfo);
        console.log(`根目录文件 ${categoryId} 加载完成，条目数:`, items.length);
        allItems.push(...items);
        // 缓存分类数据
        categoryCache[categoryId] = {
          data: items,
          timestamp: now,
        };
        setCachedDataToStorage(items, categoryId);
      } else if ("children" in categoryInfo) {
        // 有子分类的目录
        console.log(
          `加载子分类目录: ${categoryId}, 子分类数:`,
          Object.keys(categoryInfo.children).length
        );
        const items = await loadCategoryWithChildren(categoryId, categoryInfo);
        console.log(`子分类目录 ${categoryId} 加载完成，条目数:`, items.length);
        allItems.push(...items);
        // 缓存分类数据
        categoryCache[categoryId] = {
          data: items,
          timestamp: now,
        };
        setCachedDataToStorage(items, categoryId);
      }
    }

    // 更新全局缓存
    console.log("所有分类加载完成，总条目数:", allItems.length);

    // 去重处理
    const uniqueItems = Array.from(new Map(allItems.map(item => [item.id, item])).values());
    console.log("去重后条目数:", uniqueItems.length);

    cachedLinksData = uniqueItems;
    cacheTimestamp = now;
    setCachedDataToStorage(uniqueItems);

    return uniqueItems;
  } catch (error) {
    console.error("Error loading links data:", error);
    // 即使有错误也返回去重的缓存数据（如果有的话）
    const uniqueCachedData = cachedLinksData
      ? Array.from(new Map(cachedLinksData.map(item => [item.id, item])).values())
      : [];
    return uniqueCachedData;
  }
}

// 生成分类结构数据
function generateCategoriesData(): LinksCategory[] {
  const categories: LinksCategory[] = [];

  for (const [categoryId, categoryInfo] of Object.entries(categoryStructure)) {
    if ("file" in categoryInfo) {
      // 根目录文件作为独立分类
      categories.push({
        id: categoryId as CategoryId,
        name: categoryInfo.name,
        order: categories.length,
      });
    } else if ("children" in categoryInfo) {
      // 有子分类的目录
      const children = Object.entries(categoryInfo.children).map(([subId, subInfo], index) => ({
        id: `${categoryId}/${subId}` as CategoryId,
        name: subInfo.name,
        order: index,
      }));

      categories.push({
        id: categoryId as CategoryId,
        name: categoryInfo.name,
        order: categories.length,
        collapsible: true,
        children,
      });
    }
  }

  return categories;
}

// 添加一个函数来清除所有缓存
function clearAllCaches(): void {
  try {
    if (typeof window === "undefined") return;

    // 清除localStorage中的所有缓存
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith("links-")) {
        localStorage.removeItem(key);
      }
    });

    // 清除内存缓存
    cachedLinksData = null;
    cacheTimestamp = 0;

    // 清除分类缓存
    Object.keys(categoryCache).forEach(key => {
      delete categoryCache[key];
    });

    console.log("所有缓存已清除");
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("清除缓存时出错:", error);
    }
  }
}

export {
  loadAllLinksData,
  generateCategoriesData,
  categoryStructure,
  clearCategoryCache,
  preloadCriticalCategories,
  clearAllCaches, // 导出新函数
};
