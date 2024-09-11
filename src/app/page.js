import Image from "next/image";
import sky from "../app/public/images/sky.jpg"
import weather from "../app/public/images/weather1.jpg"
import weather2 from "../app/public/images/weather2.jpg"

export default function Home() {
  return (
    <div className="relative w-screen h-screen">
      <Image
        src={weather2}
        layout="fill"
        objectFit="cover"
        alt="Sky"
        className="absolute inset-0 z-[-1]"
      />
      <main className="w-screen h-screen flex">
        <div className="bg-white/10 backdrop-blur-lg w-full h-full p-10 flex justify-center items-center">
          {/* Konten aplikasi di sini */}
          {/* <h1 className="text-3xl text-black">Weather App</h1> */}
          <div className="relative">
            <Image
              src={weather2}
              objectFit="contain"
              alt="Sky"
              width={2000}
              className="inset-0 w-[1500px] h-[400px] object-cover rounded"
            />
            <div className="absolute top-5 left-5">
              <div className="flex w-full justify-between gap-5">
              <input type="text" placeholder="Search locations" className="bg-transparent text-white text-3xl border-none outline-none placeholder-gray-400"/>
              </div>
            </div>
            {/* Current Location */}
            <div className="absolute top-10 right-10 text-white flex flex-col justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 text-white text-right">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <h3 className="text-xl">Jakarta, IDN</h3>
              <p className="text-xl">13:15</p>
            </div>
            <div className="bg-white/20 backdrop-blur-xl flex w-full h-28 rounded-bl rounded-br flex-wrap divide-y md:flex-nowrap md:divide-x md:divide-y-0 overflow-auto">
              <div className="w-2/6 flex justify-center items-center gap-5 p-4">
                <div className="flex flex-col">
                  <h1 className="text-center text-6xl text-white">82°</h1>
                  <span className="bg-gray-400 rounded-full px-5 text-white">Monday 27th</span>
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-16 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
                  <p className="text-white text-sm font-semibold">4mph / 67°</p>
                </div>
              </div>
              <div className="w-4/6 flex justify-between md:divide-x md:divide-y-0">
                <div className="flex w-1/6 flex-col items-center justify-center gap-2">
                  <span className="rounded-full px-3 py-1 bg-gray-400 uppercase text-xs text-white font-semibold">Tue</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                  </svg>
                  <span className="text-white">28°</span>
                </div>
                <div className="flex w-1/6 flex-col items-center justify-center gap-2">
                  <span className="rounded-full px-3 py-1 bg-gray-400 uppercase text-xs text-white font-semibold">Wed</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                  </svg>
                  <span className="text-white">28°</span>
                </div>
                <div className="flex w-1/6 flex-col items-center justify-center gap-2">
                  <span className="rounded-full px-3 py-1 bg-gray-400 uppercase text-xs text-white font-semibold">Thu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                  </svg>
                 <span className="text-white">28°</span>
                </div>
                <div className="flex w-1/6 flex-col items-center justify-center gap-2">
                  <span className="rounded-full px-3 py-1 bg-gray-400 uppercase text-xs text-white font-semibold">Fri</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                  </svg>
                 <span className="text-white">28°</span>
                </div>
                <div className="flex w-1/6 flex-col items-center justify-center gap-2">
                  <span className="rounded-full px-3 py-1 bg-gray-400 uppercase text-xs text-white font-semibold">Sat</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                  </svg>
                 <span className="text-white">28°</span>
                </div>
                <div className="flex w-1/6 flex-col items-center justify-center gap-2">
                  <span className="rounded-full px-3 py-1 bg-gray-400 uppercase text-xs text-white font-semibold">Sun</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                  </svg>
                 <span className="text-white">28°</span>
                </div>
             </div>
            </div>
          </div>
        </div>
      </main>
  </div>
  );
}
