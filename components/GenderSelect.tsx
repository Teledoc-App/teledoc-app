import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

interface Gender {
  value: string;
  label: string;
}

export default function GenderSelect(props: {
  selectedGender: Gender;
  setSelectedGender: React.Dispatch<React.SetStateAction<Gender>>;
}) {
  const genderOptions = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
  ];
  return (
    <div className="relative w-full">
      <p className="text-black">Gender</p>
      <Listbox onChange={props.setSelectedGender}>
        <Listbox.Button
          className={`flex justify-between items-center bg-[#d9d9d9]/30 border border-[#d9d9d9] w-full h-[60px] rounded-lg px-4 text-black text-left`}
        >
          {props.selectedGender.label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </Listbox.Button>
        {/* <Transition
          //   show={isShowing}
          enter="transition-opacity duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        > */}
        <Listbox.Options
          className={`bg-white rounded-lg shadow-lg w-full py-2 absolute top-[90px] border z-50`}
        >
          {genderOptions.map((gender, index) => (
            <Listbox.Option
              className={`flex justify-between hover:cursor-pointer hover:bg-[#d9d9d9]/30 ${
                props.selectedGender.value === gender.value
                  ? "text-[#ff5757]"
                  : "text-black"
              }  px-4 py-2`}
              key={index}
              value={gender}
              // onClick={() => props.setSelectedGender(gender)}
            >
              {gender.label}
              {props.selectedGender.value === gender.value && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
        {/* </Transition> */}
      </Listbox>
    </div>
  );
}
