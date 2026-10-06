import React from 'react';
import { Button } from './ui/button';
import { Bookmark, MapPin, Briefcase } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const getCompanyLogo = (company) => {
  if (company?.logo) return company.logo;
  const name = (company?.name || company?.title || '').toLowerCase();
  if (name.includes('google')) return '/logos/google.svg';
  if (name.includes('microsoft')) return '/logos/microsoft.svg';
  if (name.includes('amazon')) return '/logos/amazon.svg';
  if (name.includes('adobe')) return '/logos/adobe.svg';
  if (name.includes('capgemini')) return '/logos/capgemini.svg';
  if (name.includes('infosys')) return '/logos/infosys.svg';
  return null;
};

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return "Recently";
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const days = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    return days === 0 ? "Today" : `${days} days ago`;
  };

  const companyName = job?.company?.name || job?.company?.title || "Company";
  const companyLogo = getCompanyLogo(job?.company);
  const initial = companyName.charAt(0).toUpperCase();

  return (
    <div className="p-6 rounded-2xl shadow-sm hover:shadow-xl bg-white border border-gray-100 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            {daysAgoFunction(job?.createdAt)}
          </span>
          <Button variant="ghost" className="rounded-full h-8 w-8 p-0 text-gray-400 hover:text-purple-600">
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3 my-3">
          <div className="h-12 w-12 rounded-xl border border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center p-2 shrink-0">
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={companyName}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }
                }}
              />
            ) : null}
            <span
              className="font-bold text-purple-700 text-lg flex items-center justify-center"
              style={{ display: companyLogo ? 'none' : 'flex' }}
            >
              {initial}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-gray-900 truncate">{companyName}</h2>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
              <span className="truncate">{job?.location || 'India'}</span>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{job?.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 my-2">{job?.description}</p>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            {job?.position ? `${job.position} Positions` : 'Multiple Positions'}
          </span>
          <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            {job?.jobType || 'Full Time'}
          </span>
          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100 ml-auto">
            ₹{job?.salary} LPA
          </span>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <Button
            onClick={() => navigate(`/description/${job?._id}`)}
            variant="outline"
            className="flex-1 rounded-xl border-purple-200 text-purple-700 hover:bg-purple-50 font-semibold text-sm"
          >
            Details
          </Button>
          <Button className="flex-1 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-sm">
            Save For Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Job;