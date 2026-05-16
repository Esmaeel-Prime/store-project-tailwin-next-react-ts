// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.pathname;
  const token = req.cookies.get("auth")?.value;

  // No token and not on login page
  if (!token && path !== "/login") {
    return NextResponse.redirect(new URL("/login?mode=signin", req.url));
  }

  // Have token - verify without database
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jose.jwtVerify(token, secret);

      // Handle redirects in middleware
      if (path === "/login") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      if (path === "/dashboard" && !payload.isAdmin) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Pass user info to the request
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-email", payload.email as string);
      requestHeaders.set("x-user-isAdmin", String(payload.isAdmin || false));

      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    } catch (error) {
      // Invalid token
      const response = NextResponse.redirect(
        new URL("/login?mode=signup", req.url),
      );
      response.cookies.delete("auth");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/account", "/dashboard", "/account/pm"],
};
