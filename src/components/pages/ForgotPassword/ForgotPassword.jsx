import axios from "axios";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { RiLoader3Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Mail from "../../../assets/Mail.svg";
import { setEmailEntered } from "../../../redux/authSlice.js";
import Button from "../../common components/Button";
import Input from "../../common components/Input/Input";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/forgot-password",
        { email }
      );
      console.log(response);
      if (response.data.success) {
        dispatch(setEmailEntered(email));
        toast.success(response.data.message);
        navigate(`/auth/verify-otp/${email}`);
        setEmail("");
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (message.includes("User with this email doesn't exist")) {
          newErrors.forget = message;
          setErrors(newErrors);
        } else {
          console.error("Unexpected error:", message);
        }
      } else console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex flex-col items-center gap-4 w-[45%]">
        <div className="w-full my-2 flex flex-col gap-2">
          <h3 className="text-2xl font-semibold text-sky-900">
            Forgot Password
          </h3>
          <p className="text-sm text-gray-400">
            Please enter your email address to request a password reset
          </p>
        </div>
        <form onSubmit={handleFormEmail} className="w-full flex flex-col gap-4">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            image={Mail}
            placeholder="abc@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-[-10px]">{errors.email}</p>
          )}
          {errors.forget && (
            <p className="text-red-500 text-xs mt-[-10px]">{errors.forget}</p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            cssClasses={`w-full rounded-[20px] px-5 py-2 uppercase mt-2 ${
              isLoading
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-sky-900 hover:bg-sky-950 text-white cursor-pointer"
            }`}
          >
            {isLoading ? (
              <>
                <RiLoader3Fill className="text-xl animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              "Send Verification OTP"
            )}
          </Button>
          <Link
            to="/auth/login"
            className="bg-white border-sky-900 border-2 hover:underline text-sky-900 rounded-[20px] px-5 py-2 flex gap-2 justify-center items-center text-base w-full text-center uppercase"
          >
            <FaArrowLeft /> Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
