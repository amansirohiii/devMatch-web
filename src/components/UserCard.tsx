import { User } from "../types/user"

const UserCard = (user: User) => {
  const distance = Math.ceil(user?.distance/1000);
  return (
<div className="card lg:card-side bg-base-200 shadow-xl">
  <figure>
    <img
      src={user?.photoUrl}
      alt="User" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user?.firstName + " " + user?.lastName} </h2>
    <p>{user?.about}</p>
    <p>{distance} km</p>
    <div className="card-actions justify-center my-4 sm:my-0">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>  )
}

export default UserCard