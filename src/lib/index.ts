/**
 * 工具函数统一导出
 * 整合所有通用工具函数，避免重复实现
 */

// ==================== 元数据和SEO工具函数 ====================
export {
  generateViewport,
  generateMetadata,
  generateArticleMetadata,
} from "./metadata/metadata";
export { generateSEOMetadata } from "./metadata/seo-utils"; // 基础元数据生成函数和SEO工具函数

// ==================== API工具函数 ====================
// 从 api-utils 导出
export type {
  ApiErrorType,
  ApiErrorResponse,
  ApiSuccessResponse,
  CacheConfig,
} from "./api/api-utils";
export {
  createApiError,
  createApiSuccess,
  ApiErrors,
} from "./api/api-utils";

// 从 api-middleware 导出
export type { MiddlewareResult } from "./api/api-middleware";
export { withCORS } from "./api/api-middleware";

// 从 api-paths 导出
export {
  CONTENT_API_PATHS,
  SEARCH_API_PATHS,
} from "./api/api-paths";

// ==================== 验证工具函数 ====================
export {
  isValidUrl,
  normalizeUrl,
  validateRequiredFields,
  validatePageParams,
  safeJsonParse,
  validateStringLength,
  validateArrayLength,
  isValidCategory,
} from "@/utils/validation";
