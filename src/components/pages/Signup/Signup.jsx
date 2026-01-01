import axios from "axios";
import { useState } from "react";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { IoMailOutline, IoPersonOutline } from "react-icons/io5";
import { RiLoader3Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "../../common components/Button";
import Input from "../../common components/Input";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleFormSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signup",
        formData
      );
      toast.success(response.data.message);
      if (response.data && response.data.success) navigate("/auth/verify");
      else setErrors({ form: response.data.message || "Signup failed" });
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (message.includes("Email")) {
          newErrors.email = message;
          setErrors(newErrors);
        } else {
          console.error("Unexpected error:", message);
        }
      } else console.error("Signup Error:", error);
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
  const toggleConfirmPassword = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };
  return (
    <div className="h-full w-full flex justify-center items-center px-5 lg:px-0">
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <div className="w-full my-2">
          <h3 className="text-2xl font-semibold text-sky-900">Sign Up</h3>
        </div>
        <form
          onSubmit={handleFormSignup}
          className="w-full flex flex-col gap-4"
        >
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            icon={<IoPersonOutline className="text-xl text-gray-500" />}
            placeholder="Full name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-[-10px]">{errors.name}</p>
          )}
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
          <Input
            type={confirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            icon={<HiOutlineLockClosed className="text-xl text-gray-500" />}
            placeholder="Confirm Password"
            password={true}
            togglePassword={toggleConfirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-[-10px]">
              {errors.confirmPassword}
            </p>
          )}
          {errors.form && (
            <p className="text-red-500 text-xs mt-[-10px]">{errors.form}</p>
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
                <span>Creating account...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
        <div className="flex items-center justify-center gap-2 mt-1">
          <p className="text-gray-500 text-base">Already have an account?</p>
          <Link
            to="/auth/login"
            className="text-sky-900 text-base hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
