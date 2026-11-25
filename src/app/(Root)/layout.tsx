
import Navbar from "@/components/Shared/Navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      
      {children}
    </div>
  );
};

export default RootLayout;
