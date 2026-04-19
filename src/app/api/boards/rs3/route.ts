import { NextRequest, NextResponse } from "next/server";

import { siteConfig } from "@/content/site";
import { getRs3BoardApiResponse } from "@/lib/rs3-board";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const response = await getRs3BoardApiResponse(siteConfig.runepixelsClanSlug, {
      feed: searchParams.get("feed"),
      range: searchParams.get("range"),
      subject: searchParams.get("subject")
    });

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600"
      }
    });
  } catch {
    return NextResponse.json(
      { error: "RunePixels board data could not be loaded." },
      { status: 500 }
    );
  }
}
