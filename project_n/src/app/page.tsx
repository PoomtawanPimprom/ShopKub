import prisma from "@/lib/prisma/db";
import ShowBanner from "./component/ShowBanner";
import ProductCard from "./component/productCard";
import Navbar from "./component/navbar";
import { Box, Store } from "lucide-react";
import { productInterface } from "./interface/productInterface";
import { storeInterface } from "./interface/storeInterface";
import StoreBox from "./(page)/product/component/StoreBox";
import { generateKey } from "@/lib/utils";
import WelcomeBanner from "./component/WelcomBanner";

const banners = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Up to 50% off on summer essentials",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out our latest products",
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "Special Offer",
    description: "Free shipping on orders over $50",
    color: "bg-green-500",
  },
];

export default async function Home(
  props: {
    searchParams: Promise<{ search: string | "" }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.search;
  const products = (await prisma.product.findMany({
    where: { name: { contains: search },deletedAt: null },
    take:20
  })) as productInterface[];

  const stores = (await prisma.store.findMany({
    where: { name: { contains: search } },
  })) as storeInterface[];

  // ตรวจสอบว่ามีการค้นหาหรือไม่
  const isSearching = search?.length > 0;
  // ตรวจสอบว่ามีผลลัพธ์หรือไม่
  const hasProducts = products.length > 0;
  const hasStores = stores.length > 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-black ">
        {!isSearching ? (
          // แสดงหน้าปกติเมื่อไม่มีการค้นหา
          (<>

            <WelcomeBanner />
            <ShowBanner banners={banners} />
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex w-full text-3xl font-bold space-x-2 items-center mb-2">
                <Box />
                <p>สินค้า</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard product={product} key={index} />
                ))}
              </div>
            </div>
          </>)
        ) : (
          // แสดงผลการค้นหา
          (<div className="max-w-7xl mx-auto px-4 py-6">
            {hasProducts ? (
              // แสดงสินค้าที่ค้นพบ
              (<>
                <div className="flex w-full text-3xl font-bold space-x-2 items-center mb-2">
                  <Box />
                  <p>สินค้าที่ค้นพบ</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product, index) => (
                    <ProductCard product={product}  key={product.id} />
                  ))}
                </div>
              </>)
            ) : (
              // แสดงข้อความเมื่อไม่พบสินค้า
              (<>
                <div className="flex w-full text-3xl font-bold space-x-2 items-center mb-2">
                  <Box />
                  <p>สินค้าที่ค้นพบ</p>
                </div>
                <div className="text-center py-10">
                  <p className="text-xl text-gray-600">
                    ไม่พบสินค้าที่คุณค้นหา "{search}"
                  </p>
                </div>
              </>)
            )}
            {hasStores && (
              // แสดงร้านค้าที่ค้นพบ (ถ้ามี)
              (<div className="mt-8">
                <div className="flex w-full text-3xl font-bold space-x-2 items-center mb-2">
                  <Store />
                  <p>ร้านค้าที่ค้นพบ</p>
                </div>
                <div className="grid grid-cols-1">
                  {stores.map((store) => (
                    <>
                      <StoreBox store={store} key={generateKey()} />
                    </>
                  ))}
                </div>
              </div>)
            )}
          </div>)
        )}
      </div>
    </>);
}
