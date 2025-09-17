/**
 * 统一错误处理和日志记录工具
 * 提供统一的错误处理、日志记录和错误报告机制
 *
 * 环境变量配置：
 * - SHOW_CONTENT_NOT_FOUND_STACK=true 显示 ContentNotFound 错误的完整堆栈跟踪
 */

export interface ErrorInfo {
  /** 错误类型 */
  type: "ContentNotFound" | "NetworkError" | "ValidationError" | "UnknownError";
  /** 错误消息 */
  message: string;
  /** 错误代码 */
  code?: string;
  /** 上下文信息 */
  context?: Record<string, unknown>;
  /** 原始错误对象 */
  originalError?: unknown;
  /** 发生时间 */
  timestamp?: Date;
}

export interface LogOptions {
  /** 是否在开发环境下输出到控制台 */
  logToConsole?: boolean;
  /** 是否记录到外部日志服务 */
  logToService?: boolean;
  /** 是否包含堆栈信息 */
  includeStack?: boolean;
}

/**
 * 错误分类器 - 根据错误内容自动分类
 */
export function classifyError(error: unknown): ErrorInfo["type"] {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes("not found") || message.includes("404")) {
      return "ContentNotFound";
    }

    if (
      message.includes("network") ||
      message.includes("fetch") ||
      message.includes("timeout")
    ) {
      return "NetworkError";
    }

    if (message.includes("validation") || message.includes("invalid")) {
      return "ValidationError";
    }
  }

  return "UnknownError";
}

/**
 * 构建基础日志消息
 */
function buildLogMessage(errorInfo: ErrorInfo) {
  return {
    ...errorInfo,
    timestamp: errorInfo.timestamp || new Date(),
    environment: process.env.NODE_ENV,
    userAgent:
      typeof window !== "undefined" ? window.navigator.userAgent : "server",
  };
}

/**
 * 输出开发环境的基础错误信息
 */
function logDevelopmentError(errorInfo: ErrorInfo): void {
  // 为 ContentNotFound 提供更友好的输出格式
  if (errorInfo.type === "ContentNotFound") {
    console.warn(`📝 ${errorInfo.type}: ${errorInfo.message}`);
    console.warn("ℹ️ 这是一个预期的错误，用户访问了不存在的内容");
  } else {
    console.error(`🚨 ${errorInfo.type}: ${errorInfo.message}`);
  }

  // 输出详细信息
  console.error("ℹ️ Error Details:", {
    type: errorInfo.type,
    message: errorInfo.message,
    code: errorInfo.code,
    timestamp: errorInfo.timestamp || new Date(),
    environment: process.env.NODE_ENV,
  });
}

/**
 * 输出上下文信息
 */
function logContextInfo(errorInfo: ErrorInfo): void {
  if (errorInfo.context && Object.keys(errorInfo.context).length > 0) {
    console.error("🔍 Context:", errorInfo.context);
  }
}

/**
 * 输出ContentNotFound错误的堆栈信息
 */
function logContentNotFoundStack(errorInfo: ErrorInfo): void {
  if (!(errorInfo.originalError instanceof Error)) {
    return;
  }

  // 为 ContentNotFound 提供更有用的调试信息
  console.error("📚 错误来源:", {
    message: errorInfo.originalError.message,
    requestedContent: errorInfo.context?.contentId,
    contentType: errorInfo.context?.contentType,
  });

  // 可选显示堆栈（通常不需要）
  if (process.env.SHOW_CONTENT_NOT_FOUND_STACK === "true") {
    console.error("📚 Stack Trace (Info):", errorInfo.originalError.stack);
  }
}

/**
 * 输出其他错误类型的堆栈信息
 */
function logOtherErrorStack(errorInfo: ErrorInfo): void {
  if (errorInfo.originalError instanceof Error) {
    console.error("📚 Stack Trace:", errorInfo.originalError.stack);
  }
}

/**
 * 处理开发环境堆栈信息输出
 */
function logDevelopmentStack(
  errorInfo: ErrorInfo,
  includeStack: boolean,
): void {
  if (!(includeStack && errorInfo.originalError instanceof Error)) {
    return;
  }

  if (errorInfo.type === "ContentNotFound") {
    logContentNotFoundStack(errorInfo);
  } else {
    logOtherErrorStack(errorInfo);
  }
}

/**
 * 处理开发环境日志输出
 */
function logDevelopmentOutput(
  errorInfo: ErrorInfo,
  includeStack: boolean,
): void {
  logDevelopmentError(errorInfo);
  logContextInfo(errorInfo);
  logDevelopmentStack(errorInfo, includeStack);
}

/**
 * 处理生产环境日志输出
 */
function logProductionOutput(
  errorInfo: ErrorInfo,
  logMessage: ReturnType<typeof buildLogMessage>,
): void {
  console.error(`[${errorInfo.type}] ${errorInfo.message}`, {
    code: errorInfo.code,
    timestamp: logMessage.timestamp,
  });
}

/**
 * 处理外部日志服务
 */
function logToExternalService(_errorInfo: ErrorInfo): void {
  // TODO: 未来可以集成外部日志服务如 Sentry、LogRocket 等
  // 例如: Sentry.captureException(_errorInfo.originalError, { extra: _errorInfo });
}

/**
 * 统一错误日志记录
 */
export function logError(errorInfo: ErrorInfo, options: LogOptions = {}): void {
  const {
    logToConsole = true,
    logToService = false,
    includeStack = process.env.NODE_ENV === "development",
  } = options;

  // 构建日志消息
  const logMessage = buildLogMessage(errorInfo);

  // 开发环境控制台输出
  if (logToConsole && process.env.NODE_ENV === "development") {
    logDevelopmentOutput(errorInfo, includeStack);
  }

  // 生产环境简化日志
  if (logToConsole && process.env.NODE_ENV === "production") {
    logProductionOutput(errorInfo, logMessage);
  }

  // 记录到外部服务
  if (logToService) {
    logToExternalService(errorInfo);
  }
}
