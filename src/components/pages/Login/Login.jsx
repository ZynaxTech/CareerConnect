import axios from "axios";
import { useState } from "react";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { IoMailOutline } from "react-icons/io5";
import { RiLoader3Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginSuccess } from "../../../redux/authSlice.js";
import Button from "../../common components/Button";
import Input from "../../common components/Input/Input";
import "./Login.css";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        formData
      );
      if (response.data && response.data.success) {
        toast.success(response.data.message);
        dispatch(
          loginSuccess({
            user: response.data.user,
            accessToken: response.data.accessToken,
          })
        );
        const user = response.data.user;
        if (user.role === "customer") navigate("/home");
        else if (user.role === "admin") navigate("/menu");
      } else {
        setErrors({ form: response.data.message || "Login failed" });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (message.includes("credentials not exist")) {
          newErrors.login = message;
          setErrors(newErrors);
        } else if (message.includes("Invalid password")) {
          newErrors.password = message;
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleRememberMe = () => {
    setRememberMe((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex flex-col items-center gap-4 w-[45%]">
        <div className="w-full my-2">
          <h3 className="text-2xl text-sky-900 font-semibold">Login</h3>
        </div>
        <form onSubmit={handleFormLogin} className="w-full flex flex-col gap-4">
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            icon={<IoMailOutline className="text-xl text-gray-500" />}
            placeholder="abc@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-[-10px]">{errors.email}</p>
          )}
          <Input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            icon={<HiOutlineLockClosed className="text-xl text-gray-500" />}
            placeholder="Your Password"
            password={true}
            togglePassword={togglePassword}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-[-10px]">{errors.password}</p>
          )}
          {errors.login && (
            <p className="text-red-500 text-xs mt-[-10px]">{errors.login}</p>
          )}
          <div className="flex justify-end items-center w-full">
            <Link
              to="/auth/forgot-password"
              className="text-gray-500 hover:underline text-sm"
            >
              Forgot Password
            </Link>
          </div>
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
                <span>Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <div className="flex items-center justify-center gap-2 mt-1">
          <p className="text-gray-500 text-base">Don't have an account?</p>
          <Link
            to="/auth/signup"
            className="text-sky-900 text-base hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
