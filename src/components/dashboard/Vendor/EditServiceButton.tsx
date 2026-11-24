"use client";

import { useState } from "react";
import { FiEdit2, FiImage, FiX, FiUploadCloud } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateService } from "@/lib/action/service";
import { toast } from "@/components/ui/toast";
interface Service {
  _id: string;
  serviceName: string;
  category: string;
  price: number;
  location: string;
  description: string;
  images?: string[];
  image?: string;
  imageUrl?: string;
}

interface EditServiceButtonProps {
  service: Service;
}

const EditServiceButton = ({ service }: EditServiceButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [serviceName, setServiceName] = useState(service.serviceName || "");

  const [category, setCategory] = useState(service.category || "");

  const [price, setPrice] = useState(String(service.price || ""));

  const [location, setLocation] = useState(service.location || "");

  const [description, setDescription] = useState(service.description || "");

  const [existingImages, setExistingImages] = useState<string[]>([]);

  const [newImages, setNewImages] = useState<File[]>([]);

  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const getServiceImages = () => {
    if (Array.isArray(service.images) && service.images.length > 0) {
      return service.images;
    }

    if (service.image) {
      return [service.image];
    }

    if (service.imageUrl) {
      return [service.imageUrl];
    }

    return [];
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (open) {
      setServiceName(service.serviceName || "");
      setCategory(service.category || "");
      setPrice(String(service.price || ""));
      setLocation(service.location || "");
      setDescription(service.description || "");

      setExistingImages(getServiceImages());

      setNewImages([]);
      setNewPreviews([]);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    // Only JPG, PNG and WEBP images
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

    // Maximum 5 images (Previous + New)
    const remainingSlots = 5 - existingImages.length - newImages.length;

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

    setNewImages((previous) => [...previous, ...finalFiles]);

    const previews = finalFiles.map((file) => URL.createObjectURL(file));

    setNewPreviews((previous) => [...previous, ...previews]);

    event.target.value = "";
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((previous) => previous.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(newPreviews[index]);

    setNewImages((previous) => previous.filter((_, i) => i !== index));

    setNewPreviews((previous) => previous.filter((_, i) => i !== index));
  };

  const uploadImage = async (image: File) => {
    const formData = new FormData();

    formData.append("image", image);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.display_url;
  };

  // Update Service
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      const uploadedImages = await Promise.all(
        newImages.map((image) => uploadImage(image)),
      );

      const allImages = [...existingImages, ...uploadedImages];

      const updatedService = {
        serviceName,
        category,
        price: Number(price),
        location,
        description,
        images: allImages,
      };

      const result = await updateService(service._id, updatedService);

      if (result.success) {
        toast.add({
          title: "Service updated",
          description: "Your service has been updated successfully.",
        });

        setIsOpen(false);
        window.location.reload();
      } else {
        toast.add({
          title: "Update failed",
          description: result.message || "Service update failed.",
        });
      }
    } catch (error) {
      toast.add({
        title: "Something went wrong",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* Edit Button */}
      <DialogTrigger className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#378A88]/30 bg-[#378A88]/10 px-3 py-2 text-sm font-medium text-[#378A88] transition-colors hover:bg-[#378A88] hover:text-white">
        <FiEdit2 size={16} />
        Edit
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border border-gray-200 bg-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#193F5B]">
            Edit Your Service
          </DialogTitle>

          <DialogDescription>
            Update your service information and images.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Service Name */}
          <div className="space-y-2">
            <Label htmlFor="serviceName">Service Name</Label>

            <Input
              id="serviceName"
              value={serviceName}
              onChange={(event) => setServiceName(event.target.value)}
              placeholder="Enter service name"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>

            <Select
              value={category}
              onValueChange={(value) => setCategory(value ?? "")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Photography">Photography</SelectItem>

                <SelectItem value="Catering">Catering</SelectItem>

                <SelectItem value="Decoration">Decoration</SelectItem>

                <SelectItem value="Venue">Venue</SelectItem>

                <SelectItem value="Music">Music</SelectItem>

                <SelectItem value="Wedding Planning">
                  Wedding Planning
                </SelectItem>

                <SelectItem value="Makeup">Makeup</SelectItem>

                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>

            <Input
              id="price"
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="Enter price"
              min="0"
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>

            <Input
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Enter service location"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe your service"
              rows={4}
              required
            />
          </div>

          {/* Existing Images */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-[#193F5B]">
              Previous Images
            </Label>

            {existingImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {existingImages.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm transition-all duration-300 hover:shadow-md"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                      <img
                        src={image}
                        alt={`Previous image ${index + 1}`}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Image Badge */}
                      <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        Previous Image
                      </span>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition-all duration-200 hover:bg-red-500 hover:text-white"
                        title="Remove image"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <FiImage size={22} className="text-gray-400" />
                </div>

                <p className="text-sm font-medium text-gray-600">
                  No previous images
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Upload new images below
                </p>
              </div>
            )}
          </div>

          {/* Upload New Images */}
          <div className="space-y-3">
            <Label>Add New Images</Label>

            <label
              htmlFor="images"
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#378A88]/40 bg-[#378A88]/5 p-6 transition hover:bg-[#378A88]/10"
            >
              <FiUploadCloud size={30} className="mb-2 text-[#378A88]" />

              <span className="text-sm font-medium text-[#193F5B]">
                Click to upload images
              </span>

              <span className="mt-1 text-xs text-gray-500">
                Select multiple images
              </span>

              <input
                id="images"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* New Image Preview */}
            {newPreviews.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-[#193F5B]">
                    New Images
                  </Label>

                  <span className="rounded-full bg-[#378A88]/10 px-2.5 py-1 text-xs font-medium text-[#378A88]">
                    {newPreviews.length} selected
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {newPreviews.map((preview, index) => (
                    <div
                      key={preview}
                      className="group relative overflow-hidden rounded-xl border border-[#378A88]/20 bg-gray-50 shadow-sm transition-all duration-300 hover:shadow-md"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                        <img
                          src={preview}
                          alt={`New image ${index + 1}`}
                          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* New Badge */}
                        <span className="absolute bottom-2 left-2 rounded-md bg-[#378A88] px-2 py-1 text-xs font-medium text-white shadow-sm">
                          New Image
                        </span>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition-all duration-200 hover:bg-red-500 hover:text-white"
                          title="Remove image"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#193F5B] text-white hover:bg-[#378A88]"
            >
              {loading ? "Updating..." : "Update Service"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditServiceButton;
