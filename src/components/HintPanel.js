import { useState, Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { NavArrowUp } from "iconoir-react";

const HintPanel = ({ hints }) => {
  const [hintsRevealed, setHintsRevealed] = useState({
    year: false,
    developer: false,
    genre: false,
  });

  const onReveal = (type) => {
    setHintsRevealed({ ...hintsRevealed, [type]: true });
  };

  return (
    <div className="flex flex-col items-center">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="text-lg px-4 py-2 inline-flex bg-green text-base hover:brightness-125 transition rounded-xl shadow-md">
              Need a hint?{" "}
              <NavArrowUp style={{ transform: open && "scaleY(-1)", transition: "0.2s" }} />
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              as={Fragment}
            >
              <Disclosure.Panel className="w-max mt-2 flex flex-col rounded-xl w-full bg-surface0 shadow-md">
                {Object.keys(hints).map((h) => {
                  return (
                    <div
                      key={h}
                      className="flex items-center justify-between gap-8 px-4 py-2 border-b border-base last:border-none"
                    >
                      <div>{h.charAt(0).toUpperCase() + h.slice(1)}:</div>
                      <div
                        onClick={() => onReveal(h)}
                        className={`select-none transition ${
                          hintsRevealed[h] ? "blur-none cursor-default" : "blur cursor-pointer"
                        }`}
                      >
                        {hints[h]}
                      </div>
                    </div>
                  );
                })}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default HintPanel;
