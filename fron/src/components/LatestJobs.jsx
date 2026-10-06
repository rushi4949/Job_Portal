import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Featured Opportunities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Latest &amp; Top{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Job Openings
              </span>
            </h2>
            <p className="mt-2 text-base text-gray-600 max-w-xl">
              Hand-picked opportunities from high-growth startups and Fortune 500 tech leaders.
            </p>
          </div>

          <Button
            onClick={() => navigate('/jobs')}
            variant="outline"
            className="self-start md:self-auto rounded-xl border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 font-semibold flex items-center gap-2 px-5 py-2.5 transition-all"
          >
            Explore All Jobs
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Jobs Grid */}
        {allJobs && allJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.slice(0, 6).map((job) => (
              <LatestJobCards key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">No job postings currently available.</p>
            <Button
              onClick={() => navigate('/browse')}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
            >
              Browse All Categories
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;