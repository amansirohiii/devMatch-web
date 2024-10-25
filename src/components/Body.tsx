import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAppDispatch } from "../hooks/redux";
import { removeUser, setUser } from "../utils/redux/userSlice";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
const Body = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(setUser(res.data));
      // Optional: You can navigate to feed here if needed
      // navigate("/feed");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(removeUser(null));
        navigate("/login");
        toast.error("Please log in to continue");
      } else {
        // Handle other possible errors like network issues or server errors
        toast.error("An unexpected error occurred");
      }
    }
  };
  useEffect(()=>{
    const restrictedPaths = ["/login", "/signup", "/"];

    // Prevent API call if the current route is one of the restricted paths
    if (restrictedPaths.includes(location.pathname)) {
      return;
    }
    fetchUser();
  }, [navigate]);
    return (
        <>
            <Navbar />
            <div className="min-h-screen">
            <Outlet />

            </div>
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="dark"
                // transition={Bounce}
                stacked
            />
        </>
    );
};

export default Body;
