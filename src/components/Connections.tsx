import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { BASE_URL } from "../utils/constants";
import { setConnections } from "../utils/redux/connectionsSlice";
import { useEffect } from "react";

const Connections = () => {
  const connections = useAppSelector((store) => store.connections);
  const dispatch = useAppDispatch();
  const fetchConnections = async()=>{
    try {
      const response = await axios.get(BASE_URL + "/user/connections",{
        withCredentials: true,
      });
      dispatch(setConnections(response.data.data));
    } catch (error) {
        console.error("Connections fetch error:", error);
    }
  }
  useEffect(()=>{
    fetchConnections();
  }, [])

  if (!connections) return;

  if (connections.length === 0) return <h1 className="flex justify-center text-3xl font-bold my-10"> No Connections Found</h1>;


  return (<>
  <h1 className="flex justify-center text-3xl font-bold my-10">Connections</h1>
  <div className="flex justify-center">
      <div className="join join-vertical w-1/2 my-10">
        {connections && connections.map((connection) => {
          const {_id, firstName, lastName, photoUrl, about, skills, email} = connection;
          return (
           <div key={_id} className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
            <div className="flex flex-row items-center collapse-title ">
            <div className="avatar mr-5">
  <div className="w-20 rounded-full">
    <img src={photoUrl} />
  </div>
</div>
           <div className="text-xl font-medium">{firstName} {lastName}</div>
            </div>
           <div className="collapse-content">
             <p>{about}</p>
              <p>Skills: {skills}</p>
             <p>Connect: {email}</p>
           </div>
         </div>
        )})}


</div>
    </div></>

  )
}

export default Connections