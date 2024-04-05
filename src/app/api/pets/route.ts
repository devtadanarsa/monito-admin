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

  const newPet = await prisma.pet.create({
    data: { ...reqBody, userId: jwtTokenPayload.id },
  });

  return NextResponse.json(newPet, { status: 201 });
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

  let orderBy: any[] = [{ publishedDate: "asc" }];
  const sortedByParams = request.nextUrl.searchParams.get("sortedBy");
  const nameParams = request.nextUrl.searchParams.get("name") ?? "";
  const pageParams = request.nextUrl.searchParams.get("page") ?? 1;
  const orderRuleParams = request.nextUrl.searchParams.get("order") ?? "asc";
  const skip = nameParams.length == 0 ? ((pageParams as number) - 1) * 5 : 0;

  switch (sortedByParams) {
    case "date":
      orderBy = [{ publishedDate: orderRuleParams }];
      break;
    case "name":
      orderBy = [{ name: orderRuleParams }];
      break;
    case "price":
      orderBy = [{ price: orderRuleParams }];
      break;
  }

  const totalResult = await prisma.pet.count();

  const result = await prisma.pet.findMany({
    skip,
    take: 5,
    where: {
      name: {
        contains: nameParams,
      },
      userId: {
        equals: jwtTokenPayload.id,
      },
    },
    orderBy,
  });

  return NextResponse.json({ data: result, total: totalResult });
}
