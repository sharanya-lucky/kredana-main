import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";

/* ================= CORE PAGES ================= */
import RoleSelection from "./pages/RoleSelection";
import Signup from "./pages/Signup";
import TrainerSignup from "./pages/TrainerSignup";
import InstituteSignup from "./pages/InstituteSignup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";

/* ================= NAVBAR ================= */
import Navbar from "./components/Navbar";

/* ================= SHOP ================= */
import ShopPage from "./components/ShopPage";
import ProductsGridPage from "./components/ProductsGridPage";
import AddAddressPage from "./components/AddAddressPage";
import PaymentPage from "./components/PaymentPage";
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";

/* ================= DASHBOARDS ================= */
import InstituteDashboard from "./components/InstituteDashboard";
import TrainersDashboard from "./components/TrainersDashboard";
import UserDashboard from "./components/UserDashboard";

/* ================= LIST & DETAILS ================= */
import ViewInstitutes from "./pages/ViewInstitutes";
import ViewTrainers from "./pages/ViewTrainers";
import InstituteDetailsPage from "./pages/InstituteDetailsPage";
import TrainerDetailsPage from "./pages/TrainerDetailsPage";

/* ================= SELL FLOW ================= */
import SellSportsMaterial from "./components/InstituteDashboard/SellSportsMaterial";
import UploadProductDetails from "./components/InstituteDashboard/UploadProductDetails";

/* ================= SERVICES PAGE (FIXED PATH) ================= */
import MartialArts from "./pages/Services/MartialArts";
import TeamBallSports from "./pages/Services/TeamBallSports";
import RacketSports from "./pages/Services/RacketSports";
import Fitness from "./pages/Services/Fitness";
import TargetPrecisionSports from "./pages/Services/TargetPrecisionSports";
import EquestrianSports from "./pages/Services/EquestrianSports";
import AdventureOutdoorSports from "./pages/Services/AdventureOutdoorSports";
import IceSports from "./pages/Services/IceSports";
import Wellness from "./pages/Services/Wellness";
import Dance from "./pages/Services/Dance";

import "./index.css";

function App() {
  const location = useLocation();

  const hideNavbarPaths = [
    "/",
    "/login",
    "/signup",
    "/trainer-signup",
    "/institute-signup",
  ];

  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="bg-white text-black min-h-screen">
            {showNavbar && <Navbar />}

            <Routes>
              {/* AUTH */}
              <Route path="/" element={<RoleSelection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/trainer-signup" element={<TrainerSignup />} />
              <Route path="/institute-signup" element={<InstituteSignup />} />

              {/* LANDING */}
              <Route path="/landing" element={<Landing />} />

              {/* DASHBOARDS */}
              <Route path="/institutes/dashboard" element={<InstituteDashboard />} />
              <Route path="/trainers/dashboard" element={<TrainersDashboard />} />
              <Route path="/user/dashboard" element={<UserDashboard />} />

              {/* SELL */}
              <Route path="/sell-sports-material" element={<SellSportsMaterial />} />
              <Route path="/upload-product-details" element={<UploadProductDetails />} />

              {/* SHOP */}
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/products" element={<ProductsGridPage />} />
              <Route path="/addresspage" element={<AddAddressPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />

              {/* LIST & DETAILS */}
              <Route path="/trainers" element={<ViewTrainers />} />
              <Route path="/institutes" element={<ViewInstitutes />} />
              <Route path="/trainers/:id" element={<TrainerDetailsPage />} />
              <Route path="/institutes/:id" element={<InstituteDetailsPage />} />
              <Route path="/viewTrainers" element={<ViewTrainers />} />
              <Route path="/viewInstitutes" element={<ViewInstitutes />} />

              {/* SERVICES */}
              <Route path="/services/martial-arts" element={<MartialArts />} />
<Route path="/services/teamball" element={<TeamBallSports />} />
<Route path="/services/racketsports" element={<RacketSports />} />
<Route path="/services/fitness" element={<Fitness />} />
<Route
  path="/services/target-precision-sports"
  element={<TargetPrecisionSports />}
/>
<Route
  path="/services/equestrian-sports"
  element={<EquestrianSports />}
/>
<Route
  path="/services/adventure-outdoor-sports"
  element={<AdventureOutdoorSports />}
/>
<Route path="/services/ice-sports" element={<IceSports />} />
<Route path="/services/wellness" element={<Wellness />} />
<Route path="/services/dance" element={<Dance />} />

            </Routes>
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

/* COMING SOON */
const ComingSoon = ({ title }) => (
  <div className="p-12 text-center text-gray-500 text-xl">
    {title} Coming Soon
  </div>
);

export default App;