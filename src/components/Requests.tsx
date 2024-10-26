import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { setRequests } from "../utils/redux/requestsSlice";
import useRequest from "../hooks/useRequest";
import { socket } from "../utils/socket";

const Requests = () => {
  const reviewRequest = useRequest();
  const requests = useAppSelector((store) => store.requests);
  const dispatch = useAppDispatch();

  const fetchRequests = async()=>{
    try {
      const response = await axios.get(BASE_URL + "/user/requests",{
        withCredentials: true,
      });
      console.log(response.data.data)
      dispatch(setRequests(response.data.data));
    } catch (error) {
        console.error("Connections fetch error:", error);
    }
  }
  socket.on("newRequest", () => {
    fetchRequests();
  });
useEffect(()=>{
  fetchRequests();
}, [])


  if (!requests) return;

  if (requests.length === 0) return <h1 className="flex justify-center text-3xl font-bold my-10"> No Requests</h1>;


  return (<>
  <h1 className="flex justify-center text-3xl font-bold my-10">Requests</h1>
    <div className="flex justify-center">
      <div className="join join-vertical w-full sm:w-1/2 my-10 mx-5 sm:mx-0">
        {requests && requests.map((request) =>{
          const {_id, firstName, lastName, photoUrl} = request.fromUserId;
          return (

           <div key={_id} className=" join-item border-base-300 border my-2">
            <div className="flex flex-row items-center collapse-title ">
            <div className="avatar mr-5">
  <div className="w-20 rounded-full">
    <img src={photoUrl} />
  </div>
</div>
           <div className="text-xl font-medium">{firstName} {lastName}</div>

           <div className="ml-auto flex -mr-10 sm:space-x-4">
           <img onClick={()=> reviewRequest("review", "accepted", request._id)} width="50" height="50" src="https://img.icons8.com/ios-filled/50/40C057/ok--v1.png" alt="ok--v1"/>
           <img onClick={()=> reviewRequest("review", "rejected", request._id)} width="50" height="50" src="https://img.icons8.com/ios-filled/50/FA5252/cancel.png" alt="cancel"/>
           </div>
            </div>

         </div>
        )})}


</div>
    </div>
    </>
  )
}

export default Requests