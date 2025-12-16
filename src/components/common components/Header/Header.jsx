import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Home,
  GraduationCap,
  BookOpen,
  Users,
  UserCheck,
  Search,
  Bell,
  X,
} from "lucide-react";
import careerConnectLogo from "../../../assets/careerconnect.png";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "@/auth/authService";
import { logout } from "@/redux/authSlice";

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
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const user = useSelector((state) => state.auth.user) || getTokenUser();
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mock data for search (in a real app, this would come from an API)
  const searchData = [
    { id: 1, type: "university", name: "LUMS", path: "/universities/1" },
    { id: 2, type: "university", name: "NUST", path: "/universities/2" },
    { id: 3, type: "university", name: "FAST NUCES", path: "/universities/3" },
    { id: 4, type: "exam", name: "ECAT", path: "/exam/ecat" },
    { id: 5, type: "exam", name: "MDCAT", path: "/exam/mdcat" },
    { id: 6, type: "exam", name: "GAT", path: "/exam/gat" },
  ];

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "ECAT Exam Deadline",
      message: "ECAT exam is scheduled for February 30, 2026. Prepare now!",
      type: "exam",
      date: "2026-02-30",
    },
    {
      id: 2,
      title: "MDCAT Registration",
      message: "MDCAT registration opens soon. Don't miss the deadline!",
      type: "exam",
      date: "2026-01-25",
    },
    {
      id: 3,
      title: "GAT Test Reminder",
      message: "GAT exam is approaching. Review your study materials.",
      type: "exam",
      date: "2025-08-15",
    },
    {
      id: 4,
      title: "University Admissions",
      message: "Multiple universities have opened admissions for Fall 2025.",
      type: "university",
      date: "2025-12-15",
    },
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
      navigate(searchResults[0].path);
      setIsSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleResultClick = (path) => {
    navigate(path);
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(logout());
        toast.success(response.data.message);
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-black">
      <nav className="flex h-16 items-center justify-between px-12">
        {/* Logo */}
        <Link to="/home" className=" logo-glow flex items-center gap-3 ">
          <img
            src={careerConnectLogo}
            alt="career connect logo"
            height={40}
            width={40}
          />
          <h4 className="text-xl font-semibold text-white">Career Connect</h4>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-2">
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
        <div className="flex items-center gap-4 relative" ref={searchRef}>
          {/* Search */}
          <div className="relative flex items-center">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isSearchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            {/* Search Input & Results */}
            {isSearchOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <form onSubmit={handleSearchSubmit} className="p-4">
                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search universities, exams..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>
                </form>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="max-h-64 overflow-y-auto border-t border-gray-200">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result.path)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                      >
                        {result.type === "university" ? (
                          <GraduationCap size={16} className="text-blue-600" />
                        ) : (
                          <BookOpen size={16} className="text-green-600" />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {result.name}
                          </div>
                          <div className="text-sm text-gray-500 capitalize">
                            {result.type}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {searchQuery && searchResults.length === 0 && (
                  <div className="px-4 py-3 text-gray-500 text-sm">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative flex items-center" ref={notificationsRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Bell size={18} />
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
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
                  ))}
                </div>
                {notifications.length === 0 && (
                  <div className="px-4 py-3 text-gray-500 text-sm">
                    No new notifications
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Auth Buttons */}

          <button
            className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
