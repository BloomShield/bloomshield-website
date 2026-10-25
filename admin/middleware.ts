import { NextResponse } from "next/server";
import { previewAllowed } from "./lib/model";
import { stagingAllowed } from "./lib/staging";

// Reject before rendering/streaming: notFound() alone can emit a streamed 200.
export function middleware() {
  if (!previewAllowed(process.env) && !stagingAllowed()) {
    return new NextResponse("Workspace unavailable", {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "no-referrer",
      },
    });
  }
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}

export const config = { matcher: ["/:path*"] };
