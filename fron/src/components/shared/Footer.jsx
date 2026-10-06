import React from "react";
import { Facebook, Twitter, Linkedin, Briefcase, Mail, Phone, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group inline-flex">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-900/50">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Job<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">Portal</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Connecting India's top talent with visionary companies. Discover your next milestone with verified opportunities.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600 transition-all"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600 transition-all"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600 transition-all"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">For Candidates</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/jobs" className="hover:text-purple-400 transition-colors">Browse Jobs</Link></li>
              <li><Link to="/browse" className="hover:text-purple-400 transition-colors">Explore Companies</Link></li>
              <li><Link to="/signup" className="hover:text-purple-400 transition-colors">Create Profile</Link></li>
              <li><Link to="/jobs" className="hover:text-purple-400 transition-colors">Salary Calculator</Link></li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">For Employers</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/signup" className="hover:text-purple-400 transition-colors">Post a Job</Link></li>
              <li><Link to="/signup" className="hover:text-purple-400 transition-colors">Employer Branding</Link></li>
              <li><Link to="/signup" className="hover:text-purple-400 transition-colors">Talent Solutions</Link></li>
              <li><Link to="/login" className="hover:text-purple-400 transition-colors">Recruiter Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Contact & Support</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Pune / Bengaluru, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>support@jobportal.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
