import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { PiDog } from "react-icons/pi";

export const SORT_FILTER = [
  {
    label: "Sorted by Date",
    href: "date",
  },
  {
    label: "Sorted by Name",
    href: "name",
  },
  {
    label: "Sorted by Price",
    href: "price",
  },
];

export const TABLE_COLUMN = ["No", "Name", "Size", "Price", "Gender", "Action"];

export const SIDEBAR_LINK = [
  {
    label: "Home",
    icon: AiOutlineHome,
    href: "/admin",
  },
  {
    label: "Pet Listing",
    icon: PiDog,
    href: "/admin/pets",
  },
  {
    label: "Messages",
    icon: AiOutlineMessage,
    href: "/pets",
  },
];
