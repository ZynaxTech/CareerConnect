import { BookOpen } from "lucide-react";
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
      color: "green",
      description:
        "The Engineering College Admission Test (ECAT) is a standardized test for admission to engineering programs in Pakistani universities. It assesses candidates' knowledge in physics, chemistry, mathematics, and English.",
      eligibility:
        "Intermediate (FSc Pre-Engineering) or equivalent with minimum 60% marks",
      pattern: "Multiple Choice Questions (MCQs) - 100 questions total",
      syllabus:
        "Physics: Mechanics, Thermodynamics, Electromagnetism, Modern Physics. Chemistry: Physical Chemistry, Inorganic Chemistry, Organic Chemistry. Mathematics: Algebra, Calculus, Trigonometry, Geometry. English: Grammar, Vocabulary, Comprehension.",
      conductingBody: "UET",
      website: "https://www.uet.edu.pk/ecat",
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
      color: "green",
      description:
        "The Medical and Dental College Admission Test (MDCAT) is a standardized entrance exam for admission to medical and dental colleges in Pakistan. It evaluates candidates' aptitude for medical studies.",
      eligibility:
        "Intermediate (FSc Pre-Medical) or equivalent with minimum 65% marks",
      pattern: "Multiple Choice Questions (MCQs) - 200 questions total",
      syllabus:
        "Biology: Cell Biology, Genetics, Physiology, Ecology. Chemistry: Physical, Organic, Inorganic Chemistry. Physics: Mechanics, Electricity, Modern Physics. English: Grammar, Comprehension. Logical Reasoning: Analytical skills.",
      conductingBody: "PMC",
      website: "https://www.pmc.gov.pk/mdcat",
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
      color: "green",
      description:
        "The Graduate Assessment Test (GAT) is a standardized test for admission to postgraduate programs in Pakistani universities. It measures verbal, quantitative, and analytical reasoning skills.",
      eligibility:
        "Bachelor's degree with minimum CGPA requirements vary by program",
      pattern: "Multiple Choice Questions (MCQs) - 100 questions total",
      syllabus:
        "Verbal Reasoning: Reading Comprehension, Critical Reasoning, Grammar. Quantitative: Arithmetic, Algebra, Geometry, Data Analysis. Analytical Reasoning: Logical Reasoning, Problem Solving.",
      conductingBody: "NTS",
      website: "https://www.nts.org.pk/GAT",
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
      color: "green",
      description:
        "The Central Superior Services (CSS) examination is Pakistan's most prestigious competitive exam for recruitment to the civil service. It selects candidates for various administrative positions.",
      eligibility: "Bachelor's degree in any discipline",
      pattern:
        "Written examination followed by psychological assessment and viva voce",
      syllabus:
        "English Essay, English Comprehension, General Science & Ability, Current Affairs, Pakistan Affairs, Islamic Studies/General Knowledge.",
      conductingBody: "FPSC",
      website: "https://www.fpsc.gov.pk/css",
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
      color: "green",
      description:
        "The Law Admission Test (LAT) is a standardized test for admission to LLB programs in Pakistani law colleges and universities. It assesses legal aptitude and general knowledge.",
      eligibility: "Intermediate or equivalent qualification",
      pattern: "Multiple Choice Questions (MCQs) - 100 questions total",
      syllabus:
        "English: Grammar, Vocabulary, Comprehension. Urdu: Literature, Grammar. Pak Studies: History, Constitution. Mathematics: Basic concepts. General Knowledge: Current Affairs, Islamic Studies.",
      conductingBody: "HEC",
      website: "https://www.hec.gov.pk/english/services/students/LAT",
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
      color: "green",
      description:
        "The Scholastic Aptitude Test (SAT) is a standardized test widely used for college admissions in the United States. It measures reading, writing, and math skills.",
      eligibility: "High school students planning to attend college",
      pattern:
        "Multiple Choice Questions and Grid-in Questions - 154 questions total",
      syllabus:
        "Reading: Reading Comprehension, Vocabulary. Writing and Language: Grammar, Rhetoric. Math: Algebra, Problem Solving, Data Analysis.",
      conductingBody: "College Board",
      website: "https://www.collegeboard.org/sat",
    },
  ];

  const exam = exams.find((ex) => ex.id === id);

  if (!exam) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-white">Exam not found</h1>
      </div>
    );
  }

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
                <CiCalendar className="text-orange-300" /> {exam.date}
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
              <h2 className="text-2xl font-bold text-black mb-4">Syllabus</h2>
              <div className="space-y-4">
                {exam.syllabus.split(". ").map((subject, index) => {
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
                        {content.split(", ").map((item, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 rounded-2xl text-sm ${getColor(
                              idx
                            )}`}
                          >
                            {item.trim()}
                          </span>
                        ))}
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
                    className="text-blue-400 hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {exam.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Exam Facts */}
            <div className="bg-white rounded-lg p-6 shadow-md ">
              <h3 className="text-xl font-bold text-black mb-4">Exam Facts</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <HiMiniCalendarDateRange className=" mr-2 text-base inline-block  text-gray-500" />
                  <span className="text-gray-700 text-sm ">{exam.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <SiTicktick className="mr-2 text-2xl inline-block  text-gray-500" />
                  <span className="text-gray-700 text-sm ">
                    {exam.eligibility}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PiNewspaperClippingBold className="mr-2 text-xl inline-block text-gray-500" />
                  <span className="text-gray-700 text-sm ">{exam.pattern}</span>
                </div>
                <div className="flex items-center gap-2">
                  <SiWorldhealthorganization className="mr-2 text-sm inline-block  text-gray-500" />
                  <span className="text-gray-700 text-sm ">
                    {exam.conductingBody}
                  </span>
                </div>
              </div>
            </div>

            {/* Syllabus */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;
