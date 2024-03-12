import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { log } from "console";
import { NextApiRequest } from "next";

export async function POST(request: Request) {
  const reqBody = await request.json();

  const newPet = await prisma.pet.create({
    data: reqBody,
  });

  return NextResponse.json(newPet, { status: 201 });
}

export async function GET(request: NextRequest) {
  let orderBy: any[] = [{ publishedDate: "asc" }];
  const sortedBy = request.nextUrl.searchParams.get("sortedBy");

  switch (sortedBy) {
    case "date":
      orderBy = [{ publishedDate: "asc" }];
      break;
    case "name":
      orderBy = [{ name: "asc" }];
      break;
    case "price":
      orderBy = [{ price: "asc" }];
      break;
  }

  const result = await prisma.pet.findMany({
    orderBy,
  });

  return NextResponse.json(result);
}
