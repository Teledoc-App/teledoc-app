"use client";
import React, { SyntheticEvent } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
// import Appointment from "../doctors/appointment/[id]/page";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Appointment {
	id: string;
	symptoms: string;
	rejectionReason: string;
	requestExtension: boolean;
	time: string;
	date: string;
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

export default function HistoryCard(props: { appointment: Appointment }) {
	const [history, setHistory] = useState<Appointment[]>();
	const [isOpen, setIsOpen] = useState(false);

	const router = useRouter();

	const [symptoms, setSymptoms] = useState("");
	const [description, setDescription] = useState("");
	const [time, setTime] = useState("");
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [gender, setGender] = useState("");
	const [patientId, setPatientId] = useState("");
	const [doctorId, setDoctorId] = useState("");
	const [date, setDate] = React.useState<Date | null>(null);
	const [statusId, setStatusId] = useState("23ba40d0-6c82-4d45-8b5c-21f8d70b959b");

	const isoDateString = props.appointment.date;
	const isoDate = new Date(isoDateString);
	const options = { year: "numeric", month: "long", day: "numeric" };
	const readableDate = isoDate.toLocaleDateString("en-US", options as Intl.DateTimeFormatOptions);

	async function fetchHistory() {
		try {
			const response = await axios.get("../../api/users/me");
			//   console.log(response.data.data.user.patientAppointments.status);
			setHistory(response.data.data.user.patientAppointments);
			setPatientId(response.data.data.user.id);
			setDoctorId(response.data.data.user.patientAppointments[0].doctor.doctor.userId);

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
	return (
		<div>
			<div className="container my-5 flex bg-[#d9d9d9]/30 h-[170px] w-[400px] px-0 rounded-lg border text-gray-400 outline-none">
				<div className="p-2 flex items-center">
					{props.appointment.doctor.image ? (
						<img
							className="w-20 h-20 rounded-full"
							src={props.appointment.doctor.image}
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
							{props.appointment.doctor.doctor?.username}
						</h1>

						<p className="text-black">{props.appointment.doctor.doctor?.specialist.title}</p>
						<p className="text-[12px] text-[#858585]">
							{readableDate}
							{/* {props.appointment.date} */}
						</p>
						<p className="text-[12px] text-[#858585]">{props.appointment.time}</p>
						<p
							className={`${
								props.appointment.status.name == "pending"
									? "text-[#FFB74D]"
									: props.appointment.status.name == "accepted"
									? "text-[#4FC3F7] "
									: props.appointment.status.name == "completed"
									? "text-[#81C784]"
									: "text-[#f94b4b]"
							} font-bold text-m`}
						>
							{props.appointment.status.name}
						</p>
						{props.appointment.status.name == "rejected" && (
							<p className="text-sm text-[#f94b4b]">({props.appointment.rejectionReason})</p>
						)}
						<div className="py-2">
							{props.appointment.status.name == "completed" &&
							props.appointment.requestExtension == false ? (
								<div>
									{/* <Link href={`/doctors/appointment/${appointment.doctor.doctor?.userId}`}> */}
									<button
										onClick={() => setIsOpen(true)}
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
															disablePast
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
															onClick={() => requestExtension(props.appointment.id)}
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
									{props.appointment.status.name == "completed" &&
										props.appointment.requestExtension == true && (
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
	);
}
