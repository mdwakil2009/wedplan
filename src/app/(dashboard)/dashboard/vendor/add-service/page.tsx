
"use client";

import { useState } from "react";
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

export default function AddServicePage() {
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

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

    setImages([...images, ...validFiles]);

    setPreviewImages([
      ...previewImages,
      ...validFiles.map((file) => URL.createObjectURL(file)),
    ]);

    event.target.value = "";
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(previewImages[index]);

    setImages(images.filter((_, i) => i !== index));

    setPreviewImages(
      previewImages.filter((_, i) => i !== index)
    );
  };

  // Form submit
  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const fromData = new FormData(event.currentTarget)
    const userData = Object.fromEntries(fromData.entries())
    console.log(userData)

    if (images.length === 0) {
      toast.add({
        title: "Service images required",
        description: "Please upload at least one service image.",
      });

      return;
    }

    toast.add({
      title: "Service form is ready",
      description: "Backend and image upload will be connected next.",
    });
  };

  return (
    <div className="min-h-full bg-white">
      <div className="mx-auto w-full max-w-5xl space-y-5 p-4 sm:p-5">

        {/* Page Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F8EFF0] px-3 py-1 text-[11px] font-semibold tracking-wider text-[#772D43]">
            <FiPlusCircle size={13} />
            VENDOR DASHBOARD
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#292329] sm:text-2xl">
              Add Your Service
            </h1>

            <p className="mt-1 text-sm text-[#817780]">
              Showcase your wedding service and connect with couples.
            </p>
          </div>
        </div>

        {/* Main Form */}
        <Card className="overflow-hidden rounded-xl border-[#EDE2E5] bg-white shadow-sm">

          {/* Card Header */}
          <div className="border-b border-[#F0E7E8] bg-[#FFFCF9] px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8EFF0] text-[#772D43]">
                <FiFileText size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-[#292329]">
                  Service Information
                </h2>

                <p className="text-[11px] text-[#817780]">
                  Fill in your service details
                </p>
              </div>
            </div>
          </div>

          <CardContent className="p-4 sm:p-5">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Service Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="serviceName"
                  className="text-xs font-medium text-[#292329]"
                >
                  Service Name <span className="text-[#772D43]">*</span>
                </Label>

                <Input
                  id="serviceName"
                  name="serviceName"
                  placeholder="e.g. Dream Wedding Photography"
                  required
                  className="h-10 rounded-lg border-[#EDE2E5] px-3 text-sm focus-visible:border-[#772D43] focus-visible:ring-[#772D43]/15"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Category */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-[#292329]">
                    Service Category <span className="text-[#772D43]">*</span>
                  </Label>

                  <Select name="category" required>
                    <SelectTrigger className="h-10 w-full rounded-lg border-[#EDE2E5] bg-white text-sm focus:ring-[#772D43]/15">
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>

                    <SelectContent className="rounded-lg border-[#EDE2E5] bg-white">
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="cursor-pointer text-sm focus:bg-[#F8EFF0] focus:text-[#772D43] data-[state=checked]:text-[#772D43]"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="price"
                    className="text-xs font-medium text-[#292329]"
                  >
                    Price (BDT) <span className="text-[#772D43]">*</span>
                  </Label>

                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="1"
                    placeholder="Enter price"
                    required
                    className="h-10 rounded-lg border-[#EDE2E5] px-3 text-sm focus-visible:border-[#772D43] focus-visible:ring-[#772D43]/15"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="location"
                  className="text-xs font-medium text-[#292329]"
                >
                  Service Location <span className="text-[#772D43]">*</span>
                </Label>

                <div className="relative">
                  <FiMapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A18D96]"
                    size={15}
                  />

                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. Dhaka, Bangladesh"
                    required
                    className="h-10 rounded-lg border-[#EDE2E5] pl-9 text-sm focus-visible:border-[#772D43] focus-visible:ring-[#772D43]/15"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="description"
                  className="text-xs font-medium text-[#292329]"
                >
                  Service Description <span className="text-[#772D43]">*</span>
                </Label>

                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your service, experience and packages..."
                  required
                  className="min-h-28 resize-none rounded-lg border-[#EDE2E5] p-3 text-sm leading-6 focus-visible:border-[#772D43] focus-visible:ring-[#772D43]/15"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">

                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-[#292329]">
                    Service Images <span className="text-[#772D43]">*</span>
                  </Label>

                  <span className="text-[11px] text-[#817780]">
                    {images.length} uploaded
                  </span>
                </div>

                {/* Upload Box */}
                <label
                  htmlFor="images"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E8D5DC] bg-[#FFFCF9] px-4 py-5 text-center transition hover:border-[#772D43] hover:bg-[#F8EFF0]/50"
                >
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8EFF0] text-[#772D43]">
                    <FiUploadCloud size={20} />
                  </div>

                  <p className="text-xs font-semibold text-[#292329]">
                    Click to upload images
                  </p>

                  <p className="mt-1 text-[11px] text-[#817780]">
                    Select multiple photos of your service
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-[#772D43] px-3 py-1.5 text-xs font-medium text-white">
                    <FiImage size={13} />
                    Browse Images
                  </div>

                  <p className="mt-2 text-[10px] text-[#A18D96]">
                    JPG, PNG, WEBP
                  </p>

                  <input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {/* Image Preview */}
                {previewImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">

                    {previewImages.map((preview, index) => (
                      <div
                        key={preview}
                        className="group relative aspect-square overflow-hidden rounded-lg border border-[#EDE2E5] bg-[#FFFCF9]"
                      >
                        <img
                          src={preview}
                          alt={`Service image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />

                        {/* Remove Image */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#772D43] shadow-sm transition hover:bg-[#772D43] hover:text-white"
                          aria-label="Remove image"
                        >
                          <FiX size={13} />
                        </button>

                        {/* Image Number */}
                        <div className="absolute bottom-1.5 left-1.5 rounded bg-black/50 px-1.5 py-0.5 text-[9px] text-white">
                          {index + 1}
                        </div>
                      </div>
                    ))}

                  </div>
                )}
              </div>

              {/* Review Notice */}
              <div className="flex gap-2.5 rounded-lg border border-[#EDE2E5] bg-[#FFFCF9] p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F8EFF0] text-[#772D43]">
                  <FiCamera size={15} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#292329]">
                    Admin Review
                  </p>

                  <p className="mt-0.5 text-[11px] leading-5 text-[#817780]">
                    Your service will be reviewed before becoming visible to customers.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-2 border-t border-[#F0E7E8] pt-4 sm:flex-row sm:justify-end">

                <Button
                  type="reset"
                  variant="outline"
                  className="h-9 rounded-lg border-[#EDE2E5] px-4 text-xs text-[#817780] hover:bg-[#FFFCF9]"
                  onClick={() => {
                    previewImages.forEach((url) =>
                      URL.revokeObjectURL(url)
                    );

                    setImages([]);
                    setPreviewImages([]);
                  }}
                >
                  Reset
                </Button>

                <Button
                  type="submit"
                  className="h-9 rounded-lg bg-[#772D43] px-4 text-xs text-white hover:bg-[#612336]"
                >
                  <FiPlusCircle className="mr-1.5" size={15} />
                  Submit Service
                </Button>

              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
