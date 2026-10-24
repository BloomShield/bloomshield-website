import { NextResponse } from "next/server";
import { previewAllowed } from "./lib/model";

// Reject before rendering/streaming: notFound() alone can emit a streamed 200.
export function middleware() {
  if (!previewAllowed(process.env)) {
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
  return NextResponse.next();
}

export const config = { matcher: ["/:path*"] };
