"use client";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { useState, ChangeEvent, useEffect } from "react";
import { discountInterface } from "@/app/interface/discountInterface";
import {
  createPromotion,
  deletePromotionById,
  getPromotionAll,
  getPromotionEnadleAll,
  updatePromotionById,
} from "@/app/service/discount/service";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import AdminSideBar from "../../AdminSideBar";

export default function AdminPromotions() {
  const { toast } = useToast();
  const [search, setSearch] = useState<string>("");
  const [promotions, setPromotions] = useState<discountInterface[]>([]);
  const [enablePromotions, setEnablePromotions] = useState<discountInterface[]>([]);
  const [formData, setFormData] = useState<discountInterface>({
    id: 0,
    name: "",
    code: "",
    discountAmount: 0,
    isActive: false,
  });

  // OnChange Search input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredPromotions = promotions.filter(
    (promo) =>
      promo.name.toLowerCase().includes(search.toLowerCase())
  );

  // OnChange input
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Create promotion data
  const onSubmitAddPromotion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      discountAmount: parseInt(formData.discountAmount.toString()),
    };
    await createPromotion(submissionData);
    fetchPromotionData();
    setFormData({
      id: 0,
      name: "",
      code: "",
      discountAmount: 0,
      isActive: false,
    });
    toast({
      title: "อัพเดทข้อมูลเรียบร้อย",
      variant: "success",
    });
  };

  const onSubmitUpdatePromotion = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      console.log(formData);
      await updatePromotionById(formData.id, {
        name: formData.name,
        discountAmount: parseInt(formData.discountAmount.toString()),
        isActive: formData.isActive,
      });
      toast({
        title: "อัพเดทข้อมูลเรียบร้อย",
        variant: "success",
      });
      fetchPromotionData();
      setFormData({
        id: 0,
        name: "",
        code: "",
        discountAmount: 0,
        isActive: false,
      });
    } catch (error: any) {
      console.error("Failed to update promotion:", error.message);
    }
  };

  // Delete promotion
  const deleteDataPromotion = async (id: Number) => {
    // console.log(id);
    await deletePromotionById(id);
    toast({
      title: "ลบข้อมูลเรียบร้อย",
      variant: "success",
    });
    fetchPromotionData();
  };

  // Toggle promotion
  const togglePromotionStatus = async (id: number) => {
    try {
      const updatedPromotions = promotions.map((promo) =>
        promo.id === id ? { ...promo, isActive: !promo.isActive } : promo
      );
      // Set ui status
      setPromotions(updatedPromotions);
      // find id promotion
      const updatedPromo = updatedPromotions.find((promo) => promo.id === id);
      // console.log(updatedPromo?.isActive)
      await updatePromotionById(id, { isActive: updatedPromo?.isActive });
      fetchEnablePromotions()
      if (updatedPromo?.isActive === true) {
        toast({
          title: "ใช้งานโปรโมชั่นนี้",
          variant: "default",
        });
      } else {
        toast({
          title: "ยกเลิกโปรโมชั่นนี้",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Failed to update promotion:", error);
      // Set before value
      setPromotions(promotions);
      toast({
        title: "ใช้งานโปรโมชั่นนี้",
        variant: "destructive",
      });
    }
  };

  // Fetch Data
  const fetchPromotionData = async () => {
    const res = await getPromotionAll();
    setPromotions(res);
  };

  const fetchEnablePromotions = async () =>{
    const res2 = await getPromotionEnadleAll();
    setEnablePromotions(res2);
  }
  useEffect(() => {
    fetchPromotionData();
    fetchEnablePromotions();
  }, []);

  return (
    <section id="admin-promotions" className="min-h-screen  flex">
      <AdminSideBar />
      <div className="container mx-auto px-4 py-6 space-y-6">

        <h1 className="text-3xl font-bold text-center sm:text-left">
          จัดการโปรโมชั่น
        </h1>

        <div className="flex gap-5">
          <form onSubmit={onSubmitAddPromotion} className="space-y-4 dark:bg-zinc-800 p-4 rounded-lg shadow-md w-2/5 mx-auto sm:mx-0">
            <h2 className="text-xl font-semibold">เพิ่มโปรโมชั่น</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  ชื่อโปรโมชั่น
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border rounded-md p-2" required/>
              </div>

              <div>
                <label htmlFor="code" className="block text-sm font-medium">
                  รหัสส่วนลด
                </label>
                <input type="text" name="code" value={formData.code} onChange={handleInputChange} className="w-full border rounded-md p-2"required/>
              </div>

              <div>
                <label htmlFor="discountAmount" className="block text-sm font-medium">
                  ส่วนลด
                </label>
                <input type="number" name="discountAmount" value={formData.discountAmount} onChange={handleInputChange} className="w-full border rounded-md p-2" min={0} required/>
              </div>

            </div>
            <button type="submit" className="w-full py-2 px-4 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition">
              เพิ่มโปรโมชั่น
            </button>
          </form>
          <div className="grid grid-cols-2  gap-4 dark:bg-zinc-800 p-4 rounded-lg shadow-md w-3/5 text-accent-foreground">
            <div className="flex flex-col space-y-4  dark:bg-zinc-700 p-4 rounded-lg shadow-md">
              <h1 className="text-3xl font-semibold">จำนวนโค้ดทั้งหมด</h1>
              <h1  className="text-5xl font-bold">{promotions.length}</h1>
            </div>
            <div className="flex flex-col space-y-4 dark:bg-zinc-700 p-4 rounded-lg shadow-md">
              <h1 className="text-3xl font-semibold">จำนวนโค้ดที่เปิดใช้งาน</h1>
              <h1  className="text-5xl font-bold">{enablePromotions.length}</h1>
            </div>
          </div>
        </div>

        <div className="dark:bg-zinc-800  p-4 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">รายการโปรโมชั่น</h2>

          <div className="mb-4 flex items-center space-x-2 ">
            <div className="relative w-full max-w-md">
              <AiOutlineSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="ค้นหาชื่อโปรโมชั่น..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </div>

          <table className="w-full table-auto dark:bg-zinc-700 rounded-lg  text-accent-foreground">
            <thead>
              <tr className="bg-gray-100 dark:bg-zinc-600   text-sm">
                <th className="border p-2">ชื่อ</th>
                <th className="border p-2">รหัสส่วนลด</th>
                <th className="border p-2">ส่วนลด</th>
                <th className="border p-2">เปิดใช้งาน</th>
                <th className="border p-2 rounded-tr-lg">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredPromotions.map((promo) => (
                <tr key={promo.id} className="text-center text-sm">
                  <td className="border p-2">{promo.name}</td>
                  <td className="border p-2">{promo.code}</td>
                  <td className="border p-2">{promo.discountAmount}</td>
                  <td className="border p-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={promo.isActive}
                        onChange={() => togglePromotionStatus(promo.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                    </label>
                  </td>
                  <td className="border p-2">
                    <div className="flex justify-center gap-2">
                      <Dialog>
                        <DialogTrigger
                          asChild
                          onClick={() => {
                            setFormData(promo);
                          }}
                        >
                          <button className="w-full sm:w-auto px-4 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                            <MdEdit />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>แก้ไขโปรโมชั่น</DialogTitle>
                          </DialogHeader>
                          <form
                            className="space-y-4 bg-white p-4 rounded-lg max-w-xl mx-auto sm:mx-0"
                            onSubmit={onSubmitUpdatePromotion}
                          >
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <div>
                                <label
                                  htmlFor="name"
                                  className="block text-sm font-medium"
                                >
                                  ชื่อโปรโมชั่น
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  className="w-full border rounded-md p-2"
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="discountAmount"
                                  className="block text-sm font-medium"
                                >
                                  ส่วนลด
                                </label>
                                <input
                                  type="number"
                                  name="discountAmount"
                                  value={formData.discountAmount}
                                  onChange={handleInputChange}
                                  className="w-full border rounded-md p-2"
                                  min={0}
                                  required
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <DialogClose asChild>
                                <button
                                  onClick={() => setFormData({
                                    id: 0,
                                    name: "",
                                    code: "",
                                    discountAmount: 0,
                                    isActive: false,
                                  })}
                                  type="button"
                                  className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                  ยกเลิก
                                </button>
                              </DialogClose>
                              <DialogClose asChild>
                                <button
                                  type="submit"
                                  className="px-4 py-2 text-sm text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                  บันทึก
                                </button>
                              </DialogClose>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <button onClick={() => deleteDataPromotion(promo.id)} className="w-full sm:w-auto px-4 py-2 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
