"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react"

interface Profile {
	name: string;
	image: string;
}

const DoctorProfile: React.FC = () => {
	const [userProfile, setUserProfile] = useState<Profile>();
	const getUserProfile = async () => {
		const response = await axios.get("../../api/users/me");
		console.log(response.data.data.user);

		setUserProfile(response.data.data.user);
	};

	useEffect(() => {
		getUserProfile();
	}, []);
	return (
		<div className="flex items-center justify-center w-screen px-4 py-4 bg-white h-fit ">
			<form className="w-full max-w-[400px] flex flex-col items-center gap-4 py-4 ">
				<nav className="relative flex items-center justify-center w-full">
					<a href="/home/doctor" className="absolute left-0">
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
					<h1 className="text-[#ff5757] text-2xl font-bold">Profile</h1>
				</nav>
				<div className="w-[150px] h-[150px] m-5 rounded-full">
					<Image
						className="rounded-full "
						src={userProfile?.image || "https://i.pravatar.cc/200"}
						alt="Profile picture"
						width={200}
						height={200}
					/>
				</div>

				<div>
					<h1 className="text-[#000000] text-xl font-bold">{userProfile?.name}</h1>
				</div>

				<Link href="../editprofile">
					<div className="flex  items-center pt-5 w-[400px]">
						<div className="flex items-center">
							<svg
								width="45"
								height="45"
								viewBox="0 0 45 45"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle cx="22.5" cy="22.5" r="22.5" fill="#FF5757" />
								<path
									d="M23 13C28.5228 13 33 17.4771 33 23C33 28.5228 28.5228 33 23 33C17.4771 33 13 28.5228 13 23C13 17.4771 17.4771 13 23 13ZM23.1597 27C21.1243 27 19.2918 27.8687 18.0128 29.2556C19.3804 30.3474 21.114 31 23 31C24.9695 31 26.7727 30.2883 28.1666 29.1081C26.8956 27.8074 25.1219 27 23.1597 27ZM23 15C18.5817 15 15 18.5817 15 23C15 24.8106 15.6015 26.4807 16.6156 27.8214C18.2564 26.0841 20.5814 25 23.1597 25C25.6441 25 27.8933 26.0066 29.5218 27.6342C30.4526 26.3267 31 24.7273 31 23C31 18.5817 27.4183 15 23 15ZM23 16C25.2091 16 27 17.7909 27 20C27 22.2091 25.2091 24 23 24C20.7909 24 19 22.2091 19 20C19 17.7909 20.7909 16 23 16ZM23 18C21.8954 18 21 18.8954 21 20C21 21.1046 21.8954 22 23 22C24.1046 22 25 21.1046 25 20C25 18.8954 24.1046 18 23 18Z"
									fill="white"
								/>
							</svg>
							<div className="ml-5">
								<h1 className="text-[#000000] text-xl font-bold">Personal Detail</h1>
							</div>
						</div>
					</div>
				</Link>

				<div className="flex  items-center w-[400px]">
					<button onClick={() => signOut()}>
						<div className="flex items-center">
							<svg
								width="45"
								height="45"
								viewBox="0 0 45 45"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle cx="22.5" cy="22.5" r="22.5" fill="#FF5757" />
								<path
									d="M16 33C15.4477 33 15 32.5523 15 32V14C15 13.4477 15.4477 13 16 13H30C30.5523 13 31 13.4477 31 14V17H29V15H17V31H29V29H31V32C31 32.5523 30.5523 33 30 33H16ZM29 27V24H22V22H29V19L34 23L29 27Z"
									fill="white"
								/>
							</svg>

							<div className="ml-5">
								<h1 className="text-[#000000] text-xl font-bold">Logout</h1>
							</div>
						</div>
					</button>
				</div>
			</form>
		</div>
	);
};
export default DoctorProfile;
