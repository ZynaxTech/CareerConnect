import { Star } from "lucide-react";
import { useState } from "react";
import { GoLocation } from "react-icons/go";
import BookingModal from "./BookingModal";

const CounselorCard = ({ counselor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <img
            src={counselor.image}
            alt={counselor.name}
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-gray-900">{counselor.name}</h3>
            <p className="text-sm text-gray-500">{counselor.role}</p>

            <div className="flex items-center gap-1 mt-1 text-sm">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{counselor.rating}</span>
              <span className="text-gray-400">
                ({counselor.reviews} reviews)
              </span>
            </div>
          </div>
        </div>

        <p className="text-lg font-semibold text-gray-900">
          PKR {counselor.price}
          <span className="text-sm font-normal text-gray-500"> / hour</span>
        </p>
      </div>

      {/* Price */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs px-4 py-1 rounded-full bg-blue-50 text-blue-600">
          {counselor.badge}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-3">{counselor.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm font-semibold">{counselor.experience}</p>
          <p className="text-xs text-gray-500">Experience</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm font-semibold">{counselor.successRate}</p>
          <p className="text-xs text-gray-500">Success Rate</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className=" text-sm font-semibold">{counselor.students}</p>
          <p className="text-xs text-gray-500">Students Helped</p>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Services Offered:
        </p>
        <div className="flex flex-wrap gap-2">
          {counselor.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-green-50 text-green-600 px-4 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex justify-between items-center">
        <p className="text-sm text-gray-500 flex items-center gap-2">
          {" "}
          <GoLocation /> {counselor.location}
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
        >
          Book Session
        </button>
      </div>

      {/* Booking Modal */}
      <BookingModal
        counselor={counselor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CounselorCard;
