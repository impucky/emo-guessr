import { Transition } from "@headlessui/react";

const Emojis = ({ emojis, validGuess }) => {
  const statusStyle =
    validGuess === true
      ? "outline outline-green"
      : validGuess === false
      ? "outline outline-red"
      : "";

  return (
    <div className="min-h-16 ">
      <Transition
        appear
        show={emojis.length > 0}
        className={`flex items-center justify-center m-2 p-4 w-fit rounded-xl bg-surface0 text-center text-4xl shadow-md ${statusStyle}`}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {emojis.map((emoji, i) => {
          return (
            <Transition.Child
              key={emoji}
              appear
              as="span"
              style={{ transitionDelay: `${(i + 1) * 150}ms` }}
              enter={`transition-opacity duration-500`}
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {emoji}
            </Transition.Child>
          );
        })}
      </Transition>
    </div>
  );
};

export default Emojis;
