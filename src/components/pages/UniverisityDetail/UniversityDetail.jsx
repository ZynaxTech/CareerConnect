import { getAccessToken } from "@/auth/authService";
import axios from "axios";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { GoMail, GoPeople } from "react-icons/go";
import { GrLocation, GrPhone } from "react-icons/gr";
import { LuBuilding } from "react-icons/lu";
import { PiMedalLight } from "react-icons/pi";
import { useParams } from "react-router-dom";
import "./UniversityDetail.css";

const UniversityDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [university, setUniversity] = useState({});
  const accessToken = getAccessToken();

  useEffect(() => {
    // Fetch universities data from API when component mounts
    const fetchUniversities = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/university/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.data && response.data.success) {
          setUniversity(response.data.university);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          setError(message);
          console.error("Unexpected error:", message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUniversities();
  }, []);

  return (
    <div className="w-full flex flex-col bg-white min-h-screen">
      {/* Hero Section */}
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-slate-900 text-lg">Loading university...</p>
        </div>
      ) : error ? (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      ) : (
        <>
          <div className="relative h-80 overflow-hidden">
            <img
              src={university.image}
              alt={university.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white z-10">
                <h1 className="text-5xl font-bold mb-4">{university.name}</h1>
                <p className="text-xl opacity-90">{university.fullName}</p>
                <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                  <span className="bg-white/20 px-3 py-1 rounded-full flex justify-center items-center gap-1">
                    <FaRegStar className="text-yellow-500" />{" "}
                    {university.rating}/5{" "}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full flex justify-center items-center gap-1">
                    {" "}
                    <CiCalendar className="text-green-500" />{" "}
                    {university.established}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full flex justify-center items-center gap-1">
                    {" "}
                    <GrLocation className="text-red-500" />
                    {university.location}
                  </span>
                </div>
              </div>
            </div>
            {/* Background effects */}
            <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute left-0 bottom-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg p-6 shadow-md ">
                  <h2 className="text-2xl font-bold text-black mb-4">
                    About {university.name}
                  </h2>
                  <p className="text-gray-700 mb-6">{university.description}</p>

                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="flex flex-col justify-center items-center bg-blue-50 p-4 rounded-lg">
                      <GoPeople className="text-3xl text-blue-500" />
                      <h3 className="font-semibold text-black mt-2">
                        {university.students}
                      </h3>

                      <p className="text-gray-700 text-sm"> Students </p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-green-50 p-4 rounded-lg">
                      <BookOpen className="text-3xl text-green-500" />
                      <h3 className="font-semibold text-black mt-2">
                        {university.programs}
                      </h3>

                      <p className="text-gray-700 text-sm"> Programs </p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-purple-50 p-4 rounded-lg">
                      <PiMedalLight className="text-3xl text-purple-500" />
                      <h3 className="font-semibold text-black mt-2">
                        {university.rank}
                      </h3>

                      <p className="text-gray-700 text-sm"> Rank </p>
                    </div>

                    <div className="flex flex-col justify-center items-center bg-orange-50 p-4 rounded-lg">
                      <LuBuilding className="text-3xl text-orange-500" />
                      <h3 className="font-semibold text-black mt-2">
                        {university.type}
                      </h3>

                      <p className="text-gray-700 text-sm"> Type </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-black mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FiLink className="text-sm inline-block mr-2 text-gray-500" />
                      <a
                        href={university.website}
                        className="text-blue-400 hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {university.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <GrPhone className="text-sm inline-block mr-2 text-gray-500" />
                      <p className="text-gray-700">{university.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <GoMail className=" text-sm inline-block mr-2 text-gray-500" />
                      <p className="text-gray-700">{university.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <GrLocation className="text-sm inline-block mr-2 text-gray-500" />
                      <p className="text-gray-700 text-sm">
                        {university.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-white rounded-lg p-6 shadow-md ">
                  <h3 className="text-xl font-bold text-black mb-4">
                    University Facts
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-800">Established</span>
                      <span className="text-gray-700 font-semibold">
                        {university.established}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-800">Faculty</span>
                      <span className="text-gray-700 font-semibold">
                        {university.faculty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-800">Annual Fee</span>
                      <span className="text-gray-700 font-semibold">
                        {university.fees}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-800">Accreditation</span>
                      <span className="text-gray-700 font-semibold">
                        {university.accreditation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UniversityDetail;
