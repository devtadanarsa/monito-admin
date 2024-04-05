import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const verifyToken = (jwtToken: string) => {
  const token = jwtToken.split(" ")[1];
  if (!token) {
    throw new Error("Token not provided");
  }

  try {
    return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!!);
  } catch (error) {
    throw new Error("Token is Invalid");
  }
};
