
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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

type AccountRole = "customer" | "vendor";

export default function SignUpPage() {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);

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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const passwordValid = hasMinLength && hasUppercase && hasLowercase;

  // Profile image upload
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
      event.target.value = "";
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
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGBB_API_KEY}`,
        { method: "POST", body: formData },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Image upload failed");
      }

      setImage(file);
      setImageUrl(result.data.url);
      setPreview(result.data.url);

      toast.add({
        title: "Image uploaded!",
        description: "Your profile image is ready.",
      });
    } catch {
      toast.add({
        title: "Upload failed!",
        description: "Please try again.",
      });
      event.target.value = "";
    } finally {
      setIsUploading(false);
    }
  };

  // Remove profile image
  const handleRemoveImage = () => {
    setImage(null);
    setImageUrl(null);
    setPreview(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  // Google signup / login
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.add({
          title: "Google sign-in failed!",
          description: error.message,
        });
        setIsGoogleLoading(false);
      }
    } catch {
      toast.add({
        title: "Something went wrong!",
        description: "Please try again.",
      });
      setIsGoogleLoading(false);
    }
  };

  // Email signup
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
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
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: imageUrl ?? undefined,
        role,
      });

      if (error) {
        toast.add({
          title: "Signup failed!",
          description: error.message,
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
    <main className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-[#F8F4F0] p-3 transition-colors dark:bg-[#1D2421] sm:p-5 lg:h-screen lg:min-h-0 lg:overflow-hidden lg:p-6">
      <div className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-[#D9B7A8]/20 blur-[100px] dark:bg-[#D9A58E]/10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative grid w-full max-w-5xl overflow-hidden rounded-2xl border border-[#E9DED6] bg-white shadow-xl dark:border-[#414C45] dark:bg-[#29332E] lg:h-full lg:max-h-[780px] lg:grid-cols-[0.85fr_1.15fr]"
      >
        {/* LEFT IMAGE */}
        <section className="relative hidden overflow-hidden lg:block">
          <Image
            src="/images/background.photo11.avif"
            alt="Elegant wedding celebration"
            fill
            priority
            sizes="45vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#351522]/40 via-[#542335]/40 to-[#351522]/90" />

          <div className="relative z-10 flex h-full flex-col justify-between p-8 xl:p-10">
            <Link href="/" className="flex w-fit items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                <Heart className="size-5 fill-[#F1D3C6] text-[#F1D3C6]" />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-semibold text-white">
                  WedPlan
                </h1>
                <p className="text-[8px] tracking-[0.25em] text-white/70">
                  YOUR WEDDING JOURNEY
                </p>
              </div>
            </Link>

            <div className="max-w-sm">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2">
                <Sparkles className="size-3.5 text-[#F1D3C6]" />
                <span className="text-[9px] tracking-widest text-white">
                  YOUR JOURNEY BEGINS HERE
                </span>
              </div>

              <h2 className="font-serif text-4xl leading-tight text-white xl:text-[46px]">
                A Beautiful
                <br />
                Wedding Begins
                <br />
                <span className="italic text-[#F1D3C6]">With a Dream.</span>
              </h2>

              <p className="mt-5 text-xs leading-6 text-white/75">
                Find the right people, discover beautiful services, and create
                memories that last forever.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  "Discover trusted wedding professionals",
                  "Create your perfect wedding experience",
                  "Manage everything in one place",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                      <Check className="size-4 text-[#F1D3C6]" />
                    </div>
                    <p className="text-[11px] text-white/90">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between border-t border-white/20 pt-4 text-[9px] text-white/60">
              <span>© 2026 WedPlan. All rights reserved.</span>
              <span>♥ Made for love</span>
            </div>
          </div>
        </section>

        {/* RIGHT FORM */}
        <section className="flex min-h-0 items-center justify-center overflow-y-auto px-5 py-6 sm:px-8 lg:px-10 xl:px-12">
          <div className="my-auto w-full max-w-[390px] py-2">
            {/* Mobile Logo */}
            <Link href="/" className="mb-4 flex w-fit items-center gap-2 lg:hidden">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#772D43]">
                <Heart className="size-4 fill-white text-white" />
              </div>
              <span className="font-serif text-xl font-semibold text-[#392B27] dark:text-white">
                WedPlan
              </span>
            </Link>

            {/* Heading */}
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-px w-6 bg-[#B77B65] dark:bg-[#D9A58E]" />
                <span className="text-[9px] font-bold tracking-[0.2em] text-[#B77B65] dark:text-[#D9A58E]">
                  START YOUR JOURNEY
                </span>
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-[#392B27] dark:text-white">
                Create your{" "}
                <span className="font-serif italic text-[#B77B65] dark:text-[#D9A58E]">
                  account.
                </span>
              </h2>

              <p className="mt-2 text-xs text-[#85766F] dark:text-[#B2BDB5]">
                Join WedPlan and plan your dream wedding.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* ROLE */}
              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold text-[#392B27] dark:text-white">
                  Account Type
                </Label>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      value: "customer",
                      title: "Customer",
                      description: "Plan wedding",
                      icon: UserRound,
                    },
                    {
                      value: "vendor",
                      title: "Vendor",
                      description: "Offer services",
                      icon: Store,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    const active = role === item.value;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setRole(item.value as AccountRole)}
                        aria-pressed={active}
                        className={`flex items-center gap-2 rounded-lg border p-2 text-left transition ${
                          active
                            ? "border-[#772D43] bg-[#F8EDEF] dark:border-[#D9A58E] dark:bg-[#3B443D]"
                            : "border-[#E9DED6] bg-white dark:border-[#414C45] dark:bg-[#303B35]"
                        }`}
                      >
                        <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                          active
                            ? "bg-[#772D43] text-white dark:bg-[#D9A58E] dark:text-[#1D2421]"
                            : "bg-[#F8EDEF] text-[#772D43] dark:bg-[#414C45] dark:text-[#D9A58E]"
                        }`}>
                          <Icon className="size-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-semibold text-[#392B27] dark:text-white">
                            {item.title}
                          </p>
                          <p className="text-[9px] text-[#85766F] dark:text-[#B2BDB5]">
                            {item.description}
                          </p>
                        </div>

                        {active && (
                          <Check className="size-3.5 text-[#772D43] dark:text-[#D9A58E]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* NAME */}
              <div className="space-y-1">
                <Label htmlFor="name" className="text-[11px] font-semibold text-[#392B27] dark:text-white">
                  Full Name
                </Label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#A4958E]" />
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    autoComplete="name"
                    className="h-9 rounded-lg border-[#E9DED6] bg-[#FCFAF8] pl-9 text-xs dark:border-[#414C45] dark:bg-[#303B35] dark:text-white"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="space-y-1">
                <Label htmlFor="email" className="text-[11px] font-semibold text-[#392B27] dark:text-white">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#A4958E]" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    className="h-9 rounded-lg border-[#E9DED6] bg-[#FCFAF8] pl-9 text-xs dark:border-[#414C45] dark:bg-[#303B35] dark:text-white"
                  />
                </div>
                {email && !emailValid && (
                  <p className="text-[10px] text-red-500">
                    Enter a valid email address.
                  </p>
                )}
              </div>

              {/* PROFILE IMAGE */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label className="text-[11px] font-semibold text-[#392B27] dark:text-white">
                    Profile Image
                  </Label>
                  <span className="text-[9px] text-[#A4958E]">Optional</span>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-dashed border-[#DCC8CE] bg-[#FCFAF8] p-2 dark:border-[#414C45] dark:bg-[#303B35]">
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

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-semibold text-[#392B27] dark:text-white">
                      {image ? image.name : "Upload your photo"}
                    </p>
                    <p className="text-[9px] text-[#85766F] dark:text-[#B2BDB5]">
                      {image ? `${(image.size / 1024).toFixed(0)} KB` : "JPG, PNG or WEBP"}
                    </p>
                  </div>

                  <label
                    htmlFor="profile-image"
                    className={`cursor-pointer rounded-md bg-[#F8EDEF] px-3 py-1.5 text-[10px] font-semibold text-[#772D43] dark:bg-[#414C45] dark:text-[#D9A58E] ${
                      isUploading ? "pointer-events-none opacity-50" : ""
                    }`}
                  >
                    {isUploading ? "Uploading..." : preview ? "Change" : "Upload"}
                  </label>

                  {preview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      aria-label="Remove profile image"
                      className="text-[#A4958E] hover:text-red-500"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}

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
              </div>

              {/* PASSWORD */}
              <div className="space-y-1">
                <Label htmlFor="password" className="text-[11px] font-semibold text-[#392B27] dark:text-white">
                  Password
                </Label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#A4958E]" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    autoComplete="new-password"
                    className="h-9 rounded-lg border-[#E9DED6] bg-[#FCFAF8] pl-9 pr-10 text-xs dark:border-[#414C45] dark:bg-[#303B35] dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A4958E]"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>

                <div className="flex flex-wrap gap-x-3 text-[9px]">
                  {[
                    [hasMinLength, "6+ characters"],
                    [hasUppercase, "Uppercase"],
                    [hasLowercase, "Lowercase"],
                  ].map(([valid, label]) => (
                    <span
                      key={label as string}
                      className={`flex items-center gap-1 ${
                        valid ? "text-green-600 dark:text-green-400" : "text-[#93847D] dark:text-[#B2BDB5]"
                      }`}
                    >
                      <Check className="size-2.5" />
                      {label as string}
                    </span>
                  ))}
                </div>
              </div>

              {/* SUBMIT */}
              <Button
                type="submit"
                disabled={!passwordValid || !emailValid || isUploading || isSubmitting || isGoogleLoading}
                className="group h-9 w-full rounded-lg bg-[#772D43] text-xs font-semibold text-white hover:bg-[#612338] disabled:opacity-50 dark:bg-[#B77B65] dark:hover:bg-[#C58D77]"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
                {!isSubmitting && <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />}
              </Button>

              {/* DIVIDER */}
              <div className="flex items-center gap-3 py-0.5">
                <Separator className="flex-1 bg-[#EDE2E5] dark:bg-[#414C45]" />
                <span className="text-[9px] tracking-widest text-[#A4958E] dark:text-[#B2BDB5]">
                  OR
                </span>
                <Separator className="flex-1 bg-[#EDE2E5] dark:bg-[#414C45]" />
              </div>

              {/* GOOGLE */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || isSubmitting}
                className="h-9 w-full rounded-lg border-[#E9DED6] bg-white text-xs text-[#392B27] hover:bg-[#FCFAF8] dark:border-[#414C45] dark:bg-[#303B35] dark:text-white dark:hover:bg-[#35413A]"
              >
                <svg viewBox="0 0 24 24" className="size-4">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.09-1.92 3.28-4.75 3.28-8.09Z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.85 0-5.26-1.92-6.13-4.5H2.18v2.84A11 11 0 0 0 12 23Z" />
                  <path fill="#FBBC05" d="M5.87 14.13A6.6 6.6 0 0 1 5.52 12c0-.74.13-1.46.35-2.13V7.03H2.18A11 11 0 0 0 1 12c0 1.78.43 3.47 1.18 4.97l3.69-2.84Z" />
                  <path fill="#EA4335" d="M12 5.25c1.62 0 3.06.56 4.2 1.66l3.15-3.15C17.45 1.92 14.97 1 12 1A11 11 0 0 0 2.18 7.03l3.69 2.84C6.74 7.17 9.15 5.25 12 5.25Z" />
                </svg>
                {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
              </Button>

              {/* TERMS */}
              <p className="text-center text-[9px] leading-5 text-[#93847D] dark:text-[#B2BDB5]">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="font-semibold text-[#772D43] underline-offset-4 hover:underline dark:text-[#D9A58E]">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-semibold text-[#772D43] underline-offset-4 hover:underline dark:text-[#D9A58E]">
                  Privacy Policy
                </Link>.
              </p>
            </form>

            {/* SIGN IN */}
            <div className="mt-3 border-t border-[#EDE2E5] pt-3 text-center dark:border-[#414C45]">
              <p className="text-[11px] text-[#85766F] dark:text-[#B2BDB5]">
                Already have an account?{" "}
                <Link href="/sign-in" className="font-semibold text-[#772D43] hover:underline dark:text-[#D9A58E]">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </main>
  );
}
