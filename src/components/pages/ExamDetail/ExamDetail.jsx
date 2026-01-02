import axios from "axios";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FiExternalLink, FiLink } from "react-icons/fi";
import { GoClock, GoPeople } from "react-icons/go";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { LuBuilding } from "react-icons/lu";
import { PiNewspaperClippingBold } from "react-icons/pi";
import { SiTicktick, SiWorldhealthorganization } from "react-icons/si";
import { useParams } from "react-router-dom";

const ExamDetail = () => {
  const { id } = useParams();
  const [exam, setExam] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExam = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/exam/${id}`);
        console.log(res.data.exam);
        if (res.data?.success) setExam(res.data.exam);
      } catch (err) {
        setError("Failed to load exam details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchExam();
  }, [id]);

  const formatDate = (d) => {
    if (!d) return "Coming Soon";
    try {
      return new Date(d).toISOString().split("T")[0];
    } catch {
      return d;
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading exam details...
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
      <div className="relative h-[240px] sm:h-[300px] lg:h-[380px]">
        <img
          src={exam.image}
          alt={exam.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-5xl">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold">
              {exam.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base lg:text-lg opacity-90">
              {exam.subtitle}
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
              <Badge
                icon={<CiCalendar className="text-orange-300" />}
                value={formatDate(exam.testDate)}
              />
              <Badge
                icon={<GoClock className="text-blue-300" />}
                value={exam.duration}
              />
              <Badge
                icon={<GoPeople className="text-red-300" />}
                value={exam.universities}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <SectionTitle>About {exam.title}</SectionTitle>
              <p className="text-gray-700 leading-relaxed">
                {exam.description}
              </p>

              {/* STATS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="flex flex-col justify-center items-center bg-green-50 p-4 rounded-lg">
                  <GoPeople className="text-3xl text-green-500" />
                  <h3 className=" text-center font-semibold text-black mt-2">
                    {exam.universities}
                  </h3>
                  <p className="text-gray-700 text-sm"> Universities </p>
                </div>
                <div className="flex flex-col justify-center items-center bg-purple-50 p-4 rounded-lg">
                  <BookOpen className="text-3xl text-purple-500" />
                  <h3 className="text-center font-semibold text-black mt-2">
                    {exam.subjectsCount}
                  </h3>
                  <p className="text-gray-700 text-sm"> Subjects </p>
                </div>
                <div className="flex flex-col justify-center items-center bg-blue-50 p-4 rounded-lg">
                  <GoClock className="text-3xl text-blue-500" />
                  <h3 className="text-center font-semibold text-black mt-2">
                    {exam.duration}
                  </h3>
                  <p className="text-gray-700 text-sm"> Duration </p>
                </div>
                <div className="flex flex-col justify-center items-center bg-orange-50 p-4 rounded-lg">
                  <LuBuilding className="text-3xl text-orange-500" />
                  <h3 className="text-center font-semibold text-black mt-2 ">
                    {exam.conductingBody}
                  </h3>
                  <p className="text-gray-700 text-sm text-center">
                    {" "}
                    Conducting Body{" "}
                  </p>
                </div>
              </div>
            </Card>

            {/* SYLLABUS */}
            <Card>
              <SectionTitle>Syllabus</SectionTitle>
              <div className="space-y-3">
                {exam.syllabus &&
                  exam.syllabus.split(". ").map((subject, index) => {
                    const [name, content] = subject.split(": ");
                    const colors = [
                      "bg-blue-50 text-blue-500",
                      "bg-green-50 text-green-500",
                      "bg-yellow-50 text-yellow-500",
                      "bg-purple-50 text-purple-500",
                    ];
                    const getColor = (idx) => colors[idx % colors.length];
                    return (
                      <div
                        key={index}
                        className="flex sm:items-center max-sm:flex-col gap-2"
                      >
                        <strong className="text-black max-sm:text-sm">
                          {name}:
                        </strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {content
                            ? content.split(", ").map((item, idx) => (
                                <span
                                  key={idx}
                                  className={`px-2 py-1 rounded-2xl text-sm max-sm:text-xs ${getColor(
                                    idx
                                  )}`}
                                >
                                  {item.trim()}
                                </span>
                              ))
                            : null}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Card>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <Card>
              <SectionTitle>Contact</SectionTitle>
              <div className="flex items-start gap-2 text-sm">
                <FiLink className="text-gray-400 mt-1" />
                <a
                  href={exam.website}
                  target="_blank"
                  className="text-blue-500 break-all"
                >
                  {exam.website}
                </a>
              </div>
            </Card>

            <Card>
              <SectionTitle>Exam Facts</SectionTitle>
              <Fact
                icon={<HiMiniCalendarDateRange />}
                value={formatDate(exam.testDate)}
              />
              <Fact icon={<SiTicktick />} value={exam.eligibility} />
              <Fact icon={<PiNewspaperClippingBold />} value={exam.pattern} />
              <Fact
                icon={<SiWorldhealthorganization />}
                value={exam.conductingBody}
              />
            </Card>

            {/* HELPING MATERIAL */}
            {exam.helpingMaterials?.length > 0 && (
              <Card>
                <SectionTitle>Helping Material</SectionTitle>

                <div className="space-y-4">
                  {exam.helpingMaterials.map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 p-4 rounded-lg border hover:shadow-md transition group w-full"
                    >
                      <div className="flex items-center gap-3">
                        {/* Icon */}
                        <div
                          className={`p-3 rounded-lg ${
                            item.type === "youtube"
                              ? "bg-red-50 text-red-600"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {item.type === "youtube" ? (
                            <FaYoutube className="text-xl" />
                          ) : (
                            <FiExternalLink className="text-xl" />
                          )}
                        </div>

                        {/* Text */}
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 break-all">
                            {item.url}
                          </p>
                        </div>
                      </div>

                      <span className="text-sm text-blue-500 font-medium">
                        Open
                      </span>
                    </a>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- REUSABLE UI ---------- */

const Card = ({ children }) => (
  <div className="bg-white rounded-xl p-5 shadow-md">{children}</div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-lg sm:text-xl font-bold mb-4">{children}</h2>
);

const Stat = ({ icon, value, label }) => (
  <div className="flex flex-col items-center bg-gray-50 rounded-lg p-4 text-center">
    <div className="text-2xl text-blue-500">{icon}</div>
    <p className="font-semibold mt-1">{value}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);

const Badge = ({ icon, value }) => (
  <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
    {icon}
    {value}
  </span>
);

const Fact = ({ icon, value }) => (
  <div className="flex items-center gap-3 text-sm text-gray-700 mb-2">
    <span className="text-gray-400">{icon}</span>
    {value}
  </div>
);

export default ExamDetail;
