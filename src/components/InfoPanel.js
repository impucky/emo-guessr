"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { InfoEmpty } from "iconoir-react";

const InfoPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="hover:text-blue transition">
        <InfoEmpty height={28} width={28} strokeWidth={2} />
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative">
        <div className="fixed inset-0" aria-hidden="true" />
        <Dialog.Panel className="fixed top-20 left-2 bg-surface0 max-w-[12rem] shadow-md rounded-xl p-2 text-sm text-center">
          <Dialog.Description>
            Suggestions, bugs, complaints:
            <br />
            <span className="text-blue">@pucky</span> on discord
          </Dialog.Description>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default InfoPanel;
