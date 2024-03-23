'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export default function Home() {
  const [regNum, setRegNo] = useState("");
  const [seat, setSeat] = useState<null | string>(null);
  const [allSeats,setAllSeats]=useState<any[]>([]);
  const cols=Array.from({length: 44}, (_, i) => i + 1)
  const rows=Array.from({length: 33}, (_, i) => i + 1)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/book", { regNum });
      setSeat(JSON.stringify(res.data.seat));
      setRegNo("");
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  };
  useEffect(()=>{
    const f=async()=>{
      const res = await axios.get("/api/book");
      const all=res.data.seats.map((seat:any,idx:number)=>{
        if(seat.isBooked)
        return (seat.seat)
      })
      setAllSeats(all)
      console.log(all)
    }
    f();
  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20 gap-[1rem]">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={regNum}
          onChange={(e) => setRegNo(e.target.value)}
          placeholder="Enter reg number"
        />
        <button type="submit">Submit</button>
      </form>
      <section className="w-full grid text-[4px] overflow-x-scroll gap-[0.5rem]" style={
        {
          display:'grid',
          gridTemplateColumns: 'repeat(44, minmax(0, 1fr))'
        }
      }>
     
      {
        rows.map((row:number,idxR:number)=>{
         return (
          cols.map((col:number,idxC:number)=>{
           if(allSeats?.includes(`R${row}C${col}`)){
            return (
              <div key={row+col} className={` inline aspect-square w-[10px] border-[1px] border-[#000] bg-black `} data-seat={`R${row}C${col}`}>     
              </div>
            )
           }
            return (
              <div key={row+col} className={` inline aspect-square w-[10px] border-[1px] border-[#000] `} data-seat={`R${row}C${col}`}>     
              </div>
            )
          })
         )
        })
      }
      </section>
      {seat && <div>{seat}</div>}
    </main>
  );
}