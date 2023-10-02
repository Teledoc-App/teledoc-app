"use client";
// pages/doctors.tsx

import React, { useEffect, useState } from "react";
import DoctorCard from "@/components/doctorCard";

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
	const [keyword, setSKeyword] = useState("");
	const [specialist, setSpecialist] = useState("");

	const displayedDoctors = doctors.filter((doctor) => {
		const sLowDocName = doctor.username.toLowerCase();
		const sLowKeyword = keyword.toLowerCase();

		return sLowDocName.includes(sLowKeyword) && doctor.specialist.title.includes(specialist);
	});

	useEffect(() => {
		// Fetch data from the API
		fetch("../../api/doctor")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setDoctors(data.doctors);
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, []);
	return (
		<div className="flex items-center justify-center w-screen px-4 py-4 bg-white h-fit ">
			<form className="w-full max-w-[400px] flex flex-col items-center gap-4 py-4 ">
				<nav className="relative flex items-center justify-center w-full">
					<a href="./home/patient" className="absolute left-0">
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
					<h1 className="text-[#ff5757] text-2xl font-bold">All Doctor</h1>
				</nav>

				<div className="w-full py-5">
					<input
						id="lastName"
						type="text"
						placeholder="Search"
						value={keyword}
						onChange={(e) => setSKeyword(e.target.value)}
						className="bg-[#d9d9d9]/30 h-[60px] px-4 rounded-lg border  text-black w-full outline-none"
					/>
				</div>

				<div className="w-full">
					{displayedDoctors.map((doctor) => (
						<DoctorCard
							key={doctor.userId}
							userId={doctor.userId}
							username={doctor.username}
							price={doctor.price.toLocaleString("id-ID", {
								style: "currency",
								currency: "IDR",
							})}
							specialist={doctor.specialist}
							user={doctor.user}
						/>
					))}
				</div>
			</form>
		</div>
	);
};

export default Doctors;
