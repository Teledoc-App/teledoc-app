"use client";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { parseISO } from "date-fns";
import { useRouter } from "next/navigation";

interface DoctorDetail {
	username: string;
	price: string;
}

interface Profile {
	name: string;
}

export default function Appointment({ params }: { params: { id: string } }) {
	const router = useRouter();
	const [doctorDetail, setdoctorDetail] = useState<DoctorDetail>();
	const [reason, setReason] = useState("");
	const [description, setDescription] = useState("");
	const [time, setTime] = useState("");
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [gender, setGender] = useState("");
	const [patientId, setPatientId] = useState("");
	const [doctorId, setDoctorId] = useState("");
	const [date, setDate] = React.useState<Date | null>(null);
	const [userProfile, setUserProfile] = useState<Profile>();
	const [statusId, setStatusId] = useState("23ba40d0-6c82-4d45-8b5c-21f8d70b959b");

	const getUserProfile = async () => {
		const response = await axios.get("../../api/users/me");
		console.log(response.data.data.user);
		setName(response.data.data.user.name as string);
		setPatientId(response.data.data.user.id as string);

		setUserProfile(response.data.data.user);
	};

	const getDoctorProfile = async () => {
		const response = await axios.get(`../../api/doctor/${params.id}`);
		console.log(response);
		setdoctorDetail(response.data.data.doctor.doctor);
		setUsername(response.data.data.doctor.doctor.username as string);
		setDoctorId(response.data.data.doctor.doctor.id as string);
	};

	useEffect(() => {
		getDoctorProfile();
		getUserProfile();
	}, []);

	// const arrayDisabledHours = ["08:00"];
	const arrayHours = ["08:00", "09:00"];

	for (let nIndex = 10; nIndex <= 22; nIndex++) {
		arrayHours.push(`${nIndex}:00`);
	}

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		router.push("../../success");

		const data = {
			reason,
			description,
			date,
			time,
			patientId,
			doctorId: params.id,
			statusId,
		};
		console.log(data);

		var axios = require("axios");

		var config = {
			method: "post",
			url: "http://teledoc.tech/api/appointment",
			headers: {
				"Cache-Control": "no-cache",
			},
			data: data,
		};

		axios(config)
			.then(function (response: { data: any }) {
				console.log(JSON.stringify(response.data));
			})
			.catch(function (error: any) {
				console.log(error);
			});
	};

	const handleDateChange = (selectedDate: any) => {
		setDate(selectedDate);
	};

	const handleTimeClick = (selectedTime: any) => {
		setTime(selectedTime);
	};

	return (
		<div className="bg-white w-screen h-fit flex justify-center items-center px-4 py-4 ">
			<form
				className="w-full max-w-[400px] flex flex-col items-center gap-2 py-2 "
				onSubmit={handleSubmit}
			>
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
							<h1 className="text-[#000000] text-xl font-bold">{doctorDetail?.username}</h1>
							<div className="flex justify-around mt-10">
								<p className="text-[#000000] font-bold text-m">Payment: </p>
								<p className="text-[#ff5757]  text-m px-5">{doctorDetail?.price}</p>
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
						value={reason}
						onChange={(e) => setReason(e.target.value)}
					/>
				</div>

				<div className="container flex w-[400px]">
					<h1 className="text-[#000000] text-xl font-bold">Description</h1>
				</div>

				<div className="container flex w-[400px]">
					<textarea
						id="message"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
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
							value={date}
							onChange={handleDateChange}
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
									type="button"
									className="bg-[#ffffff] text-[#ff5757] px-4 py-1 border-solid border-2 border-[#ff5757] rounded-2xl hover:bg-[#ff5757] hover:text-[#ffffff]  disabled:bg-[#d9d9d9] disabled:text-[#858585] disabled:border-[#d9d9d9] focus:bg-[#ff5757] focus:text-[#ffffff]"
									// disabled={arrayDisabledHours.includes(sHour)}
									onClick={() => handleTimeClick(sHour)}
								>
									{sHour}
								</button>
							))}
						</div>
					</div>
				</div>

				<div className="container flex w-[400px]">
					<button
						type="submit"
						className="bg-[#ff5757] w-[400px] text-white px-4 py-1 rounded-xl mt-3"
					>
						Book an Appointment
					</button>
				</div>
			</form>
		</div>
	);
}
