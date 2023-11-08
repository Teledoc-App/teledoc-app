/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AppointmentCard from "@/components/ui/AppointmentCard";
import NotificationCenterDoctor from "@/components/NotificationCenterDoctor";
import useSWR from "swr";
// import { Appointment } from "@prisma/client";

interface Doctor {
  username: string;
  userId: string;
  price: number;
  specialist: Specialist;
  user: User;
}

interface User {
  image: string;
}

interface Specialist {
  id: string;
  title: string;
  doctors: Doctor;
  createdAt: string;
  updatedAt: string;
}

interface Profile {
  name: string;
  image: string;
}

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

export default function HomepagePatient() {
  const router = useRouter();
  const { data: session } = useSession();

  //   const rejectStatus = e209365d-44ef-4c5d-8eea-42c827dbaeb1;
  //   const acceptStatus = 6d86abcc-f29b-4a64-9af4-4b55c4f1ee2b;

  useEffect(() => {
    // console.log(session);
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: string) => console.log(data);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [userProfile, setUserProfile] = useState<Profile>();
  const [searchValue, setSearchValue] = useState("");
  //const [history, setHistory] = useState<Appointment[]>();
  //   const [accepted, setAccepted] = useState();

  // async function fetchHistory() {
  //   try {
  //     const response = await axios.get("../../api/users/me");
  //     console.log(response.data.data.user.doctorAppointments);

  //     setHistory(response.data.data.user.doctorAppointments);

  //     if (response.status === 200) {
  //     }
  //   } catch (error) {
  //     console.log("Error fetching appointment history:", error);
  //   }
  // }

  const { data: history } = useSWR("../../api/users/me", (url) =>
    axios.get(url).then((res) => res.data.data.user.doctorAppointments), {
      revalidateOnFocus: true, 
      refreshInterval: 1000, 
    }
  );

  useEffect(() => {
    //fetchHistory();
    // console.log(history);
  }, []);

  // const getUserProfile = async () => {
  //   const response = await axios.get("../api/users/me");
  //   setUserProfile(response.data.data.user);
  // };
  const { data: getUserProfile } = useSWR("../../api/users/me", (url) =>
    axios.get(url).then((res) => res.data), {
      revalidateOnFocus: true, 
      refreshInterval: 1000, 
    }
  );
  // const getDoctors = async () => {
  //   try {
  //     const response = await axios.get("../api/doctor");
  //     setDoctors(response.data.doctors);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const { data: getDoctors } = useSWR("/api/doctor", (url) =>
    axios.get(url).then((res) => res.data.doctors), {
      revalidateOnFocus: true, 
      refreshInterval: 1000, 
    }
  );

  // const getSpecialists = async () => {
  //   try {
  //     const response = await axios.get("../api/specialist");
  //     setSpecialists(response.data.specialist);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const { data: getSpecialists } = useSWR("/api/specialist", (url) =>
  axios.get(url).then((res) => res.data.specialist), {
		revalidateOnFocus: true, 
		refreshInterval: 1000, 
	}
);


  useEffect(() => {
    getDoctors();
    getSpecialists();
    getUserProfile();
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.username.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex justify-center w-screen">
      <div className="bg-white w-screen max-w-[425px] h-fit flex flex-col justify-center items-center px-4 py-8 overflow-y-scroll">
        {/* PROFILE */}
        <nav className="flex items-center w-full gap-4 mb-8">
          {/* PICTURE */}
          <div
            onClick={() => router.replace("../../profile/doctor")}
            className="w-[70px] h-[70px] rounded-full bg-red-200 overflow-hidden"
          >
            <img width={85} height={85} src={userProfile?.image} alt="" />
          </div>
          <div>
            <p className="text-[#858585] text-[14px]">Hi, welcome back</p>
            <span className="text-black font-semibold text-[18px]">
              {userProfile?.name}
            </span>
          </div>

          <NotificationCenterDoctor />
        </nav>

        {/* SEARCH */}
        <form onSubmit={handleSubmit(() => onSubmit)} className="w-full mb-8">
          <input
            type="search"
            placeholder="Search a doctor"
            // {...register("search")}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-[#d9d9d9]/30 border border-[#d9d9d9] w-full h-[60px] rounded-lg px-4 outline-none hover:border-[#ff5757]"
          />
        </form>

        <section className="w-full">
          <div className="flex items-center justify-between w-full mb-2">
            <h2 className="text-[24px] text-black font-semibold">
              List Appointment
            </h2>
          </div>
          {/* DOCTOR LIST */}
          <div>
            {history?.map((appointment: Appointment, index: string) => (
              <AppointmentCard key={index} appointment={appointment} />
            ))}

            {/* CARD */}
          </div>
        </section>
      </div>
    </div>
  );
}
