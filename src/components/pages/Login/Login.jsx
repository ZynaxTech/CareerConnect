import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../common components/Input/Input";
import Mail from "../../../assets/Mail.svg";
import Password from "../../../assets/password.svg";
import * as Switch from "@radix-ui/react-switch";
import { Link } from "react-router-dom";
import Button from "../../common components/Button";
import axios from "axios";
import { setUser } from "../../../../redux/userSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        const userData = jwtDecode(token);
        localStorage.setItem("userData", JSON.stringify(userData));
        dispatch(setUser(userData));
        if (userData.role === "customer") navigate("/home");
        else if (userData.role === "admin") navigate("/menu");
      } else {
        console.error("Login failed:", response.data.message);
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
          <h3 className="text-2xl font-semibold">Login</h3>
        </div>
        <form onSubmit={handleFormLogin} className="w-full flex flex-col gap-4">
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
          {errors.login && (
            <p className="text-red-500 text-xs mt-[-10px]">{errors.login}</p>
          )}
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <Switch.Root
                id="rememberMe"
                checked={rememberMe}
                name="remember_me"
                value={rememberMe}
                onCheckedChange={toggleRememberMe}
                className={`w-10 h-6 ${
                  rememberMe ? "bg-sky-900" : "bg-gray-300"
                } rounded-full relative transition-colors`}
              >
                <Switch.Thumb
                  className={`block w-4 h-4 bg-white rounded-full transition-transform ${
                    rememberMe ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </Switch.Root>
              <label htmlFor="rememberMe" className="text-sm text-gray-500">
                Remember Me
              </label>
            </div>
            <Link
              to="/auth/forgotpassword"
              className="text-gray-500 hover:underline text-sm"
            >
              Forgot Password
            </Link>
          </div>
          {isLoading ? (
            <Button
              type="submit"
              disabled={true}
              cssClasses="w-full rounded-[20px] bg-gray-500 text-gray-300 cursor-not-allowed px-5 py-2 uppercase mt-2"
            >
              Logging...
            </Button>
          ) : (
            <Button
              type="submit"
              cssClasses="w-full rounded-[20px] bg-sky-900 hover:bg-sky-950 text-white cursor-pointer px-5 py-2 uppercase mt-2"
            >
              Login
            </Button>
          )}
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
