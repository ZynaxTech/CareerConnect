import { useState } from "react";
import Input from "../../common components/Input/Input";
import Mail from "../../../assets/Mail.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Button from "../../common components/Button";
import axios from "axios";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

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
      const response = await axios.get(
        `http://localhost:3000/api/user/${email}`
      );
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("resetEmail", email);
        navigate("/auth/newpassword");
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
          <h3 className="text-2xl font-semibold">Forgot Password</h3>
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

          {isLoading ? (
            <Button
              type="submit"
              disabled={true}
              cssClasses="w-full rounded-[20px] bg-gray-500 text-gray-300 cursor-not-allowed px-5 py-2 uppercase mt-2"
            >
              Continuing...
            </Button>
          ) : (
            <Button
              type="submit"
              cssClasses="w-full rounded-[20px] bg-sky-900 hover:bg-sky-950 text-white cursor-pointer px-5 py-2 uppercase mt-2"
            >
              Continue
            </Button>
          )}
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
