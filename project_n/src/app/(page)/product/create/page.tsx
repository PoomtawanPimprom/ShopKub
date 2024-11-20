"use client";
//interfaces
import { categoryInterface } from "@/app/interface/categoryInterface";
import { productInterface } from "@/app/interface/productInterface";

//services
import { getAllCategory } from "@/app/service/category/service";
import { CreateProdcut } from "@/app/service/product/service";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const createProductpage = () => {
  const Router = useRouter();

  const [categoryData, setCategoryData] = useState<categoryInterface[]>([]);

  //product
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState<number>(0);

  //inventory
  const [inventory, setInventory] = useState<
    { quantity: number; size: string; color: string }[]
  >([{ quantity: 0, size: "", color: "" }]);

  const fetchDataCategory = async () => {
    const data = await getAllCategory();
    setCategoryData(data);
  };

  const addInventoryRow = () => {
    setInventory([...inventory, { quantity: 0, size: "", color: "" }]);
  };

  const updateInventoryRow = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedInventory = inventory.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setInventory(updatedInventory);
  };

  const onSubmitCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      //product
      name: name,
      description: description,
      price: price,
      storeID: 1,
      categoryID: category,
      image: image,

      //inventory
      inventory: inventory,
    };
    console.log(data);
    await CreateProdcut(data);
    Router.push(`/store/inventory/${1}`);
  };

  useEffect(() => {
    fetchDataCategory();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-[1000px] mx-auto p-4 border-x dark:border-gray-500">
          <div className="Header text-5xl font-bold my-4">
            <p>เพิ่มสินค้า</p>
          </div>
          <div className="flex ">
            <div className="flex flex-col   w-full rounded-xl ">
              <form className="space-y-2" onSubmit={onSubmitCreateProduct}>
                <div className="space-y-2">
                  <p className="font-bold text-2xl">ชื่อสินค้า</p>
                  <input
                    name="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border border-black rounded-lg"
                    placeholder="โปรดระบุชื่อสินค้า"
                  />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-2xl">รายละเอียดสินค้า</p>
                  <textarea
                    rows={5}
                    cols={40}
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 border border-black rounded-lg"
                    placeholder="โปรดระบุรายละเอียดสินค้า"
                  />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-2xl">ราคา</p>
                  <input
                    name="price"
                    onChange={(e) => setPrice(Number(e.target.value))}
                    type="text"
                    className="p-2 border border-black rounded-lg"
                    placeholder="โปรดระบุราคาสินค้า"
                  />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-2xl">สินค้าในสต็อก</p>
                  {inventory.map((item, index) => (
                    <div key={index} className="flex space-x-4">
                      <div>
                        <p>จำนวน</p>
                        <input
                          name={`quantity-${index}`}
                          onChange={(e) =>
                            updateInventoryRow(
                              index,
                              "quantity",
                              Number(e.target.value)
                            )
                          }
                          type="number"
                          className="p-2 border border-black rounded-lg"
                          placeholder="จำนวนสินค้า"
                        />
                      </div>
                      <div>
                        <p>ไซต์</p>
                        <input
                          name={`size-${index}`}
                          onChange={(e) =>
                            updateInventoryRow(index, "size", e.target.value)
                          }
                          type="text"
                          className="p-2 border border-black rounded-lg"
                          placeholder="ขนาดสินค้า"
                        />
                      </div>
                      <div>
                        <p>สี</p>
                        <input
                          name={`color-${index}`}
                          onChange={(e) =>
                            updateInventoryRow(index, "color", e.target.value)
                          }
                          type="text"
                          className="p-2 border border-black rounded-lg"
                          placeholder="สีสินค้า"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addInventoryRow}
                    className="p-2 bg-gray-300 rounded-lg"
                  >
                    เพิ่มตัวเลือก
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-bold">
                    รูปโลโก้ร้านค้าของคุณ
                  </p>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="image-logo"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 120x120px)
                        </p>
                      </div>
                      <input
                        name="image-logo"
                        id="image-logo"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <p>เลือกประเภทสินค้า</p>
                  <select
                    value={category || 0}
                    onChange={(e) => {
                      setCategory(Number(e.target.value));
                    }}
                    className="border rounded-xl p-2"
                  >
                    <option value={0} disabled>
                      เลือกหมวดหมู่
                    </option>
                    {categoryData.map((item, index) => (
                      <>
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button className="flex px-4 py-2 bg-green rounded-xl text-white  font-bold">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default createProductpage;
