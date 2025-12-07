import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-16 pb-4 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
