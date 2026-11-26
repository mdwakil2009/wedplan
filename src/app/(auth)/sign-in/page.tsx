"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Heart,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

const features = [
  "Discover trusted wedding professionals",
  "Manage your wedding bookings easily",
  "Plan every detail in one place",
];

const containerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const router = useRouter();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Email and Password Login
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signIn.email({
        email: userData.email as string,
        password: userData.password as string,
      });

      if (error) {
        toast.add({
          title: "Sign in failed!",
          description: error.message ?? "Something went wrong.",
        });
        return;
      }

      if (data) {
        toast.add({
          title: "Signed in successfully!",
          description: "Welcome back to WedPlan.",
        });

        router.replace("/");
        router.refresh();
      }
    } catch {
      toast.add({
        title: "Something went wrong!",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Google Login
  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFFFFF] p-3 transition-colors duration-300 dark:bg-[#1D2421] sm:p-5 lg:h-screen lg:min-h-0 lg:p-6">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-[#D9B7A8]/20 blur-[100px] dark:bg-[#D9A58E]/10" />

      <div className="pointer-events-none absolute -bottom-32 -right-20 size-96 rounded-full bg-[#B77B65]/10 blur-[110px] dark:bg-[#D9A58E]/10" />

      {/* Main Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative grid w-full max-w-5xl overflow-hidden rounded-[22px] border border-[#E9DED6] bg-white shadow-[0_20px_65px_rgba(57,43,39,0.10)] transition-colors duration-300 dark:border-[#414C45] dark:bg-[#29332E] dark:shadow-[0_20px_65px_rgba(0,0,0,0.25)] lg:h-[min(680px,calc(100vh-48px))] lg:min-h-[570px] lg:grid-cols-[0.95fr_1.05fr]"
      >
        {/* LEFT IMAGE SECTION */}
        <motion.section
          variants={itemVariants}
          className="relative hidden overflow-hidden lg:block"
        >
          <Image
            src="/images/background.photo11.avif"
            alt="Beautiful wedding celebration"
            fill
            priority
            sizes="(max-width: 1024px) 0px, 48vw"
            className="object-cover object-center transition-transform duration-1000 hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#211713]/35 via-[#39251F]/35 to-[#211713]/90" />

          <div className="relative z-10 flex h-full flex-col justify-between p-8 xl:p-10">
            {/* Logo */}
            <Link href="/" className="group flex w-fit items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border border-white/25 bg-white/10 backdrop-blur-md transition group-hover:bg-white/20">
                <Heart className="size-5 fill-[#E9C5B5] text-[#E9C5B5]" />
              </div>

              <div>
                <h1 className="font-serif text-2xl font-semibold tracking-wide text-white">
                  WedPlan
                </h1>

                <p className="mt-0.5 text-[8px] tracking-[0.28em] text-white/70">
                  YOUR WEDDING JOURNEY
                </p>
              </div>
            </Link>

            {/* Image Content */}
            <div className="max-w-sm">
              <motion.div
                variants={itemVariants}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 backdrop-blur-md"
              >
                <Sparkles className="size-3.5 text-[#E9C5B5]" />

                <span className="text-[9px] font-medium tracking-[0.16em] text-white/90">
                  MAKE EVERY MOMENT SPECIAL
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="font-serif text-4xl leading-[1.15] text-white xl:text-[44px]"
              >
                Every Love Story
                <br />
                Deserves a
                <br />
                <span className="italic text-[#E9C5B5]">
                  Beautiful Beginning.
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="mt-4 max-w-[320px] text-xs leading-6 text-white/75"
              >
                Discover trusted professionals and bring your dream wedding to
                life with WedPlan.
              </motion.p>

              <motion.div variants={itemVariants} className="mt-6 space-y-3">
                {features.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#E9C5B5]/40 bg-[#E9C5B5]/15">
                      <Check className="size-3 text-[#E9C5B5]" />
                    </div>

                    <p className="text-[11px] font-medium text-white/90">
                      {item}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between border-t border-white/20 pt-4">
              <p className="text-[9px] text-white/60">
                © 2026 WedPlan. All rights reserved.
              </p>

              <div className="flex items-center gap-1.5 text-white/70">
                <Heart className="size-3 fill-[#E9C5B5] text-[#E9C5B5]" />
                <span className="text-[9px]">Made for love</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* RIGHT SIGN IN SECTION */}
        <section className="flex items-center justify-center px-5 py-8 transition-colors duration-300 sm:px-10 lg:px-10 xl:px-14">
          <motion.div
            variants={containerVariants}
            className="w-full max-w-[390px]"
          >
            {/* Mobile Logo */}
            <motion.div variants={itemVariants}>
              <Link
                href="/"
                className="mb-7 flex w-fit items-center gap-2.5 lg:hidden"
              >
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#772D43]">
                  <Heart className="size-4 fill-white text-white" />
                </div>

                <span className="font-serif text-2xl font-semibold text-[#392B27] dark:text-[#F5FAF6]">
                  WedPlan
                </span>
              </Link>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="mb-7">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-7 bg-[#B77B65] dark:bg-[#D9A58E]" />

                <p className="text-[9px] font-bold tracking-[0.24em] text-[#B77B65] dark:text-[#D9A58E]">
                  WELCOME BACK
                </p>

                <Sparkles className="size-3.5 text-[#B77B65] dark:text-[#D9A58E]" />
              </div>

              <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight text-[#392B27] dark:text-[#F5FAF6] sm:text-[36px]">
                Sign in to your
                <br />
                <span className="relative inline-block italic text-[#B77B65] dark:text-[#D9A58E]">
                  account.
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#B77B65]/30 dark:bg-[#D9A58E]/30" />
                </span>
              </h2>

              <p className="mt-3 text-xs leading-6 text-[#85766F] dark:text-[#B2BDB5]">
                Welcome back! Enter your details to continue your wedding
                journey.
              </p>
            </motion.div>

            {/* Email and Password Form */}
            <motion.form
              onSubmit={handleSubmit}
              variants={containerVariants}
              className="space-y-4"
            >
              {/* Email */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-[11px] font-semibold text-[#392B27] dark:text-[#F5FAF6]"
                >
                  Email Address
                </Label>

                <div className="group relative">
                  <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#A4958E] transition group-focus-within:text-[#B77B65] dark:text-[#B2BDB5] dark:group-focus-within:text-[#D9A58E]" />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="new-email"
                    className="h-11 rounded-xl border-[#E9DED6] bg-[#FCFAF8] pl-10 text-xs text-[#392B27] placeholder:text-[#B3A7A1] transition focus-visible:border-[#B77B65] focus-visible:ring-[#B77B65]/20 dark:border-[#414C45] dark:bg-[#303B35] dark:text-[#F5FAF6] dark:placeholder:text-[#89968D] dark:focus-visible:border-[#D9A58E] dark:focus-visible:ring-[#D9A58E]/20"
                  />
                </div>

                {email && !emailValid && (
                  <p className="text-[10px] text-red-500">
                    Please enter a valid email address.
                  </p>
                )}
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-[11px] font-semibold text-[#392B27] dark:text-[#F5FAF6]"
                  >
                    Password
                  </Label>

                  <Link
                    href="/forgot-password"
                    className="text-[10px] font-semibold text-[#B77B65] transition hover:text-[#772D43] dark:text-[#D9A58E] dark:hover:text-[#E9C5B5]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="group relative">
                  <LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#A4958E] transition group-focus-within:text-[#B77B65] dark:text-[#B2BDB5] dark:group-focus-within:text-[#D9A58E]" />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="h-11 rounded-xl border-[#E9DED6] bg-[#FCFAF8] pl-10 pr-11 text-xs text-[#392B27] placeholder:text-[#B3A7A1] transition focus-visible:border-[#B77B65] focus-visible:ring-[#B77B65]/20 dark:border-[#414C45] dark:bg-[#303B35] dark:text-[#F5FAF6] dark:placeholder:text-[#89968D] dark:focus-visible:border-[#D9A58E] dark:focus-visible:ring-[#D9A58E]/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A4958E] transition hover:text-[#772D43] dark:text-[#B2BDB5] dark:hover:text-[#D9A58E]"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-1">
                <Button
                  type="submit"
                  disabled={
                    isLoading || isGoogleLoading || !emailValid || !password
                  }
                  className="group h-11 w-full rounded-xl bg-[#772D43] text-xs font-semibold text-white shadow-[0_6px_16px_rgba(119,45,67,0.18)] transition-all duration-300 hover:bg-[#612338] hover:shadow-[0_8px_22px_rgba(119,45,67,0.25)] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#B77B65] dark:text-white dark:hover:bg-[#C58D77]"
                >
                  {isLoading ? "Signing in..." : "Sign In"}

                  {!isLoading && (
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              </motion.div>
            </motion.form>

            {/* Secure Divider */}
            <motion.div
              variants={itemVariants}
              className="my-5 flex items-center gap-3"
            >
              <div className="h-px flex-1 bg-[#EDE4DE] dark:bg-[#414C45]" />

              <span className="text-[9px] font-medium tracking-[0.16em] text-[#A4958E] dark:text-[#B2BDB5]">
                OR CONTINUE WITH
              </span>

              <div className="h-px flex-1 bg-[#EDE4DE] dark:bg-[#414C45]" />
            </motion.div>

            {/* Google Sign In Button */}
            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || isLoading}
                className="group flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-[#E9DED6] bg-white text-xs font-semibold text-[#392B27] transition-all duration-300 hover:border-[#B77B65] hover:bg-[#FCF8F5] hover:shadow-[0_5px_16px_rgba(57,43,39,0.07)] disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#414C45] dark:bg-[#303B35] dark:text-[#F5FAF6] dark:hover:border-[#D9A58E] dark:hover:bg-[#35433B]"
              >
                {isGoogleLoading ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-[#B77B65]/30 border-t-[#B77B65] dark:border-[#D9A58E]/30 dark:border-t-[#D9A58E]" />

                    <span>Connecting to Google...</span>
                  </>
                ) : (
                  <>
                    <svg
                      viewBox="0 0 48 48"
                      className="size-[18px] shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        fill="#4285F4"
                        d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
                      />

                      <path
                        fill="#34A853"
                        d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z"
                      />

                      <path
                        fill="#FBBC05"
                        d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.2H5.8a20 20 0 0 0 0 17.6l6.8-5.2Z"
                      />

                      <path
                        fill="#EA4335"
                        d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15.2l6.8 5.2c1.6-4.8 6.1-8.3 11.4-8.3Z"
                      />
                    </svg>

                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Terms */}
            <motion.p
              variants={itemVariants}
              className="mt-5 text-center text-[10px] leading-5 text-[#93847D] dark:text-[#B2BDB5]"
            >
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className="font-semibold text-[#772D43] underline-offset-4 hover:underline dark:text-[#D9A58E]"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-semibold text-[#772D43] underline-offset-4 hover:underline dark:text-[#D9A58E]"
              >
                Privacy Policy
              </Link>
              .
            </motion.p>

            {/* Sign Up */}
            <motion.div
              variants={itemVariants}
              className="mt-6 border-t border-[#EDE4DE] pt-5 text-center dark:border-[#414C45]"
            >
              <p className="text-xs text-[#85766F] dark:text-[#B2BDB5]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-semibold text-[#772D43] transition hover:text-[#B77B65] hover:underline dark:text-[#D9A58E] dark:hover:text-[#E9C5B5]"
                >
                  Create account
                </Link>
              </p>
            </motion.div>

            {/* Security Note */}
            <motion.div
              variants={itemVariants}
              className="mt-5 flex items-center justify-center gap-2 text-[#A4958E] dark:text-[#B2BDB5]"
            >
              <LockKeyhole className="size-3" />

              <span className="text-[9px]">
                Your information is protected and secure.
              </span>
            </motion.div>
          </motion.div>
        </section>
      </motion.div>
    </main>
  );
}
