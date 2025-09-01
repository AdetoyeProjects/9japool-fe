import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""
  const url = request.nextUrl.clone()

  // Extract subdomain
  const subdomain = hostname.split(".")[0]

  // Handle subdomain routing
  if (subdomain && subdomain !== "www" && !hostname.includes("localhost") && !hostname.includes("127.0.0.1")) {
    // Rewrite subdomain.domain.com to /[subdomain]
    url.pathname = `/${subdomain}${url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
