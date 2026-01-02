import { Outlet } from "react-router-dom";
import careerConnectLogo from "../../../assets/careerconnect.png";

const AuthLayout = () => {
  return (
    <div className="flex h-screen w-screen max-lg:justify-center max-lg:items-center">
      <div className="flex flex-1 flex-col max-lg:justify-center max-lg:items-center relative gap-10">
        <div className="lg:absolute lg:top-6 lg:left-[26px] w-fit flex flex-col justify-center items-center">
          <img
            src={careerConnectLogo}
            alt="a fork and spoon logo"
            width={50}
            height={50}
          />
          <h4 className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Career Connect
          </h4>
        </div>
        <Outlet />
      </div>
      <div className="flex-1 flex-col hidden lg:flex lg:items-center lg:justify-center bg-gray-900">
        <img
          className="logo-glow"
          src={careerConnectLogo}
          alt="Career Connect Logo"
          height={270}
          width={270}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
