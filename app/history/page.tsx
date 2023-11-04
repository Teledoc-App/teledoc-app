/* eslint-disable @next/next/no-img-element */
"use client";
import React, { SyntheticEvent } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Appointment from "../doctors/appointment/[id]/page";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { set } from "date-fns";

interface Appointment {
	id: string;
	symptoms: string;
	rejectionReason: string;
	requestExtension: boolean;
	status: {
		name: string;
	};
	doctor: {
		image: string;
		doctor: {
			userId: string;
			username: string;
			specialist: {
				title: string;
			};
		};
	};
}

interface DoctorDetail {
	userId: string;
	username: string;
	price: string;
}

interface Profile {
	name: string;
}

const History: React.FC = () => {
	const [history, setHistory] = useState<Appointment[]>();
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const [symptoms, setSymptoms] = useState("");
	const [description, setDescription] = useState("");
	const [time, setTime] = useState("08:00");
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [gender, setGender] = useState("");
	const [patientId, setPatientId] = useState("");
	const [doctorId, setDoctorId] = useState("");
	const [date, setDate] = React.useState<Date | null>(null);
	const [statusId, setStatusId] = useState("23ba40d0-6c82-4d45-8b5c-21f8d70b959b");

	async function fetchHistory() {
		try {
			const response = await axios.get("../../api/users/me");
			//   console.log(response.data.data.user.patientAppointments.status);

			setHistory(response.data.data.user.patientAppointments);
			setPatientId(response.data.data.user.id);
			setDoctorId(response.data.data.user.patientAppointments[0].doctor.doctor.userId);
			// console.log(response.data.data.user.patientAppointments[0].doctor.doctor.userId);
			// console.log(response);

			if (response.status === 200) {
			}
		} catch (error) {
			console.log("Error fetching appointment history:", error);
		}
	}

	// const handleExtension = (appointmentId: string) => {
	// 	requestExtension(appointmentId);

	// 	try {
	// 		const response = axios.post(`../../api/appointment/}`, {
	// 			data: {
	// 				symptoms,
	// 				description,
	// 				date,
	// 				time,
	// 				patientId,
	// 				doctorId,
	// 				statusId,
	// 			},
	// 		});
	// 		console.log(response);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const handleDateChange = (selectedDate: any) => {
		setDate(selectedDate);
	};

	const arrayHours = ["08:00", "09:00"];

	for (let nIndex = 10; nIndex <= 22; nIndex++) {
		arrayHours.push(`${nIndex}:00`);
	}

	const handleTimeClick = (selectedTime: any) => {
		setTime(selectedTime);
	};

	// async function requestExtension(appointmentId: string) {
	// 	try {
	// 		// const response = await axios.patch(`../../api/appointment/${appointmentId}`, {
	// 		// 	requestExtension: true,
	// 		// });
	// 		const response2 = await axios.post(`../../api/appointment`, {
	// 			data: {
	// 				symptoms,
	// 				description,
	// 				date,
	// 				time,
	// 				patientId,
	// 				doctorId,
	// 				statusId,
	// 			},

	// 		});
	// 		// console.log(response.data);
	// 		console.log(response2);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// 	// alert("Request Extension Successful");
	// }

	const requestExtension = async (appointmentId: string) => {
		try {
			const response = await axios.patch(`../../api/appointment/${appointmentId}`, {
				requestExtension: true,
			});
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		router.push("../../success");

		const data = {
			symptoms,
			description,
			date,
			time,
			patientId,
			doctorId,
			statusId,
		};
		console.log(data);

		var axios = require("axios");

		var config = {
			method: "post",
			url: "../../api/appointment",
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

	// async function addAppointment(appointmentId: string) {
	// 	try {
	// 		const response = await axios.post(`../../api/appointment/${appointment.}`, {

	// 		})

	// 		});
	// 		console.log();
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// 	// alert("Request Extension Successful");
	// }

	// const requestExtension = async (e: SyntheticEvent) => {
	// 	e.preventDefault();

	// 	const data = {
	// 		symptoms,
	// 		description,
	// 		date,
	// 		time,
	// 		patientId: patientId,
	// 		doctorId: doctorId,
	// 		statusId,
	// 	};
	// 	console.log(data);

	// 	var axios = require("axios");

	// 	var config = {
	// 		method: "post",
	// 		url: "../../api/appointment",
	// 		headers: {
	// 			"Cache-Control": "no-cache",
	// 		},
	// 		data: data,
	// 	};

	// 	axios(config)
	// 		.then(function (response: { data: any }) {
	// 			console.log(JSON.stringify(response.data));
	// 		})
	// 		.catch(function (error: any) {
	// 			console.log(error);
	// 		});
	// };

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
							{appointment.status.name == "done" && appointment.requestExtension == false ? (
								<div>
									{/* <Link href={`/doctors/appointment/${appointment.doctor.doctor?.userId}`}> */}
									<button
										onClick={() => setIsOpen(true)}
										// onClick={() => handleExtension(appointment.id)}
										className="border border-[#ff5757] text-white bg-[#ff5757] text-sm  px-4 py-1 rounded-lg"
									>
										Request Extension
									</button>

									<Dialog
										open={isOpen}
										onClose={() => setIsOpen(false)}
										className={`bg-black/50 fixed top-0 left-0 w-screen h-screen flex justify-center items-center p-4`}
									>
										<Dialog.Panel className={`bg-white p-8 rounded-lg w-full max-w-[400px]`}>
											<Dialog.Title className={`font-bold text-2xl`}>
												Request Extension
											</Dialog.Title>
											{/* <Dialog.Description className={`mb-8`}>
												Description for reject reason
											</Dialog.Description> */}

											{/* CHOICES */}
											<form className="" onSubmit={handleSubmit}>
												{/* <div className="grid mb-1">
													<p>{appointment.doctor.doctor?.username}</p>
													<p>{appointment.doctor.doctor?.specialist.title}</p>
												</div> */}

												<div className="grid py-1">
													<p>Symptoms</p>
													<input
														className="bg-[#d9d9d9]/30 h-[30px]  px-4 rounded-lg border text-[#000000] outline-none "
														type="text"
														placeholder="Enter reason of appointment"
														value={symptoms}
														onChange={(e) => setSymptoms(e.target.value)}
													/>
												</div>

												<div className="grid py-1">
													<p>Descripstions</p>
													<textarea
														id="message"
														value={description}
														onChange={(e) => setDescription(e.target.value)}
														rows={2}
														className="block p-2.5 w-full text-m text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
														placeholder="Write your thoughts here..."
													></textarea>
												</div>

												<div className="grid py-1">
													<p>Date</p>
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

												<div className="grid py-1">
													<p>Time</p>
													<div className="grid grid-cols-3 gap-1">
														{arrayHours.map((sHour) => (
															<button
																key={`appointment-${sHour}`}
																type="button"
																className="bg-[#ffffff] text-[#ff5757]  border-solid border-2 border-[#ff5757] rounded-2xl hover:bg-[#ff5757] hover:text-[#ffffff]  disabled:bg-[#d9d9d9] disabled:text-[#858585] disabled:border-[#d9d9d9] focus:bg-[#ff5757] focus:text-[#ffffff]"
																// disabled={arrayDisabledHours.includes(sHour)}
																onClick={() => handleTimeClick(sHour)}
															>
																{sHour}
															</button>
														))}
													</div>
													<div className="w-full flex justify-end">
														<button
															className="rounded-lg mt-2 bg-[#ff5757] text-white px-4 py-2 ml-auto w-full hover:cursor-pointer"
															onClick={() => requestExtension(appointment.id)}
															//   disabled={true}
														>
															Confirm
														</button>
													</div>
												</div>
											</form>
										</Dialog.Panel>
									</Dialog>
									{/* </Link> */}
								</div>
							) : (
								<div>
									{appointment.status.name == "done" && appointment.requestExtension == true && (
										<button
											disabled
											className="border border-[#858585] text-white bg-[#858585] text-sm  px-4 py-1 rounded-lg"
										>
											Request Extension
										</button>
									)}
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
