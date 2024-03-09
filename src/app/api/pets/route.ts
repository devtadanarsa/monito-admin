import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(request: Request) {
  const reqBody = await request.json();

  const newPet = await prisma.pet.create({
    data: reqBody,
  });

  return NextResponse.json(newPet, { status: 201 });
}
