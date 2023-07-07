import { redirect } from "next/navigation";

import { getGames } from "@/utils";

export default async function Home() {
  const games = await getGames();

  // todo local storage
  // extract random game selection
  const randomGame = games[Math.floor(Math.random() * games.length)];

  redirect(randomGame.id);
}
