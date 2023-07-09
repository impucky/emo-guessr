"use client";

import { redirect } from "next/navigation";

import { getRandomGameId } from "@/utils";

export default function Home() {
  if (typeof window === "undefined") return;
  redirect(getRandomGameId());
}
