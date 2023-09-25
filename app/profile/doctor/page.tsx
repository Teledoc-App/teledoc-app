"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CurrencyInput from 'react-currency-input-field';
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import useSWR from "swr";
import { useState } from "react";
import Image from "next/image";
import MoonLoader from "react-spinners/MoonLoader";
export default function EditAsset({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [disableSubmit, setDisableSubmit] = useState(false);

  const currentDate = new Date().toISOString().split(".")[0];

  if (status == "unauthenticated") {
    redirect("/login");
  }

  // Fetching data
  const fetchData = (url: string) =>
    axios
      .get(url)
      .then((data) => {
        return data.data;
      })
      .catch((error) => {
        throw new Error("Failed fetching data");
      });
  const { data, isLoading } = useSWR(
    `/api/users/assets/${params.id}`,
    fetchData
  );

  // Yup & react hook form setup
  const schema = yup.object({
    description: yup.string().required("Description required"),
    endTime: yup
      .date()
      .min(currentDate, "Invalid date (date is older than current date/time)")
      .required("End time required")
      .typeError("Invalid date"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      description: !data ? "" : data.description,
      endTime: !data ? "" : data.endTime.split(".")[0].slice("", -3),
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  // Handle submit
  const onSubmit = async (data: any) => {
    const formatDate = new Date(data.endTime).toISOString();

    try {
      setDisableSubmit(true);
      const response = await axios.patch(`/api/users/assets/${params.id}`, {
        description: data.description,
        endTime: formatDate,
      });

      router.push("/profile/myAssets");
    } catch (error) {
      setDisableSubmit(false);
      throw new Error("Failed to update asset");
    }
  };

  // Handle delete
  const onDelete = async () => {
    try {
      setDisableSubmit(true);
      const response = await axios.delete(`/api/users/assets/${params.id}`);

      router.push("/profile/myAssets");
    } catch (error) {
      setDisableSubmit(false);
      throw new Error("Failed to deletxse asset");
    }
  };

  return (
    <div className="w-full max-w-7xl flex p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5 text-lg md:text-xl"
      >
        <h1 className="text-4xl font-bold py-4 text-[#203C59] md:text-5xl">
          
        </h1>

        <div className="w-full flex flex-col-reverse gap-5 md:flex-row">
          <div className="w-full flex flex-col gap-5 md:w-1/2">
            <div className="flex flex-col gap-1 md:w-3/4">
              <label htmlFor="name">Asset Name</label>
              <p className="font-bold">{!data ? "..." : data.name}</p>
            </div>

            <div className="flex flex-col gap-1 md:w-3/4">
              <label htmlFor="description">Description</label>
              {!data ? (
                <textarea
                  rows={9}
                  disabled
                  className="resize-none text-base px-3 py-2 border rounded-md"
                />
              ) : (
                <textarea
                  rows={9}
                  {...register("description")}
                  className="resize-none text-base px-3 py-2 border border-black rounded-md"
                />
              )}
              <span className="text-sm text-rose-500">
                {errors.description?.message?.toString()}
              </span>
            </div>

            <div className="flex flex-col gap-1 md:w-3/4">
              <label htmlFor="openingPrice">Starting Price</label>
              <CurrencyInput className="text-black" intlConfig={{ locale: 'id-ID', currency: 'IDR' }} />
              {/* <p className="font-bold">
                {!data
                  ? "Rp. ..."
                  : indonesianCurrency.format(data.openingPrice)}
              </p> */}
            </div>

            <div className="flex flex-col gap-1 md:w-3/4">
              <label htmlFor="endTime">Auction End Date</label>
              {!data ? (
                <input
                  type="datetime-local"
                  disabled
                  className="px-3 py-2 border rounded-md"
                />
              ) : (
                <input
                  type="datetime-local"
                  {...register("endTime")}
                  className="px-3 py-2 border border-black rounded-md"
                />
              )}
              <span className="text-sm text-rose-500">
                {errors.endTime?.message?.toString()}
              </span>
            </div>

            {disableSubmit ? (
              <>
                <button
                  disabled
                  className="w-fit px-8 py-3 rounded-md bg-[#EAC066]"
                >
                  Edit Asset
                </button>

                <button
                  disabled
                  className="w-fit px-8 py-3 mt-10 rounded-md bg-[#FF5959]"
                >
                  Delete Asset
                </button>
              </>
            ) : (
              <>
                {!data ? (
                  <div className="w-1/3 p-3">
                    <MoonLoader />
                  </div>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="w-fit px-8 py-3 rounded-md bg-[#EAC066]"
                    >
                      Edit Asset
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete()}
                      className="w-fit px-8 py-3 mt-10 rounded-md bg-[#FF5959]"
                    >
                      Delete Asset
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          <div className="w-full flex flex-col gap-5 md:w-1/2">
            <div className="w-60 h-60 flex items-center justify-center border overflow-auto">
              {!data ? (
                "..."
              ) : (
                <Image
                  src={data.imageUrl}
                  width={500}
                  height={500}
                  alt={data.name + " image"}
                />
              )}
            </div>

            <div className="flex flex-col gap-1 overflow-x-auto md:w-3/4">
              <label htmlFor="imageUrl">Image Url</label>
              <p className="font-bold">{!data ? "..." : data.imageUrl}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}