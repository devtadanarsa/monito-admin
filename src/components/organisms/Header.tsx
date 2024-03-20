import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { Separator } from "../ui/separator";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm">Admin</h3>
          <h2 className="font-semibold text-primary">Mr. John Doe</h2>
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
