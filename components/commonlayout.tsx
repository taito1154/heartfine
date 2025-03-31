"use client";

import Header from "@/components/header";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// プラグインを登録
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Lenis の初期化
    const lenis = new Lenis({
      duration: 1.2, // スクロールの慣性時間（秒）
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // カスタムイージング
      smoothWheel: true, // マウスホイールでのスムーズスクロールを有効化
    });

    // Lenis の RAF ループ
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // ScrollTrigger と Lenis を連携するための scrollerProxy 設定
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value ?? 0);
        }
        return lenis.scroll || 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });
    ScrollTrigger.refresh();

    // タブの表示状態の変化を検知して、Lenis を停止／再開する処理
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // タブが非表示になったら Lenis を停止
        lenis.stop();
      } else {
        // タブが再表示されたら Lenis を再開
        lenis.start();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="top">
      <Header />
      {children}
    </div>
  );
}
