import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* BELL BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-1 rounded-full ml-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel className="bg-white overflow-hidden rounded-lg w-[90%] fixed top-5 left-5 shadow-lg">
          {/* TITLE */}
          <div className="bg-[#ff5757] h-[50px] p-4">
            <h3 className="text-white font-bold text-[16px]">Notifications</h3>
          </div>

          {/* NOTIFICATIONS CONTAINER */}
          <div className="w-full flex flex-col overflow-y-scroll max-h-[265px]">
            {/* NOTIFICATION */}
            <div className="flex p-4 w-full border-b gap-4">
              {/* IMAGE */}
              <div className="bg-[#d9d9d9] w-[40px] h-[40px] rounded-full"></div>
              {/* DATA */}
              <div className="flex flex-col">
                <span className="font-semibold text-[16px] ">Dr Pablo</span>
                <p className="text-[#858585] text-[12px]">
                  12.00 - Tuesday, 20 August 2023
                </p>
              </div>
            </div>
            {/* NOTIFICATION */}
            <div className="flex p-4 w-full border-b gap-4">
              {/* IMAGE */}
              <div className="bg-[#d9d9d9] w-[40px] h-[40px] rounded-full"></div>
              {/* DATA */}
              <div className="flex flex-col">
                <span className="font-semibold text-[16px] ">Dr Pablo</span>
                <p className="text-[#858585] text-[12px]">
                  12.00 - Tuesday, 20 August 2023
                </p>
              </div>
            </div>{" "}
            {/* NOTIFICATION */}
            <div className="flex p-4 w-full border-b gap-4">
              {/* IMAGE */}
              <div className="bg-[#d9d9d9] w-[40px] h-[40px] rounded-full"></div>
              {/* DATA */}
              <div className="flex flex-col">
                <span className="font-semibold text-[16px] ">Dr Pablo</span>
                <p className="text-[#858585] text-[12px]">
                  12.00 - Tuesday, 20 August 2023
                </p>
              </div>
            </div>
            {/* NOTIFICATION */}
            <div className="flex p-4 w-full border-b gap-4">
              {/* IMAGE */}
              <div className="bg-[#d9d9d9] w-[40px] h-[40px] rounded-full"></div>
              {/* DATA */}
              <div className="flex flex-col">
                <span className="font-semibold text-[16px] ">Dr Pablo</span>
                <p className="text-[#858585] text-[12px]">
                  12.00 - Tuesday, 20 August 2023
                </p>
              </div>
            </div>
            {/* NOTIFICATION */}
            <div className="flex p-4 w-full border-b gap-4">
              {/* IMAGE */}
              <div className="bg-[#d9d9d9] w-[40px] h-[40px] rounded-full"></div>
              {/* DATA */}
              <div className="flex flex-col">
                <span className="font-semibold text-[16px] ">Dr Pablo</span>
                <p className="text-[#858585] text-[12px]">
                  12.00 - Tuesday, 20 August 2023
                </p>
              </div>
            </div>{" "}
            {/* NOTIFICATION */}
            <div className="flex p-4 w-full border-b gap-4">
              {/* IMAGE */}
              <div className="bg-[#d9d9d9] w-[40px] h-[40px] rounded-full"></div>
              {/* DATA */}
              <div className="flex flex-col">
                <span className="font-semibold text-[16px] ">Dr Pablo</span>
                <p className="text-[#858585] text-[12px]">
                  12.00 - Tuesday, 20 August 2023
                </p>
              </div>
            </div>
          </div>
          {/* FOOTER */}
          <div className="p-4 flex justify-center items-center w-full">
            <button className="text-[#ff5757]">Clear Notifications</button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
