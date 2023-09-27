import React from "react";
import Link from "next/link";

interface specialistProps {
	id: string;
	title: string;
}

interface userProps {
	image: string;
}

interface listDoctorProps {
	userId: string;
	username: string;
	price: any;
	specialist: specialistProps;
	user: userProps;
}

const listDoctors: React.FC<listDoctorProps> = ({ userId, username, price, specialist, user }) => {
	return (
		<div className="flex justify-center items-center">
			<Link rel="stylesheet" href={`/doctors/appointment/${userId}`}>
				<div className="container flex bg-[#d9d9d9]/30 h-[120px] w-[400px]  px-4 rounded-lg border text-gray-400 outline-none">
					<div className="p-2 flex items-center">
						<img
							className="w-20 h-20 rounded-full"
							src={
								user.image ||
								"https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg"
							}
							alt="Profile picture"
							width={200}
							height={200}
						/>
						<div className="p-7">
							<h1 className="text-[#000000] text-xl font-bold">{username}</h1>
							<p className="text-[#858585] text-m">{specialist.title}</p>

							{/* <button className="bg-[#ff5757] text-white px-4 py-1 rounded-2xl mt-3">Book</button> */}
							<p className="text-[#ff5757] font-bold text-m mt-5">Rp. {price}</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default listDoctors;
