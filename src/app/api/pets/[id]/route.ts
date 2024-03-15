import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  const result = await prisma.pet.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ result });
}
