import { SIDEBAR_LINK } from "@/app/constants";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { PiGearLight } from "react-icons/pi";
import { BsDoorOpen } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="pl-5 pr-2 pt-12">
      <h1 className="text-lg font-semibold pl-3.5 text-primary">Dashboard</h1>
      <div className="space-y-4 mt-4">
        {SIDEBAR_LINK.map((item, i) => (
          <div key={i}>
            <Link
              className={`${buttonVariants({
                variant: "ghost",
                className: "px-2",
              })} w-full text-left hover:bg-green-100`}
              href={item.href}
            >
              <div className="flex mr-auto items-center gap-4 text-left text-base">
                <item.icon /> {item.label}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <h1 className="text-lg font-semibold pl-3.5 mt-12 text-primary">
        Settings
      </h1>
      <div className="space-y-4 mt-4">
        <div>
          <Link
            className={`${buttonVariants({
              variant: "ghost",
              className: "px-2",
            })} w-full text-left hover:bg-green-100`}
            href={"/settings"}
          >
            <div className="flex mr-auto items-center gap-4 text-left text-base">
              <PiGearLight /> Settings
            </div>
          </Link>
        </div>
        <div>
          <Link
            className={`${buttonVariants({
              variant: "ghost",
              className: "px-2",
            })} w-full text-left hover:bg-red-100`}
            href={"/settings"}
          >
            <div className="flex mr-auto items-center gap-4 text-left text-base text-red-500">
              <BsDoorOpen /> Log Out
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
