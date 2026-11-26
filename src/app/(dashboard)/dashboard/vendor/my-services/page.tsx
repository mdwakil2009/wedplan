
import { Suspense } from "react";

import MyServicesClient from "@/components/dashboard/Vendor/MyServicesClient";
import MyServicesSkeleton from "@/components/dashboard/Vendor/MyServicesSkeleton";
import { getMyServices } from "@/lib/action/api";

export default function MyServicesPage() {
  return (
    <Suspense fallback={<MyServicesSkeleton />}>
      <MyServicesContent />
    </Suspense>
  );
}

async function MyServicesContent() {
  const services = await getMyServices();

  return <MyServicesClient initialServices={services} />;
}
