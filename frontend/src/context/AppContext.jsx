import React, { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContent = createContext();

// send the cookies
export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(true);
  const [loadingAuthCheck, setLoadingAuthCheck] = useState(true);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedin(true);
        localStorage.setItem("auth", "true"); // Save flag for refresh
        await getUserData();
      } else {
        setIsLoggedin(false);
        setUserData(null);
        localStorage.removeItem("auth");
      }
    } catch (error) {
      setIsLoggedin(false);
      setUserData(null);
      localStorage.removeItem("auth");
    } finally {
      setLoadingAuthCheck(false);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        const alreadyLoggedIn = localStorage.getItem("auth");
        if (alreadyLoggedIn) {
          toast.error(data.message || "User not found");
        }
        setIsLoggedin(false);
        setUserData(null);
        localStorage.removeItem("auth");
      }
    } catch (error) {
      const alreadyLoggedIn = localStorage.getItem("auth");
      if (alreadyLoggedIn) {
        toast.error(error.response?.data?.message || "Failed to get user data");
      }
      setIsLoggedin(false);
      setUserData(null);
      localStorage.removeItem("auth");
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    loadingAuthCheck,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
