import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";

import { clearSave, getRandomGameId } from "@/utils";

const ResetDialog = ({ isOpen, setIsOpen }) => {
  const onConfirm = () => {
    clearSave();
    router.push(`/${getRandomGameId()}`);
  };

  const router = useRouter();

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-surface0 dark:bg-mantle shadow-md rounded-xl p-4 flex gap-4 flex-col items-center justify-center text-center">
          <Dialog.Description>Resetting all your guesses, are you sure ?</Dialog.Description>

          <div className="w-full flex flex-wrap justify-around font-semibold">
            <button
              className="w-32 text-yellow hover:brightness-110 outline outline-2 outline-yellow p-2 rounded-xl transition"
              onClick={() => setIsOpen(false)}
            >
              CANCEL
            </button>
            <button
              className="w-32 text-red hover:brightness-110 outline outline-2 outline-red p-2 rounded-xl transition"
              onClick={onConfirm}
            >
              RESET
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ResetDialog;
