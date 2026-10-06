import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, IndianRupee, ArrowRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

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

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  const companyName = job?.company?.name || job?.company?.title || 'Top Tech Company';
  const companyLogo = getCompanyLogo(job?.company);
  const initial = companyName.charAt(0).toUpperCase();

  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1"
    >
      {/* Top subtle highlight gradient on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Company Header */}
        <div className="flex items-center gap-3 mb-4">
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
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-gray-900 text-base truncate group-hover:text-purple-600 transition-colors">
              {companyName}
            </h2>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate">{job?.location || 'India'}</span>
            </div>
          </div>
        </div>

        {/* Job Title & Description */}
        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-700 transition-colors line-clamp-1">
          {job?.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
          {job?.description}
        </p>
      </div>

      {/* Badges & Footer */}
      <div>
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            <Briefcase className="w-3 h-3" />
            {job?.position ? `${job.position} Openings` : 'Immediate'}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            {job?.jobType || 'Full Time'}
          </span>
          <span className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100 ml-auto">
            ₹{job?.salary} LPA
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-purple-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span>View Job Details</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;