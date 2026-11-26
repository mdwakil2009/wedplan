"use client";

import { useState, useRef } from "react";

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

import { Card, CardContent } from "@/components/ui/card";

import { toast } from "@/components/ui/toast";
import { createServices } from "@/lib/action/service";
import ServiceLimitDialog from "@/components/dashboard/Vendor/ServiceLimitDialog";
import PageHeader from "@/components/dashboard/ui/PageHeader";
import { useRouter } from "next/navigation";

const categories = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

export default function AddServicePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent multiple submissions
  const submitLock = useRef(false);

  // Multiple image upload
  // Multiple image upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    // Only image files
    const validFiles = files.filter((file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    );

    if (validFiles.length !== files.length) {
      toast.add({
        title: "Invalid image",
        description: "Only JPG, PNG and WEBP images are allowed.",
      });
    }

    // Maximum 5MB
    const sizeValidFiles = validFiles.filter(
      (file) => file.size <= 5 * 1024 * 1024,
    );

    if (sizeValidFiles.length !== validFiles.length) {
      toast.add({
        title: "Image too large",
        description: "Each image must be smaller than 5MB.",
      });
    }

    // Maximum 5 images
    const remainingSlots = 5 - images.length;

    if (remainingSlots <= 0) {
      toast.add({
        title: "Image limit reached",
        description: "You can upload a maximum of 5 images.",
      });

      event.target.value = "";
      return;
    }

    const finalFiles = sizeValidFiles.slice(0, remainingSlots);

    if (finalFiles.length < sizeValidFiles.length) {
      toast.add({
        title: "Image limit reached",
        description: "You can upload a maximum of 5 images.",
      });
    }

    if (finalFiles.length === 0) {
      event.target.value = "";
      return;
    }

    setImages((prev) => [...prev, ...finalFiles]);

    const newPreviews = finalFiles.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...newPreviews]);

    event.target.value = "";
  };
  // Remove image
  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(previewImages[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
            },
          );

          const imageResult = await imageResponse.json();

          if (!imageResponse.ok || !imageResult.success) {
            throw new Error("Image upload failed");
          }

          return imageResult.data.url;
        }),
      );

      // Step 2: Save service data to MongoDB
      const result = await createServices({
        ...userData,
        userEmail: session?.user?.email,
        vendorId: session?.user?.id,
        price: Number(userData.price),
        images: imageUrls,
        status: "pending",
        createdAt: new Date(),
      });

      // Free Plan service limit
      if (result.limitReached) {
        setShowLimitDialog(true);
        return;
      }

      toast.add({
        title: "Service added successfully!",
        description: "Your service is submitted for admin approval.",
      });

      // Reset form
      form.reset();

      previewImages.forEach((url) => URL.revokeObjectURL(url));

      setImages([]);
      setPreviewImages([]);

      // Go to My Services page
      router.replace("/dashboard/vendor/my-services");
      router.refresh();
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
    previewImages.forEach((url) => URL.revokeObjectURL(url));

    setImages([]);
    setPreviewImages([]);
  };

  return (
    <div className="min-h-full">
      <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <PageHeader
          eyebrow="Vendor Workspace"
          title="Add Your Service"
          description="Showcase your wedding service, share your work, and connect with couples planning their special day."
        />

        {/* Main Card */}
        <div>
          <Card className="overflow-hidden rounded-2xl border-[#E7EBF5] bg-white shadow-[0_4px_24px_rgba(37,43,69,0.04)]">
            {/* Card Header */}
            <div className="border-b border-[#E7EBF5] bg-[#F9FAFF] px-5 py-5 sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#3A76EF]">
                  <FiFileText size={19} />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-[#252B45] sm:text-base">
                    Service Information
                  </h2>

                  <p className="mt-0.5 text-xs text-[#7A839B]">
                    Fill in your service details below
                  </p>
                </div>
              </div>
            </div>

            <CardContent className="p-5 sm:p-7">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="serviceName"
                    className="text-sm font-semibold text-[#252B45]"
                  >
                    Service Name
                    <span className="ml-1 text-[#3A76EF]">*</span>
                  </Label>

                  <Input
                    id="serviceName"
                    name="serviceName"
                    placeholder="e.g. Dream Wedding Photography"
                    required
                    disabled={isSubmitting}
                    className="h-11 rounded-xl border-[#E7EBF5] bg-white px-3.5 text-sm transition-all duration-200 placeholder:text-[#A0A8BC] hover:border-[#C9D9FF] focus-visible:border-[#3A76EF] focus-visible:ring-4 focus-visible:ring-[#3A76EF]/10"
                  />
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Category */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-[#252B45]">
                      Service Category
                      <span className="ml-1 text-[#3A76EF]">*</span>
                    </Label>

                    <Select name="category" required disabled={isSubmitting}>
                      <SelectTrigger className="h-11 w-full rounded-xl border-[#E7EBF5] bg-white text-sm transition-all hover:border-[#C9D9FF] focus:ring-4 focus:ring-[#3A76EF]/10">
                        <SelectValue placeholder="Choose category" />
                      </SelectTrigger>

                      <SelectContent className="rounded-xl border-[#E7EBF5] bg-white">
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category}
                            className="cursor-pointer text-sm focus:bg-[#EEF4FF] focus:text-[#3A76EF]"
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
                      className="text-sm font-semibold text-[#252B45]"
                    >
                      Price (BDT)
                      <span className="ml-1 text-[#3A76EF]">*</span>
                    </Label>

                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="1"
                      placeholder="Enter your price"
                      required
                      disabled={isSubmitting}
                      className="h-11 rounded-xl border-[#E7EBF5] px-3.5 text-sm transition-all duration-200 placeholder:text-[#A0A8BC] hover:border-[#C9D9FF] focus-visible:border-[#3A76EF] focus-visible:ring-4 focus-visible:ring-[#3A76EF]/10"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-sm font-semibold text-[#252B45]"
                  >
                    Service Location
                    <span className="ml-1 text-[#3A76EF]">*</span>
                  </Label>

                  <div className="relative">
                    <FiMapPin
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A839B]"
                      size={16}
                    />

                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g. Dhaka, Bangladesh"
                      required
                      disabled={isSubmitting}
                      className="h-11 rounded-xl border-[#E7EBF5] pl-10 text-sm transition-all duration-200 placeholder:text-[#A0A8BC] hover:border-[#C9D9FF] focus-visible:border-[#3A76EF] focus-visible:ring-4 focus-visible:ring-[#3A76EF]/10"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-semibold text-[#252B45]"
                  >
                    Service Description
                    <span className="ml-1 text-[#3A76EF]">*</span>
                  </Label>

                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your service, experience, packages and what makes your service special..."
                    required
                    disabled={isSubmitting}
                    className="min-h-32 resize-none rounded-xl border-[#E7EBF5] p-3.5 text-sm leading-6 transition-all duration-200 placeholder:text-[#A0A8BC] hover:border-[#C9D9FF] focus-visible:border-[#3A76EF] focus-visible:ring-4 focus-visible:ring-[#3A76EF]/10"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Label className="text-sm font-semibold text-[#252B45]">
                      Service Images
                      <span className="ml-1 text-[#3A76EF]">*</span>
                    </Label>

                    <span className="rounded-full bg-[#EEF4FF] px-2.5 py-1 text-[11px] font-medium text-[#3A76EF]">
                      {images.length} selected
                    </span>
                  </div>

                  {/* Upload Box */}
                  <label
                    htmlFor="images"
                    className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#C9D9FF] bg-[#F9FAFF] px-5 py-8 text-center transition-all duration-300 hover:border-[#3A76EF] hover:bg-[#EEF4FF]/60 sm:py-10"
                  >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#3A76EF] transition-colors group-hover:bg-[#3A76EF] group-hover:text-white">
                      <FiUploadCloud size={22} />
                    </div>

                    <p className="text-sm font-semibold text-[#252B45]">
                      Click to upload images
                    </p>

                    <p className="mt-1.5 max-w-xs text-xs leading-5 text-[#7A839B]">
                      Select multiple photos showcasing your wedding service
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#3A76EF] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#2F63D4]">
                      <FiImage size={14} />
                      Browse Images
                    </div>

                    <p className="mt-3 text-[10px] tracking-wide text-[#7A839B]">
                      JPG, PNG, WEBP
                    </p>

                    <input
                      id="images"
                      type="file"
                    accept="image/jpeg,image/png,image/webp"
                      multiple
                      onChange={handleImageChange}
                      disabled={isSubmitting}
                      className="hidden"
                    />
                  </label>

                  {/* Image Preview */}
                  {previewImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {previewImages.map((preview, index) => (
                        <div
                          key={preview}
                          className="group relative aspect-square overflow-hidden rounded-xl border border-[#E7EBF5] bg-[#F9FAFF] shadow-sm"
                        >
                          <img
                            src={preview}
                            alt={`Service image ${index + 1}`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />

                          {/* Image Overlay */}
                          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            disabled={isSubmitting}
                            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#3A76EF] opacity-100 shadow-md transition-colors hover:bg-[#3A76EF] hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
                            aria-label="Remove image"
                          >
                            <FiX size={14} />
                          </button>

                          {/* Image Number */}
                          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                            <FiImage size={10} />
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Review Notice */}
                <div className="flex gap-3 rounded-xl border border-[#E7EBF5] bg-[#F9FAFF] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#3A76EF]">
                    <FiCamera size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#252B45]">
                      Admin Review
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#7A839B]">
                      Your service will be reviewed by our admin team before
                      becoming visible to customers.
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#E7EBF5] pt-5 sm:flex-row sm:justify-end">
                  {/* Reset Button */}
                  <div>
                    <Button
                      type="reset"
                      variant="outline"
                      disabled={isSubmitting}
                      onClick={handleReset}
                      className="h-11 w-full rounded-xl border-[#E7EBF5] px-5 text-sm font-medium text-[#7A839B] transition-all duration-200 hover:border-[#C9D9FF] hover:bg-[#F9FAFF] sm:w-auto"
                    >
                      Reset Form
                    </Button>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-11 w-full rounded-xl bg-[#3A76EF] px-6 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(58,118,239,0.2)] transition-all duration-200 hover:bg-[#2F63D4] hover:shadow-[0_6px_18px_rgba(58,118,239,0.3)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <FiUploadCloud size={16} className="mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <FiPlusCircle className="mr-2" size={16} />
                          Submit Service
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Free Plan Limit Dialog */}
        <ServiceLimitDialog
          open={showLimitDialog}
          onOpenChange={setShowLimitDialog}
        />
      </div>
    </div>
  );
}
