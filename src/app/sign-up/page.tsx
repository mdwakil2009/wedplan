"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Heart,
  ImagePlus,
  LockKeyhole,
  Mail,
  Store,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

type AccountRole = "customer" | "vendor";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AccountRole>("customer");

  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Email validation
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password validation
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  const passwordValid = hasMinLength && hasUppercase && hasLowercase;

  // Image upload
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const formdata = new FormData();
    formdata.append("image", file);

    const imgbbApi = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGBB_API_KEY}`;

    const res = await fetch(imgbbApi, {
      method: "POST",
      body: formdata,
    });

    const result = await res.json();

    const imageURL = result.data.url;

    setImage(file);
    setImageUrl(imageURL);
    setPreview(imageURL);

    console.log("Image URL:", imageURL);
  };

  // Remove image
  const handleRemoveImage = () => {
    setImage(null);
    setImageUrl(null);
    setPreview(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  // Form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: userData.name as string,
      email: userData.email as string,
      password: userData.password as string,
      image: imageUrl ?? undefined,
    });

    console.log("User Data:", userData);
    console.log("Signup Data:", data);

    if (error) {
      toast.add({
        title: "Signup failed!",
        description: error.message ?? "Something went wrong.",
      });
      return;
    }

    if (data) {
      toast.add({
        title: "Account created successfully!",
        description: `Selected account type: ${role}.`,
      });

      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFCF9] p-2 sm:p-3">
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
     className="mx-auto grid min-h-[calc(100dvh-1rem)] max-w-6xl overflow-hidden rounded-xl border border-[#EDE2E5] bg-white shadow-[0_8px_35px_rgba(75,35,48,0.07)] sm:min-h-[calc(100dvh-1.5rem)] lg:h-[calc(100dvh-1.5rem)] lg:min-h-[650px] lg:grid-cols-[0.85fr_1.15fr]"
      >
        {/* LEFT IMAGE SECTION */}
        <motion.section
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative hidden h-full overflow-hidden lg:block"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/background.photo1.avif')",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#351522]/60 via-[#542335]/35 to-[#351522]/90" />

          <div className="relative z-10 flex h-full flex-col justify-between p-6 xl:p-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                <Heart className="size-4 fill-white text-white" />
              </div>

              <div>
                <h1 className="text-lg font-semibold text-white">WedPlan</h1>

                <p className="text-[8px] tracking-[0.2em] text-white/65">
                  YOUR WEDDING JOURNEY
                </p>
              </div>
            </Link>

            {/* Main content */}
            <div className="max-w-sm space-y-4">
              <div>
                <h2 className="font-serif text-3xl leading-tight text-white xl:text-4xl">
                  Your Dream Wedding
                  <br />
                  <span className="italic text-[#F1D3C6]">Starts Here.</span>
                </h2>

                <p className="mt-2 max-w-sm text-xs leading-5 text-white/75">
                  Discover trusted vendors, manage bookings, and bring your
                  dream wedding to life.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-white/10">
                  <Check className="size-3.5 text-[#F1D3C6]" />
                </div>

                <p className="text-xs text-white/85">
                  Discover trusted wedding vendors
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-white/10">
                  <Heart className="size-3.5 text-[#F1D3C6]" />
                </div>

                <p className="text-xs text-white/85">
                  Organize your perfect wedding
                </p>
              </div>
            </div>

            {/* Footer */}
            <p className="text-[10px] text-white/55">
              © 2026 WedPlan · Celebrate love
            </p>
          </div>
        </motion.section>

        {/* RIGHT SIGNUP SECTION */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        className="flex items-center justify-center px-4 py-4 sm:px-5 lg:h-full lg:overflow-y-auto lg:px-7 xl:px-9"
        >
          <div className="w-full max-w-[390px]">
            {/* Mobile logo */}
            <Link href="/" className="mb-2 flex items-center gap-2 lg:hidden">
              <Heart className="size-4 fill-[#772D43] text-[#772D43]" />

              <span className="text-base font-semibold text-[#772D43]">
                WedPlan
              </span>
            </Link>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-3"
            >
              <p className="text-[9px] font-semibold tracking-[0.18em] text-[#9A5269]">
                START YOUR JOURNEY
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#292329] sm:text-2xl">
                Create your account
              </h2>

              <p className="mt-1 text-[11px] text-[#817780]">
                Join WedPlan and plan your dream wedding.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="space-y-2.5"
            >
              {/* ROLE SELECTION */}
              <div className="space-y-1">
                <Label className="text-[11px]">Select account type</Label>

                <input type="hidden" name="role" value={role} />

                <div className="grid grid-cols-2 gap-2">
                  {/* Customer */}
                  <button
                    type="button"
                    onClick={() => setRole("customer")}
                    aria-pressed={role === "customer"}
                    className={`flex items-center gap-2 rounded-md border px-2.5 py-1.5 transition ${
                      role === "customer"
                        ? "border-[#772D43] bg-[#F8EDEF]"
                        : "border-[#EDE2E5] hover:bg-[#FFFCF9]"
                    }`}
                  >
                    <div
                      className={`flex size-7 shrink-0 items-center justify-center rounded-md ${
                        role === "customer"
                          ? "bg-[#772D43] text-white"
                          : "bg-[#F8EDEF] text-[#772D43]"
                      }`}
                    >
                      <UserRound className="size-3.5" />
                    </div>

                    <div className="text-left">
                      <p className="text-[11px] font-semibold text-[#292329]">
                        Customer
                      </p>

                      <p className="text-[9px] text-[#817780]">Plan wedding</p>
                    </div>

                    {role === "customer" && (
                      <Check className="ml-auto size-3 text-[#772D43]" />
                    )}
                  </button>

                  {/* Vendor */}
                  <button
                    type="button"
                    onClick={() => setRole("vendor")}
                    aria-pressed={role === "vendor"}
                    className={`flex items-center gap-2 rounded-md border px-2.5 py-1.5 transition ${
                      role === "vendor"
                        ? "border-[#772D43] bg-[#F8EDEF]"
                        : "border-[#EDE2E5] hover:bg-[#FFFCF9]"
                    }`}
                  >
                    <div
                      className={`flex size-7 shrink-0 items-center justify-center rounded-md ${
                        role === "vendor"
                          ? "bg-[#772D43] text-white"
                          : "bg-[#F8EDEF] text-[#772D43]"
                      }`}
                    >
                      <Store className="size-3.5" />
                    </div>

                    <div className="text-left">
                      <p className="text-[11px] font-semibold text-[#292329]">
                        Vendor
                      </p>

                      <p className="text-[9px] text-[#817780]">
                        Offer services
                      </p>
                    </div>

                    {role === "vendor" && (
                      <Check className="ml-auto size-3 text-[#772D43]" />
                    )}
                  </button>
                </div>
              </div>

              {/* NAME */}
              <div className="space-y-1">
                <Label htmlFor="name" className="text-[11px]">
                  Full Name
                </Label>

                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#817780]" />

                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="h-8 rounded-md border-[#EDE2E5] bg-[#FFFCF9] pl-9 text-xs"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="space-y-1">
                <Label htmlFor="email" className="text-[11px]">
                  Email Address
                </Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#817780]" />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="h-8 rounded-md border-[#EDE2E5] bg-[#FFFCF9] pl-9 text-xs"
                  />
                </div>

                {email && !emailValid && (
                  <p className="text-[10px] text-red-500">
                    Please enter a valid email.
                  </p>
                )}
              </div>

              {/* PROFILE IMAGE */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label className="text-[11px]">Profile Image</Label>

                  <span className="text-[9px] text-[#817780]">Optional</span>
                </div>

                <div className="flex items-center gap-2 rounded-md border border-dashed border-[#DCC8CE] bg-[#FFFCF9] px-2 py-1.5">
                  {/* Preview */}
                  <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F8EDEF] text-[#772D43]">
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Profile preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <ImagePlus className="size-3.5" />
                    )}
                  </div>

                  {/* Image information */}
                  <div className="min-w-0 flex-1">
                    {image ? (
                      <>
                        <p className="truncate text-[10px] font-medium text-[#292329]">
                          {image.name}
                        </p>

                        <p className="text-[9px] text-[#817780]">
                          {(image.size / 1024).toFixed(0)} KB
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-[10px] font-medium text-[#292329]">
                          Upload profile photo
                        </p>

                        <p className="text-[9px] text-[#817780]">
                          JPG, PNG or WEBP
                        </p>
                      </>
                    )}
                  </div>

                  {/* Upload */}
                  <label
                    htmlFor="profile-image"
                    className="cursor-pointer rounded-md bg-[#F8EDEF] px-2 py-1 text-[9px] font-medium text-[#772D43] hover:bg-[#EDE2E5]"
                  >
                    {preview ? "Change" : "Upload"}
                  </label>

                  {/* Remove */}
                  {preview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="flex size-5 items-center justify-center rounded-full text-[#817780] hover:bg-red-50 hover:text-red-500"
                      aria-label="Remove profile image"
                    >
                      <X className="size-3" />
                    </button>
                  )}

                  {/* File input */}
                  <input
                    ref={imageInputRef}
                    id="profile-image"
                    name="profileImage"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="space-y-1">
                <Label htmlFor="password" className="text-[11px]">
                  Password
                </Label>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#817780]" />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="h-8 rounded-md border-[#EDE2E5] bg-[#FFFCF9] pl-9 pr-9 text-xs"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#817780]"
                  >
                    {showPassword ? (
                      <EyeOff className="size-3.5" />
                    ) : (
                      <Eye className="size-3.5" />
                    )}
                  </button>
                </div>

                {/* Password rules */}
                <div className="flex flex-wrap gap-x-2.5 gap-y-1 pt-0.5">
                  <span
                    className={`flex items-center gap-1 text-[9px] ${
                      hasMinLength ? "text-green-600" : "text-[#817780]"
                    }`}
                  >
                    <Check className="size-2.5" />
                    6+ characters
                  </span>

                  <span
                    className={`flex items-center gap-1 text-[9px] ${
                      hasUppercase ? "text-green-600" : "text-[#817780]"
                    }`}
                  >
                    <Check className="size-2.5" />
                    Uppercase
                  </span>

                  <span
                    className={`flex items-center gap-1 text-[9px] ${
                      hasLowercase ? "text-green-600" : "text-[#817780]"
                    }`}
                  >
                    <Check className="size-2.5" />
                    Lowercase
                  </span>
                </div>
              </div>

              {/* CREATE ACCOUNT */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={!passwordValid || !emailValid}
                  className="h-8 w-full rounded-md bg-[#772D43] text-xs text-white hover:bg-[#612338] disabled:opacity-50"
                >
                  Create Account
                  <ArrowRight className="ml-2 size-3.5" />
                </Button>
              </motion.div>

              {/* GOOGLE */}
              <div className="flex items-center gap-2">
                <Separator className="flex-1 bg-[#EDE2E5]" />

                <span className="text-[9px] text-[#817780]">OR</span>

                <Separator className="flex-1 bg-[#EDE2E5]" />
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  toast.add({
                    title: "Google authentication will be added later.",
                  })
                }
                className="h-8 w-full rounded-md border-[#EDE2E5] text-xs hover:bg-[#FFFCF9]"
              >
                <svg viewBox="0 0 24 24" className="size-3.5">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.09-1.92 3.28-4.75 3.28-8.09Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.85 0-5.26-1.92-6.13-4.5H2.18v2.84A11 11 0 0 0 12 23Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.87 14.13A6.6 6.6 0 0 1 5.52 12c0-.74.13-1.46.35-2.13V7.03H2.18A11 11 0 0 0 1 12c0 1.78.43 3.47 1.18 4.97l3.69-2.84Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.25c1.62 0 3.06.56 4.2 1.66l3.15-3.15C17.45 1.92 14.97 1 12 1A11 11 0 0 0 2.18 7.03l3.69 2.84C6.74 7.17 9.15 5.25 12 5.25Z"
                  />
                </svg>

                Continue with Google
              </Button>

              {/* Terms */}
              <p className="text-center text-[9px] leading-4 text-[#817780]">
                By creating an account, you agree to our{" "}
                <Link
                  href="/terms"
                  className="font-medium text-[#772D43] hover:underline"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-[#772D43] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </motion.form>

            {/* Sign in */}
            <div className="mt-2.5 border-t border-[#EDE2E5] pt-2.5 text-center">
              <p className="text-[11px] text-[#817780]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#772D43] hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}