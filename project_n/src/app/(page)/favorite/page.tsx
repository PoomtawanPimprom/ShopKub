import prisma from "@/lib/prisma/db";
import ProductInfoCard from "./ProductInfoCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { favoriteInterface } from "@/app/interface/favoriteInterface";
import { redirect } from "next/navigation";

export default async function favoriteByUserIdPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userId = Number(session?.user.id);
  const favoriteData = (await prisma.favorite.findMany({
    where: { userId: userId },
    include: {
      product: {
        select: {
          name: true,
          image: true,
          price: true,
          store: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })) as favoriteInterface[];

  return (
    <>
      <div className="flex max-w-6xl  mx-auto">
        <div className="flex p-2 flex-col w-full">
          <div className="flex w-full my-2 text-4xl font-bold">
            <p>รายการที่ฉันชอบ</p>
          </div>
          <div className="flex flex-col space-y-2 px-4">
            {favoriteData.map((item, index) => (
              <ProductInfoCard key={index} userId={userId} data={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
