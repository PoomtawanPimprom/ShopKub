import prisma from "@/lib/prisma/db";
import StoreSideBar from "../../StoreSideBar";
import { orderItemInterface } from "@/app/interface/orderItemInterface";
import ProductTable from "../productTable";

export default async function HistorySalePage(props: {
  params: Promise<{ id: number }>;
}) {
  const params = await props.params;
  const storeId = Number(params.id);

  const historyProduct = await prisma.orderItem.findMany({
    where: { storeId: storeId },
    select: {
      createdAt:true,
      size: true,
      color: true,
      product: {
        select: {
          image: true,
          name: true,
          price: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen flex relative">
      <StoreSideBar storeId={storeId.toString()} />
      <div className="w-full border p-4">
        <div className="flex flex-col w-full border dark:border-none p-6 rounded-lg bg-white h-full  dark:bg-black dark:border-gray-600 dark:border-x gap-2">
          <div className="text-3xl font-bold">
            <p>ประวัติการขายสินค้า</p>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <ProductTable
              historyProducts={historyProduct as orderItemInterface[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
