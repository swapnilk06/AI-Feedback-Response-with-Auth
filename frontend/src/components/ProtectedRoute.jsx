import { useContext, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { isLoggedin, loadingAuthCheck, userData } = useContext(AppContent);
  const notified = useRef(false);

  if (loadingAuthCheck) {
    return <div className="text-white text-center mt-20">Checking auth...</div>;
  }

  if (!isLoggedin) {
    if (!notified.current) {
      toast.error("Please login to access this page");
      notified.current = true;
    }
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
