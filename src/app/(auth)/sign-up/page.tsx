
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Heart,
  ImagePlus,
  LockKeyhole,
  Mail,
  Sparkles,
  Store,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

type AccountRole = "customer" | "vendor";

const containerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AccountRole>("customer");

  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!file.type.startsWith("image/")) {
      toast.add({
        title: "Invalid image!",
        description: "Please select a valid image.",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.add({
        title: "Image is too large!",
        description: "Please select an image smaller than 5 MB.",
      });

      event.target.value = "";
      return;
    }

    setIsUploading(true);

    try {
      const formdata = new FormData();
      formdata.append("image", file);

      const imgbbApi = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGBB_API_KEY}`;

      const res = await fetch(imgbbApi, {
        method: "POST",
        body: formdata,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error("Image upload failed.");
      }

      const uploadedImageUrl = result.data.url;

      setImage(file);
      setImageUrl(uploadedImageUrl);
      setPreview(uploadedImageUrl);

      toast.add({
        title: "Image uploaded!",
        description: "Your profile image is ready.",
      });
    } catch {
      toast.add({
        title: "Image upload failed!",
        description: "Please try uploading your image again.",
      });

      event.target.value = "";
    } finally {
      setIsUploading(false);
    }
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

    if (!emailValid || !passwordValid) return;

    if (isUploading) {
      toast.add({
        title: "Please wait!",
        description: "Your profile image is still uploading.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signUp.email({
        name: userData.name as string,
        email: userData.email as string,
        password: userData.password as string,
        image: imageUrl ?? undefined,
        role,
      });

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
          description: `Your ${role} account is ready.`,
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
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-[#F8F4F0] p-3 transition-colors duration-300 dark:bg-[#1D2421] sm:p-5 lg:h-[100dvh] lg:min-h-0 lg:overflow-hidden lg:p-6">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-[#D9B7A8]/20 blur-[100px] dark:bg-[#D9A58E]/10" />

      <div className="pointer-events-none absolute -bottom-32 -right-20 size-96 rounded-full bg-[#B77B65]/10 blur-[110px] dark:bg-[#D9A58E]/10" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-[22px] border border-[#E9DED6] bg-white shadow-[0_20px_65px_rgba(57,43,39,0.10)] transition-colors duration-300 dark:border-[#414C45] dark:bg-[#29332E] dark:shadow-[0_20px_65px_rgba(0,0,0,0.25)] lg:h-full lg:max-h-[820px] lg:min-h-0 lg:grid-cols-[0.88fr_1.12fr]"
      >

        {/* LEFT IMAGE SECTION */}
        <motion.section
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative hidden min-h-0 overflow-hidden lg:block"
        >
          <Image
            src="/images/background.photo11.avif"
            alt="Elegant wedding celebration"
            fill
            priority
            sizes="(max-width: 1024px) 0px, 45vw"
            className="object-cover object-center transition-transform duration-1000 hover:scale-105"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#351522]/45 via-[#542335]/35 to-[#351522]/90" />

          <div className="relative z-10 flex h-full flex-col justify-between p-8 xl:p-10">

            {/* Logo */}
            <Link href="/" className="group flex w-fit items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border border-white/25 bg-white/10 backdrop-blur-md transition group-hover:bg-white/20">
                <Heart className="size-5 fill-[#F1D3C6] text-[#F1D3C6]" />
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

            {/* Main Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-sm"
            >
              <motion.div
                variants={itemVariants}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 backdrop-blur-md"
              >
                <Sparkles className="size-3.5 text-[#F1D3C6]" />

                <span className="text-[9px] font-medium tracking-[0.16em] text-white/90">
                  YOUR JOURNEY BEGINS HERE
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="font-serif text-4xl leading-[1.15] text-white xl:text-[46px]"
              >
                A Beautiful
                <br />
                Wedding Begins
                <br />
                <span className="italic text-[#F1D3C6]">With a Dream.</span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="mt-5 max-w-[310px] text-xs leading-6 text-white/75"
              >
                Your perfect day deserves perfect planning. Find the right
                people, discover beautiful services, and create memories that
                last forever.
              </motion.p>

              {/* Features */}
              <motion.div variants={itemVariants} className="mt-7 space-y-4">
                {[
                  {
                    icon: Check,
                    text: "Discover trusted wedding professionals",
                  },
                  {
                    icon: Heart,
                    text: "Create your perfect wedding experience",
                  },
                  {
                    icon: Sparkles,
                    text: "Manage everything in one place",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                        <Icon className="size-3.5 text-[#F1D3C6]" />
                      </div>

                      <p className="text-[11px] font-medium text-white/90">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/20 pt-4">
              <p className="text-[9px] text-white/60">
                © 2026 WedPlan. All rights reserved.
              </p>

              <div className="flex items-center gap-1.5 text-white/70">
                <Heart className="size-3 fill-[#F1D3C6] text-[#F1D3C6]" />
                <span className="text-[9px]">Made for love</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* RIGHT SIGNUP SECTION */}
        <section className="relative flex min-h-0 items-start justify-center overflow-y-visible px-5 py-7 transition-colors duration-300 sm:px-8 lg:h-full lg:overflow-x-hidden lg:overflow-y-auto lg:overscroll-contain lg:px-9 lg:py-0 xl:px-12">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="my-auto w-full max-w-[400px] py-2"
          >

            {/* Mobile Logo */}
            <motion.div variants={itemVariants}>
              <Link
                href="/"
                className="mb-5 flex w-fit items-center gap-2.5 lg:hidden"
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
            <motion.div
              variants={itemVariants}
              className="sticky top-0 z-20 mb-5 bg-white pb-3 pt-3 transition-colors duration-300 dark:bg-[#29332E]"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-7 bg-[#B77B65] dark:bg-[#D9A58E]" />

                <p className="text-[9px] font-bold tracking-[0.23em] text-[#B77B65] dark:text-[#D9A58E]">
                  START YOUR JOURNEY
                </p>

                <Sparkles className="size-3.5 text-[#B77B65] dark:text-[#D9A58E]" />
              </div>

              <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight text-[#392B27] dark:text-[#F5FAF6] sm:text-[36px]">
                Create your
                <br />
                <span className="relative inline-block italic text-[#B77B65] dark:text-[#D9A58E]">
                  account.
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#B77B65]/30 dark:bg-[#D9A58E]/30" />
                </span>
              </h2>

              <p className="mt-3 text-xs leading-6 text-[#85766F] dark:text-[#B2BDB5]">
                Join WedPlan and turn your dream wedding into a beautiful
                reality.
              </p>
            </motion.div>

            {/* FORM */}
            <motion.form
              onSubmit={handleSubmit}
              variants={containerVariants}
              className="space-y-3"
            >

              {/* ROLE SELECTION */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label className="text-[11px] font-semibold text-[#392B27] dark:text-[#F5FAF6]">
                  Choose your account type
                </Label>

                <input type="hidden" name="role" value={role} />

                <div className="grid grid-cols-2 gap-2.5">

                  {/* Customer */}
                  <button
                    type="button"
                    onClick={() => setRole("customer")}
                    aria-pressed={role === "customer"}
                    className={`group flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all duration-300 ${
                      role === "customer"
                        ? "border-[#772D43] bg-[#F8EDEF] shadow-[0_3px_12px_rgba(119,45,67,0.08)] dark:border-[#D9A58E] dark:bg-[#3B443D] dark:shadow-none"
                        : "border-[#EDE2E5] bg-white hover:border-[#D7B7C1] hover:bg-[#FFFCF9] dark:border-[#414C45] dark:bg-[#303B35] dark:hover:border-[#D9A58E] dark:hover:bg-[#35413A]"
                    }`}
                  >
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition ${
                        role === "customer"
                          ? "bg-[#772D43] text-white dark:bg-[#D9A58E] dark:text-[#1D2421]"
                          : "bg-[#F8EDEF] text-[#772D43] dark:bg-[#414C45] dark:text-[#D9A58E]"
                      }`}
                    >
                      <UserRound className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-[#392B27] dark:text-[#F5FAF6]">
                        Customer
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#817780] dark:text-[#B2BDB5]">
                        Plan wedding
                      </p>
                    </div>

                    {role === "customer" && (
                      <Check className="ml-auto size-3.5 shrink-0 text-[#772D43] dark:text-[#D9A58E]" />
                    )}
                  </button>

                  {/* Vendor */}
                  <button
                    type="button"
                    onClick={() => setRole("vendor")}
                    aria-pressed={role === "vendor"}
                    className={`group flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all duration-300 ${
                      role === "vendor"
                        ? "border-[#772D43] bg-[#F8EDEF] shadow-[0_3px_12px_rgba(119,45,67,0.08)] dark:border-[#D9A58E] dark:bg-[#3B443D] dark:shadow-none"
                        : "border-[#EDE2E5] bg-white hover:border-[#D7B7C1] hover:bg-[#FFFCF9] dark:border-[#414C45] dark:bg-[#303B35] dark:hover:border-[#D9A58E] dark:hover:bg-[#35413A]"
                    }`}
                  >
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition ${
                        role === "vendor"
                          ? "bg-[#772D43] text-white dark:bg-[#D9A58E] dark:text-[#1D2421]"
                          : "bg-[#F8EDEF] text-[#772D43] dark:bg-[#414C45] dark:text-[#D9A58E]"
                      }`}
                    >
                      <Store className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-[#392B27] dark:text-[#F5FAF6]">
                        Vendor
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#817780] dark:text-[#B2BDB5]">
                        Offer services
                      </p>
                    </div>

                    {role === "vendor" && (
                      <Check className="ml-auto size-3.5 shrink-0 text-[#772D43] dark:text-[#D9A58E]" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* NAME */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-[11px] font-semibold text-[#392B27] dark:text-[#F5FAF6]"
                >
                  Full Name
                </Label>

                <div className="group relative">
                  <UserRound className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#A4958E] transition group-focus-within:text-[#B77B65] dark:text-[#B2BDB5] dark:group-focus-within:text-[#D9A58E]" />

                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="h-10 rounded-lg border-[#E9DED6] bg-[#FCFAF8] pl-10 text-xs text-[#392B27] placeholder:text-[#B3A7A1] focus-visible:border-[#B77B65] focus-visible:ring-[#B77B65]/20 dark:border-[#414C45] dark:bg-[#303B35] dark:text-[#F5FAF6] dark:placeholder:text-[#89968D] dark:focus-visible:border-[#D9A58E] dark:focus-visible:ring-[#D9A58E]/20"
                  />
                </div>
              </motion.div>

              {/* EMAIL */}
              <motion.div variants={itemVariants} className="space-y-1.5">
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
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="h-10 rounded-lg border-[#E9DED6] bg-[#FCFAF8] pl-10 text-xs text-[#392B27] placeholder:text-[#B3A7A1] focus-visible:border-[#B77B65] focus-visible:ring-[#B77B65]/20 dark:border-[#414C45] dark:bg-[#303B35] dark:text-[#F5FAF6] dark:placeholder:text-[#89968D] dark:focus-visible:border-[#D9A58E] dark:focus-visible:ring-[#D9A58E]/20"
                  />
                </div>

                {email && !emailValid && (
                  <p className="text-[10px] text-red-500">
                    Please enter a valid email address.
                  </p>
                )}
              </motion.div>

              {/* PROFILE IMAGE */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-[11px] font-semibold text-[#392B27] dark:text-[#F5FAF6]">
                    Profile Image
                  </Label>

                  <span className="text-[9px] text-[#A4958E] dark:text-[#B2BDB5]">
                    Optional
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-dashed border-[#DCC8CE] bg-[#FCFAF8] px-3 py-2 transition-colors dark:border-[#414C45] dark:bg-[#303B35]">

                  {/* Image Preview */}
                  <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F8EDEF] text-[#772D43] dark:bg-[#414C45] dark:text-[#D9A58E]">
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Profile preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <ImagePlus className="size-4" />
                    )}
                  </div>

                  {/* Image Information */}
                  <div className="min-w-0 flex-1">
                    {image ? (
                      <>
                        <p className="truncate text-[10px] font-semibold text-[#392B27] dark:text-[#F5FAF6]">
                          {image.name}
                        </p>

                        <p className="mt-0.5 text-[9px] text-[#85766F] dark:text-[#B2BDB5]">
                          {(image.size / 1024).toFixed(0)} KB
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-[10px] font-semibold text-[#392B27] dark:text-[#F5FAF6]">
                          Upload your photo
                        </p>

                        <p className="mt-0.5 text-[9px] text-[#85766F] dark:text-[#B2BDB5]">
                          JPG, PNG or WEBP
                        </p>
                      </>
                    )}
                  </div>

                  {/* Upload Button */}
                  <label
                    htmlFor="profile-image"
                    className={`cursor-pointer rounded-lg bg-[#F8EDEF] px-3 py-1.5 text-[10px] font-semibold text-[#772D43] transition hover:bg-[#EDE2E5] dark:bg-[#414C45] dark:text-[#D9A58E] dark:hover:bg-[#35413A] ${
                      isUploading ? "pointer-events-none opacity-50" : ""
                    }`}
                  >
                    {isUploading
                      ? "Uploading..."
                      : preview
                        ? "Change"
                        : "Upload"}
                  </label>

                  {/* Remove Button */}
                  {preview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      aria-label="Remove profile image"
                      className="flex size-6 shrink-0 items-center justify-center rounded-full text-[#A4958E] transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}

                  {/* File Input */}
                  <input
                    ref={imageInputRef}
                    id="profile-image"
                    name="profileImage"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    disabled={isUploading}
                    className="sr-only"
                  />
                </div>
              </motion.div>

              {/* PASSWORD */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-[11px] font-semibold text-[#392B27] dark:text-[#F5FAF6]"
                >
                  Password
                </Label>

                <div className="group relative">
                  <LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#A4958E] transition group-focus-within:text-[#B77B65] dark:text-[#B2BDB5] dark:group-focus-within:text-[#D9A58E]" />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="h-10 rounded-lg border-[#E9DED6] bg-[#FCFAF8] pl-10 pr-10 text-xs text-[#392B27] placeholder:text-[#B3A7A1] focus-visible:border-[#B77B65] focus-visible:ring-[#B77B65]/20 dark:border-[#414C45] dark:bg-[#303B35] dark:text-[#F5FAF6] dark:placeholder:text-[#89968D] dark:focus-visible:border-[#D9A58E] dark:focus-visible:ring-[#D9A58E]/20"
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

                {/* Password Requirements */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
                  <span
                    className={`flex items-center gap-1 text-[9px] ${
                      hasMinLength
                        ? "text-green-600 dark:text-green-400"
                        : "text-[#93847D] dark:text-[#B2BDB5]"
                    }`}
                  >
                    <Check className="size-2.5" />
                    6+ characters
                  </span>

                  <span
                    className={`flex items-center gap-1 text-[9px] ${
                      hasUppercase
                        ? "text-green-600 dark:text-green-400"
                        : "text-[#93847D] dark:text-[#B2BDB5]"
                    }`}
                  >
                    <Check className="size-2.5" />
                    Uppercase
                  </span>

                  <span
                    className={`flex items-center gap-1 text-[9px] ${
                      hasLowercase
                        ? "text-green-600 dark:text-green-400"
                        : "text-[#93847D] dark:text-[#B2BDB5]"
                    }`}
                  >
                    <Check className="size-2.5" />
                    Lowercase
                  </span>
                </div>
              </motion.div>

              {/* CREATE ACCOUNT */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className="pt-1"
              >
                <Button
                  type="submit"
                  disabled={
                    !passwordValid || !emailValid || isUploading || isSubmitting
                  }
                  className="group h-10 w-full rounded-lg bg-[#772D43] text-xs font-semibold text-white shadow-[0_5px_15px_rgba(119,45,67,0.16)] transition-all duration-300 hover:bg-[#612338] hover:shadow-[0_7px_20px_rgba(119,45,67,0.23)] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#B77B65] dark:text-white dark:hover:bg-[#C58D77]"
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}

                  {!isSubmitting && (
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              </motion.div>

              {/* Divider */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 py-0.5"
              >
                <Separator className="flex-1 bg-[#EDE2E5] dark:bg-[#414C45]" />

                <span className="text-[9px] font-medium tracking-[0.15em] text-[#A4958E] dark:text-[#B2BDB5]">
                  OR
                </span>

                <Separator className="flex-1 bg-[#EDE2E5] dark:bg-[#414C45]" />
              </motion.div>

              {/* Google Button */}
              <motion.div variants={itemVariants}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    toast.add({
                      title: "Google authentication will be added later.",
                    })
                  }
                  className="h-10 w-full rounded-lg border-[#E9DED6] bg-white text-xs font-medium text-[#392B27] transition hover:bg-[#FCFAF8] dark:border-[#414C45] dark:bg-[#303B35] dark:text-[#F5FAF6] dark:hover:bg-[#35413A]"
                >
                  <svg viewBox="0 0 24 24" className="size-4">
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
              </motion.div>

              {/* Terms */}
              <motion.p
                variants={itemVariants}
                className="text-center text-[9px] leading-5 text-[#93847D] dark:text-[#B2BDB5]"
              >
                By creating an account, you agree to our{" "}
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
            </motion.form>

            {/* Sign In */}
            <motion.div
              variants={itemVariants}
              className="mt-4 border-t border-[#EDE2E5] py-4 text-center dark:border-[#414C45]"
            >
              <p className="text-[11px] text-[#85766F] dark:text-[#B2BDB5]">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-semibold text-[#772D43] transition hover:text-[#B77B65] hover:underline dark:text-[#D9A58E] dark:hover:text-[#E9C5B5]"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>

          </motion.div>
        </section>
      </motion.div>
    </main>
  );
}
