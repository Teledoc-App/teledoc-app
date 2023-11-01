/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Appointment {
	symptoms: string;
	rejectionReason: string;
	status: {
		name: string;
	};
	doctor: {
		image: string;
		doctor: {
			username: string;
			specialist: {
				title: string;
			};
		};
	};
}

const History: React.FC = () => {
	const [history, setHistory] = useState<Appointment[]>();

	async function fetchHistory() {
		try {
			const response = await axios.get("../../api/users/me");
			//   console.log(response.data.data.user.patientAppointments.status);

			setHistory(response.data.data.user.patientAppointments);

			if (response.status === 200) {
			}
		} catch (error) {
			console.log("Error fetching appointment history:", error);
		}
	}

	useEffect(() => {
		fetchHistory();
		console.log(history);
	}, []);

	const mapped = history?.map((appointment, index) => (
		<div key={index} className="flex justify-center items-center py-4 px-8">
			<div className="container flex bg-[#d9d9d9]/30 h-[150px] w-[400px] px-0 rounded-lg border text-gray-400 outline-none">
				<div className="p-2 flex items-center">
					{appointment.doctor.image ? (
						<img
							className="w-20 h-20 rounded-full"
							src={appointment.doctor.image}
							alt="Profile picture"
							width={200}
							height={200}
						/>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-[85px] h-[85px] text-[#d9d9d9]"
						>
							<path
								fillRule="evenodd"
								d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
								clipRule="evenodd"
							/>
						</svg>
					)}

					<div className="px-7">
						<h1 className="text-[#000000] text-xl font-bold">
							{appointment.doctor.doctor?.username}
						</h1>
						<p className="text-black">{appointment.doctor.doctor?.specialist.title}</p>
						<p
							className={`${
								appointment.status.name == "pending"
									? "text-[#FFB74D]"
									: appointment.status.name == "accepted"
									? "text-[#4FC3F7] "
									: appointment.status.name == "done"
									? "text-[#81C784]"
									: "text-[#858585]"
							} font-bold text-m`}
						>
							{appointment.status.name}
						</p>
						{appointment.status.name == "rejected" && (
							<p className="text-sm">({appointment.rejectionReason})</p>
						)}
						<div className="py-2">
							{appointment.status.name == "done" && (
								<div>
									<button className="border border-[#ff5757] text-white bg-[#ff5757] text-sm  px-4 py-1 rounded-lg">
										Request Extension
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	));

	return (
		<div className="bg-white w-screen h-fit flex justify-center items-center px-4 py-4">
			<div className="w-full max-w-[400px] flex flex-col items-center gap-4 py-4">
				<nav className="relative flex items-center justify-center w-full">
					<a href="./profile/patient" className="absolute left-0">
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
					<h1 className="text-[#ff5757] text-2xl font-bold">History</h1>
				</nav>
				{mapped}
			</div>
		</div>
	);
};

export default History;
