"use client";

import { redirect } from "next/navigation";

import { getRandomGameId } from "@/utils";

export default function Home() {
  redirect(getRandomGameId());
}
