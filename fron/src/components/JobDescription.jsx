import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { MapPin, Briefcase, IndianRupee, Clock, Users, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    if (!user) {
      toast.error('Please login as a student to apply for this job');
      navigate('/login');
      return;
    }
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            { applicant: user?._id },
          ],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Error applying for job');
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job?.applications?.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const companyName = singleJob?.company?.name || singleJob?.company?.title || 'Tech Company';
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
  const companyLogo = getCompanyLogo(singleJob?.company);
  const initial = companyName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-purple-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </button>

        {/* Hero Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 rounded-2xl border border-gray-100 p-1 bg-gray-50 shadow-sm shrink-0">
                {companyLogo ? (
                  <AvatarImage src={companyLogo} alt={companyName} className="object-contain" />
                ) : null}
                <AvatarFallback className="font-bold text-xl text-purple-700 bg-purple-50 rounded-2xl">
                  {initial}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  {singleJob?.title}
                </h1>
                <p className="text-base font-medium text-gray-600 mt-1">
                  {companyName}
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    <Briefcase className="w-3.5 h-3.5" />
                    {singleJob?.position || singleJob?.postion || 1} Openings
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {singleJob?.jobType || 'Full Time'}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
                    ₹{singleJob?.salary} LPA
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-xl px-8 py-6 text-base font-semibold shadow-md transition-all ${
                isApplied
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-200'
              }`}
            >
              {isApplied ? (
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Applied
                </span>
              ) : (
                'Apply Now'
              )}
            </Button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-xs text-gray-400 font-medium block">Location</span>
              <span className="text-sm font-semibold text-gray-800 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4 text-purple-500" />
                {singleJob?.location || 'Remote'}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-xs text-gray-400 font-medium block">Experience</span>
              <span className="text-sm font-semibold text-gray-800 flex items-center gap-1 mt-1">
                <Clock className="w-4 h-4 text-purple-500" />
                {singleJob?.experienceLevel ?? singleJob?.experience ?? 0}+ years
              </span>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-xs text-gray-400 font-medium block">Applicants</span>
              <span className="text-sm font-semibold text-gray-800 flex items-center gap-1 mt-1">
                <Users className="w-4 h-4 text-purple-500" />
                {singleJob?.applications?.length || 0} applied
              </span>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-xs text-gray-400 font-medium block">Posted</span>
              <span className="text-sm font-semibold text-gray-800 mt-1 block">
                {singleJob?.createdAt ? singleJob.createdAt.split('T')[0] : 'Today'}
              </span>
            </div>
          </div>
        </div>

        {/* Description Body */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            About the Role
          </h2>
          <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line mb-8">
            {singleJob?.description}
          </p>

          {singleJob?.requirements && singleJob.requirements.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Key Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {singleJob.requirements.map((req, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-800"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDescription;