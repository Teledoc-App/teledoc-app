import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function RejectReason(props: { appointmentId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const rejected = "e209365d-44ef-4c5d-8eea-42c827dbaeb1";

  const reject = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/appointment/" + props.appointmentId, {
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
    } catch (error) {}
    // console.log(response);
  };

  return (
    <>
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
        <Dialog.Panel
          className={`bg-white p-8 rounded-lg w-full max-w-[768px]`}
        >
          <Dialog.Title className={`font-bold text-2xl`}>
            Reject Reason
          </Dialog.Title>
          <Dialog.Description className={`mb-8`}>
            Description for reject reason
          </Dialog.Description>

          {/* CHOICES */}
          <div className="grid gap-4 lg:grid-cols-2 mb-8">
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

          <div className="w-full flex justify-end">
            <button
              className="rounded-lg bg-[#ff5757] text-white px-4 py-2 ml-auto w-full hover:cursor-pointer"
              onClick={() => reject()}
              //   disabled={true}
            >
              Confirm
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* {isOpen && (
        <div className="bg-black/50 fixed w-screen h-screen top-0 left-0 flex justify-center items-center">
          <div className="bg-white p-8 flex flex-col gap-4">
            <h3 className="">Reason</h3>

          </div>
        </div>
      )} */}
    </>
  );
}
