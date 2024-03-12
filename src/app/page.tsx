"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { Pet } from "./types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { SORT_FILTER } from "./constants";
import { Input } from "@/components/ui/input";
import capitalize from "capitalize";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function Home() {
  const router = useRouter();
  const sortedParams = useSearchParams().get("sortedBy");

  const [petList, setPetList] = useState<Pet[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get<Pet[]>(
        `/api/pets?sortedBy=${sortedParams}&name=${searchInput}`
      );
      setPetList(response);
    };

    fetchData();
  }, [sortedParams, searchInput]);

  return (
    <div>
      <div className="flex justify-end">
        <Link className={buttonVariants({ size: "lg" })} href={"/new"}>
          Add Item <FaPlus className="ml-4" />
        </Link>
      </div>
      <div className="flex items-center justify-between mt-10">
        <div>
          <Select onValueChange={(value) => router.push(`?sortedBy=${value}`)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sorted By Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SORT_FILTER.map((item, i) => (
                  <SelectItem key={item.label + i} value={item.href}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <HiMagnifyingGlass className="w-5 h-5" />
          <Input
            placeholder="Search by name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-fit"
          />
        </div>
      </div>
      <Table className="mt-4">
        {petList.length === 0 && <TableCaption>There is no data</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">No</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Size</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Gender</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {petList.map((item: Pet, i: number) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium text-center">{i + 1}</TableCell>
              <TableCell className="text-center">{item.name}</TableCell>
              <TableCell className="text-center">
                {capitalize(item.size)}
              </TableCell>
              <TableCell className="text-center">
                Rp.{item.price.toLocaleString("id-ID")}
              </TableCell>
              <TableCell className="text-center">
                {capitalize(item.gender)}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-4">
                  <Button size={"icon"} variant={"outline"}>
                    <FaPen />
                  </Button>
                  <Button size={"icon"}>
                    <FaTrash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
