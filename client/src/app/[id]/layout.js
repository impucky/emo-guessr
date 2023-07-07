import { getGames } from "@/utils";

export default function GameLayout({ children }) {
  return <>{children}</>;
}

export async function generateStaticParams() {
  const games = await getGames();

  return games.map((game) => ({
    id: game.id,
  }));
}

export const dynamicParams = false;
