import { getAccessToken } from "@/auth/authService";
import { logout } from "@/redux/authSlice";
import axios from "axios";
import {
  Bell,
  BookOpen,
  GraduationCap,
  Home,
  Menu,
  Search,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import careerConnectLogo from "../../../assets/careerconnect.png";

const navItems = [
  { name: "Home", path: "/home", icon: Home },
  { name: "Universities", path: "/universities", icon: GraduationCap },
  { name: "Exams", path: "/exam", icon: BookOpen },
  { name: "Community", path: "/community", icon: Users },
  { name: "Counselors", path: "/counselor", icon: UserCheck },
];

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchRef = useRef(null);
  const notificationsRef = useRef(null);

  const user = useSelector((state) => state.auth.user);
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchData = [
    { id: 1, type: "university", name: "LUMS", path: "/universities/1" },
    { id: 2, type: "university", name: "NUST", path: "/universities/2" },
    { id: 3, type: "university", name: "FAST NUCES", path: "/universities/3" },
    { id: 4, type: "exam", name: "ECAT", path: "/exam/ecat" },
    { id: 5, type: "exam", name: "MDCAT", path: "/exam/mdcat" },
    { id: 6, type: "exam", name: "GAT", path: "/exam/gat" },
  ];

  const notifications = [
    {
      id: 1,
      title: "ECAT Exam Deadline",
      message: "ECAT exam is scheduled for February 30, 2026.",
      type: "exam",
      date: "2026-02-30",
    },
    {
      id: 2,
      title: "University Admissions",
      message: "Admissions for Fall 2025 are now open.",
      type: "university",
      date: "2025-12-15",
    },
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchResults(
        searchData.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/logout",
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.data.success) {
        dispatch(logout());
        toast.success(res.data.message);
        navigate("/auth/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-black">
      <nav className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-6 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3">
          <img src={careerConnectLogo} alt="logo" width={40} height={40} className="logo-glow" />
          <span className="text-white text-base sm:text-lg font-semibold">
            Career Connect
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={16} />
              {name}
            </NavLink>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 relative">
          {/* Search */}
          <div ref={searchRef}>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isSearchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            {isSearchOpen && (
              <div className="absolute right-0 top-12 sm:w-80 w-72 bg-white rounded-lg shadow-xl z-50">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-4 py-2 border rounded-t-lg"
                  autoFocus
                />
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigate(item.path);
                      setIsSearchOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div ref={notificationsRef} className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Bell size={18} />
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="fixed md:absolute inset-x-0 md:inset-auto top-16 md:top-12 md:right-0 w-full md:w-80 bg-white rounded-none md:rounded-lg shadow-xl border border-gray-200 z-50 max-h-[70vh] md:max-h-64 overflow-y-auto">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>

                  {/* Close button for mobile */}
                  <button
                    className="md:hidden text-gray-500"
                    onClick={() => setIsNotificationsOpen(false)}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Notifications List */}
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        {notification.type === "exam" ? (
                          <BookOpen
                            size={16}
                            className="text-blue-600 mt-0.5"
                          />
                        ) : (
                          <GraduationCap
                            size={16}
                            className="text-green-600 mt-0.5"
                          />
                        )}

                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">
                            {notification.title}
                          </div>
                          <div className="text-gray-600 text-sm">
                            {notification.message}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {notification.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-gray-500 text-sm text-center">
                    No new notifications
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="hidden lg:block rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-sm text-white"
          >
            Logout
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black border-t border-white/10">
          <div className="flex flex-col px-4 py-4 space-y-2">
            {navItems.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={name}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "text-gray-300 hover:bg-white/10"
                  }`
                }
              >
                <Icon size={18} />
                {name}
              </NavLink>
            ))}

            <button
              onClick={handleLogout}
              className="mt-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;