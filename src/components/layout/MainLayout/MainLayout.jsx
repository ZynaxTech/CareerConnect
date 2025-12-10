import { Outlet } from "react-router-dom";
import Header from "../../common components/Header";
import Footer from "../../common components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 pb-4 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
