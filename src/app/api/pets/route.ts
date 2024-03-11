import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(request: Request) {
  const reqBody = await request.json();

  const newPet = await prisma.pet.create({
    data: reqBody,
  });

  return NextResponse.json(newPet, { status: 201 });
}

export async function GET(request: Request) {
  const result = await prisma.pet.findMany();

  return NextResponse.json(result);
}
