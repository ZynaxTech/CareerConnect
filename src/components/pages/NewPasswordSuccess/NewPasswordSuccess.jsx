import { Link, useNavigate } from "react-router-dom";
import ResetDone from "../../../assets/password-reset-success.svg";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect } from "react";

const NewPasswordSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isPasswordReset = localStorage.getItem("passwordResetSuccessful");
    console.log("password reset success in success route", isPasswordReset);
    if (!isPasswordReset) {
      navigate("/auth/newpassword");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex flex-col items-center justify-center gap-4 w-[45%]">
        <img src={ResetDone} alt="Cloud Done" />
        <h3 className="text-2xl font-semibold mt-2">Password Changed!</h3>
        <p className="text-[0.81rem] text-gray-400 w-full text-center mt-[-10px]">
          Your password has been changed successfully.
        </p>
        <Link
          to="/auth/login"
          className="bg-white border-sky-900 border-2 hover:underline text-sky-900 rounded-[20px] px-5 py-2 flex gap-2 justify-center items-center text-base w-11/12 text-center mt-2 uppercase"
          onClick={() => {
            localStorage.removeItem("passwordResetSuccessful");
            localStorage.removeItem("resetEmail");
          }}
        >
          <FaArrowLeft /> Back to Login
        </Link>
      </div>
    </div>
  );
};

export default NewPasswordSuccess;
