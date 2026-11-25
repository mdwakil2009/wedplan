
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

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
  FiSearch,
  FiArrowUpRight,
  FiSun,
  FiMoon,
} from "react-icons/fi";

import { useSession, authClient } from "@/lib/auth-client";
import BrandLogo from "./BrandLogo";

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

  const { resolvedTheme, setTheme } = useTheme();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const role =
    user?.role === "admin" || user?.role === "vendor"
      ? user.role
      : "customer";

  const dashboardHref = `/dashboard/${role}`;
  const profileHref = `/dashboard/${role}/profile`;

  const isDark = mounted && resolvedTheme === "dark";

  // Theme hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle light and dark theme
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menus after route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  // Check active route
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";

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
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`sticky top-0 z-50 w-full bg-white transition-colors duration-300 dark:bg-[#211B1B] ${
        isScrolled
          ? "shadow-[0_5px_20px_rgba(56,46,41,0.08)] dark:shadow-[0_5px_20px_rgba(0,0,0,0.25)]"
          : "shadow-none"
      }`}
    >
      {/* Main Navbar */}
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Left Side: Logo + Navigation */}
        <div className="flex min-w-0 items-center gap-7 xl:gap-10">
          {/* Logo */}
          <div className="shrink-0">
            <BrandLogo />
          </div>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 lg:flex xl:gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative py-2 text-[12px] font-semibold transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-[#B65F3A]"
                    : "text-[#514047] hover:text-[#B65F3A] dark:text-[#D8C9C2] dark:hover:text-[#D9A58E]"
                }`}
              >
                {link.name}

                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-[#B65F3A] transition-all duration-300 ${
                    isActive(link.href)
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          {isPending ? (
            <div className="h-8 w-20 animate-pulse rounded-full bg-[#F3F3F3] dark:bg-[#39302D]" />
          ) : user ? (
            /* Logged In Profile */
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="Open profile menu"
                aria-expanded={isProfileOpen}
                className="flex items-center gap-2 rounded-full px-2 py-1 text-[#382E29] transition-colors hover:bg-[#F8F5F3] hover:text-[#B65F3A] dark:text-[#F5E9E1] dark:hover:bg-[#39302D] dark:hover:text-[#D9A58E]"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User profile"}
                    width={30}
                    height={30}
                    className="size-[30px] rounded-full object-cover"
                  />
                ) : (
                  <span className="flex size-[30px] items-center justify-center rounded-full bg-[#F5EFEB] text-[#B65F3A] dark:bg-[#51413D] dark:text-[#D9A58E]">
                    <FiUser />
                  </span>
                )}

                <span className="max-w-[110px] truncate text-xs font-semibold">
                  {user.name}
                </span>

                <FiChevronDown
                  className={`size-3.5 transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-11 w-64 overflow-hidden rounded-xl border border-[#EEE8E4] bg-white shadow-[0_12px_35px_rgba(56,46,41,0.12)] dark:border-[#51413D] dark:bg-[#302522] dark:shadow-black/30"
                  >
                    {/* User Information */}
                    <div className="flex items-center gap-3 border-b border-[#F1ECE8] px-4 py-4 dark:border-[#51413D]">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User profile"}
                          width={40}
                          height={40}
                          className="size-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex size-10 items-center justify-center rounded-full bg-[#F5EFEB] text-[#B65F3A] dark:bg-[#51413D] dark:text-[#D9A58E]">
                          <FiUser />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#382E29] dark:text-[#F5E9E1]">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-[#8C8178] dark:text-[#B9A8A0]">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Dropdown Links */}
                    <div className="space-y-1 p-2">
                      <Link
                        href={dashboardHref}
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#514047] transition-colors hover:bg-[#F8F5F3] hover:text-[#B65F3A] dark:text-[#E6D8D1] dark:hover:bg-[#44332E] dark:hover:text-[#D9A58E]"
                      >
                        <FiGrid className="size-4" />
                        Dashboard
                      </Link>

                      {role !== "admin" && (
                        <Link
                          href={profileHref}
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#514047] transition-colors hover:bg-[#F8F5F3] hover:text-[#B65F3A] dark:text-[#E6D8D1] dark:hover:bg-[#44332E] dark:hover:text-[#D9A58E]"
                        >
                          <FiSettings className="size-4" />
                          Profile Settings
                        </Link>
                      )}

                      <div className="border-t border-[#F1ECE8] dark:border-[#51413D]" />

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                      >
                        <FiLogOut className="size-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Public Actions */
            <>
              <Link
                href="/sign-in"
                className="rounded-full px-3 py-2 text-xs font-semibold text-[#382E29] transition-colors duration-200 hover:bg-[#F8F5F3] hover:text-[#B65F3A] dark:text-[#F5E9E1] dark:hover:bg-[#39302D] dark:hover:text-[#D9A58E]"
              >
                Log in
              </Link>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/sign-up"
                  className="group inline-flex h-9 items-center gap-2 rounded-full bg-[#B65F3A] px-5 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#9F4F30]"
                >
                  Start planning

                  <FiArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </>
          )}

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            disabled={!mounted}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="group flex h-9 items-center gap-2 rounded-full border border-[#EAE1DA] bg-[#FAF6F2] px-3 text-[#514047] transition-all duration-300 hover:border-[#B65F3A]/40 hover:bg-[#F3E9E2] dark:border-[#51413D] dark:bg-[#302522] dark:text-[#F5E9E1] dark:hover:bg-[#40312C]"
          >
            <span className="relative flex size-5 items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                {mounted && (
                  <motion.span
                    key={isDark ? "moon" : "sun"}
                    initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                  >
                    {isDark ? (
                      <FiMoon className="size-[17px] text-[#D9A58E]" />
                    ) : (
                      <FiSun className="size-[17px] text-[#B65F3A]" />
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>

            <span className="text-[11px] font-semibold">
              {mounted ? (isDark ? "Dark" : "Light") : "Theme"}
            </span>
          </button>

          {/* Search */}
          <Link
            href="/services"
            aria-label="Browse wedding services"
            className="flex size-8 items-center justify-center rounded-full text-[#382E29] transition-colors hover:bg-[#F8F5F3] hover:text-[#B65F3A] dark:text-[#F5E9E1] dark:hover:bg-[#39302D] dark:hover:text-[#D9A58E]"
          >
            <FiSearch className="size-[17px]" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={
            isMobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMobileOpen}
          aria-controls="mobile-navigation"
          className="flex size-9 items-center justify-center rounded-full border border-[#EAE3DE] bg-white text-[#382E29] transition-colors hover:bg-[#F8F5F3] hover:text-[#B65F3A] dark:border-[#51413D] dark:bg-[#302522] dark:text-[#F5E9E1] dark:hover:bg-[#40312C] lg:hidden"
        >
          {isMobileOpen ? (
            <FiX className="size-5" />
          ) : (
            <FiMenu className="size-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#F1ECE8] bg-white dark:border-[#51413D] dark:bg-[#211B1B] lg:hidden"
          >
            <div className="flex flex-col gap-2 px-5 py-4 sm:px-8">
              {/* Mobile Links */}
              <nav aria-label="Mobile navigation">
                {navLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                        isActive(link.href)
                          ? "bg-[#F8F2EF] text-[#B65F3A] dark:bg-[#44332E] dark:text-[#D9A58E]"
                          : "text-[#382E29] hover:bg-[#F8F5F3] hover:text-[#B65F3A] dark:text-[#E6D8D1] dark:hover:bg-[#39302D] dark:hover:text-[#D9A58E]"
                      }`}
                    >
                      <Icon className="size-4" />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="my-2 border-t border-[#F1ECE8] dark:border-[#51413D]" />

              {/* Mobile Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                disabled={!mounted}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-[#382E29] transition-colors hover:bg-[#F8F5F3] dark:text-[#F5E9E1] dark:hover:bg-[#39302D]"
              >
                <span className="flex items-center gap-3">
                  {isDark ? (
                    <FiMoon className="size-4 text-[#D9A58E]" />
                  ) : (
                    <FiSun className="size-4 text-[#B65F3A]" />
                  )}

                  Theme Mode
                </span>

                <span className="rounded-full bg-[#F3E9E2] px-3 py-1 text-[11px] font-semibold text-[#B65F3A] dark:bg-[#51413D] dark:text-[#D9A58E]">
                  {mounted ? (isDark ? "Dark" : "Light") : "Loading"}
                </span>
              </button>

              <div className="my-2 border-t border-[#F1ECE8] dark:border-[#51413D]" />

              {isPending ? (
                <div className="h-10 animate-pulse rounded-lg bg-[#F3F3F3] dark:bg-[#39302D]" />
              ) : user ? (
                /* Mobile Logged In User */
                <>
                  <div className="flex items-center gap-3 rounded-lg bg-[#FAF9F8] px-3 py-3 dark:bg-[#302522]">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User profile"}
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-full bg-[#F5EFEB] text-[#B65F3A] dark:bg-[#51413D] dark:text-[#D9A58E]">
                        <FiUser />
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#382E29] dark:text-[#F5E9E1]">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-[#8C8178] dark:text-[#B9A8A0]">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={dashboardHref}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#382E29] transition-colors hover:bg-[#F8F5F3] hover:text-[#B65F3A] dark:text-[#E6D8D1] dark:hover:bg-[#39302D] dark:hover:text-[#D9A58E]"
                  >
                    <FiGrid className="size-4" />
                    Dashboard
                  </Link>

                  {role !== "admin" && (
                    <Link
                      href={profileHref}
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#382E29] transition-colors hover:bg-[#F8F5F3] hover:text-[#B65F3A] dark:text-[#E6D8D1] dark:hover:bg-[#39302D] dark:hover:text-[#D9A58E]"
                    >
                      <FiSettings className="size-4" />
                      Profile Settings
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <FiLogOut className="size-4" />
                    Logout
                  </button>
                </>
              ) : (
                /* Mobile Public Actions */
                <div className="flex flex-col gap-3 pt-1">
                  <Link
                    href="/sign-in"
                    onClick={() => setIsMobileOpen(false)}
                    className="rounded-full border border-[#B65F3A] px-4 py-3 text-center text-sm font-semibold text-[#B65F3A] transition-colors hover:bg-[#F8F2EF] dark:hover:bg-[#44332E]"
                  >
                    Log in
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#B65F3A] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#9F4F30]"
                  >
                    Start planning
                    <FiArrowUpRight className="size-4" />
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
