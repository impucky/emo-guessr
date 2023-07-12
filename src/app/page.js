"use client";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

import LoadingDots from "@/components/LoadingDots";
import { getRandomGameId } from "@/utils";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof window === "undefined") {
    return (
      <div className="w-full h-full grid items-center text-3xl">
        <LoadingDots />
      </div>
    );
  }

  redirect(getRandomGameId());
}
