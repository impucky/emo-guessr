"use client";

import gameData from "../../data/game-data.json";

export default function GameLayout({ children }) {
  return <>{children}</>;
}

export async function generateStaticParams() {
  return gameData.map((game) => ({
    id: game.id,
  }));
}

export const dynamicParams = false;
