"use client";
import Link from "next/link";
import React from "react";

const Success: React.FC = () => {
	return (
		<div className="bg-white w-screen h-screen flex justify-center items-center px-4">
			{/* <img src={iconSuccess} alt="" /> */}
			<div className="flex flex-col items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="200"
					height="200"
					viewBox="0 0 200 200"
					fill="none"
				>
					<path
						d="M82.0003 12.9C64.8003 16.6 50.8003 24.1 38.2003 36.4C3.00032 70.5 2.00032 126.1 35.9003 161.3C47.9003 173.8 61.0003 181.6 78.1003 186.2C90.1003 189.5 109.9 189.5 121.9 186.2C138.1 181.8 149.5 175.4 161.4 164.1C173.8 152.2 181.5 139 186.2 121.9C189.5 109.9 189.5 90.1 186.2 78.1C181.5 61 173.8 47.8 161.4 35.9C144.4 19.7 126.3 12.2 102.5 11.4C93.3003 11.1 88.5003 11.5 82.0003 12.9ZM117.8 24.6C146 31 168.7 53.7 175.7 82.8C178 92.5 177.7 109.4 175.1 119.5C168.8 143.5 151.4 163 128 172.3C118.7 175.9 110.9 177.3 100 177.3C79.8003 177.3 61.9003 170.4 47.5003 156.8C31.0003 141.4 22.9003 122.9 22.8003 100.5C22.7003 77 30.8003 58.5 48.5003 42.3C66.7003 25.4 92.5003 18.9 117.8 24.6Z"
						fill="#FF5757"
					/>
					<path
						d="M108.001 92.5001C97.3005 103.2 88.0005 112 87.4005 112C86.9005 112 83.8005 109.3 80.5005 105.9C73.0005 98.4001 71.8005 97.7001 68.6005 99.1001C65.8005 100.4 64.6005 103 65.4005 105.8C66.3005 108.7 85.5005 127 87.6005 127C89.6005 127 133.701 83.7001 134.601 80.8001C135.401 78.0001 134.201 75.4001 131.401 74.2001C130.001 73.5001 128.601 73.0001 128.301 73.0001C127.901 73.0001 118.801 81.8001 108.001 92.5001Z"
						fill="#FF5757"
					/>
				</svg>
				<h1 className="text-[#ff5757] text-3xl font-bold">Congratulations</h1>
				<div className=" flexjustify-aroundcontainer w-[400px] text-[#858585]">
					<p className="text-center m-2 text-sm ">
						Congratulations on successfully booking your appointment! We&#39;re looking forward to
						seeing you!
					</p>

					<p className="m-2 pt-7 text-sm text-center">
						For Changes or Cancellations, Please inform the staff.
					</p>
				</div>
				<div className="flex justify-center">
					<Link href={"/homepagepatient"}>
						<button className="bg-[#ff5757] w-[400px] text-white px-4 py-1 rounded-xl mt-3">
							Back to Home
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Success;
