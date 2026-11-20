
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiPlusCircle,
  FiImage,
  FiMapPin,
  FiX,
  FiUploadCloud,
  FiCamera,
  FiFileText,
} from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/lib/auth-client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { toast } from "@/components/ui/toast";

const categories = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

// Animation
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const containerAnimation = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function AddServicePage() {
    const { data: session } = useSession();
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent multiple submissions
  const submitLock = useRef(false);

  // Multiple image upload
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const validFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length !== files.length) {
      toast.add({
        title: "Invalid image",
        description: "Please select only image files.",
      });
    }

    if (validFiles.length === 0) {
      event.target.value = "";
      return;
    }

    setImages((prev) => [...prev, ...validFiles]);

    const newPreviews = validFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages((prev) => [...prev, ...newPreviews]);

    event.target.value = "";
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(previewImages[index]);

    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setPreviewImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // Form submit
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    if (images.length === 0) {
      toast.add({
        title: "Service images required",
        description: "Please upload at least one service image.",
      });

      return;
    }

    if (submitLock.current) return;

    submitLock.current = true;
    setIsSubmitting(true);

    try {
      // Step 1: Upload images to ImgBB
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const imageFormData = new FormData();

          imageFormData.append("image", image);

          const imageResponse = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGBB_API_KEY}`,
            {
              method: "POST",
              body: imageFormData,
            }
          );

          const imageResult = await imageResponse.json();

          if (!imageResponse.ok || !imageResult.success) {
            throw new Error("Image upload failed");
          }

          return imageResult.data.url;
        })
      );

      // Step 2: Save service data to MongoDB
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...userData,
             userEmail: session?.user?.email,
            price: Number(userData.price),
            images: imageUrls,
            status: "pending",
            createdAt: new Date(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.add({
        title: "Service added successfully!",
        description: "Your service is submitted for admin approval.",
      });

      console.log(result);

      // Reset form
      form.reset();

      previewImages.forEach((url) =>
        URL.revokeObjectURL(url)
      );

      setImages([]);
      setPreviewImages([]);
    } catch (error) {
      console.log(error);

      toast.add({
        title: "Failed to add service",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      submitLock.current = false;
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    previewImages.forEach((url) =>
      URL.revokeObjectURL(url)
    );

    setImages([]);
    setPreviewImages([]);
  };

  return (
    <div className="min-h-full">
      <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">

        {/* Page Header */}
        <motion.div
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#CFE7E4] bg-[#E4F3F1] px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#378A88]"
          >
            <FiPlusCircle size={14} />
            VENDOR DASHBOARD
          </motion.div>

          <motion.div variants={fadeUp}>
            <h1 className="text-2xl font-bold tracking-tight text-[#193F5B] sm:text-3xl">
              Add Your Service
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#87939E]">
              Showcase your wedding service, share your work,
              and connect with couples planning their special day.
            </p>
          </motion.div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: "easeOut",
          }}
        >
          <Card className="overflow-hidden rounded-2xl border-[#E1E8ED] bg-white shadow-[0_4px_24px_rgba(80,30,45,0.04)]">

            {/* Card Header */}
            <div className="border-b border-[#E1E8ED] bg-[#F8FAFC] px-5 py-5 sm:px-7">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E4F3F1] text-[#378A88]"
                >
                  <FiFileText size={19} />
                </motion.div>

                <div>
                  <h2 className="text-sm font-bold text-[#193F5B] sm:text-base">
                    Service Information
                  </h2>

                  <p className="mt-0.5 text-xs text-[#87939E]">
                    Fill in your service details below
                  </p>
                </div>
              </div>
            </div>

            <CardContent className="p-5 sm:p-7">
              <motion.form
                onSubmit={handleSubmit}
                variants={containerAnimation}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >

                {/* Service Name */}
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.4 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="serviceName"
                    className="text-sm font-semibold text-[#193F5B]"
                  >
                    Service Name
                    <span className="ml-1 text-[#378A88]">*</span>
                  </Label>

                  <Input
                    id="serviceName"
                    name="serviceName"
                    placeholder="e.g. Dream Wedding Photography"
                    required
                    disabled={isSubmitting}
                    className="h-11 rounded-xl border-[#E1E8ED] bg-white px-3.5 text-sm transition-all duration-200 placeholder:text-[#9BAAB6] hover:border-[#B9CEDA] focus-visible:border-[#378A88] focus-visible:ring-4 focus-visible:ring-[#378A88]/10"
                  />
                </motion.div>

                {/* Category & Price */}
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                >

                  {/* Category */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-[#193F5B]">
                      Service Category
                      <span className="ml-1 text-[#378A88]">*</span>
                    </Label>

                    <Select
                      name="category"
                      required
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="h-11 w-full rounded-xl border-[#E1E8ED] bg-white text-sm transition-all hover:border-[#B9CEDA] focus:ring-4 focus:ring-[#378A88]/10">
                        <SelectValue placeholder="Choose category" />
                      </SelectTrigger>

                      <SelectContent className="rounded-xl border-[#E1E8ED] bg-white">
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category}
                            className="cursor-pointer text-sm focus:bg-[#E4F3F1] focus:text-[#378A88]"
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="price"
                      className="text-sm font-semibold text-[#193F5B]"
                    >
                      Price (BDT)
                      <span className="ml-1 text-[#378A88]">*</span>
                    </Label>

                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="1"
                      placeholder="Enter your price"
                      required
                      disabled={isSubmitting}
                      className="h-11 rounded-xl border-[#E1E8ED] px-3.5 text-sm transition-all duration-200 placeholder:text-[#9BAAB6] hover:border-[#B9CEDA] focus-visible:border-[#378A88] focus-visible:ring-4 focus-visible:ring-[#378A88]/10"
                    />
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.4 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="location"
                    className="text-sm font-semibold text-[#193F5B]"
                  >
                    Service Location
                    <span className="ml-1 text-[#378A88]">*</span>
                  </Label>

                  <div className="relative">
                    <FiMapPin
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#87939E]"
                      size={16}
                    />

                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g. Dhaka, Bangladesh"
                      required
                      disabled={isSubmitting}
                      className="h-11 rounded-xl border-[#E1E8ED] pl-10 text-sm transition-all duration-200 placeholder:text-[#9BAAB6] hover:border-[#B9CEDA] focus-visible:border-[#378A88] focus-visible:ring-4 focus-visible:ring-[#378A88]/10"
                    />
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.4 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="description"
                    className="text-sm font-semibold text-[#193F5B]"
                  >
                    Service Description
                    <span className="ml-1 text-[#378A88]">*</span>
                  </Label>

                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your service, experience, packages and what makes your service special..."
                    required
                    disabled={isSubmitting}
                    className="min-h-32 resize-none rounded-xl border-[#E1E8ED] p-3.5 text-sm leading-6 transition-all duration-200 placeholder:text-[#9BAAB6] hover:border-[#B9CEDA] focus-visible:border-[#378A88] focus-visible:ring-4 focus-visible:ring-[#378A88]/10"
                  />
                </motion.div>

                {/* Image Upload */}
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Label className="text-sm font-semibold text-[#193F5B]">
                      Service Images
                      <span className="ml-1 text-[#378A88]">*</span>
                    </Label>

                    <motion.span
                      key={images.length}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="rounded-full bg-[#E4F3F1] px-2.5 py-1 text-[11px] font-medium text-[#378A88]"
                    >
                      {images.length} selected
                    </motion.span>
                  </div>

                  {/* Upload Box */}
                  <motion.label
                    htmlFor="images"
                    whileHover={{
                      scale: 1.005,
                      borderColor: "#378A88",
                    }}
                    whileTap={{ scale: 0.99 }}
                    className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CFE7E4] bg-[#F8FAFC] px-5 py-8 text-center transition-all duration-300 hover:bg-[#E4F3F1]/60 sm:py-10"
                  >
                    <motion.div
                      whileHover={{ y: -4, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4F3F1] text-[#378A88] transition-colors group-hover:bg-[#378A88] group-hover:text-white"
                    >
                      <FiUploadCloud size={22} />
                    </motion.div>

                    <p className="text-sm font-semibold text-[#193F5B]">
                      Click to upload images
                    </p>

                    <p className="mt-1.5 max-w-xs text-xs leading-5 text-[#87939E]">
                      Select multiple photos showcasing your
                      wedding service
                    </p>

                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#378A88] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#2C7371]"
                    >
                      <FiImage size={14} />
                      Browse Images
                    </motion.div>

                    <p className="mt-3 text-[10px] tracking-wide text-[#87939E]">
                      JPG, PNG, WEBP
                    </p>

                    <input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      disabled={isSubmitting}
                      className="hidden"
                    />
                  </motion.label>

                  {/* Image Preview */}
                  <AnimatePresence mode="popLayout">
                    {previewImages.length > 0 && (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                      >
                        {previewImages.map((preview, index) => (
                          <motion.div
                            key={preview}
                            layout
                            initial={{
                              opacity: 0,
                              scale: 0.8,
                              y: 15,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.7,
                              y: 10,
                            }}
                            transition={{
                              duration: 0.25,
                            }}
                            whileHover={{ y: -3 }}
                            className="group relative aspect-square overflow-hidden rounded-xl border border-[#E1E8ED] bg-[#F8FAFC] shadow-sm"
                          >
                            <img
                              src={preview}
                              alt={`Service image ${index + 1}`}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                            {/* Remove Button */}
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                handleRemoveImage(index)
                              }
                              disabled={isSubmitting}
                              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#378A88] opacity-100 shadow-md transition-colors hover:bg-[#378A88] hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
                              aria-label="Remove image"
                            >
                              <FiX size={14} />
                            </motion.button>

                            {/* Image Number */}
                            <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                              <FiImage size={10} />
                              {index + 1}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Review Notice */}
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.4 }}
                  className="flex gap-3 rounded-xl border border-[#E1E8ED] bg-[#F8FAFC] p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E4F3F1] text-[#378A88]">
                    <FiCamera size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#193F5B]">
                      Admin Review
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#87939E]">
                      Your service will be reviewed by our admin
                      team before becoming visible to customers.
                    </p>
                  </div>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  variants={fadeUp}
                  className="flex flex-col-reverse gap-3 border-t border-[#E1E8ED] pt-5 sm:flex-row sm:justify-end"
                >
                  {/* Reset Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      type="reset"
                      variant="outline"
                      disabled={isSubmitting}
                      onClick={handleReset}
                      className="h-11 w-full rounded-xl border-[#E1E8ED] px-5 text-sm font-medium text-[#87939E] transition-all duration-200 hover:border-[#B9CEDA] hover:bg-[#F8FAFC] sm:w-auto"
                    >
                      Reset Form
                    </Button>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={
                      isSubmitting
                        ? {}
                        : { scale: 1.02, y: -1 }
                    }
                    whileTap={
                      isSubmitting
                        ? {}
                        : { scale: 0.97 }
                    }
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-11 w-full rounded-xl bg-[#378A88] px-6 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(55,138,136,0.2)] transition-all duration-200 hover:bg-[#2C7371] hover:shadow-[0_6px_18px_rgba(55,138,136,0.3)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "linear",
                            }}
                            className="mr-2"
                          >
                            <FiUploadCloud size={16} />
                          </motion.div>

                          Submitting...
                        </>
                      ) : (
                        <>
                          <FiPlusCircle
                            className="mr-2"
                            size={16}
                          />
                          Submit Service
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>

              </motion.form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
