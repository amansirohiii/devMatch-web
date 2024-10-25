import axios from "axios";
import { User } from "../types/user"
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";

const UserCard = (user: User) => {
  const distance = Math.ceil(user?.distance/1000);
  const handleIgnore = async() => {
    try {
      const res = await axios.post(BASE_URL + "/send/ignored/" + user._id, {}, {
        withCredentials: true
      });
      toast.success("User ignored");
      console.log(res)
    } catch (error) {
      toast.error("Already sent");
      console.log(error);

    }
  }

  const handleInterested = async () => {
    try {
      const res = await axios.post(BASE_URL + "/send/interested/" + user._id, {}, {
        withCredentials: true,
      });
      console.log(res);
      toast.success("User interested");
    } catch (error) {
      toast.error("Already sent");
      console.log(error);
    }
  };

  return (
<div className="card lg:card-side bg-base-200 shadow-xl">
  <figure>
    <img
      src={user?.photoUrl}
      alt="User"
      height={10}
      width={20} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user?.firstName + " " + user?.lastName} </h2>
    <p>{user?.about}</p>
    <p>{distance} km</p>
    <div className="card-actions justify-center my-4 sm:my-0">
      <button onClick={handleIgnore} className="btn btn-primary">Ignore</button>
      <button onClick={handleInterested} className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>  )
}

export default UserCard