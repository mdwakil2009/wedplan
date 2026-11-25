
import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      
      {children}
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
