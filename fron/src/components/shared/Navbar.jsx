import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { LogOut, User2, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ normalize role safely
  const role = user?.role ? user.role.toLowerCase() : "";

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-200 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900">
              Job<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Portal</span>
            </span>
          </Link>

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
            {user ? (
              role === "recruiter" ? (
                <>
                  <Link to="/admin/companies" className="text-gray-600 hover:text-purple-600 transition-colors">Companies</Link>
                  <Link to="/admin/jobs" className="text-gray-600 hover:text-purple-600 transition-colors">Jobs</Link>
                </>
              ) : (
                <>
                  <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
                  <Link to="/jobs" className="text-gray-600 hover:text-purple-600 transition-colors">Jobs</Link>
                  <Link to="/browse" className="text-gray-600 hover:text-purple-600 transition-colors">Browse</Link>
                </>
              )
            ) : (
              <>
                <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
                <Link to="/jobs" className="text-gray-600 hover:text-purple-600 transition-colors">Jobs</Link>
                <Link to="/browse" className="text-gray-600 hover:text-purple-600 transition-colors">Browse</Link>
              </>
            )}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-purple-700 font-semibold text-sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl px-5 shadow-md shadow-purple-200 transition-all">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <button>
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback>
                        {user?.fullname?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-72 p-4">
                  <div className="flex items-center gap-3 border-b pb-3">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback>
                        {user?.fullname?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">
                        {user?.fullname}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {user?.profile?.bio || "No bio available"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col gap-2 text-sm">
                    {role === "student" && (
                      <Link to="/profile" className="flex items-center gap-2">
                        <User2 className="h-4 w-4" />
                        <span>View Profile</span>
                      </Link>
                    )}

                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-2 text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
