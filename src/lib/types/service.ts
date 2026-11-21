export type Service = {
  _id: string;
  serviceName: string;
  category: string;
  price: number;
  location: string;
  description: string;
  userEmail: string;
  vendorId: string;
  images: string[];
  status: string;
  createdAt: string;
};

export type BookingState = {
  success: boolean;
  message: string;
};
export type Customer = {
  _id: string;
  name: string;
  email: string;
  image?: string;
};

export type Booking = {
  _id: string;
  serviceId: string;
  vendorId: string;
  customerId: string;
  eventDate: string;
  eventLocation: string;
  message?: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  createdAt?: string;
  customer?: Customer | null;
  service?: Service | null;
  vendor?: Customer | null;
};
