"use client";

import { SIDEBAR_LINK } from "@/app/constants";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { PiGearLight } from "react-icons/pi";
import { BsDoorOpen } from "react-icons/bs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Cookies from "js-cookie";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { toast } = useToast();
  const router = useRouter();

  const logoutClick = () => {
    Cookies.remove("jwtToken");
    toast({
      title: "Log Out Successful",
      description: "You've been sucessfully logged out",
    });

    router.push("/login");
  };

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
          <div className="hover:bg-red-100">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex mr-auto items-center hover:bg-transparent text-base gap-4 text-red-500 hover:text-red-500"
                >
                  <BsDoorOpen /> Log Out
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Logging out will not delete
                    your data, but you will need to log in again to access it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500 hover:bg-red-500"
                    onClick={logoutClick}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
