import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Password from "../../../assets/password.svg";
import { setPasswordReset } from "../../../redux/authSlice.js";
import Button from "../../common components/Button";
import Input from "../../common components/Input";
import api from "../../../api/axiosClient.js";

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetEmail = useSelector((state) => state.auth.emailEntered);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (resetEmail) {
      setFormData((prev) => ({ ...prev, email: resetEmail }));
    }
  }, []);

  const handleFormPasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {};

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
      console.log(formData);
      const response = await api.put("/user/update", formData);
      console.log(response.data);
      if (response.data.success) {
        dispatch(setPasswordReset(true));
        navigate("/auth/newpassword/successful");
      } else {
        console.error("Update Password failed:", response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (message.includes("different")) {
          newErrors.newPassword = message;
          setErrors(newErrors);
        } else {
          console.error("Unexpected error:", message);
        }
      } else console.error("Update Password Error:", error);
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
        <div className="w-full my-2 flex flex-col gap-2">
          <h3 className="text-2xl font-semibold">Create New Password</h3>
          <p className="text-sm text-gray-400">
            Your new password must be different from previous used password
          </p>
        </div>
        <form
          onSubmit={handleFormPasswordReset}
          className="w-full flex flex-col gap-4"
        >
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
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-[-10px]">
              {errors.newPassword}
            </p>
          )}
          <p className="text-sm text-gray-400 text-right -mt-1">
            Both Password Must Match
          </p>
          {isLoading ? (
            <Button
              type="submit"
              disabled={true}
              cssClasses="w-full rounded-[20px] bg-gray-500 text-gray-300 cursor-not-allowed px-5 py-2 mt-1 uppercase"
            >
              Continuing...
            </Button>
          ) : (
            <Button
              type="submit"
              cssClasses="w-full rounded-[20px] bg-sky-900 hover:bg-sky-950 text-white cursor-pointer px-5 py-2 mt-1 uppercase"
            >
              Continue
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
