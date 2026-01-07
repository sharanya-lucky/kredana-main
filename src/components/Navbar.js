import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "lucide-react";

const serviceTypes = [
  { name: "Martial Arts", path: "/services/martial-arts" },
  { name: "Team Ball Sports", path: "/services/teamball" },
  { name: "Racket Sports", path: "/services/racketsports" },
  { name: "Fitness", path: "/services/fitness" },
  { name: "Target & Precision Sports", path: "/services/target-precision-sports" },
  { name: "Equestrian Sports", path: "/services/equestrian-sports" },
  { name: "Adventure & Outdoor Sports", path: "/services/adventure-outdoor-sports" },
  { name: "Ice Sports", path: "/services/ice-sports" },
  { name: "Wellness", path: "/services/wellness" },
  { name: "Dance", path: "/services/dance" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const servicesRef = useRef(null);

  /* ================= FETCH USER ROLE ================= */
  useEffect(() => {
    const fetchUserRole = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const trainerSnap = await getDoc(doc(db, "trainers", currentUser.uid));
      if (trainerSnap.exists()) {
        setUserRole("trainer");
        return;
      }

      const instituteSnap = await getDoc(doc(db, "institutes", currentUser.uid));
      if (instituteSnap.exists()) {
        setUserRole("institute");
        return;
      }

      setUserRole("user");
    };

    fetchUserRole();
  }, []);

  /* ================= CLICK OUTSIDE HANDLER ================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServiceOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDashboardNavigation = () => {
    if (userRole === "institute") navigate("/institutes/dashboard");
    else if (userRole === "trainer") navigate("/trainers/dashboard");
    else navigate("/user/dashboard");
    setDropdownOpen(false);
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <div
            className="text-2xl font-bold text-orange-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Kridana
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/Landing" className="hover:text-orange-600">
              Home
            </NavLink>

            {/* SERVICES DROPDOWN */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setServiceOpen((prev) => !prev)}
                className="font-medium text-gray-700 hover:text-orange-600 flex items-center gap-1"
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform ${
                    serviceOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {serviceOpen && (
                <div className="absolute top-10 left-0 w-56 bg-white shadow-lg rounded-lg border z-50">
                  {serviceTypes.map((service) => (
                    <NavLink
                      key={service.path}
                      to={service.path}
                      onClick={() => setServiceOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      {service.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* ✅ FIXED TRAINERS LINK */}
            <NavLink to="/viewTrainers" className="hover:text-orange-600">
              Trainers
            </NavLink>

            <NavLink to="/shop" className="hover:text-orange-600">
              Shop
            </NavLink>

            {/* USER AVATAR */}
            {auth.currentUser && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <User className="w-6 h-6 text-gray-700 hover:text-orange-600" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-50">
                    <button
                      onClick={handleDashboardNavigation}
                      className="block w-full text-left px-4 py-2 hover:bg-orange-50 hover:text-orange-600"
                    >
                      {userRole === "institute"
                        ? "Institute Dashboard"
                        : userRole === "trainer"
                        ? "Trainer Dashboard"
                        : "User Dashboard"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {!auth.currentUser && (
              <button
                onClick={() => navigate("/signup")}
                className="bg-orange-500 text-white px-5 py-2 rounded-lg"
              >
                Sign Up
              </button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-6 space-y-4">
          <NavLink to="/Landing" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>

          <div>
            <p className="font-medium text-gray-700 mb-2">Services</p>
            <div className="pl-4 space-y-2">
              {serviceTypes.map((service) => (
                <NavLink
                  key={service.path}
                  to={service.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-600 hover:text-orange-600"
                >
                  {service.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ✅ FIXED TRAINERS LINK */}
          <NavLink to="/viewTrainers" onClick={() => setIsOpen(false)}>
            Trainers
          </NavLink>

          <NavLink to="/shop" onClick={() => setIsOpen(false)}>
            Shop
          </NavLink>

          {auth.currentUser && (
            <button
              onClick={handleDashboardNavigation}
              className="block text-left w-full"
            >
              {userRole === "institute"
                ? "Institute Dashboard"
                : userRole === "trainer"
                ? "Trainer Dashboard"
                : "User Dashboard"}
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;