
import MyServicesClient from "@/components/dashboard/Vendor/MyServicesClient";
import { getMyServices } from "@/lib/action/api";


export default async function MyServicesPage() {
  const services = await getMyServices();

  return <MyServicesClient initialServices={services} />;
}
