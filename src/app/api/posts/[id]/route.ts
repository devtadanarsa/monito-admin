import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { DecodedToken } from "@/app/types";
import { verifyToken } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  const result = await prisma.post.findFirst({
    where: {
      id,
    },
  });

  return NextResponse.json(result);
}

export async function PUT(request: Request) {
  const headers = await request.headers;
  const reqBody = await request.json();
  let jwtTokenPayload: DecodedToken;

  try {
    jwtTokenPayload = verifyToken(
      headers.get("Authorization") as string
    ) as DecodedToken;
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: reqBody.id,
    },
    data: reqBody,
  });

  return NextResponse.json(updatedPost);
}
