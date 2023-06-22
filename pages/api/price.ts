import { fetchPriceFromBinance } from "@/lib/api";
import type { NextRequest, NextResponse } from "next/server";
export const config = {
  runtime: "edge",
};

type PriceData = {
  latest: string;
};

export default async function handler(
  req: NextRequest,
  res: NextResponse<PriceData>
) {
  const { searchParams } = new URL(req.url);
  const { latest } = await fetchPriceFromBinance({
    symbol: searchParams.get("symbol") || "ETHUSDC",
    limit: parseInt(searchParams.get("limit") || "1"),
  });

  return new Response(
    JSON.stringify({
      latest,
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
