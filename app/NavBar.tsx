"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
const NavBar = () => {
  const { status, data: session } = useSession();
  const cuurentPath = usePathname();
  const links = [
    { label: "dashboard", href: "/" },
    { label: "issues", href: "/issues/list" },
  ];
  return (
    <nav className="flex space-x-6 px-5 mb-5 border-b h-16 items-center">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classNames({
                "text-zinc-900": link.href === cuurentPath,
                "text-zinc-400": link.href !== cuurentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href={"/api/auth/signout"}>
            Log out {' '}
            {/* {session?.user && <span className="inline-block ml-5 text-violet-800">{session.user.name}</span>} */}
          </Link>
        )}
        {status === "unauthenticated" && (
          <Link href={"/api/auth/signin"}>Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
