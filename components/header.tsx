"use client";

import { motion, AnimatePresence, view } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { TransitionLink } from "@/components/transitionlink";
import Image from "next/image";
import Button from "./button";
import { useState, useEffect } from "react";

export default function Navbar({
  className,
  logoClassName,
}: {
  className?: string;
  logoClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // ルーターを取得
  const pathname = usePathname();

  // メニューの開閉に合わせて body のスクロールを無効化
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // クリーンアップ: コンポーネントがアンマウントされる時も解除
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleHomeClick = () => {
    router.push("/"); // ルートの `page.tsx` に遷移
    setIsOpen(false); // メニューを閉じる
  };

  return (
    <header>
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="w-full flex items-center justify-between p-10 h-20">
          {!isOpen && (
            <button
              className="text-3xl text-black focus:outline-none"
              onClick={() => setIsOpen(true)}
            >
              Menu☰
            </button>
          )}
          <a href="https://beauty.hotpepper.jp/kr/slnH000295692/">
            <Button />
          </a>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 h-screen bg-black bg-opacity-50 flex flex-col  z-50 w-screen lg:w-[40vw] "
        >
          {/* 閉じるボタン */}
          <button
            className=" title-font absolute top-5 text-xl sm:text-3xl md:text-5xl text-white"
            onClick={() => setIsOpen(false)}
          >
            close
          </button>
          <div
            style={{ overscrollBehavior: "contain" }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="flex flex-col w-full pl-[8vw] pr-[8vw] pt-[9vh] overflow-y-auto"
          >
            <div className="flex justify-center">
              <Image
                src="/photos/HeartFineLogo.png" // 画像のパスを指定
                alt="Photo1"
                width={100}
                height={100}
                className="
                          logo
                        "
              />
            </div>
            <div className="border-b border-white pb-5 mt-8">
              <p className="flex font-bold text-xl sm:text-3xl md:text-5xl justify-center text-white">
                当院について
              </p>
            </div>
            <div className="border-b border-white pb-5 mt-8">
              <p className="flex font-bold text-xl sm:text-3xl md:text-5xl justify-center text-white">
                料金プラン
              </p>
            </div>
            <div className=" border-b border-white pb-5 mt-8">
              <div className="flex font-bold text-xl sm:text-3xl md:text-5xl justify-center text-white">
                インディバ
              </div>
            </div>
            <div className="border-b border-white pb-5 mt-8">
              <p className="flex font-bold text-xl sm:text-3xl md:text-5xl justify-center text-white">
                キャビマックス
              </p>
            </div>
            <div className="border-b border-white pb-5 mt-8">
              <p className="flex font-bold text-xl sm:text-3xl md:text-5xl justify-center text-white">
                よもぎ蒸し
              </p>
            </div>
            <div className="flex justify-center mt-8">
              <a href="https://beauty.hotpepper.jp/kr/slnH000295692/">
                <button className="bg-slate-700  text-white px-[30vw] lg:px-[7vw] py-[4vh] rounded-md text-xl sm:text-3xl md:text-5xl">
                  <h1>ご予約</h1>
                </button>
              </a>
            </div>
            <div className="flex justify-center mt-8">
              <a href="tel:+819065585560">
                <button className="bg-slate-700  text-white px-[30vw] lg:px-[7vw] py-[4vh] rounded-md text-xl sm:text-3xl md:text-5xl">
                  <h1>お電話</h1>
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
