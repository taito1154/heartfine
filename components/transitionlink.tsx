"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LinkProps } from "next/link";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink = ({
  children,
  href,
  ...props
}: TransitionLinkProps) => {
  const router = useRouter();
  const handleTransirtion = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const body = document.querySelector("body");
    body?.classList.add("page-transition");

    await sleep(500);
    router.push(href);
    await sleep(500);
    body?.classList.remove("page-transition");
  };
  return (
    <Link onClick={handleTransirtion} href={href} {...props}>
      {children}
    </Link>
  );
};
