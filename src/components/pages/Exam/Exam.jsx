import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { BsFileEarmarkText } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { LuFileText, LuGraduationCap } from "react-icons/lu";
import { MdOutlineAccessTime, MdOutlineDateRange } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Exam.css";

const Exam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exams data from API when component mounts
    const fetchExams = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/exam`);
        if (response.data && response.data.success) {
          setExams(response.data.exams);
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
    fetchExams();
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

  // Upcoming deadlines: exams with a display date in future/present
  const upcoming = exams
    .map((ex) => ({ exam: ex, info: computeDeadlineInfo(ex) }))
    .filter(({ info }) => info.date && info.date >= new Date())
    .sort((a, b) => a.info.date - b.info.date)
    .slice(0, 4);

  return (
    <div className=" bg-white w-full flex flex-col">
      <div className="home-hero ">
        <div className="mt-16">
          <section className="stats-section max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-4xl text-center sm:text-6xl font-extrabold leading-tight text-white">
              Governement Examination Portal
            </h1>
            <p className="text-gray-400 text-center mt-2">
              Comprehensive information about Pakistani enterance tests and
              competitive examinations
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-6 ">
              <div className="stat-card flex flex-col items-center">
                <div className="icon">
                  <LuFileText className="text-white font-bold text-2xl" />
                </div>
                <div className="value text-2xl font-bold">
                  <CountUp end={65} duration={2} suffix="%" />
                </div>
                <div className="label">Success Rate</div>
              </div>

              <div className="stat-card flex flex-col items-center">
                <div className="icon">
                  <GoPeople className="text-white font-bold text-2xl" />
                </div>
                <div className="value text-2xl font-bold">
                  <CountUp
                    end={2000000}
                    duration={2}
                    separator=","
                    suffix="+"
                  />
                </div>
                <div className="label">Annual Candidates</div>
              </div>

              <div className="stat-card flex flex-col items-center">
                <div className="icon">
                  <LuGraduationCap className="text-white font-bold text-2xl" />
                </div>
                <div className="value text-2xl font-bold">
                  <CountUp end={500} duration={2} separator="," suffix="+" />
                </div>
                <div className="label">Universities</div>
              </div>

              <div className="stat-card flex flex-col items-center">
                <div className="icon">
                  <FiBookOpen className="text-white font-bold text-2xl" />
                </div>
                <div className="value text-2xl font-bold">
                  <CountUp end={5} duration={2} suffix="+" />
                </div>
                <div className="label">Total Exams</div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="flex-1 flex justify-center items-center py-16">
            <p className="text-sky-950 text-lg">Loading exams...</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex justify-center items-center">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : (
          <>
            <section className="py-12 deadlines-wrapper max-w-6xl mx-auto px-6 pb-16">
              <div className="deadlines-card bg-white rounded-lg shadow-md p-4">
                <div className="deadlines-head flex items-center justify-between mb-6">
                  <div className="flex justify-center items-center gap-2">
                    <MdOutlineDateRange className="text-orange-500 text-2xl" />
                    <h4 className="text-xl font-semibold ">
                      {" "}
                      Upcoming Deadlines
                    </h4>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {upcoming.length === 0 ? (
                    <div className="col-span-1 text-center text-gray-600">
                      No upcoming deadlines
                    </div>
                  ) : (
                    upcoming.map(({ exam: ex, info }) => {
                      const daysLeft = info.date
                        ? Math.ceil(
                            (info.date - new Date()) / (1000 * 60 * 60 * 24)
                          )
                        : null;
                      return (
                        <div
                          key={ex.id}
                          className="deadline-card p-4 rounded-md bg-amber-50"
                        >
                          <div className="font-semibold">{ex.title}</div>
                          <div className="text-xs text-gray-600">
                            {info.label}
                          </div>
                          <div className="mt-2 text-sm font-medium text-amber-700 ">
                            {formatDate(info.date)}
                          </div>
                          <div className="mt-3 text-xs text-center text-white bg-orange-500 border rounded-2xl w-20">
                            {daysLeft !== null ? `${daysLeft} days` : "-"}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </section>

            <section className="categories-section max-w-6xl mx-auto px-6 pb-16">
              <h3 className="text-2xl text-center font-semibold mb-6">
                Choose Your{" "}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Examination Category
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams.map((exam) => (
                  <div
                    key={exam.id}
                    className="exam-card bg-white rounded-lg overflow-hidden shadow"
                  >
                    <div className="relative h-36 bg-gradient-to-br from-gray-700 to-gray-900">
                      <img
                        src={exam.image}
                        alt={exam.title}
                        className="w-full h-full object-cover"
                      />
                      {/* registration badge on image */}
                      {(() => {
                        const info = computeDeadlineInfo(exam);
                        return (
                          <div className="absolute top-2 right-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                info.tag === "Registration Open"
                                  ? "bg-green-600 text-white"
                                  : info.tag === "Registration Closed"
                                  ? "bg-red-600 text-white"
                                  : "bg-gray-500 text-white"
                              }`}
                            >
                              {info.tag}
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold">{exam.title}</h4>
                      <div className={`text-sm text-${exam.color}-500`}>
                        {exam.subtitle}
                      </div>
                      <div className="mt-3 text-xs text-gray-600 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-1">
                          <MdOutlineDateRange className="text-xl" />
                          <span>
                            {formatDate(computeDeadlineInfo(exam).date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MdOutlineAccessTime className="text-xl" />
                          <span>{exam.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <LuGraduationCap className="text-xl" />
                          <span>{exam.universities}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BsFileEarmarkText className="text-xl" />
                          <span>{exam.subjectsCount}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exam.subjects.map((subject) => (
                          <span
                            key={subject}
                            className={`px-3 py-1 bg-${exam.color}-50  text-xs rounded-xl text-${exam.color}-500`}
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                      <button
                        className="mt-4 w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg flex justify-center items-center gap-2 "
                        onClick={() => navigate(`/exam/${exam.id}`)}
                      >
                        View Details <FaArrowRight />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Exam;
