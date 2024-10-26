import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useAppDispatch } from "./redux";
import { removeRequest } from "../utils/redux/requestsSlice";
import { removeFeedUser } from "../utils/redux/feedSlice";

const useRequest = ()=>{
  const dispatch = useAppDispatch();

  const sendRequest = async(type: string, status: string, _id: string) => {
    try {
      const res = await axios.post(BASE_URL + "/request/"+ type +"/" + status +"/" + _id, {}, {
        withCredentials: true
      });
     if(status === "accepted" || status === "rejected") {
      dispatch(removeRequest(_id));
      toast.success(status);

    }
    // TODO
    if(status === "interested" || status === "ignored") {
      dispatch(removeFeedUser(_id));
      toast.success(status);

    }
      console.log(res)
    } catch (error) {
      toast.error("Already responded");
      console.log(error);

    }
  }
  return sendRequest;

}
export default useRequest;