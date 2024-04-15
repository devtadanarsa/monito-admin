import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { DecodedToken } from "@/app/types";
import { verifyToken } from "@/lib/utils";

export async function POST(request: Request) {
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

  const newPost = await prisma.post.create({
    data: reqBody,
  });

  return NextResponse.json(newPost, { status: 201 });
}

export async function GET(request: NextRequest) {
  const headers = await request.headers;
  let jwtTokenPayload: DecodedToken;

  try {
    jwtTokenPayload = verifyToken(
      headers.get("Authorization") as string
    ) as DecodedToken;
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  }

  const totalResult = await prisma.post.count();

  const result = await prisma.post.findMany();

  return NextResponse.json({ data: result, total: totalResult });
}
