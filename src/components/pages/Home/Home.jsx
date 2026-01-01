import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { FaArrowRight } from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { LuCircleCheckBig } from "react-icons/lu";
import { PiMedalLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const text =
  "Your One-Stop Platform for University Admissions & Career Guidance in Pakistan.";
const speed = 100;

const Home = () => {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="home-hero w-full">
      <div className="max-w-6xl mx-auto px-6 py-28">
        <main className="text-center text-white">
          <h2 className="text-3xl md:text-6xl font-extrabold leading-tight">
            Navigate Your Future with
            <span className="text-2xl sm:text-6xl ml-3 text-blue-400">CareerConnect</span>
          </h2>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            {displayedText}
            <span className="cursor">|</span>
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="px-6 py-3 bg-black bg-opacity-60 text-white rounded-md shadow hover:bg-opacity-80 transition flex items-center gap-2"
              onClick={() => navigate("/universities")}
            >
              Explore Universities <FaArrowRight />
            </button>
            <button
              className="px-6 py-3 border border-white text-white rounded-md bg-transparent hover:bg-white hover:text-black transition"
              onClick={() => navigate("/counselor")}
            >
              Find Your Career Path
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div className="stat">
              <div className="text-2xl font-bold">
                {" "}
                <CountUp end={500} duration={2} />+
              </div>
              <div className="text-gray-300 text-sm">Universities</div>
            </div>
            <div className="stat">
              <div className="text-2xl font-bold">
                <CountUp end={50} duration={2} />+
              </div>
              <div className="text-gray-300 text-sm">Exam Types</div>
            </div>
            <div className="stat">
              <div className="text-2xl font-bold">
                <CountUp end={10000} duration={2} separator="," />+
              </div>
              <div className="text-gray-300 text-sm">Students Helped</div>
            </div>
            <div className="stat">
              <div className="text-2xl font-bold">
                <CountUp end={95} duration={2} />%
              </div>
              <div className="text-gray-300 text-sm">Success Rate</div>
            </div>
          </div>
          <div className="mt-16">
            <section className="stats-section max-w-6xl mx-auto px-6 py-12">
              <h3 className="text-2xl text-white font-semibold text-center">
                Trusted by Thousands of Students
              </h3>
              <p className="text-gray-400 text-center mt-2">
                Join the largest community of Pakistani students achieving their
                dreams
              </p>

              <div
                ref={statsRef}
                className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-6 "
              >
                <div className="stat-card flex flex-col items-center">
                  <div className="icon">
                    <PiMedalLight className="text-yellow-400 font-bold text-2xl" />
                  </div>
                  <div className="value text-2xl font-bold">
                    {statsVisible ? (
                      <CountUp end={500} duration={2} suffix="+" />
                    ) : (
                      "0+"
                    )}
                  </div>
                  <div className="label">Universities Listed</div>
                </div>

                <div className="stat-card flex flex-col items-center">
                  <div className="icon">
                    <GoPeople className="text-blue-400 font-bold text-2xl" />
                  </div>
                  <div className="value text-2xl font-bold">
                    {statsVisible ? (
                      <CountUp
                        end={25000}
                        duration={2}
                        separator=","
                        suffix="+"
                      />
                    ) : (
                      "0+"
                    )}
                  </div>
                  <div className="label">Active Students</div>
                </div>

                <div className="stat-card flex flex-col items-center">
                  <div className="icon">
                    <LuCircleCheckBig className="text-green-600 font-bold text-2xl" />
                  </div>
                  <div className="value text-2xl font-bold">
                    {statsVisible ? (
                      <CountUp
                        end={12000}
                        duration={2}
                        separator=","
                        suffix="+"
                      />
                    ) : (
                      "0+"
                    )}
                  </div>
                  <div className="label">Success Stories</div>
                </div>

                <div className="stat-card flex flex-col items-center">
                  <div className="icon">
                    <FiBookOpen className="text-purple-600 font-bold text-2xl" />
                  </div>
                  <div className="value text-2xl font-bold">
                    {statsVisible ? (
                      <CountUp end={200} duration={2} suffix="+" />
                    ) : (
                      "0+"
                    )}
                  </div>
                  <div className="label">Career Paths</div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
