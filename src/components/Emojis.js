"use client";

import { useEffect } from "react";
import { Transition } from "@headlessui/react";
import JSConfetti from "js-confetti";

import LoadingDots from "@/components/LoadingDots";

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
        {status === "pending" && <LoadingDots />}
        {status === "valid" && <span className="text-green">{"CORRECT! 🙀"}</span>}
        {status === "wrong" && <span className="text-red">{"WRONG... 😿"}</span>}
      </div>
      <Transition
        appear
        show={emojis.length > 0}
        className={`flex items-center justify-center m-2 p-4 w-fit rounded-xl bg-surface0 cursor-default text-center text-4xl shadow-md transition-[outline] ${statusStyle}`}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {emojis.map((emoji, i) => {
          return (
            <Transition
              appear
              show={emojis.length > 0}
              key={emoji}
              as="span"
              style={{ transitionDelay: `${(i + 1) * 150}ms` }}
              className="min-w-[40px]"
              enter={`transition-opacity duration-500`}
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {emoji}
            </Transition>
          );
        })}
      </Transition>
    </div>
  );
};

export default Emojis;
