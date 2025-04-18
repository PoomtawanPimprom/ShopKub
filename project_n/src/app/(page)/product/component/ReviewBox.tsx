import { reivewInterface } from "@/app/interface/reviewInterface";
import ImageSkeletion from "./ImageSkeletion";
import Image from "next/image";
import { generateKey } from "@/lib/utils";

type prop = {
  reviews: reivewInterface[];
};

export default function ReviewBox({ reviews }: prop) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col w-full bg-white  lg:justify-between lg:w-full border p-4 rounded-xl dark:bg-black ">
        <div className="flex text-2xl font-semibold">รีวิวสินค้า</div>
        <div className="flex flex-col gap-2">
          {reviews.map((item,index) => (
            <>
              <div
                key={"box review"+index}
                className="flex flex-col justify-center p-2 border rounded-lg gap-2"
              >
                <div className="flex gap-2">
                  <div>
                    {item.user?.profile ? (
                      <img
                        width={50}
                        height={50}
                        alt={item.user?.name ?? ""}
                        src={item.user?.profile}
                        className="rounded-full w-[50px] h-[50px]"
                      />
                    ) : (
                      <ImageSkeletion />
                    )}
                  </div>
                  <div className="flex items-center text-xl font-semibold">
                    <p className="flex">{item.user?.name}</p>
                  </div>
                </div>
                <div className="flex flex-col border p-2 gap-2 rounded-lg">
                  <div className="">{item.comment}</div>
                  <div className="flex gap-2">
                    {item.images &&
                      Object.values(item.images).map((image, index) => (
                        <Image
                          key={"image "+image}
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-[100px] h-[100px] rounded-lg object-cover"
                          width={100}
                          height={100}
                          priority
                        />
                      ))}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
