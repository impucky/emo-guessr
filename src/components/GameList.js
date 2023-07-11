import Link from "next/link";
import { Transition } from "@headlessui/react";

const GameList = ({ list }) => {
  const total = list && list.filter((game) => game.guessed).length;

  return (
    <div className="h-full">
      <Transition
        show={list.length > 0}
        appear
        className="h-full flex flex-col items-center justify-center py-2"
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <h2 className={`text-3xl m-4 text-center ${total === list.length && "text-green"}`}>
          FOUND:&nbsp;
          {`${total} / ${list.length}`}
        </h2>
        <div className="flex flex-wrap justify-center max-w-5xl">
          {list.map((game) => (
            <GameListItem key={game.id} game={game} />
          ))}
        </div>
      </Transition>
    </div>
  );
};

const GameListItem = ({ game }) => {
  const statusOutline = () => {
    if (!game.played) return;
    if (game.played && !game.guessed) return "outline outline-red";
    return "outline outline-green";
  };

  return (
    <Link
      className={`bg-surface0 hover:bg-surface1 text-xl sm:text-2xl m-1 sm:m-2 h-20 rounded-lg w-56 sm:w-56 flex flex-col text-center items-center justify-evenly transition ${statusOutline()}`}
      href={`/${game.id}`}
    >
      {game.emojis && <div>{game.emojis}</div>}
      <div className="text-[1rem] leading-tight">{game.title}</div>
    </Link>
  );
};

export default GameList;
