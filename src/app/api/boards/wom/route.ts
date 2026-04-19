import { NextRequest, NextResponse } from "next/server";

import { siteConfig } from "@/content/site";
import { getWomBoardApiResponse } from "@/lib/wom-board";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const response = await getWomBoardApiResponse(siteConfig.womGroupId, {
      metric: searchParams.get("metric"),
      period: searchParams.get("period"),
      board: searchParams.get("board")
    });

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600"
      }
    });
  } catch (error) {
    console.error("WOM board route error", error);
    return NextResponse.json(
      { error: "Wise Old Man board data could not be loaded." },
      { status: 500 }
    );
  }
}
