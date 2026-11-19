"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiGrid,
  FiSettings,
  FiLogOut,
  FiUser,
  FiHome,
  FiShoppingBag,
} from "react-icons/fi";

import { useSession, authClient } from "@/lib/auth-client";
import Image from "next/image";
import BrandLogo from "./BrandLogo";
import { Button } from "../ui/button";

// Navigation links
const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: FiHome,
  },
  {
    name: "Browse Services",
    href: "/services",
    icon: FiShoppingBag,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  console.log("Session User:", user);
  console.log("Profile Image URL:", user?.image);
  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout failed:", error);
        return;
      }

      setIsProfileOpen(false);
      setIsMobileOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "border-[#E9DFDC] bg-white/95 shadow-md backdrop-blur-xl"
          : "border-[#F1EAE6] bg-white"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* logo */}
        <BrandLogo></BrandLogo>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
            >
              <Link
                href={link.href}
                className={`group relative py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-[#772D43]"
                    : "text-[#494248] hover:text-[#B87586]"
                }`}
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#772D43]"
                  initial={false}
                  animate={{
                    width: isActive(link.href) ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />

                {!isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-[#C9A9A6] transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-lg bg-[#F4ECEB]" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="Open profile menu"
                aria-expanded={isProfileOpen}
                className="flex items-center gap-2 rounded-full border border-[#EFE4E2] bg-white px-2 py-1.5 transition-colors hover:bg-[#FBF5F4]"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User profile"}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full border border-[#E9DFDC] object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8EFF0] text-[#772D43]">
                    <FiUser />
                  </div>
                )}

                <span className="max-w-[120px] truncate text-sm font-medium text-[#393237]">
                  {user.name}
                </span>

                <FiChevronDown
                  className={`text-[#772D43] transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-14 w-64 overflow-hidden rounded-xl border border-[#EFE4E2] bg-white shadow-xl"
                  >
                    {/* User Information */}
                    {/* User Information */}
                    <div className="flex items-center gap-3 border-b border-[#F1EAE6] px-4 py-4">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User profile"}
                          width={44}
                          height={44}
                          className="h-11 w-11 rounded-full border border-[#E9DFDC] object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F8EFF0] text-[#772D43]">
                          <FiUser />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#393237]">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-[#999096]">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Dropdown Links */}
                    <div className="p-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#494248] transition-colors hover:bg-[#F8EFF0] hover:text-[#772D43]"
                      >
                        <FiGrid className="h-4 w-4" />
                        Dashboard
                      </Link>

                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#494248] transition-colors hover:bg-[#F8EFF0] hover:text-[#772D43]"
                      >
                        <FiSettings className="h-4 w-4" />
                        Profile Settings
                      </Link>

                      <div className="my-2 border-t border-[#F1EAE6]" />

                      {/* Logout */}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                      >
                        <FiLogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Public User Buttons */
            <>
              <motion.div whileHover={{ y: -2 }}>
                <Link
                  href="/sign-in"
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[#772D43] transition-colors hover:bg-[#F8EFF0]"
                >
                  Sign In
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/sign-up"
                  className="rounded-lg bg-[#772D43] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#5F2034]"
                >
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON  */}
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={
            isMobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMobileOpen}
          aria-controls="mobile-navigation"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#772D43] transition-colors hover:bg-[#F8EFF0] lg:hidden"
        >
          {isMobileOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[#F1EAE6] bg-white lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5">
              <nav aria-label="Mobile navigation">
                {navLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-[#F8EFF0] text-[#772D43]"
                          : "text-[#494248] hover:bg-[#FBF5F4] hover:text-[#772D43]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="my-2 border-t border-[#EFE4E2]" />
              {isPending ? (
                <div className="h-10 animate-pulse rounded-lg bg-[#F4ECEB]" />
              ) : user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-3">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User profile"}
                        width={36}
                        height={36}
                        className="h-11 w-11 rounded-full border border-[#EFE4E2] object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8EFF0] text-[#772D43]">
                        <FiUser />
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#393237]">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-[#999096]">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#494248] transition-colors hover:bg-[#F8EFF0]"
                  >
                    <FiGrid />
                    Dashboard
                  </Link>

                  {/* Profile Settings */}
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#494248] transition-colors hover:bg-[#F8EFF0]"
                  >
                    <FiSettings />
                    Profile Settings
                  </Link>

                  {/* Logout */}
                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                  >
                    <FiLogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                /* Public Mobile Buttons */
                <div className="flex flex-col gap-3">
                  <Link
                    href="/sign-in"
                    onClick={() => setIsMobileOpen(false)}
                    className="rounded-lg border border-[#772D43] px-4 py-3 text-center text-sm font-semibold text-[#772D43] transition-colors hover:bg-[#F8EFF0]"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={() => setIsMobileOpen(false)}
                    className="rounded-lg bg-[#772D43] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#5F2034]"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
