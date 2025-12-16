
import { useParams } from 'react-router-dom';
import './UniversityDetail.css';
import { FaRegStar } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { BookOpen } from "lucide-react";
import { GoPeople } from "react-icons/go";
import { PiMedalLight } from "react-icons/pi";
import { LuDollarSign } from "react-icons/lu";
import { LuBuilding } from "react-icons/lu"
import { GoMail } from "react-icons/go";
import { GrPhone } from "react-icons/gr";
import { FiLink } from "react-icons/fi";

const UniversityDetail = () => {
  const { id } = useParams();

  const universities = [
    {
      id: 1,
      name: 'LUMS',
      fullName: 'Lahore University of Management Sciences',
      rating: 4.8,
      description: 'Leading business and technology university in Pakistan with strong industry ties Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores, debitis soluta rem nihil perferendis tempore reiciendis accusamus atque. Blanditiis doloribus veritatis obcaecati! Ipsa similique atque corrupti non labore nam quis illo, sequi illum accusantium, aliquid voluptas animi eaque soluta nostrum repudiandae aspernatur! Voluptate impedit laudantium ea nesciunt id ab, voluptates eos eveniet, in error rerum inventore aspernatur mollitia quos itaque voluptatem aliquam. Explicabo laudantium beatae quisquam deserunt numquam optio dicta tenetur consectetur quos ex repellat distinctio qui ipsam illo laboriosam suscipit fuga obcaecati velit unde similique, sed assumenda accusantium inventore? Architecto, tempora! Aperiam vitae dicta illo cum maxime nisi.',
      location: 'Lahore, Punjab',
      programs: '45 Programs',
      fees: 'PKR 500,000+',
      image: '/src/assets/LUMS.jpeg',
      type: 'Private',
      rank: 'Very High',
      tags: ['Private', 'Very High'],
      website: 'https://lums.edu.pk',
      phone: '+92-42-3560-8000',
      email: 'info@lums.edu.pk',
      established: '1984',
      students: '5000+',
      faculty: '200+',
      accreditation: 'HEC Recognized',
      address: 'Sector U, DHA, Lahore Cantt, Lahore, Punjab 54792, Pakistan'
    },
    {
      id: 2,
      name: 'UET Lahore',
      fullName: 'University of Engineering & Technology',
      rating: 4.6,
      description: 'Premier engineering institution with excellent faculty Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores, debitis soluta rem nihil perferendis tempore reiciendis accusamus atque. Blanditiis doloribus veritatis obcaecati! Ipsa similique atque corrupti non labore nam quis illo, sequi illum accusantium, aliquid voluptas animi eaque soluta nostrum repudiandae aspernatur! Voluptate impedit laudantium ea nesciunt id ab, voluptates eos eveniet, in error rerum inventore aspernatur mollitia quos itaque voluptatem aliquam. Explicabo laudantium beatae quisquam deserunt numquam optio dicta tenetur consectetur quos ex repellat distinctio qui ipsam illo laboriosam suscipit fuga obcaecati velit unde similique, sed assumenda accusantium inventore? Architecto, tempora! Aperiam vitae dicta illo cum maxime nisi.',
      location: 'Lahore, Punjab',
      programs: '60 Programs',
      fees: 'PKR 50,000+',
      image: '/src/assets/UET.jpeg',
      type: 'Public',
      rank: 'Rank High',
      tags: ['Public', 'Rank High'],
      website: 'https://uet.edu.pk',
      phone: '+92-42-9902-9475',
      email: 'info@uet.edu.pk',
      established: '1921',
      students: '10000+',
      faculty: '500+',
      accreditation: 'HEC Recognized',
      address: 'G.T. Road, Lahore 54890, Pakistan'
    },
    {
      id: 3,
      name: 'FAST NUCES',
      fullName: 'Fast National University of Computer and Emerging Sciences Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores, debitis soluta rem nihil perferendis tempore reiciendis accusamus atque. Blanditiis doloribus veritatis obcaecati! Ipsa similique atque corrupti non labore nam quis illo, sequi illum accusantium, aliquid voluptas animi eaque soluta nostrum repudiandae aspernatur! Voluptate impedit laudantium ea nesciunt id ab, voluptates eos eveniet, in error rerum inventore aspernatur mollitia quos itaque voluptatem aliquam. Explicabo laudantium beatae quisquam deserunt numquam optio dicta tenetur consectetur quos ex repellat distinctio qui ipsam illo laboriosam suscipit fuga obcaecati velit unde similique, sed assumenda accusantium inventore? Architecto, tempora! Aperiam vitae dicta illo cum maxime nisi.',
      rating: 4.7,
      description: 'Top computer science and IT university',
      location: 'Islamabad, Punjab',
      programs: '40 Programs',
      fees: 'PKR 300,000+',
      image: '/src/assets/FAST.jpeg',
      type: 'Private',
      rank: 'Very High',
      tags: ['Private', 'Very High'],
      website: 'https://nu.edu.pk',
      phone: '+92-51-111-128-128',
      email: 'info@nu.edu.pk',
      established: '2000',
      students: '11000+',
      faculty: '400+',
      accreditation: 'HEC Recognized',
      address: 'A.K. Brohi Road, H-11/4, Islamabad, Pakistan'
    },
    {
      id: 4,
      name: 'COMSATS',
      fullName: 'COMSATS University Islamabad',
      rating: 4.5,
      description: 'Quality education in engineering and sciences Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores, debitis soluta rem nihil perferendis tempore reiciendis accusamus atque. Blanditiis doloribus veritatis obcaecati! Ipsa similique atque corrupti non labore nam quis illo, sequi illum accusantium, aliquid voluptas animi eaque soluta nostrum repudiandae aspernatur! Voluptate impedit laudantium ea nesciunt id ab, voluptates eos eveniet, in error rerum inventore aspernatur mollitia quos itaque voluptatem aliquam. Explicabo laudantium beatae quisquam deserunt numquam optio dicta tenetur consectetur quos ex repellat distinctio qui ipsam illo laboriosam suscipit fuga obcaecati velit unde similique, sed assumenda accusantium inventore? Architecto, tempora! Aperiam vitae dicta illo cum maxime nisi.',
      location: 'Islamabad, Federal',
      programs: '50 Programs',
      fees: 'PKR 200,000+',
      image: '/src/assets/COMSAT.jpeg',
      type: 'Private',
      rank: 'High',
      tags: ['Private', 'High'],
      website: 'https://comsats.edu.pk',
      phone: '+92-51-9049-500',
      email: 'info@comsats.edu.pk',
      established: '1998',
      students: '35000+',
      faculty: '1500+',
      accreditation: 'HEC Recognized',
      address: 'Park Road, Chak Shahzad, Islamabad, Pakistan'
    },
    {
      id: 5,
      name: 'NUST',
      fullName: 'National University of Sciences and Technology',
      rating: 4.9,
      description: 'Premier national institution of excellence Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores, debitis soluta rem nihil perferendis tempore reiciendis accusamus atque. Blanditiis doloribus veritatis obcaecati! Ipsa similique atque corrupti non labore nam quis illo, sequi illum accusantium, aliquid voluptas animi eaque soluta nostrum repudiandae aspernatur! Voluptate impedit laudantium ea nesciunt id ab, voluptates eos eveniet, in error rerum inventore aspernatur mollitia quos itaque voluptatem aliquam. Explicabo laudantium beatae quisquam deserunt numquam optio dicta tenetur consectetur quos ex repellat distinctio qui ipsam illo laboriosam suscipit fuga obcaecati velit unde similique, sed assumenda accusantium inventore? Architecto, tempora! Aperiam vitae dicta illo cum maxime nisi.',
      location: 'Islamabad, Federal',
      programs: '70 Programs',
      fees: 'PKR 150,000+',
      image: '/src/assets/NUST.jpeg',
      type: 'Public',
      rank: 'Very High',
      tags: ['Public', 'Very High'],
      website: 'https://nust.edu.pk',
      phone: '+92-51-111-11-6878',
      email: 'info@nust.edu.pk',
      established: '1991',
      students: '15000+',
      faculty: '2000+',
      accreditation: 'HEC Recognized',
      address: 'Sector H-12, Islamabad, Pakistan'
    },
    {
      id: 6,
      name: 'IBA Karachi',
      fullName: 'Institute of Business Administration Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores, debitis soluta rem nihil perferendis tempore reiciendis accusamus atque. Blanditiis doloribus veritatis obcaecati! Ipsa similique atque corrupti non labore nam quis illo, sequi illum accusantium, aliquid voluptas animi eaque soluta nostrum repudiandae aspernatur! Voluptate impedit laudantium ea nesciunt id ab, voluptates eos eveniet, in error rerum inventore aspernatur mollitia quos itaque voluptatem aliquam. Explicabo laudantium beatae quisquam deserunt numquam optio dicta tenetur consectetur quos ex repellat distinctio qui ipsam illo laboriosam suscipit fuga obcaecati velit unde similique, sed assumenda accusantium inventore? Architecto, tempora! Aperiam vitae dicta illo cum maxime nisi.',
      rating: 4.8,
      description: 'Leading business school in South Asia',
      location: 'Karachi, Sindh',
      programs: '35 Programs',
      fees: 'PKR 400,000+',
      image: '/src/assets/IBA.jpeg',
      type: 'Private',
      rank: 'Very High',
      tags: ['Private', 'Very High'],
      website: 'https://iba.edu.pk',
      phone: '+92-21-3810-4700',
      email: 'info@iba.edu.pk',
      established: '1955',
      students: '3000+',
      faculty: '150+',
      accreditation: 'HEC Recognized',
      address: 'University Road, Karachi-75270, Pakistan'
    },
  ];

  const university = universities.find(uni => uni.id === parseInt(id));

  if (!university) {
    return <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-white">University not found</h1>
    </div>;
  }

  return (
    <div className="w-full flex flex-col bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={university.image}
          alt={university.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10">
            <h1 className="text-5xl font-bold mb-4">{university.name}</h1>
            <p className="text-xl opacity-90">{university.fullName}</p>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full flex justify-center items-center gap-1"><FaRegStar className='text-yellow-500' /> {university.rating}/5 </span>
              <span className="bg-white/20 px-3 py-1 rounded-full flex justify-center items-center gap-1"> <CiCalendar className='text-green-500' /> {university.established}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full flex justify-center items-center gap-1"> <GrLocation className='text-red-500' />{university.location}</span>
            </div>
          </div>
        </div>
        {/* Background effects */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-md ">
              <h2 className="text-2xl font-bold text-black mb-4">About {university.name}</h2>
              <p className="text-gray-700 mb-6">{university.description}</p>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col justify-center items-center bg-blue-50 p-4 rounded-lg">
                  <GoPeople className='text-3xl text-blue-500' />
                  <h3 className="font-semibold text-black mt-2">{university.students}</h3>

                  <p className="text-gray-700 text-sm"> Students </p>
                </div>
                <div className="flex flex-col justify-center items-center bg-green-50 p-4 rounded-lg">
                  <BookOpen className='text-3xl text-green-500' />
                  <h3 className="font-semibold text-black mt-2">{university.programs}</h3>

                  <p className="text-gray-700 text-sm"> Programs </p>
                </div>
                <div className="flex flex-col justify-center items-center bg-purple-50 p-4 rounded-lg">
                  <PiMedalLight className='text-3xl text-purple-500' />
                  <h3 className="font-semibold text-black mt-2">{university.rank}</h3>

                  <p className="text-gray-700 text-sm"> Rank </p>
                </div>

                <div className="flex flex-col justify-center items-center bg-orange-50 p-4 rounded-lg">
                  <LuBuilding className='text-3xl text-orange-500' />
                  <h3 className="font-semibold text-black mt-2">{university.type}</h3>

                  <p className="text-gray-700 text-sm"> Type </p>
                </div>
              </div>

              
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-black mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className='flex items-center gap-2'>
                  <FiLink className="text-sm inline-block mr-2 text-gray-500" />
                  <a href={university.website} className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">
                    {university.website}
                  </a>
                </div>
                <div className='flex items-center gap-2'>
                  <GrPhone className="text-sm inline-block mr-2 text-gray-500" />
                  <p className="text-gray-700">{university.phone}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <GoMail className=' text-sm inline-block mr-2 text-gray-500'/>
                  <p className="text-gray-700">{university.email}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <GrLocation className='text-sm inline-block mr-2 text-gray-500' />
                  <p className="text-gray-700 text-sm">{university.address}</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-lg p-6 shadow-md ">
              <h3 className="text-xl font-bold text-black mb-4">University Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-800">Established</span>
                  <span className="text-gray-700 font-semibold">{university.established}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Faculty</span>
                  <span className="text-gray-700 font-semibold">{university.faculty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Annual Fee</span>
                  <span className="text-gray-700 font-semibold">{university.fees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800">Accreditation</span>
                  <span className="text-gray-700 font-semibold">{university.accreditation}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversityDetail;
