import React, { useState } from 'react';
import { FiSearch, FiGrid, FiList } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './University.css';
import { CiFilter } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { GoPeople } from "react-icons/go";
import {BookOpen} from "lucide-react";
import { LuDollarSign } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
const University = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    location: 'All Locations',
    type: [],
    feeRange: [],
  });
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('ranking');

  const universities = [
    {
      id: 1,
      name: 'LUMS',
      fullName: 'Lahore University of Management Sciences',
      rating: 4.8,
      description: 'Leading business and technology university in Pakistan',
      location: 'Lahore, Punjab',
      programs: '45 Programs',
      fees: 'PKR 500,000+',
      image: '/src/assets/LUMS.jpeg',
      type: 'Private',
      rank: 'Very High',
      tags: ['Private', 'Very High'],
    },
    {
      id: 2,
      name: 'UET Lahore',
      fullName: 'University of Engineering & Technology',
      rating: 4.6,
      description: 'Premier engineering institution with excellent faculty',
      location: 'Lahore, Punjab',
      programs: '60 Programs',
      fees: 'PKR 50,000+',
      image: '/src/assets/UET.jpeg',
      type: 'Public',
      rank: 'Rank High',
      tags: ['Public', 'Rank High'],
    },
    {
      id: 3,
      name: 'FAST NUCES',
      fullName: 'Fast National University of Computer and Emerging Sciences',
      rating: 4.7,
      description: 'Top computer science and IT university',
      location: 'Islamabad, Punjab',
      programs: '40 Programs',
      fees: 'PKR 300,000+',
      image: '/src/assets/FAST.jpeg',
      type: 'Private',
      rank: 'Very High',
      tags: ['Private', 'Very High'],
    },
    {
      id: 4,
      name: 'COMSATS',
      fullName: 'COMSATS University Islamabad',
      rating: 4.5,
      description: 'Quality education in engineering and sciences',
      location: 'Islamabad, Federal',
      programs: '50 Programs',
      fees: 'PKR 200,000+',
      image: '/src/assets/COMSAT.jpeg',
      type: 'Private',
      rank: 'High',
      tags: ['Private', 'High'],
    },
    {
      id: 5,
      name: 'NUST',
      fullName: 'National University of Sciences and Technology',
      rating: 4.9,
      description: 'Premier national institution of excellence',
      location: 'Islamabad, Federal',
      programs: '70 Programs',
      fees: 'PKR 150,000+',
      image: '/src/assets/NUST.jpeg',
      type: 'Public',
      rank: 'Very High',
      tags: ['Public', 'Very High'],
    },
    {
      id: 6,
      name: 'IBA Karachi',
      fullName: 'Institute of Business Administration',
      rating: 4.8,
      description: 'Leading business school in South Asia',
      location: 'Karachi, Sindh',
      programs: '35 Programs',
      fees: 'PKR 400,000+',
      image: '/src/assets/IBA.jpeg',
      type: 'Private',
      rank: 'Very High',
      tags: ['Private', 'Very High'],
    },
  ];

  const handleFilterChange = (key, value) => {
    if (key === 'type' || key === 'feeRange') {
      setFilters({
        ...filters,
        [key]: filters[key].includes(value)
          ? filters[key].filter(item => item !== value)
          : [...filters[key], value],
      });
    } else {
      setFilters({ ...filters, [key]: value });
    }
  };

  // Helper function to parse fee string to number
  const parseFee = (feeString) => {
    const match = feeString.match(/PKR\s([\d,]+)\+/);
    if (match) {
      return parseInt(match[1].replace(/,/g, ''));
    }
    return 0;
  };

  // Helper function to check if fee falls in range
  const isFeeInRange = (feeString, range) => {
    const fee = parseFee(feeString);
    switch (range) {
      case 'Under 100k':
        return fee < 100000;
      case '100k - 500k':
        return fee >= 100000 && fee <= 500000;
      case '500k+':
        return fee > 500000;
      default:
        return true;
    }
  };

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         uni.fullName.toLowerCase().includes(filters.search.toLowerCase());
    const matchesLocation = filters.location === 'All Locations' || uni.location === filters.location;
    const matchesType = filters.type.length === 0 || filters.type.includes(uni.type);
    const matchesFeeRange = filters.feeRange.length === 0 ||
                           filters.feeRange.some(range => isFeeInRange(uni.fees, range));

    return matchesSearch && matchesLocation && matchesType && matchesFeeRange;
  });

  // Sorting logic
  const sortedUniversities = [...filteredUniversities].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'ranking':
      default:
        // Sort by rating for ranking, but could be enhanced with custom ranking logic
        return b.rating - a.rating;
    }
  });

  return (
    <div className="w-full min-h-screen bg-gray-900">
      {/* Header */}
      <div className=" py-8 px-6 bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white">Universities in Pakistan</h1>
          <p className="text-gray-400 mt-2">Discover the best educational institutions for your future</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full mx-auto px-6 py-8 bg-slate-900">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0 sticky top-20 self-start">
            <div className="bg-gray-800  rounded-lg p-4 border border-gray-700 ">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <CiFilter /><span>Filters</span>
              </h3>

              {/* Search */}
              <div className="mb-5 ">
                <label className="text-xs text-gray-300 block mb-2">Search</label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search universities..."
                    className="w-full pl-8 pr-3 py-2 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-5">
                <label className="text-xs text-gray-300 block mb-2">Location</label>
                <select
                  className="w-full px-3 py-2 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:outline-none"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                  <option>All Locations</option>
                  <option>Lahore, Punjab</option>
                  <option>Islamabad, Federal</option>
                  <option>Islamabad, Punjab</option>
                  <option>Karachi, Sindh</option>
                  <option>Rawalpindi, Punjab</option>
                </select>
              </div>

              {/* Type */}
              <div className="mb-5">
                <label className="text-xs text-gray-300 block mb-2 font-semibold">Type</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={filters.type.includes('Public')}
                      onChange={() => handleFilterChange('type', 'Public')}
                      className="w-4 h-4"
                    />
                    Public
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={filters.type.includes('Private')}
                      onChange={() => handleFilterChange('type', 'Private')}
                      className="w-4 h-4"
                    />
                    Private
                  </label>
                </div>
              </div>

              {/* Fee Range */}
              <div>
                <label className="text-xs text-gray-300 block mb-2 font-semibold">Fee Range (PKR)</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={filters.feeRange.includes('Under 100k')}
                      onChange={() => handleFilterChange('feeRange', 'Under 100k')}
                      className="w-4 h-4"
                    />
                    Under 100k
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={filters.feeRange.includes('100k - 500k')}
                      onChange={() => handleFilterChange('feeRange', '100k - 500k')}
                      className="w-4 h-4"
                    />
                    100k - 500k
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={filters.feeRange.includes('500k+')}
                      onChange={() => handleFilterChange('feeRange', '500k+')}
                      className="w-4 h-4"
                    />
                    500k+
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="flex-1 ">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-300 text-sm">
                {sortedUniversities.length} universities found
              </div>
              <div className="flex items-center gap-3">
                <select
                  className="px-3 py-2 bg-gray-800 text-white text-sm rounded border border-gray-700 focus:outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="ranking">Sort by Ranking</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="name">Sort by Name</option>
                </select>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                  <FiGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                  <FiList size={18} />
                </button>
              </div>
            </div>

            {/* University Cards */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1'}`}>
              {sortedUniversities.map((uni) => (
                <div key={uni.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition">
                  {/* Image */}
                  <div className="relative h-40 bg-gradient-to-br from-gray-700 to-gray-900">
                    <img src={uni.image} alt={uni.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-xl text-xs font-semibold">
                      {uni.rank}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white">{uni.name}</h4>
                      <span className="text-white text-sm flex items-center gap-1"><FaStar className='text-yellow-400' /> <span>{uni.rating}</span></span>
                    </div>

                    <p className="text-gray-400 text-sm mb-3">{uni.description}</p>

                    {/* Info Row */}
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <GrLocation size={12} /> <span>{uni.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GoPeople size={12} /> <span>{uni.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen size={12} /> <span>{uni.programs}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <LuDollarSign size={12} /> <span>{uni.fees}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {uni.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 text-xs rounded-xl font-medium ${
                            tag === 'Private'
                              ? 'bg-blue-900 text-blue-300'
                              : tag === 'Public'
                              ? 'bg-green-900 text-green-300'
                              : 'bg-orange-900 text-orange-300'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Button */}
                    <button 
                      onClick={() => navigate(`/universities/${uni.id}`)}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default University;
