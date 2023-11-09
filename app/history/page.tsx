/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import HistoryCard from "@/components/ui/HistoryCard";
import useSWR from "swr";

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

export default function History() {
	
	//const [history, setHistory] = useState<Appointment[]>();

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
	
	const { data: history } = useSWR("../../api/users/me", (url) => axios.get(url).then((res) => res.data.data.user.patientAppointments), {
		revalidateOnFocus: true, 
		refreshInterval: 1000, 
	});
	async function fetchHistory() {
		try {
			const response = await axios.get("../../api/users/me");
			//   console.log(response.data.data.user.patientAppointments.status);
			//setHistory(response.data.data.user.patientAppointments);
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
	}, []);

	return (
		<div className="flex items-center justify-center w-screen px-4 py-4 bg-white h-fit">
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
				{/* {mapped} */}
				<div>
					{history?.map((appointment: Appointment, index: string) => (
						<HistoryCard key={index} appointment={appointment} />
					))}
				</div>
			</div>
		</div>
	);
}
