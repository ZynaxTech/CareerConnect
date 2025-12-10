import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice.js";
import { useSelector } from "react-redux";
import careerConnectLogo from "../../../assets/careerconnect.png";
import defaultPhoto from "../../../assets/defaultpicture.svg";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleProfileClick = (event) => {
    event.stopPropagation();
    setIsVisible((prevState) => !prevState);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setIsVisible(false);
  }, [location.pathname]);

  return (
    <header className="flex items-center h-16 w-full shadow-md fixed z-50 bg-white">
      <div className="flex items-center justify-between h-full w-full px-12">
        <Link to="/home" className="flex items-center gap-3">
          <img
            src={careerConnectLogo}
            alt="career connect logo"
            height={50}
            width={50}
          />
          <h4 className="text-xl font-semibold text-gray-950">Career Connect</h4>
        </Link>
        <div className="flex items-center gap-8 font-medium">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-amberColor text-base px-2 py-1"
                : "hover:text-white hover:bg-amberColor px-2 py-1 rounded-md transition-colors"
            }
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-amberColor text-base px-2 py-1"
                : "hover:text-white hover:bg-amberColor px-2 py-1 rounded-md transition-colors"
            }
            to="/booking"
          >
            Universities
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-amberColor text-base px-2 py-1"
                : "hover:text-white hover:bg-amberColor px-2 py-1 rounded-md transition-colors"
            }
            to="/menu/starter"
          >
            Exams
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-amberColor text-base px-2 py-1"
                : "hover:text-white hover:bg-amberColor px-2 py-1 rounded-md transition-colors"
            }
            to="/feedback"
          >
            Community
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-amberColor text-base px-2 py-1"
                : "hover:text-white hover:bg-amberColor px-2 py-1 rounded-md transition-colors"
            }
            to="/about"
          >
            Counselors
          </NavLink>
          <button
            type="button"
            onClick={handleProfileClick}
            className="border-none bg-white rounded-full flex items-center justify-center relative z-50"
          >
            <img
              src={
                user?.picURL !== "none"
                  ? localStorage.getItem("userData")?.picURL
                  : defaultPhoto
              }
              alt="profile picture"
              height={50}
              width={50}
              className="rounded-full"
            />
          </button>
          {isVisible && (
            <div
              ref={dropdownRef}
              className="absolute top-16 right-0 w-32 bg-white shadow-lg rounded-lg z-60"
            >
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "block w-full px-4 py-2 text-amberColor text-center"
                    : "block px-4 py-2 hover:text-white hover:bg-amberColor text-center transition-colors w-full rounded-lg"
                }
              >
                My Profile
              </NavLink>
              <Link
                to="/auth/login"
                className="block px-4 py-2 text-red-600 hover:bg-gray-100 text-center transition-colors w-full rounded-lg"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
