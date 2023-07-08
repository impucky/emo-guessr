import { NextResponse } from "next/server";

import gameTitles from "../../../data/game-titles.json";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  let query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({
      status: 400,
    });
  }

  query = query.toLowerCase();

  const results = gameTitles
    .filter((title) => {
      title = title.toLowerCase();
      const terms = query.split(" ");

      if (terms.length === 1) {
        return title.includes(query);
      }

      let match = true;

      terms.forEach((t) => {
        if (!title.includes(t)) match = false;
      });

      return match;
    })
    .slice(0, 11);

  return NextResponse.json(results, {
    status: 200,
  });
}
