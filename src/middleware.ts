import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl; // Extract the pathname directly
  console.log(" ○ Requested route: ", pathname);

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (pathname === "/home") {
    return NextResponse.redirect(new URL("/home/user-management", request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/home/:project*/:building*"],
};
