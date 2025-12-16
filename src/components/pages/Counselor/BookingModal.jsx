import { Clock, Copy, DollarSign, Mail, X } from "lucide-react";
import { useState } from "react";

const BookingModal = ({ counselor, isOpen, onClose }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSessionType, setSelectedSessionType] = useState("");

  const availableDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const availableTimes = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const serviceTypes = counselor.tags;

  const sessionTypes = ["Online", "In-person"];

  // Calculate estimated cost (assuming 1 hour session)
  const estimatedCost = counselor.price;

  // Generate email subject and body
  const generateEmailSubject = () => {
    return `Session Booking Request - ${counselor.name}`;
  };

  const generateEmailBody = () => {
    return `Dear ${counselor.name},

I would like to book a counseling session with the following details:

Preferred Day: ${selectedDay}
Preferred Time: ${selectedTime}
Service Type: ${selectedService}
Session Type: ${selectedSessionType}
Estimated Cost: PKR ${estimatedCost} (1 hour session)

Please confirm my booking and provide further instructions.

Best regards,
[Your Name]
[Your Contact Information]
[Your Email Address]`;
  };

  const handleEmailCounselor = () => {
    const subject = encodeURIComponent(generateEmailSubject());
    const body = encodeURIComponent(generateEmailBody());
    const mailtoLink = `mailto:${counselor.email}?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
  };

  const handleCopySubject = () => {
    navigator.clipboard.writeText(generateEmailSubject());
    alert("Email subject copied to clipboard!");
  };

  const handleCopyBody = () => {
    navigator.clipboard.writeText(generateEmailBody());
    alert("Email body copied to clipboard!");
  };

  const isFormComplete =
    selectedDay && selectedTime && selectedService && selectedSessionType;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Book Session with {counselor.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Select your preferred options below
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Available Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Available Days
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableDays.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`p-3 text-sm border rounded-lg transition-colors ${
                    selectedDay === day
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Available Times */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Available Times
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 text-sm border rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    selectedTime === time
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Clock size={14} />
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Service Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {serviceTypes.map((service) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`p-3 text-sm border rounded-lg transition-colors ${
                    selectedService === service
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Session Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Session Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {sessionTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedSessionType(type)}
                  className={`p-3 text-sm border rounded-lg transition-colors ${
                    selectedSessionType === type
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Estimated Cost */}
          {isFormComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800">
                <DollarSign size={18} />
                <span className="font-medium">
                  Estimated Cost: PKR {estimatedCost}
                </span>
                <span className="text-sm text-green-600">(1 hour session)</span>
              </div>
            </div>
          )}

          {/* Email Template */}
          {isFormComplete && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-4">Email Template</h3>

              {/* Subject */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Subject:
                  </label>
                  <button
                    onClick={handleCopySubject}
                    className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded flex items-center gap-1"
                  >
                    <Copy size={12} />
                    Copy
                  </button>
                </div>
                <div className="bg-white border rounded p-3 text-sm">
                  {generateEmailSubject()}
                </div>
              </div>

              {/* Body */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Message:
                  </label>
                  <button
                    onClick={handleCopyBody}
                    className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded flex items-center gap-1"
                  >
                    <Copy size={12} />
                    Copy
                  </button>
                </div>
                <div className="bg-white border rounded p-3 whitespace-pre-line font-mono text-xs">
                  {generateEmailBody()}
                </div>
              </div>

              {/* Email Button */}
              <button
                onClick={handleEmailCounselor}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Mail size={18} />
                Email Counselor
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
