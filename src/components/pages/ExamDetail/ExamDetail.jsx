import axios from "axios";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FiLink } from "react-icons/fi";
import { GoClock, GoPeople } from "react-icons/go";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { LuBuilding } from "react-icons/lu";
import { PiNewspaperClippingBold } from "react-icons/pi";
import { SiTicktick, SiWorldhealthorganization } from "react-icons/si";
import { useParams } from "react-router-dom";
import "./ExamDetail.css";

const ExamDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [exam, setExam] = useState({});

  useEffect(() => {
    // Fetch exams data from API when component mounts
    const fetchExam = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/exam/${id}`
        );
        if (response.data && response.data.success) {
          setExam(response.data.exam);
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
    fetchExam();
  }, []);

  // helper: parse date string to Date or null
  const parseDate = (d) => {
    if (!d) return null;
    const parsed = new Date(d);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  // compute display date and registration tag for an exam
  const computeDeadlineInfo = (exam) => {
    const now = new Date();
    const testDate = parseDate(exam.testDate);
    // allow exam.applicationDeadline from API; otherwise default 14 days before test
    const applicationDeadline =
      parseDate(exam.applicationDeadline) ||
      (testDate
        ? new Date(testDate.getTime() - 14 * 24 * 60 * 60 * 1000)
        : null);

    if (applicationDeadline && applicationDeadline >= now) {
      return {
        label: "Application Deadline",
        date: applicationDeadline,
        tag: "Registration Open",
      };
    }

    if (
      (!applicationDeadline || applicationDeadline < now) &&
      testDate &&
      testDate >= now
    ) {
      return { label: "Test Date", date: testDate, tag: "Registration Closed" };
    }

    return { label: "Coming Soon", date: null, tag: "Coming Soon" };
  };

  const formatDate = (d) => {
    if (!d) return "Coming Soon";
    try {
      return d.toISOString().split("T")[0];
    } catch (e) {
      return String(d);
    }
  };

  const deadlineInfo = computeDeadlineInfo(exam);

  return (
    <div className="w-full flex flex-col bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={exam.image}
          alt={exam.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10">
            <h1 className="text-5xl font-bold mb-4">{exam.title}</h1>
            <p className="text-xl opacity-90">{exam.subtitle}</p>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full flex justify-center items-center gap-1">
                <CiCalendar className="text-orange-300" />{" "}
                {formatDate(deadlineInfo.date)}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full flex justify-center items-center gap-1">
                {" "}
                <GoClock className="text-blue-300" /> {exam.duration}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full flex justify-center items-center gap-1">
                {" "}
                <GoPeople className="text-red-300" />
                {exam.universities}
              </span>
            </div>
          </div>
        </div>
        {/* Background effects */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 ">
        {isLoading ? (
          <div className="flex-1 flex justify-center items-center py-16">
            <p className="text-sky-950 text-lg">Loading exam details...</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex justify-center items-center">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h2 className="text-2xl font-bold text-black mb-4">
                    About {exam.title}
                  </h2>
                  <p className="text-gray-700 mb-6">{exam.description}</p>

                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="flex flex-col justify-center items-center bg-green-50 p-4 rounded-lg">
                      <GoPeople className="text-3xl text-green-500" />
                      <h3 className="font-semibold text-black mt-2">
                        {exam.universities}
                      </h3>
                      <p className="text-gray-700 text-sm"> Universities </p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-purple-50 p-4 rounded-lg">
                      <BookOpen className="text-3xl text-purple-500" />
                      <h3 className="font-semibold text-black mt-2">
                        {exam.subjectsCount}
                      </h3>
                      <p className="text-gray-700 text-sm"> Subjects </p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-blue-50 p-4 rounded-lg">
                      <GoClock className="text-3xl text-blue-500" />
                      <h3 className="font-semibold text-black mt-2">
                        {exam.duration}
                      </h3>
                      <p className="text-gray-700 text-sm"> Duration </p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-orange-50 p-4 rounded-lg">
                      <LuBuilding className="text-3xl text-orange-500" />
                      <h3 className="font-semibold text-black mt-2 ">
                        {exam.conductingBody}
                      </h3>
                      <p className="text-gray-700 text-sm"> Conducting Body </p>
                    </div>
                  </div>
                </div>

                {/* Syllabus Card */}
                <div className="bg-white rounded-lg p-6 mt-6 shadow-md">
                  <h2 className="text-2xl font-bold text-black mb-4">
                    Syllabus
                  </h2>
                  <div className="space-y-4">
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
                          <div key={index} className="flex items-center gap-2">
                            <strong className="text-black">{name}:</strong>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {content
                                ? content.split(", ").map((item, idx) => (
                                    <span
                                      key={idx}
                                      className={`px-2 py-1 rounded-2xl text-sm ${getColor(
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
                      <FiLink className="inline-block mr-2 text-gray-500 text-sm" />
                      <a
                        href={exam.website}
                        className="text-blue-400 hover:text-blue-300 break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {exam.website}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Exam Facts */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-black mb-4">
                    Exam Facts
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <HiMiniCalendarDateRange className="w-4 h-4 shrink-0 text-gray-500" />
                      <span className="text-gray-700 text-sm">
                        {formatDate(deadlineInfo.date)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <SiTicktick className="w-4 h-4 shrink-0 text-gray-500" />
                      <span className="text-gray-700 text-sm">
                        {exam.eligibility}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <PiNewspaperClippingBold className="w-4 h-4 shrink-0 text-gray-500" />
                      <span className="text-gray-700 text-sm">
                        {exam.pattern}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <SiWorldhealthorganization className="w-4 h-4 shrink-0 text-gray-500" />
                      <span className="text-gray-700 text-sm">
                        {exam.conductingBody}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-black mb-4">
                    Upcoming Deadlines
                  </h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          {formatDate(deadlineInfo.label)}
                        </p>
                        <p className="text-lg font-semibold text-black">
                          {formatDate(deadlineInfo.date)}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${
                            formatDate(deadlineInfo.tag) === "Registration Open"
                              ? "bg-green-100 text-green-700"
                              : formatDate(deadlineInfo.tag) ===
                                "Registration Closed"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {deadlineInfo.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Syllabus */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExamDetail;
