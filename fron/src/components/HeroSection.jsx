import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, Sparkles, TrendingUp, Building2, Users } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchJobHandler();
  };

  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0820]/90 via-[#1a0f3c]/80 to-[#0d1b2a]/85" />

      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay:'1.5s'}} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center w-full">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-white/10 backdrop-blur-sm px-5 py-2 text-sm font-semibold text-purple-200 mb-8 shadow-lg">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          India's #1 Trusted Job Portal
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-black leading-tight text-white mb-6 tracking-tight">
          Find, Apply &amp; Build{" "}
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #a855f7, #6366f1, #38bdf8)",
            }}
          >
            Your Dream Career
          </span>
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-lg leading-relaxed mb-12">
          Discover thousands of verified job opportunities from top companies.
          Whether you're a fresher or an experienced professional — your next
          big opportunity starts here.
        </p>

        {/* Search Bar — glassmorphism */}
        <div className="flex items-center justify-center mb-16">
          <div
            className="flex w-full max-w-2xl items-center rounded-2xl border border-white/20 overflow-hidden shadow-2xl"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(16px)",
            }}
          >
            <Search className="ml-5 h-5 w-5 text-slate-300 shrink-0" />
            <input
              type="text"
              placeholder="Job title, skill, or company..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-4 text-base bg-transparent text-white placeholder:text-slate-400 outline-none"
            />
            <button
              onClick={searchJobHandler}
              className="m-2 rounded-xl px-8 py-3 font-semibold text-white text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { icon: TrendingUp, value: "10K+", label: "Active Jobs", color: "#a855f7" },
            { icon: Building2, value: "5K+", label: "Companies", color: "#6366f1" },
            { icon: Users, value: "50K+", label: "Job Seekers", color: "#38bdf8" },
          ].map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/15 p-5 text-center transition-all duration-300 hover:scale-105 hover:border-white/30 cursor-default"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Icon className="w-6 h-6 mx-auto mb-2" style={{ color }} />
              <h3 className="text-3xl font-black text-white">{value}</h3>
              <p className="text-sm text-slate-400 mt-1">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default HeroSection;
