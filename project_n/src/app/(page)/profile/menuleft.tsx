"use client";
import React from "react";
import { BsPersonVcard } from "react-icons/bs";
import { IoIosGift } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import Image from "next/image";
import tree from "../../../../public/pngtree.png";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

type MenuLeftProps = {
  profile?: string | null;
  checkCreatedStore: string | null | undefined;
};

export default function MenuLeft(props: MenuLeftProps) {
  return (
    <div className="flex flex-col gap-5 lg:w-1/4  ">
      <div className="max-w-sm mx-auto w-60 text-center border-0 shadow-md border-black rounded-xl px-4 py-3 gap-2 lg:flex lg:mx-0 lg:border lg:w-full lg:shadow-none lg:text-start lg:space-y-0 lg:space-x-6">
        <Image
          src={tree}
          alt="Profile"
          className="block mx-auto w-24 h-24  rounded-full border border-black object-cover lg:w-14 lg:h-14"
          width={200}
          height={200}
        />
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">Thanawat</p>
          <p className="text-slate-500 font-medium">Font End Engineering</p>
        </div>
      </div>

      <div className="flex flex-col border-0 shadow-md border-black rounded-xl pl-2 pr-4 py-4 gap-3 sm:border sm:shadow-none">
        <ul className="gap-2 ">
          <div className="relative">
            <BsPersonVcard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <li className="pl-10 text-1  hover:text-slate-500">
              <Link href="/profile">จัดการบัญชี</Link>
            </li>
          </div>
          <li className="pl-10 text-1 hover:text-slate-600">
            <Link href="/profile/address">จัดการที่อยู่</Link>
          </li>
          <li className="pl-10 text-1 hover:text-slate-600">
            <Link href="/profile/password">เปลี่ยนรหัสผ่าน</Link>
          </li>
        </ul>
        <ul className="gap-2">
          <div className="relative">
            <IoIosGift className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <li className="pl-10 text-1 hover:text-slate-600">
              <Link href="/profile/purchase">คำสั่งซื้อสินค้า</Link>
            </li>
          </div>
        </ul>
        <ul className="gap-2">
          <div className="relative">
            <MdPayment className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <li className="pl-10 text-1 hover:text-slate-600">
              <Link href="/profile/voucher">คูปอง</Link>
            </li>
          </div>
        </ul>
      </div>
      {props.checkCreatedStore === "" && (
        <Link
          href="/store/create"
          className="flex items-center justify-center 
        bg-emerald-500 
        text-white 
        px-6 py-3 
        rounded-lg 
        shadow-lg 
        hover:bg-emerald-600 
        transition-all 
        duration-300 
        transform 
        hover:scale-105 
        hover:shadow-xl 
        active:scale-95"
        >
          <PlusCircle className="mr-2 w-6 h-6" />
          <span className="font-bold text-lg">สร้างร้านค้าใหม่</span>
        </Link>
      )}
      {/* store create */}
    </div>
  );
}
