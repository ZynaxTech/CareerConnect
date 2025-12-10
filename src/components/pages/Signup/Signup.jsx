import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Mail from "../../../assets/Mail.svg";
import Password from "../../../assets/password.svg";
import Profile from "../../../assets/profile.svg";
import api from "../../../api/axiosClient.js";
import Button from "../../common components/Button";
import Input from "../../common components/Input";
import "./Signup.css";

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
      const response = await api.post("/user/signup", formData);
      console.log(response.data);
      if (response.data && response.data.success) navigate("/auth/login");
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
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex flex-col items-center gap-4 w-[45%]">
        <div className="w-full my-2">
          <h3 className="text-2xl font-semibold">Sign Up</h3>
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
            image={Profile}
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
            image={Mail}
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
            image={Password}
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
            image={Password}
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
            {isLoading ? "Signing..." : "Sign Up"}
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
