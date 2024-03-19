import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

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

  const result = await prisma.pet.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ result });
}

export async function PUT(request: Request) {
  const reqBody = await request.json();
  const updatedPet = await prisma.pet.update({
    where: {
      id: reqBody.id,
    },
    data: reqBody,
  });

  return NextResponse.json(updatedPet);
}
