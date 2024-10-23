import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useAppDispatch } from "./redux";
import { removeUser } from "../utils/redux/userSlice";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const logout = async()=>{
  try {
      await axios.get(BASE_URL + "/logout", {
        withCredentials: true,
      });
      dispatch(removeUser(null))
      toast.success("Logout successful");
    }
   catch (error) {
    toast.error("Logout failed" + error);
  }}
  return logout;


}