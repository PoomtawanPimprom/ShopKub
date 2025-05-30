"use client";
import React, { useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { userInterface } from "@/app/interface/userInterface";
import { useSearchParams } from "next/navigation";
import Table from "@/app/component/table/Table";
import TableHeader from "@/app/component/table/TableHeader";
import TableRow from "@/app/component/table/TableRow";
import TableHead from "@/app/component/table/TableHead";
import TableBody from "@/app/component/table/TableBody";
import TableData from "@/app/component/table/Tabledata";
import Input from "@/app/component/Input";
import Link from "next/link";
import { UpdateRole_Dialog } from "./component/updateRole-dialog";
import { roleInterface } from "@/app/interface/roleInterface";
import { useUser } from "@/app/context/userContext";

type prop = {
  userData: userInterface[];
  role: roleInterface[];
};

const DataAdminTable = ({ userData, role }: prop) => {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      {/* search */}
      <div className="flex justify-between ">
        <div className="flex gap-2">
          <Input
            placeholder=""
            value={search}
            onChange={handleOnChange}
            name="search"
            type=""
          />
          <Link
            className="flex text-lg font-semibold px-6 py-2 bg-primary text-white rounded-lg text-center items-center"
            href={`/admin/manage/admins?search=${search}`}
          >
            ค้นหา
          </Link>
          <Link
            className="flex text-lg font-semibold px-6 py-2 bg-black   text-white rounded-lg text-center items-center text-nowrap"
            href={`/admin/manage/admins`}
          >
            reset
          </Link>
        </div>
        <div className="flex"></div>
      </div>

      {/* table */}
      <div className="w-full overflow-x-auto rounded-lg border">
        <div className="min-w-full inline-block align-middle  rounded-lg">
          <div className="overflow-hidden  rounded-lg">
            {/* Desktop view */}
            <Table className="w-full text-sm text-left rtl:text-right text-accent-foreground hidden md:table">
              <TableHeader className="text-sm 2xl:text-base  text-gray-800  bg-gray-50 dark:bg-black dark:text-accent-foreground">
                <TableRow className="font-semibold">
                  <TableHead className="px-6 py-3 text-left text-sm">
                    ชื่อผู้ใช้งาน
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm">
                    อีเมล
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm">
                    ตำแหน่ง
                  </TableHead>
                  <TableHead className="px-6 py-3 text-right text-sm">
                    แก้ไข
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.map((item, index) =>
                  item.id === user?.id ? null : (
                    <TableRow
                      key={index}
                      className="bg-white border-b dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-600"
                    >
                      <TableData className="px-6 py-4">{item.name}</TableData>
                      <TableData className="px-6 py-4">{item.email}</TableData>
                      <TableData className="px-6 py-4">
                        {item.role?.name}
                      </TableData>
                      <TableData className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <UpdateRole_Dialog id={item.id} role={role} />
                        </div>
                      </TableData>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>

            {/* Mobile view */}
            <div className="md:hidden">
              {userData.map((item) => (
                <div key={item.id} className="bg-white p-4 border-b">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">รหัส: {item.id}</span>
                    <span className="text-gray-600">ชื่อผู้ใช้งาน: {item.name}</span>
                  </div>
                  <div className="mb-3">
                    <span className="text-gray-600">อีเมล: {item.email}</span>
                  </div>
                  <UpdateRole_Dialog id={item.id} role={role} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataAdminTable;
