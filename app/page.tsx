"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transitionlink";
import Image from "next/image";
import Layout from "@/components/commonlayout";
import Background from "@/components/background";
import Fadeshow from "@/components/fadeshow";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { gsap } from "gsap";

export default function Home() {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const timeoutTransition = setTimeout(() => setShowTransition(false), 2000);

    return () => {
      clearTimeout(timeoutTransition);
    };
  }, []);
  return (
    <Layout>
      <div className="fixed inset-0 z-[-1]">
        <Background />
      </div>
      <>
        {/* 入りのトランジション*/}
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
              animation: fadeOut 1s ease-out forwards 1s;
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

        <Fadeshow />

        <div className="overflow-auto">
          <div className="flex items-center justify-center min-h-screen bg-transparent">
            <h1 className="text-6xl font-bold">Heart Fine</h1>
          </div>
          <div className="flex items-center justify-center min-h-screen bg-transparent">
            <h1 className="text-6xl font-bold">Heart Fine</h1>
          </div>
          <div className="flex items-center justify-center min-h-screen bg-transparent">
            <h1 className="text-6xl font-bold">Heart Fine</h1>
          </div>
          <div className="flex items-center justify-center min-h-screen bg-transparent">
            <h1 className="text-6xl font-bold">Heart Fine</h1>
          </div>
        </div>
      </>
    </Layout>
  );
}
