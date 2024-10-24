import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./redux";
import { removeUser } from "../utils/redux/userSlice";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.user)
  const navigate = useNavigate();
  const logout = async()=>{
  try {
    if(!user.firstName){
      toast.error("You are not logged in");
      return;
    }
    // if(!window.confirm("Are you sure you want to logout?")) return;
      await axios.get(BASE_URL + "/logout", {
        withCredentials: true,
      });
      dispatch(removeUser(null))
      toast.success("Logout successful");
      navigate("/")
    }
   catch (error) {
    toast.error("Logout failed" + error);
  }}
  return logout;


}