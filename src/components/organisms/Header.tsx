import Link from "next/link";
import React, { FC } from "react";
import { buttonVariants } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { DecodedToken } from "@/app/types";
import { verifyToken } from "@/lib/utils";

interface HeaderProps {
  token: string;
}

const Header: FC<HeaderProps> = ({ token }) => {
  const jwtTokenPayload: DecodedToken = verifyToken(token) as DecodedToken;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm">Admin</h3>
          <h2 className="font-semibold text-primary">{jwtTokenPayload.name}</h2>
        </div>
        <div className="flex items-center gap-5">
          <Link
            className={buttonVariants({ size: "lg" })}
            href={"/admin/pets/new"}
          >
            Add New Pet <FaPlus className="ml-4" />
          </Link>
          <Link
            className={buttonVariants({ size: "lg" })}
            href={"/admin/posts/new"}
          >
            Add New Post <FaPlus className="ml-4" />
          </Link>
        </div>
      </div>
      <Separator className="mt-5" />
    </>
  );
};

export default Header;
