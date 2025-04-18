"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useUser } from "../context/userContext";

const WelcomeBanner = () => {
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const { user } = useUser();
  const [isComplete, setIsComplete] = useState(false);
  const [blinkCount, setBlinkCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const username = user?.name === undefined ? '' : `คุณ ${user?.name}`

  const fullText = `ยินดีต้อนรับสู่ SHOPKUB ${username}\nค้นหาสิ่งที่คุณต้องการได้เลย`;

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
    }
  }, [text, fullText, isComplete]);

  useEffect(() => {
    if (isComplete && blinkCount < 3) {
      const blinkTimeout = setTimeout(() => {
        setIsVisible((prev) => !prev);
        if (!isVisible) {
          setBlinkCount((prev) => prev + 1);
        }
      }, 500);
      return () => clearTimeout(blinkTimeout);
    }
  }, [isComplete, blinkCount, isVisible]);

  // ✅ add Key
  const formatText = (text: string) => {
    return text.split(" ").map((word, index, array) => {
      const uniqueKey = `${word}-${index}`;

      if (word === "SHOPKUB") {
        return (
          <React.Fragment key={uniqueKey}>
            <span>
              <span className="dark:text-white text-black">SHOP</span>
              <span className="text-primary">KUB</span>{" "}
            </span>
            <br />
          </React.Fragment>
        );
      }

      if (word === "คุณ" && array[index + 1] === session?.user?.name) {
        return (
          <p key={uniqueKey} className="text-primary">
            {word} {array[index + 1]}
          </p>
        );
      }

      if (word === session?.user?.name) {
        return null;
      }

      return (
        <span key={uniqueKey}>{word} </span>
      );
    }).filter(Boolean);
  };

  return (
    <div className="flex flex-col justify-center items-center overflow-hidden">
      <div
        className={cn(
          "w-full max-w-2xl mx-auto text-center px-8 pt-6 space-y-2",
          "transition-all duration-500 ease-in-out transform",
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 absolute -top-full"
        )}
      >
        {text.split("\n").map((line, index) => (
          <div
            key={`line-${index}`} // Fix duplicate keys
            className={cn(
              index === 0 ? "text-2xl md:text-6xl font-extrabold" : "text-xl md:text-3xl font-bold",
              "transition-transform duration-500 ease-in-out"
            )}
          >
            {formatText(line)}
            {index === 1 && isComplete && (
              <span
                className={cn(
                  "transition-opacity duration-300",
                  !isVisible && "opacity-0"
                )}
              >
                !
              </span>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "bg-transparent hover:bg-primary/10 rounded-full ",
          "transition-all duration-300",
          "flex items-center justify-center",
          "mt-4"
        )}
      >
        {isOpen ? (
          <ChevronUp className="w-6 h-6" />
        ) : (
          <ChevronDown className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default WelcomeBanner;
