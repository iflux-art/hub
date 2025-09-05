/**
 * API工具模块导出
 */

// 从 api-middleware 导出
export type { MiddlewareResult } from "./api-middleware";
export { withCORS } from "./api-middleware";

// 从 api-paths 导出
export {
  CONTENT_API_PATHS,
  SEARCH_API_PATHS,
} from "./api-paths";

// 从 api-utils 导出
export type {
  ApiErrorType,
  ApiErrorResponse,
  ApiSuccessResponse,
  CacheConfig,
} from "./api-utils";
export {
  createApiError,
  createApiSuccess,
  ApiErrors,
} from "./api-utils";

// 从 api-client 导出
export type { ApiResponse } from "./api-client";
export {
  apiRequest,
  get,
  post,
  put,
  del,
} from "./api-client";
