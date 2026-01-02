import { Star } from "lucide-react";
import { GoLocation } from "react-icons/go";
import { useState } from "react";
import BookingModal from "./BookingModal";

const CounselorCard = ({ counselor }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition p-5 flex flex-col">
        {/* TOP */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-4">
            <img
              src={counselor.image}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                {counselor.name}
              </h3>
              <p className="text-sm text-gray-500">{counselor.role}</p>
              <div className="flex items-center gap-1 text-sm mt-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span>{counselor.rating}</span>
                <span className="text-gray-400">
                  ({counselor.reviews})
                </span>
              </div>
            </div>
          </div>

          <p className="text-lg font-semibold">
            PKR {counselor.price}
            <span className="text-sm text-gray-500"> / hr</span>
          </p>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 mt-4">
          {counselor.description}
        </p>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3 mt-4 text-center text-sm">
          <div className="bg-gray-50 pt-3 rounded-lg">
            <p className="font-semibold">{counselor.experience}</p>
            <p className="text-xs text-gray-500">Experience</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold">{counselor.successRate}</p>
            <p className="text-xs text-gray-500">Success</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold">{counselor.students}</p>
            <p className="text-xs text-gray-500">Students</p>
          </div>
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mt-4">
          {counselor.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-5 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <GoLocation /> {counselor.location}
          </p>
          <button
            onClick={() => setOpen(true)}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Book Session
          </button>
        </div>
      </div>

      <BookingModal counselor={counselor} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CounselorCard;
