"use client";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

const Appointment: React.FC = () => {
	const arrayDisabledHours = ["08:00"];
	const arrayHours = ["08:00", "09:00"];

	for (let nIndex = 10; nIndex <= 22; nIndex++) {
		arrayHours.push(`${nIndex}:00`);
	}
	return (
		<div className="bg-white w-screen h-fit flex justify-center items-center px-4 py-4 ">
			<div className="w-full max-w-[400px] flex flex-col items-center gap-2 py-2 ">
				<nav className="flex justify-center items-center w-full relative">
					<a href="../" className="absolute left-0">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6"
						>
							<path
								fillRule="evenodd"
								d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
					<h1 className="text-[#ff5757] text-2xl font-bold">Appointment</h1>
				</nav>

				<div className="flex justify-center items-center mt-7">
					<div className="p-2 flex ">
						<img
							className="w-[120px] h-[120px] rounded-full"
							src="https://picsum.photos/200"
							alt="Profile picture"
							width={120}
							height={120}
						/>
						<div className="px-7">
							<h1 className="text-[#000000] text-xl font-bold">Dr. John Smith</h1>
							<p className="text-[#858585] text-m">Cardiologist</p>
							<div className="flex justify-around mt-10">
								<p className="text-[#000000] font-bold text-m">Payment: </p>
								<p className="text-[#ff5757]  text-m px-5"> Rp. 100.000</p>
							</div>
						</div>
					</div>
				</div>

				<div className="container flex w-[400px]">
					<h1 className="text-[#000000] text-xl font-bold">Reason</h1>
				</div>

				<div className="container flex w-[400px]">
					<input
						className="bg-[#d9d9d9]/30 h-[40px] w-[400px]  px-4 rounded-lg border text-[#000000] outline-none "
						type="text"
						placeholder="Enter reason of appointment"
					/>
				</div>

				<div className="container flex w-[400px]">
					<h1 className="text-[#000000] text-xl font-bold">Description</h1>
				</div>

				<div className="container flex w-[400px]">
					<textarea
						id="message"
						rows={4}
						className="block p-2.5 w-full text-m text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Write your thoughts here..."
					></textarea>
				</div>

				<div className="container flex w-[400px]">
					<h1 className="text-[#000000] text-xl font-bold">Date</h1>
				</div>

				<div className="container flex w-[400px]">
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							format="YYYY - MM - DD"
							sx={{
								width: "100%",
								backgroundColor: "rgba(217, 217, 217, 0.3)",
								// borderColor: "#ff5757",
								// outline: "#ff5757",
								borderRadius: "8px",
							}}
						/>
					</LocalizationProvider>
				</div>

				<div className="container flex w-[400px]">
					<h1 className="text-[#000000] text-xl font-bold">Time</h1>
				</div>

				<div className="flex justify-center items-center">
					<div className="container w-[400px]">
						<div className="grid grid-cols-3 gap-3">
							{arrayHours.map((sHour) => (
								<button
									key={`appointment-${sHour}`}
									className="bg-[#ffffff] text-[#ff5757] px-4 py-1 border-solid border-2 border-[#ff5757] rounded-2xl hover:bg-[#ff5757] hover:text-[#ffffff]  disabled:bg-[#d9d9d9] disabled:text-[#858585] disabled:border-[#d9d9d9] focus:bg-[#ff5757] focus:text-[#ffffff]"
									disabled={arrayDisabledHours.includes(sHour)}
								>
									{sHour}
								</button>
							))}
						</div>
					</div>
				</div>

				<div className="container flex w-[400px]">
					<button className="bg-[#ff5757] w-[400px] text-white px-4 py-1 rounded-xl mt-3">
						Book an Appointment
					</button>
				</div>
			</div>
		</div>
	);
};

export default Appointment;
