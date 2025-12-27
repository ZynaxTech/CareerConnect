import { Link } from "react-router-dom";
import careerConnectLogo from "../../../assets/careerconnect.png";
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="container-layout">
      <div className="sides h-full relative">
        <div className="logo-position flex flex-col justify-center items-center">
          <img
            src={careerConnectLogo}
            alt="Career Connect Logo"
            width={50}
            height={50}
          />
          <h4 className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Career Connect
          </h4>
        </div>
        <div className="home-container">
          <div className="welcome-content">
            <p className="font-semibold text-2xl text-sky-950">
              Join the largest
              <br />
              Community of Pakistani Students
              <br />
              achieving their dreams
            </p>
            <Link
              to="/auth/login"
              className="bg-sky-900 hover:bg-sky-950 text-white rounded-[20px] px-5 py-2 border-none text-base w-full text-center uppercase"
            >
              Login to Continue
            </Link>
          </div>
        </div>
      </div>
      <div className="sides right-side bg-gray-900">
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

export default Welcome;
