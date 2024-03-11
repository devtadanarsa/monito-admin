import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(request: Request) {
  const result = await prisma.pet.findMany();

  return NextResponse.json(result);
}
