/**
 * API缓存工具函数
 * 提供统一的缓存控制策略
 */

// 缓存配置常量
export const CACHE_CONFIG = {
  // 静态内容缓存时间（毫秒）
  static: 24 * 60 * 60 * 1000, // 24小时

  // 半静态内容缓存时间（毫秒）
  semiStatic: 5 * 60 * 1000, // 5分钟

  // 动态内容缓存时间（毫秒）
  dynamic: 30 * 1000, // 30秒

  // 不缓存
  noCache: 0,
} as const;

// 缓存策略类型
export type CacheStrategy = keyof typeof CACHE_CONFIG;

/**
 * 为API响应设置缓存头
 *
 * @param strategy - 缓存策略
 * @param isPublic - 是否允许CDN缓存
 * @returns Headers对象
 */
export function setCacheHeaders(
  strategy: CacheStrategy,
  isPublic = true,
): Headers {
  const headers = new Headers();

  const maxAge = CACHE_CONFIG[strategy] / 1000; // 转换为秒

  if (maxAge === 0) {
    headers.set("Cache-Control", "no-store, max-age=0");
  } else {
    const directives = [
      isPublic ? "public" : "private",
      `max-age=${maxAge}`,
      `s-maxage=${Math.floor(maxAge * 2)}`, // CDN缓存时间是浏览器的2倍
      `stale-while-revalidate=${Math.floor(maxAge * 10)}`, // 允许在后台重新验证时使用陈旧数据
    ];

    headers.set("Cache-Control", directives.join(", "));
  }

  return headers;
}
