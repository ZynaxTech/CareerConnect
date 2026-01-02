import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube
} from "lucide-react";
import { Link } from "react-router-dom";
import careerConnectLogo from "../../../assets/careerconnect.png";

const Footer = () => {
  return (
    <footer className="bg-[#F9F9F9] w-full">
      {/* Main Footer Content */}
      <div className="xl:max-w-[1400px] lg:max-w-4xl md:max-w-2xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-8 gap-8 gap-y-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link
              to="/home"
              className="flex items-center gap-3 hover:no-underline mb-4"
            >
              <img
                src={careerConnectLogo}
                alt="career connect logo"
                height={60}
                width={60}
              />
              <h4 className="text-2xl font-bold text-gray-900">
                CAREER CONNECT
              </h4>
            </Link>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your one-stop platform for University Admissions & Career Guidance
              in Pakistan. Connect with top universities, prepare for
              competitive exams, and get expert career counseling.
            </p>

            {/* Social Media */}
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
              >
                <Instagram size={20} className="text-white" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Youtube size={20} className="text-white" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
              >
                <Linkedin size={20} className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/home"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/universities"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Universities
                </Link>
              </li>
              <li>
                <Link
                  to="/exam"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Entrance Exams
                </Link>
              </li>
              <li>
                <Link
                  to="/counselor"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Career Counseling
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Our Services
            </h4>
            <ul className="space-y-3">
              <li className="text-gray-600">University Admissions</li>
              <li className="text-gray-600">Exam Preparation</li>
              <li className="text-gray-600">Career Guidance</li>
              <li className="text-gray-600">Student Community</li>
              <li className="text-gray-600">Application Support</li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Info
            </h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500" />
                <span className="text-gray-600 break-all">
                  careerconnect@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gray-500" />
                <span className="text-gray-600">+92 300 1234567</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gray-500 mt-1" />
                <span className="text-gray-600 text-sm">
                  Lahore, Punjab
                  <br />
                  Pakistan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-600 text-sm text-center">
              <span>© 2025 CareerConnect. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;