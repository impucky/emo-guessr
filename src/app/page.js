"use client";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

import { getRandomGameId } from "@/utils";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof window === "undefined") {
    return null;
  }

  redirect(getRandomGameId());
}
