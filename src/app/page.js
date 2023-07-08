import { redirect } from "next/navigation";

import { getRandomGameId } from "@/utils";

export default async function Home() {
  redirect(getRandomGameId());
}
