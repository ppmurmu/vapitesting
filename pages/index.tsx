import Image from "next/image";
import { Inter } from "next/font/google";
import { Assistant } from "@/components/app/assistant";

const inter = Inter({ subsets: ["latin"] });

const styling = {
  backgroundColor: '#161B5D' ,
 
  
}
export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-12 ${inter.className} `} style={styling}
    >
      <div className="absolute top-0 left-0 m-4">
      <img src="/snacks_logo.png" alt="Logo" className="w-auto h-16" />
    </div>
    
    <div className="text-center">
        <h1 className="text-white text-4xl font-bold">Under Maintenance</h1>
        <p className="text-slate-600">
          {/* You can add more details or description here if needed */}
        </p>
      </div>
    
      {/* <Assistant/> */}
      

      
    </main>
  );
}
