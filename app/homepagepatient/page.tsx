"use client";

import { useForm } from "react-hook-form";

export default function HomepagePatient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: string) => console.log(data);

  return (
    <div className="flex w-screen justify-center">
      <div className="bg-white w-screen max-w-[425px] h-fit flex flex-col justify-center items-center px-4 py-8 overflow-y-scroll">
        {/* PROFILE */}
        <nav className="flex w-full items-center gap-4 mb-8">
          {/* PICTURE */}
          <div className="w-[70px] h-[70px] rounded-full bg-red-200"></div>
          <div>
            <p className="text-[#858585] text-[14px]">Hi, welcome back</p>
            <span className="text-black font-semibold text-[18px]">
              John Doe William
            </span>
          </div>
        </nav>

        {/* SEARCH */}
        <form onSubmit={handleSubmit(() => onSubmit)} className="w-full mb-8">
          <input
            type="search"
            placeholder="Search a doctor"
            {...register}
            className="bg-[#d9d9d9]/30 border border-[#d9d9d9] w-full h-[60px] rounded-lg px-4 outline-none hover:border-[#ff5757]"
          />
        </form>

        <section className="w-full mb-8">
          <div className="w-full flex justify-between items-center mb-2">
            <h2 className="text-[24px] text-black font-semibold">
              Specialists
            </h2>
            <a href="" className="text-[16px] text-[#858585]">
              See All
            </a>
          </div>
          {/* SPECIALISTS */}
          <div className="flex gap-4 overflow-x-scroll">
            <button className="border border-[#ff5757] text-[#ff5757] text-[20px] font-semibold bg-none min-w-[150px] h-[80px] rounded-lg">
              Denteeth
            </button>
            <button className="border border-[#ff5757] text-[#ff5757] text-[20px] font-semibold bg-none min-w-[150px] h-[80px] rounded-lg">
              Theripist
            </button>{" "}
            <button className="border border-[#ff5757] text-[#ff5757] text-[20px] font-semibold bg-none min-w-[150px] h-[80px] rounded-lg">
              Surgeon
            </button>{" "}
            <button className="border border-[#ff5757] text-[#ff5757] text-[20px] font-semibold bg-none min-w-[150px] h-[80px] rounded-lg">
              Pediatrician
            </button>
          </div>
        </section>

        <section className="w-full">
          <div className="flex justify-between items-center w-full mb-2">
            <h2 className="text-[24px] text-black font-semibold">Doctors</h2>
            <a href="" className="text-[16px] text-[#858585]">
              See All
            </a>
          </div>
          {/* DOCTOR LIST */}
          <div>
            {/* CARD */}
            <div className="flex gap-4 w-full bg-[#d9d9d9]/30 rounded-lg p-6">
              {/* PICTURE */}
              <div className="w-[85px] h-[85px] rounded-full p-0 bg-white">
                <svg
                  width=""
                  height=""
                  viewBox="0 0 150 150"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M126.423 129.592C133.877 122.588 139.815 114.13 143.87 104.74C147.926 95.3501 150.012 85.2282 150 75C150 33.5769 116.423 0 75 0C33.5769 0 5.00708e-05 33.5769 5.00708e-05 75C-0.0117846 85.2282 2.07441 95.3501 6.12966 104.74C10.1849 114.13 16.123 122.588 23.577 129.592C37.4765 142.722 55.8796 150.026 75 150C94.1204 150.026 112.524 142.722 126.423 129.592ZM29.9616 119.708C35.3622 112.951 42.2155 107.498 50.0126 103.753C57.8097 100.008 66.3503 98.0683 75 98.0769C83.6497 98.0683 92.1903 100.008 99.9874 103.753C107.785 107.498 114.638 112.951 120.038 119.708C114.146 125.659 107.131 130.382 99.3998 133.601C91.6684 136.82 83.3748 138.472 75 138.461C66.6252 138.472 58.3316 136.82 50.6002 133.601C42.8689 130.382 35.8537 125.659 29.9616 119.708ZM103.846 51.9231C103.846 59.5735 100.807 66.9107 95.3973 72.3204C89.9876 77.7301 82.6505 80.7692 75 80.7692C67.3495 80.7692 60.0124 77.7301 54.6027 72.3204C49.193 66.9107 46.1539 59.5735 46.1539 51.9231C46.1539 44.2726 49.193 36.9355 54.6027 31.5258C60.0124 26.1161 67.3495 23.0769 75 23.0769C82.6505 23.0769 89.9876 26.1161 95.3973 31.5258C100.807 36.9355 103.846 44.2726 103.846 51.9231Z"
                    fill="#D9D9D9"
                  />
                </svg>
              </div>
              {/* INFORMATIONS */}
              <div>
                <span className="text-[16px] font-semibold">
                  Dr. Sledge Hammer
                </span>
                <p className="text-[12px] text-[#858585] mb-3">Gynecologist</p>
                <button className="px-6 py-1 bg-[#ff5757] text-white rounded-full">
                  Book
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
