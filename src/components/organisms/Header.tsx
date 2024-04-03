import Link from "next/link";
import React, { FC } from "react";
import { buttonVariants } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { Separator } from "../ui/separator";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/app/types";

interface HeaderProps {
  token: string;
}

const Header: FC<HeaderProps> = ({ token }) => {
  const jwtToken: DecodedToken = jwt.decode(token) as DecodedToken;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm">Admin</h3>
          <h2 className="font-semibold text-primary">{jwtToken.name}</h2>
        </div>
        <Link
          className={buttonVariants({ size: "lg" })}
          href={"/admin/pets/new"}
        >
          Add Item <FaPlus className="ml-4" />
        </Link>
      </div>
      <Separator className="mt-5" />
    </>
  );
};

export default Header;
