"use client";

import { useEffect } from "react";
import { Transition } from "@headlessui/react";
import JSConfetti from "js-confetti";

const Emojis = ({ emojis, status }) => {
  useEffect(() => {
    if (status === "valid") {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({ emojis, emojiSize: 24, confettiNumber: 50 });
    }
  }, [status, emojis]);

  const statusStyle =
    status === "none"
      ? ""
      : status === "pending"
      ? "outline outline-blue"
      : status === "valid"
      ? "outline outline-green"
      : "outline outline-red";

  return (
    <div className="h-24 mb-8">
      <div className="h-10 text-lg font-semibold text-center">
        {status === "pending" && <span>🤔</span>}
        {status === "valid" && <span className="text-green">CORRECT! 🙀</span>}
        {status === "wrong" && <span className="text-red">WRONG... 😿</span>}
      </div>
      {emojis.length > 0 && (
        <div
          className={`flex items-center justify-center m-2 p-4 w-fit rounded-xl bg-surface0 cursor-default text-center text-4xl shadow-md transition-[outline] ${statusStyle}`}
        >
          {emojis.map((emoji, i) => {
            return (
              <Transition
                appear
                show
                key={emoji}
                as="span"
                style={{ transitionDelay: `${(i + 1) * 150}ms` }}
                className="min-w-[40px] duration-500"
                enter="transition-opacity"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {emoji}
              </Transition>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Emojis;
