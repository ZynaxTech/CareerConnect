import { Outlet } from "react-router-dom";
import careerConnectLogo from "../../../assets/careerconnect.png";

import "./AuthLayout.css";

const AuthLayout = () => {
  return (
    <div className="container-layout">
      <div className="sides h-full relative">
        <div className="logo-position flex flex-col justify-center items-center">
          <img src={careerConnectLogo} alt="a fork and spoon logo" width={50} height={50} />
          <h4 className="font-semibold">Career Connect</h4>
        </div>
        <Outlet />
      </div>
      <div className="sides right-side bg-gray-900">
        <img
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
