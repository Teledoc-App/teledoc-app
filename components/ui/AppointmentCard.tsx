"use client";

import { log } from "console";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { parseISO } from "date-fns";
import RejectReason from "../RejectReason";

interface Appointment {
	statusId: string;
	id: string;
	date: string;
	time: string;
	patient: {
		image: string;
		name: string;
	};
}

export default function AppointmentCard(props: { appointment: Appointment }) {
	const [isOpen, setIsOpen] = useState(false);
	const [rejectionReason, setRejectionReason] = useState("");
	const rejected = "e209365d-44ef-4c5d-8eea-42c827dbaeb1";
	const accepted = "6d86abcc-f29b-4a64-9af4-4b55c4f1ee2b";
	const statusdone = "51571fa1-963b-4c0c-abad-7315d29976c1";

	const [isAccepted, setIsAccepted] = useState<string>(() => {
		return localStorage.getItem(props.appointment.id) || props.appointment.statusId;
	});

	useEffect(() => {
		localStorage.setItem(props.appointment.id, isAccepted);
	}, [isAccepted, props.appointment.id]);

	let now = new Date();

	const isoDateString = props.appointment.date;
	const isoDate = new Date(isoDateString);
	const options = { year: "numeric", month: "long", day: "numeric" };
	const readableDate = isoDate.toLocaleDateString("en-US", options as Intl.DateTimeFormatOptions);

	const accept = async (id: string) => {
		setIsAccepted(accepted);
		const response = await fetch("/api/appointment/" + id, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				statusId: accepted,
			}),
		});
	};

	const reject = async (id: string) => {
		setIsAccepted(rejected);
		const response = await fetch("/api/appointment/" + id, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				rejectionReason: rejectionReason,
				statusId: rejected,
			}),
		});
		setIsOpen(false);
		alert("Successful");
	};

	const done = async (id: string) => {
		const response = await fetch("/api/appointment/" + id, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				statusId: statusdone,
			}),
		});
	};

	//   const reject = async (id: string) => {
	//     try {
	//       const rejectAppointmentUrl = "api/appointment/${id}";

	//       const response = await fetch(rejectAppointmentUrl, {
	//         method: "PATCH",
	//         headers: {
	//           "Content-Type": "application/json",
	//         }
	//         body: JSONawait appointment.update({
	//           where: { id },
	//           data: { status: "e209365d-44ef-4c5d-8eea-42c827dbaeb1" },
	//         });
	//       })

	//       if (response.status === 204) {
	//         return {
	//           status: "success",
	//           message: "Appointment with ID ${id} has been rejected",
	//         };
	//       } else

	//       if
	//     } catch (error) {
	//       console.log(error);
	//     }
	//     setIsAccepted("rejected");
	//   };

	return (
		<div
			className={`flex gap-4 w-full bg-[#d9d9d9]/30 rounded-lg p-6 mb-4 ${
				props.appointment.statusId == "e209365d-44ef-4c5d-8eea-42c827dbaeb1" ? "hidden" : null
			}`}
		>
			{/* PICTURE */}
			{props.appointment.patient?.image == null ? (
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
			) : (
				<div className="w-[85px] h-[85px] rounded-full p-0 bg-white overflow-hidden">
					<img width={85} height={85} src={props.appointment.patient?.image} alt="" />
				</div>
			)}

			{/* INFORMATIONS */}
			<div className="">
				<span className="text-[16px] font-semibold">{props.appointment.patient?.name}</span>
				<p className="text-[12px] text-[#858585] mb-3">
					{readableDate}
					{/* {props.appointment.date} */}
				</p>
				<p className="text-[12px] text-[#858585] mb-3">{props.appointment.time}</p>

				{isAccepted == accepted ? (
					<button
						onClick={() => done(props.appointment.id)}
						className="px-4 py-1 border rounded-full border-[#ff5757] bg-[#ff5757] text-white"
					>
						Done
					</button>
				) : isAccepted == rejected ? (
					<button
						className="px-4 py-1 border rounded-full border-[#ff5757] text-[#ff5757]"
						disabled
					>
						Rejected
					</button>
				) : (
					<div className="flex items-center gap-4">
						<button
							onClick={() => accept(props.appointment.id)}
							className="px-4 py-1 border rounded-full border-[#ff5757] bg-[#ff5757] text-white"
						>
							Accept
						</button>
						{/* <RejectReason appointmentId={props.appointment.id} /> */}

						<button
							onClick={() => setIsOpen(true)}
							className="px-4 py-1 border rounded-full border-[#ff5757] text-[#ff5757]"
						>
							Reject
						</button>

						<Dialog
							open={isOpen}
							onClose={() => setIsOpen(false)}
							className={`bg-black/50 fixed top-0 left-0 w-screen h-screen flex justify-center items-center p-4`}
						>
							<Dialog.Panel className={`bg-white p-8 rounded-lg w-full max-w-[320px]`}>
								<Dialog.Title className={`font-bold text-2xl`}>Reject Reason</Dialog.Title>
								<Dialog.Description className={`mb-8`}>
									Description for reject reason
								</Dialog.Description>

								{/* CHOICES */}
								<div className="grid gap-4 mb-8">
									<button
										onClick={() => setRejectionReason("Full booked at desired time")}
										className={`border ${
											rejectionReason == "Full booked at desired time"
												? "bg-[#ff5757] text-white"
												: "bg-white text-[#ff5757]"
										} border border-[#ff5757] rounded-lg py-2 px-4`}
									>
										Full booked at desired time
									</button>
									<button
										onClick={() => setRejectionReason("Doctor not on duty")}
										className={`border ${
											rejectionReason == "Doctor not on duty"
												? "bg-[#ff5757] text-white"
												: "bg-white text-[#ff5757]"
										} border border-[#ff5757] rounded-lg py-2 px-4`}
									>
										Doctor not on duty
									</button>{" "}
									<button
										onClick={() => setRejectionReason("Out of doctor expertise")}
										className={`border ${
											rejectionReason == "Out of doctor expertise"
												? "bg-[#ff5757] text-white"
												: "bg-white text-[#ff5757]"
										} border border-[#ff5757] rounded-lg py-2 px-4`}
									>
										Out of doctor expertise
									</button>{" "}
									<button
										onClick={() => setRejectionReason("Unavailable")}
										className={`border ${
											rejectionReason == "Unavailable"
												? "bg-[#ff5757] text-white"
												: "bg-white text-[#ff5757]"
										} border border-[#ff5757] rounded-lg py-2 px-4`}
									>
										Unavailable
									</button>
								</div>

								<div className="flex justify-end w-full">
									<button
										className="rounded-lg bg-[#ff5757] text-white px-4 py-2 ml-auto w-full hover:cursor-pointer"
										onClick={() => reject(props.appointment.id)}
										//   disabled={true}
									>
										Confirm
									</button>
								</div>
							</Dialog.Panel>
						</Dialog>

						{/* <button
              onClick={() => reject(props.appointment.id)}
              className="px-4 py-1 border rounded-full border-[#ff5757] text-[#ff5757]"
            >
              Reject
            </button> */}
					</div>
				)}

				{/* {isAccepted !== rejected && isAccepted !== accepted ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => accept(props.appointment.id)}
              className="px-4 py-1 border rounded-full border-[#ff5757] bg-[#ff5757] text-white"
            >
              Accept
            </button>
            <button
              onClick={() => reject(props.appointment.id)}
              className="px-4 py-1 border rounded-full border-[#ff5757] text-[#ff5757]"
            >
              Reject
            </button>
          </div>
        ) : isAccepted == accepted ? (
          <button
            className="px-4 py-1 border rounded-full border-[#ff5757] text-[#ff5757]"
            disabled
          >
            Accepted
          </button>
        ) : (
          <button
            className="px-4 py-1 border rounded-full border-[#ff5757] text-[#ff5757]"
            disabled
          >
            Rejected
          </button>
        )} */}
			</div>
		</div>
	);
}
