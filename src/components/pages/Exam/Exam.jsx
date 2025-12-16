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
  const navigate = useNavigate();
  const exams = [
    {
      id: "ecat",
      title: "ECAT",
      subtitle: "Engineering College Admission Test",
      image: "/src/assets/ECAT.jpg",
      date: "2026-02-30",
      duration: "150 minutes",
      universities: "50+",
      subjectsCount: "4 Subjects",
      subjects: ["Physics", "Chemistry", "Mathematics", "English"],
      color: "blue",
    },
    {
      id: "mdcat",
      title: "MDCAT",
      subtitle: "Medical & Dental College Admission Test",
      image: "/src/assets/MDCAT.jpg",
      date: "2026-01-25",
      duration: "210 minutes",
      universities: "30+",
      subjectsCount: "5 Subjects",
      subjects: ["Biology", "Chemistry", "Physics", "English", "Cognative"],
      color: "purple",
    },
    {
      id: "gat",
      title: "GAT",
      subtitle: "Graduate Assessment Test",
      image: "/src/assets/GAT.jpg",
      date: "2025-08-15",
      duration: "180 minutes",
      universities: "100+",
      subjectsCount: "3 Subjects",
      subjects: ["Verbal Reasoning", "Quantitative", "Analytical"],
      color: "orange",
    },
    {
      id: "css",
      title: "CSS",
      subtitle: "Central Superior Services",
      image: "/src/assets/NAT.jpg",
      date: "2025-07-30",
      duration: "150 minutes",
      universities: "10+",
      subjectsCount: "4 Subjects",
      subjects: [
        "English",
        "General Science",
        "Current Affair",
        "Pakistan Affair",
      ],
      color: "orange",
    },
    {
      id: "lat",
      title: "LAT",
      subtitle: "Law Admission Test",
      image: "/src/assets/LAT.jpg",
      date: "2026-05-10",
      duration: "180 minutes",
      universities: "60+",
      subjectsCount: "5 Subjects",
      subjects: ["English", "Urdu", "Pak Studies", "Math", "General Knowledge"],
      color: "blue",
    },
    {
      id: "sat",
      title: "SAT",
      subtitle: "Scholastic Aptitude Test",
      image: "/src/assets/SAT.jpg",
      date: "2026-03-28",
      duration: "120 minutes",
      universities: "20+",
      subjectsCount: "3 Subjects",
      subjects: ["Verbal Reasoning", "Quantitative", "Analytical"],
      color: "purple",
    },
  ];
  return (
    <div className=" bg-white w-full flex flex-col">
      <div className="home-hero ">
        <div className="mt-16">
          <section className="stats-section max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white">
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
        <section className=" py-12 deadlines-wrapper max-w-6xl mx-auto px-6 pb-16">
          <div className="deadlines-card bg-white rounded-lg shadow-md p-4">
            <div className="deadlines-head flex items-center justify-between mb-6">
              <div className="flex justify-center items-center gap-2">
                <MdOutlineDateRange className="text-orange-500 text-2xl" />
                <h4 className="text-xl font-semibold "> Upcoming Deadlines</h4>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="deadline-card p-4 rounded-md bg-amber-50">
                <div className="font-semibold">ECAT</div>
                <div className="text-xs text-gray-600">
                  Registration Deadline
                </div>
                <div className="mt-2 text-sm font-medium text-amber-700 ">
                  2026-02-30
                </div>
                <div className="mt-3 text-xs text-center text-white bg-orange-500 border rounded-2xl w-20">
                  15 days
                </div>
              </div>

              <div className="deadline-card p-4 rounded-md bg-amber-50">
                <div className="font-semibold">MDCAT</div>
                <div className="text-xs text-gray-600">
                  Application Deadline
                </div>
                <div className="mt-2 text-sm font-medium text-amber-700 ">
                  2026-01-25
                </div>
                <div className="mt-3 text-xs text-center text-white bg-orange-500 border rounded-2xl w-20">
                  40 days
                </div>
              </div>

              <div className="deadline-card p-4 rounded-md bg-amber-50">
                <div className="font-semibold">GAT</div>
                <div className="text-xs text-gray-600">Registration Opens</div>
                <div className="mt-2 text-sm font-medium text-amber-700 ">
                  2025-08-15
                </div>
                <div className="mt-3 text-xs text-center text-white bg-orange-500 border rounded-2xl w-20">
                  61 days
                </div>
              </div>

              <div className="deadline-card p-4 rounded-md bg-amber-50">
                <div className="font-semibold">CSS</div>
                <div className="text-xs text-gray-600">Form Submission</div>
                <div className="mt-2 text-sm text-amber-700 font-medium">
                  2025-09-01
                </div>
                <div className="mt-3 text-xs text-center text-white bg-orange-500 border rounded-2xl w-20">
                  78 days
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="categories-section max-w-6xl mx-auto px-6 pb-16">
        <h3 className="text-2xl text-center font-semibold mb-6">
          Choose Your{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Examination Category
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="exam-card bg-white rounded-lg overflow-hidden shadow"
            >
              <div
                className={`exam-image h-36 bg-[url('${exam.image}')] bg-cover bg-center`}
              ></div>
              <div className="p-4">
                <h4 className="font-semibold">{exam.title}</h4>
                <div className={`text-sm text-${exam.color}-500`}>
                  {exam.subtitle}
                </div>
                <div className="mt-3 text-xs text-gray-600 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-1">
                    <MdOutlineDateRange className="text-xl" />
                    <span>{exam.date}</span>
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
    </div>
  );
};

export default Exam;
