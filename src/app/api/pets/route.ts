import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { log } from "console";
import { NextApiRequest } from "next";
import capitalize from "capitalize";

export async function POST(request: Request) {
  const reqBody = await request.json();

  const newPet = await prisma.pet.create({
    data: reqBody,
  });

  return NextResponse.json(newPet, { status: 201 });
}

export async function GET(request: NextRequest) {
  let orderBy: any[] = [{ publishedDate: "asc" }];
  const sortedByParams = request.nextUrl.searchParams.get("sortedBy");
  const nameParams = request.nextUrl.searchParams.get("name") ?? "";
  console.log(request.nextUrl);

  switch (sortedByParams) {
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
    where: {
      name: {
        contains: nameParams,
      },
    },
    orderBy,
  });

  return NextResponse.json(result);
}
