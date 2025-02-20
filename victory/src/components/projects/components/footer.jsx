import React from 'react'
import { MdSportsCricket } from "react-icons/md";

const Footer = () => {
  return (
    <div>
      <section className="w-full h-80 border-t-2 border-[#F2F3F4] bg-slate-400">
        <div className="flex items-center border-b-2 pb-5 border-[#F2F3F4] gap-1 w-[75%] mx-[190px]">
            <MdSportsCricket className="text-xl text-white relative top-3" />
            <p className="relative top-3">
              VICTORY<span className="text-3xl font-light text-white">vault</span>
            </p>
          </div>
          <div className="grid grid-cols-2 text-2xl fon w-[75%] mx-[190px]">
            <div className="font-bold text-[#e3eaf0] py-5">
              <p className="py-3">About</p>
              <p className="py-3">Grievance</p>
              <p className="py-3">Refund Policy</p>
            </div>
            <div className="font-bold text-[#e3eaf0] py-5">
              <p className="py-3">Privacy Policy</p>
              <p className="py-3">Terms and Conditions</p>
              <p className="py-3">Contact Us</p>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Footer
