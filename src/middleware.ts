import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 定义需要保护的路由
const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

/**
 * 中间件
 */
export default clerkMiddleware(async (_auth, request) => {
  // 保护管理员路由
  if (isProtectedRoute(request)) {
    await _auth.protect();
  }

  const response = NextResponse.next();

  // 设置基本的安全头
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)", "/api/:path*"],
};
