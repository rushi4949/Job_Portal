import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "Machine Learning Engineer",
  "UI/UX Designer",
  "Graphic Designer",
  "Mobile App Developer",
  "Cloud Engineer",
  "DevOps Engineer",
  "Cyber Security Analyst",
  "Business Analyst",
  "Digital Marketing Specialist",
  "Product Manager",
  "QA / Test Engineer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-wider uppercase text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            Top Industries
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-3">
            Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Category</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Explore curated open positions by specialized discipline and technology stack
          </p>
        </div>

        {/* Carousel */}
        <Carousel className="w-full max-w-4xl mx-auto px-6">
          <CarouselContent className="-ml-3">
            {categories.map((cat, index) => (
              <CarouselItem
                key={index}
                className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <button
                  onClick={() => searchJobHandler(cat)}
                  className="
                    w-full truncate
                    rounded-xl border border-gray-200/80 bg-gray-50/50
                    px-4 py-3 text-xs sm:text-sm font-semibold text-gray-700
                    transition-all duration-200
                    hover:border-purple-300 hover:text-purple-700
                    hover:bg-purple-50/70 hover:shadow-md hover:-translate-y-0.5
                    active:scale-95
                  "
                  title={cat}
                >
                  {cat}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-4 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-700" />
          <CarouselNext className="-right-4 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-700" />
        </Carousel>

      </div>
    </section>
  );
};

export default CategoryCarousel;
