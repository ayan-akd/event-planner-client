
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices.ts";
import { TUserRole } from "./types/user.types.js";


const authRoutes = ["/login"];

const sharedRoutes = [/^\/dashboard\/profile/];

const roleBasedPrivateRoutes = {
  USER: [/^\/dashboard\/user/],
  ADMIN: [/^\/dashboard\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(
        `/login?redirectPath=${pathname}`,
        request.url
      )
    );
  }

  if (sharedRoutes.some(route => pathname.match(route))) {
    return NextResponse.next();
  }
  
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as TUserRole]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as TUserRole];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
