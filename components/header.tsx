"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { TransitionLink } from "@/components/transitionlink";

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

  const handleHomeClick = () => {
    router.push("/"); // ルートの `page.tsx` に遷移
    setIsOpen(false); // メニューを閉じる
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 ${className || ""}`}>
      <div className="w-full flex items-center justify-between p-5 h-20">
        {/* 左側：ロゴ */}
        <Link
          href="/"
          className={`title-font text-xl sm:text-2xl md:text-3xl font-bold text-white hover:text-gray-400 transition-colors ${
            logoClassName || ""
          }`}
        >
          Shungo Hirata
        </Link>

        {/* PC用ナビゲーションメニュー */}
        <nav className="hidden md:flex gap-10 text-lg">
          {[
            { text: "About", href: "/about" },
            { text: "Works", href: "/works" },
            { text: "Contact", href: "/contact" },
          ].map(({ text, href }) => (
            <motion.div
              key={text}
              initial="initial"
              whileHover="hover"
              // motion.div に onClick でハンドリングする場合、ラップ内の Link にクリック処理が伝播するよう注意
              className="cursor-pointer"
            >
              <TransitionLink href={href}>
                {/* TransitionLink 内のテキストは span などでラップしておく */}
                <span className="title-font md:text-2xl lg:text-3xl transition-colors">
                  {text}
                </span>
              </TransitionLink>
            </motion.div>
          ))}
        </nav>

        {/* スマホ用ナビゲーションメニュー */}
        {!isOpen && (
          <button
            className="text-3xl text-white focus:outline-none md:hidden"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>
        )}
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex flex-col  z-50 "
        >
          {/* 閉じるボタン */}
          <button
            className=" title-font absolute top-5 right-5 text-3xl text-white"
            onClick={() => setIsOpen(false)}
          >
            close
          </button>
          <nav className="title-font flex flex-col text-white  space-y-8 text-3xl mt-20">
            <button
              className="px-5 py-3 text-left hover:bg-gray-600 transition-colors"
              onClick={handleHomeClick}
            >
              Home
            </button>
            {["About", "Works", "Contact"].map((text) => (
              <TransitionLink
                key={text}
                href={`/${text.toLowerCase()}`}
                className="px-5 py-3 hover:bg-gray-600 transition-colors text-left"
                // onClick={() => setIsOpen(false)}
              >
                {text}
              </TransitionLink>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
