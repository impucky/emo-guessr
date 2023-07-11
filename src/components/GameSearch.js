import { useState, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Combobox, Transition } from "@headlessui/react";

import { searchGames } from "@/utils";

export default function GameSearch({ tryGuess }) {
  const [query, setQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const search = async () => {
      let results = ["..."];
      if (debouncedQuery) {
        results = await searchGames(debouncedQuery);
      }
      setResults(results);
    };

    search();
  }, [debouncedQuery]);

  const onGameSelect = (game) => {
    setSelectedGame(game);
    tryGuess(game);
  };

  return (
    <div className="relative z-10 p-2 w-full max-w-sm">
      <Combobox value={selectedGame} onChange={onGameSelect}>
        {({ open }) => (
          <div className="relative">
            <Combobox.Button
              as="div"
              onClick={(e) => {
                if (open || query.length === 0) {
                  e.preventDefault();
                }
              }}
            >
              <Combobox.Input
                className="w-full p-2 rounded-xl bg-crust outline outline-2 outline-transparent focus:outline-blue transition-[outline-color]"
                onChange={(e) => setQuery(e.target.value)}
                displayValue={selectedGame}
                placeholder="Game is..."
              />
            </Combobox.Button>
            <Transition
              enter="transition duration-300 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              {open && (
                <Combobox.Options
                  className="absolute w-full mt-2 rounded-lg overflow-hidden text-center"
                  static
                >
                  <div className="max-h-[35vh] sm:max-h-none overflow-y-auto">
                    {results.map((result) => (
                      <Combobox.Option
                        key={result}
                        value={result}
                        className="box-border cursor-pointer p-2 bg-surface0 ui-active:bg-surface2 first:border-none border-t border-crust ui-active:border-surface2"
                        disabled={result === "..."}
                      >
                        {result}
                      </Combobox.Option>
                    ))}
                  </div>
                </Combobox.Options>
              )}
            </Transition>
          </div>
        )}
      </Combobox>
    </div>
  );
}
