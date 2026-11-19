"use client";

import { FiPlusCircle } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";

export default function AddServicePage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast.add({
      title: "Service form is ready",
      description: "Saving services will be connected to the database soon.",
    });
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[#9A5269]">
          VENDOR
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#292329] sm:text-3xl">
          Add Service
        </h1>
        <p className="mt-1 text-sm text-[#817780]">
          Add a new service to your WedPlan vendor profile.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-[#EDE2E5] bg-white p-5 shadow-[0_2px_12px_rgba(75,35,48,0.04)] sm:p-6"
      >
        <div className="space-y-1.5">
          <Label htmlFor="service-name" className="text-[11px]">
            Service Name
          </Label>
          <Input
            id="service-name"
            name="serviceName"
            placeholder="e.g. Wedding Photography"
            required
            className="h-9 rounded-md border-[#EDE2E5] bg-[#FFFCF9] text-xs"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="service-category" className="text-[11px]">
              Category
            </Label>
            <select
              id="service-category"
              name="category"
              required
              className="h-9 w-full rounded-md border border-[#EDE2E5] bg-[#FFFCF9] px-3 text-xs text-[#292329] outline-none focus:border-[#B87586]"
            >
              <option value="">Select a category</option>
              <option value="photography">Photography</option>
              <option value="venue">Venue</option>
              <option value="catering">Catering</option>
              <option value="decoration">Decoration</option>
              <option value="music">Music & DJ</option>
              <option value="makeup">Makeup</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="service-price" className="text-[11px]">
              Starting Price (BDT)
            </Label>
            <Input
              id="service-price"
              name="price"
              type="number"
              min="0"
              placeholder="e.g. 25000"
              required
              className="h-9 rounded-md border-[#EDE2E5] bg-[#FFFCF9] text-xs"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="service-description" className="text-[11px]">
            Description
          </Label>
          <textarea
            id="service-description"
            name="description"
            rows={4}
            placeholder="Describe what is included in this service..."
            required
            className="w-full resize-none rounded-md border border-[#EDE2E5] bg-[#FFFCF9] px-3 py-2 text-xs text-[#292329] outline-none placeholder:text-[#A89CA2] focus:border-[#B87586]"
          />
        </div>

        <div className="rounded-lg border border-[#F0E7E8] bg-[#FFFCF9] px-3 py-2.5 text-[11px] text-[#817780]">
          The form is ready. Saving services will be connected in the next step.
        </div>

        <Button
          type="submit"
          className="h-9 rounded-md bg-[#772D43] px-4 text-xs text-white hover:bg-[#612338]"
        >
          <FiPlusCircle className="mr-2 size-3.5" />
          Save Service
        </Button>
      </form>
    </div>
  );
}
