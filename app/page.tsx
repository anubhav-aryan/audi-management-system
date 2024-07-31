"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { ConvocationTable } from "@prisma/client";

function Navbar() {
  return (
    <nav className="w-full flex bg-black justify-between items-center rounded-[1rem] border-[2px] border-gray-500 px-[1rem]">
      <Image width={300} height={300}  src={"/VIT.svg"} alt="VIT LOGO" />
      <h1 className="text-white md:text-3xl text-lg">Convocation Details</h1>
      <Image width={150} height={150} src={"/DSW_LOGO.webp"} alt="DSW LOGO" />
    </nav>
  );
}

export default function Home() {
  const [regNum, setRegNo] = useState("");
  const [proctor, setProctor] = useState<null | ConvocationTable>(null);
  const [allSeats, setAllSeats] = useState<any[]>([]);
  const cols = Array.from({ length: 44 }, (_, i) => i + 1);
  const rows = Array.from({ length: 33 }, (_, i) => i + 1);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/find", { regNum });
      setProctor(res.data.proctor as ConvocationTable);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  // useEffect(() => {
  //   const f = async () => {
  //     const res = await axios.get("/api/book");
  //     const all = res.data.seats.map((seat: any, idx: number) => {
  //       if (seat.isBooked) return seat.seat;
  //     });
  //     setAllSeats(all);
  //     console.log(all);
  //   };
  //   f();
  // }, []);

  return (
    <div className=" bg-black min-h-screen ">
      <Navbar />

      <div className="flex flex-col items-center justify-center p-[1rem] h-screen -translate-y-32 gap-12">
        <div className="text-2xl font-semibold text-center text-white">
          Kindly Enter Your Registration Number
        </div>
        <form onSubmit={handleSubmit}>
          <div className=""></div>
          <input
            type="text"
            value={regNum}
            onChange={(e) => setRegNo(e.target.value)}
            placeholder="Enter Registration Number"
            className="w-fit bg-black rounded-[1rem] px-[1rem] text-white border border-b border-neutral-500 p-1"
          />
          <button
            type="submit"
            className="text-white ml-[1rem] rounded-[1rem] border-[2px] border-gray-500 px-[1rem]"
          >
            Submit
          </button>
        </form>
        {proctor && (
          <div className="text-white flex flex-col gap-4 border border-b border-neutral-500 p-4 rounded-lg">
            <div>Your convocation number is: {proctor.convocationNum}</div>
            <div>Your session is: {proctor.session}</div>
            <div>Your proctor programme group is: {proctor.programmeGroup}</div>
            <div>Your programme name is: {proctor.programmeName}</div>
            <div>Your school is: {proctor.schoolName}</div>
          </div>
        )}
      </div>
    </div>
  );
}
