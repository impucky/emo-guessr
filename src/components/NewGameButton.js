import { FastArrowRight } from "iconoir-react";

const NewGameButton = ({ newGame }) => {
  return (
    <button
      className="flex w-fit gap-2 p-2 bg-lavender hover:brightness-125 transition rounded-xl shadow-md text-base text-lg"
      onClick={newGame}
    >
      Next game
      <FastArrowRight />
    </button>
  );
};

export default NewGameButton;
