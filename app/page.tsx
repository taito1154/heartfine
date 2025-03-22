"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transitionlink";
import Image from "next/image";

export default function Home() {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const timeoutTransition = setTimeout(() => setShowTransition(false), 5500);

    return () => {
      clearTimeout(timeoutTransition);
    };
  }, []);
  return (
    <>
      {/* タイプライター風トランジション */}
      {showTransition && (
        <div className="logotransition bg-black  w-screen h-screen">
          <Image
            src="/photos/HeartFineLogo.png" // 画像のパスを指定
            alt="Photo1"
            fill
            className="
            logo
            object-contain
          opacity-0
          "
          />
          <style>{`
            .logotransition {
              position: fixed;
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
              /* フェードアウト開始 3.5秒、2秒かけて消える */
              animation: fadeOut 2s ease-out forwards 3.5s;
            }
            .logo {
              overflow: hidden;
              animation: show 0s 0.1s forwards;
            }
            @keyframes show {
              to { opacity: 1; }
            }

            @keyframes fadeOut {
              from { opacity: 1; }
              to { opacity: 0; }
            }
          `}</style>
        </div>
      )}

      <div className="flex items-center justify-center min-h-screen bg-white">
        <h1 className="text-6xl font-bold">Heart Fine</h1>
      </div>
    </>
  );
}
