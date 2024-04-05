import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { DecodedToken } from "@/app/types";
import jwt from "jsonwebtoken";
import { verifyToken } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  const result = await prisma.pet.findFirst({
    where: {
      id,
    },
  });

  return NextResponse.json(result);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  const headers = await request.headers;

  const jwtTokenPayload: DecodedToken = verifyToken(
    headers.get("Authorization") as string
  ) as DecodedToken;

  if (!jwtTokenPayload) {
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  }

  const result = await prisma.pet.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ result });
}

export async function PUT(request: Request) {
  const headers = await request.headers;
  const reqBody = await request.json();

  const jwtTokenPayload: DecodedToken = verifyToken(
    headers.get("Authorization") as string
  ) as DecodedToken;

  if (!jwtTokenPayload) {
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  }

  const updatedPet = await prisma.pet.update({
    where: {
      id: reqBody.id,
    },
    data: { ...reqBody, userId: jwtTokenPayload.id },
  });

  return NextResponse.json(updatedPet);
}
