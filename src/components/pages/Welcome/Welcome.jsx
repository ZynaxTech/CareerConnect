import { Link } from "react-router-dom";
import careerConnectLogo from "../../../assets/careerconnect.png";

const Welcome = () => {
  return (
    <div className="flex h-screen w-screen max-lg:justify-center max-lg:items-center">
      <div className="flex flex-1 flex-col max-lg:justify-center max-lg:items-center relative gap-10">
        <div className="lg:absolute lg:top-6 lg:left-[26px] w-fit flex flex-col justify-center items-center">
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
        <div className="h-full md:w-full max-md:max-w-sm flex justify-center items-center px-5 lg:px-0">
          <div className="flex flex-col justify-center items-center gap-7">
            <p className="font-semibold text-xl md:text-2xl text-sky-950">
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

export default Welcome;
