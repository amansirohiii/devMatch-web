import { User } from "../types/user"
import useRequest from "../hooks/useRequest";

const UserCard = (user: User) => {
  const distance = Math.ceil(user?.distance/1000);
  const sendRequest = useRequest();


  return (
<div className="card lg:card-side bg-base-200 shadow-xl">
  <figure>
    <img
      src={user?.photoUrl}
      alt="User"
      className="w-60"
   />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user?.firstName + " " + user?.lastName} </h2>
    <p>{user?.about}</p>
    <p>{user?.age} years, {user?.gender}</p>
    <p>{user?.skills}</p>
    <p>{distance} km</p>
    <div className="card-actions justify-center my-4 sm:my-0">
      <button onClick={()=>sendRequest("send", "ignored", user?._id)} className="btn btn-primary">Ignore</button>
      <button onClick={()=>sendRequest("send", "interested", user?._id)} className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>  )
}

export default UserCard