export type Service = {
  _id: string;
  serviceName: string;
  category: string;
  price: number;
  location: string;
  description: string;
  userEmail: string;
  images: string[];
  status: string;
  createdAt: string;
};

export type BookingState = {
  success: boolean;
  message: string;
};
