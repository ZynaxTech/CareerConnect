import { getAccessToken } from "@/auth/authService";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { FiBookOpen, FiLink } from "react-icons/fi";
import { GoMail, GoPeople } from "react-icons/go";
import { GrLocation, GrPhone } from "react-icons/gr";
import { LuBuilding } from "react-icons/lu";
import { PiMedalLight } from "react-icons/pi";
import { useParams } from "react-router-dom";

const UniversityDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [university, setUniversity] = useState({});
  const accessToken = getAccessToken();

  useEffect(() => {
    const fetchUniversity = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/university/${id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (res.data?.success) setUniversity(res.data.university);
      } catch (err) {
        setError(err?.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUniversity();
  }, []);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading university...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="w-full bg-white min-h-screen">
      {/* HERO */}
      <div className="relative h-[260px] sm:h-[320px] lg:h-[380px]">
        <img
          src={university.image}
          alt={university.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold">
              {university.name}
            </h1>
            <p className="mt-2 text-sm sm:text-base lg:text-lg opacity-90">
              {university.fullName}
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
              <span className="badge">
                <FaRegStar className="text-yellow-400" />
                {university.rating}/5
              </span>
              <span className="badge">
                <CiCalendar className="text-green-400" />
                {university.established}
              </span>
              <span className="badge">
                <GrLocation className="text-red-400" />
                {university.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h2 className="section-title">About {university.name}</h2>
              <p className="text-gray-700 leading-relaxed">
                {university.description}
              </p>

              {/* STATS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="flex flex-col justify-center items-center bg-blue-50 p-4 rounded-lg">
                  <GoPeople className="text-3xl text-blue-500" />
                  <h3 className="font-semibold text-black mt-2">
                    {university.students}
                  </h3>

                  <p className="text-gray-700 text-sm"> Students </p>
                </div>
                <div className="flex flex-col justify-center items-center bg-green-50 p-4 rounded-lg">
                  <FiBookOpen className="text-3xl text-green-500" />
                  <h3 className="font-semibold text-center text-black mt-2">
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

          {/* SIDEBAR */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="section-title">Contact Information</h3>
              <Info icon={<FiLink />} value={university.website} link />
              <Info icon={<GrPhone />} value={university.phone} />
              <Info icon={<GoMail />} value={university.email} />
              <Info icon={<GrLocation />} value={university.address} />
            </div>

            <div className="card">
              <h3 className="section-title">University Facts</h3>
              <Fact label="Established" value={university.established} />
              <Fact label="Faculty" value={university.faculty} />
              <Fact label="Annual Fee" value={university.fees} />
              <Fact label="Accreditation" value={university.accreditation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- REUSABLE COMPONENTS ---------- */

const Stat = ({ icon, value, label }) => (
  <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4 text-center">
    <div className="text-2xl ">{icon}</div>
    <h4 className="font-semibold mt-1">{value}</h4>
    <p className="text-xs ">{label}</p>
  </div>
);

const Info = ({ icon, value, link }) => (
  <div className="flex items-start gap-2 text-sm text-gray-700">
    <span className="mt-1 text-gray-400">{icon}</span>
    {link ? (
      <a href={value} target="_blank" className="text-blue-500 break-all">
        {value}
      </a>
    ) : (
      <span>{value}</span>
    )}
  </div>
);

const Fact = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default UniversityDetail;
