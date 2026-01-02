import axios from "axios";
import { useState } from "react";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { RiLoader3Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setPasswordReset } from "../../../redux/authSlice.js";
import Button from "../../common components/Button";
import Input from "../../common components/Input";

const NewPassword = () => {
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

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
      const response = await axios.put(
        `http://localhost:3000/api/user/update-password/${email}`,
        formData
      );
      console.log(response.data);
      if (response.data.success) {
        dispatch(setPasswordReset(true));
        navigate(`/auth/update-password/${email}/success`);
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
    <div className="h-full w-full flex justify-center items-center px-5 lg:px-0">
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <div className="w-full my-2 flex flex-col gap-2">
          <h3 className="text-2xl text-sky-900 font-semibold">
            Create New Password
          </h3>
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
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-[-10px]">
              {errors.newPassword}
            </p>
          )}
          <p className="text-sm text-gray-400 text-right -mt-1">
            Both Password Must Match
          </p>
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
                <span>Updating...</span>
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
