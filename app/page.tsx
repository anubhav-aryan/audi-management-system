'use client'
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function Home() {
  const [regNo, setRegNo] = useState("");
  const [seat, setSeat] = useState<null | string>(null);
  const router=useRouter()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/book", { regNo });
      setSeat(res.data.seat);
      setRegNo("");
      router.push("/result")
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          placeholder="Enter reg number"
        />
        <button type="submit">Submit</button>
      </form>
      {seat && <div>{JSON.stringify(seat)}</div>}
    </main>
  );
}