import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { removeUser, setUser } from "../utils/redux/userSlice";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { setRequests } from "../utils/redux/requestsSlice";
import { socket } from "../utils/socket";

// Removed the socket initialization and moved it to a separate file

const Body = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const requests = useAppSelector((store) => store.requests);
  const user = useAppSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(setUser(res.data));
      // Optional: You can navigate to feed here if needed
      // navigate("/feed");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(removeUser());
        navigate("/login");
        toast.error("Please log in to continue");
      } else {
        // Handle other possible errors like network issues or server errors
        toast.error("An unexpected error occurred");
      }
    }
  };
  useEffect(()=>{
    const restrictedPaths = ["/login", "/signup"];

    // Prevent API call if the current route is one of the restricted paths
    if (restrictedPaths.includes(location.pathname)) {
      return;
    }
    fetchUser();
  }, [navigate]);


  useEffect(() => {
    if (!user || !user._id) {
      return; // Exit if the user is not available
    }

    // Initialize the Socket.IO connection


    // Register the userId with the server
      socket.emit("register", user._id);


    // Listen for 'newRequest' event and update the state
    socket.on("newRequest", (newRequest) => {
      console.log(newRequest);
      dispatch(setRequests(newRequest));
    });

    // Listen for 'reviewRequest' event and update the status of the reviewed request
    socket.on("reviewRequest", (updatedRequest) => {
      const updatedRequests = requests.map((request) =>
        request._id === updatedRequest._id ? updatedRequest : request
      );
      dispatch(setRequests(updatedRequests));
    });

    // Cleanup the socket connection when the component unmounts
    // return () => {
    //   socket.disconnect();
    // };
  }, [user]);

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
