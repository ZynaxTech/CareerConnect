import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ResetDone from "../../../assets/password-reset-success.svg";
import {
  setEmailEntered,
  setOTPEntered,
  setPasswordReset,
} from "../../../redux/authSlice.js";

const NewPasswordSuccess = () => {
  const dispatch = useDispatch();

  return (
    <div className="h-full w-full flex justify-center items-center px-5 lg:px-0">
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <img src={ResetDone} alt="Cloud Done" />
        <h3 className="text-2xl font-semibold mt-2 text-sky-900">
          Password Changed!
        </h3>
        <p className="text-[0.81rem] text-gray-400 w-full text-center mt-[-10px]">
          Your password has been changed successfully.
        </p>
        <Link
          to="/auth/login"
          className="bg-white border-sky-900 border-2 hover:underline text-sky-900 rounded-[20px] px-5 py-2 flex gap-2 justify-center items-center text-base w-11/12 text-center mt-2 uppercase"
          onClick={() => {
            dispatch(setEmailEntered(""));
            dispatch(setPasswordReset(false));
            dispatch(setOTPEntered(false));
          }}
        >
          <FaArrowLeft /> Back to Login
        </Link>
      </div>
    </div>
  );
};

export default NewPasswordSuccess;
