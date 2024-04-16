import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  const result = await prisma.post.findFirst({
    where: {
      id,
    },
  });

  return NextResponse.json(result);
}
