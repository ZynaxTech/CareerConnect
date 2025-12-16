import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/user/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          setStatus("Email Verified Successfully");
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
        } else {
          setStatus("Invalid or Expired Token");
        }
      } catch (error) {
        console.log(error);
        setStatus("Verification Failed.Please try again");
      }
    };

    verifyEmail();
  }, [token, navigate]);
  return (
    <div className="">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md text-center w-[90%] max-w-md">
          <h2 className="text-xl font-semibold text-sky-900">{status}</h2>
        </div>
      </div>
    </div>
  );
};

export default Verify;
