'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
function Navbar(){
  return (
    <nav className="w-full flex bg-black justify-between items-center rounded-[1rem] border-[2px] border-gray-500 px-[1rem]">
     <Image width={68} height={68} src={"/VIT.svg"} alt="VIT LOGO"/>
     <h1 className="text-white text-3xl">University Day</h1>
     <Image width={68} height={68} src={"/DSW_LOGO.webp"} alt="DSW LOGO"/>
    </nav>
  )
}

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
    <main className="flex min-h-screen flex-col items-center justify-between p-[1rem] gap-[1rem] bg-black">
      <Navbar/>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={regNum}
          onChange={(e) => setRegNo(e.target.value)}
          placeholder="Enter reg number"
          className="w-fit bg-black rounded-[1rem] px-[1rem] text-white"
        />
        <button type="submit" className="text-white ml-[1rem] rounded-[1rem] border-[2px] border-gray-500 px-[1rem]">Submit</button>
      </form>
      <section className="w-full grid  overflow-x-scroll gap-[10px]" style={
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
              <div className="flex flex-col justify-center items-center gap-[8px] w-fit aspect-square">
  <div key={row+col} className={` inline aspect-square w-[14px]   border-[1px] text-white border-[#000]  ${seat==`R${row}C${col}`?'bg-blue-700':'bg-blue-300'}`} data-seat={`R${row}C${col}`}>     
  
             </div>
             <p className="text-white text-[.4rem]">{`R${row}C${col}`}</p>
              </div>
            
            )
           }
            return (
              <div className="flex flex-col justify-center items-center gap-[5px] w-fit aspect-square">
                <div  key={row+col} className={` inline aspect-square w-[14px]  border-[1px] text-white border-blue-300 `} data-seat={`R${row}C${col}`}>     
                
             </div>
             <p className="text-white text-[.4rem]">{`R${row}C${col}`}</p>
              </div>
            )
          })
         )
        })
      }
      </section>
      {seat && <div className="text-white">Your seat is:{seat}</div>}
    </main>
  );
}