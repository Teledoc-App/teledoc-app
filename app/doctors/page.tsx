"use client";
// pages/doctors.tsx

import React, { useEffect, useState } from "react";
import DoctorCard from "@/components/doctorCard";

// const doctors = [
// 	{
// 		id: 1,
// 		name: "Dr. John Doe",
// 		specialist: "Cardiologist",
// 		imageSrc: "https://picsum.photos/200", // Replace with the actual image path
// 		price: "Rp. 100.000",
// 	},
// 	{
// 		id: 2,
// 		name: "Dr. Jane Smith",
// 		specialist: "Dermatologist",
// 		imageSrc: "https://picsum.photos/200", // Replace with the actual image path
// 		price: "Rp. 150.000",
// 	},
// 	{
// 		id: 3,
// 		name: "Dr. Michael Johnson",
// 		specialist: "Pediatrician",
// 		imageSrc: "https://picsum.photos/200", // Replace with the actual image path
// 		price: "Rp. 120.000",
// 	},
// ];

// interface Doctor {
// 	userId: string;
// 	username: string;
// 	strNumber: string;
// 	price: any;
// 	specialist: {
// 		id: string;
// 		title: string;
// 		image: string | null;
// 		createdAt: string;
// 		updatedAt: string;
// 	};
// 	user: {
// 		image: string;
// 		role: string;
// 		doctorAppointments: {
// 			status: {
// 				id: string;
// 				name: string;
// 				createdAt: string;
// 				updatedAt: string;
// 			};
// 			reason: string | null;
// 			description: string | null;
// 			timeSlot: {
// 				time: string;
// 				date: string;
// 			};
// 			patient: {
// 				name: string;
// 				gender: string | null;
// 				birthDate: string | null;
// 				image: string;
// 				phone: string | null;
// 			};
// 		}[];
// 	};
// }

type specialistProps = {
	id: string;
	title: string;
};

type userProps = {
	image: any;
};

type listDoctorProps = {
	userId: string;
	username: string;
	price: any;
	specialist: specialistProps;
	user: userProps;
};

const Doctors: React.FC = () => {
	const [doctors, setDoctors] = useState<listDoctorProps[]>([]);

	useEffect(() => {
		// Fetch data from the API
		fetch("https://www.teledoc.tech/api/doctor")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setDoctors(data.doctors);
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, []);
	return (
		<div className="container h-screen  bg-white items-center justify-center p-5">
			<div className="flex justify-center items-center">
				<div className="flex mr-6 items-center">
					<h1 className="text-[#ff5757] text-3xl font-bold">All Doctor</h1>
				</div>
			</div>
			<div className="flex justify-center items-center mt-7">
				<input
					className="bg-[#d9d9d9]/30 h-[40px] w-[400px]  px-4 rounded-lg border text-[#000000] outline-none"
					type="text"
					placeholder="Search"
				/>
			</div>

			<div className="flex justify-center items-center mt-2">
				{/* <input
					className="bg-[#d9d9d9]/30 h-[40px] w-[400px]  px-4 rounded-lg border text-[#000000] outline-none"
					type="text"
					placeholder="Search"
				/> */}
			</div>

			<div className="mt-4">
				{doctors.map((doctor) => (
					<DoctorCard
						key={doctor.userId}
						userId={doctor.userId}
						username={doctor.username}
						price={doctor.price}
						specialist={doctor.specialist}
						user={doctor.user}
					/>
				))}
			</div>
		</div>
	);
};

export default Doctors;
