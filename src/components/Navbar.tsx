import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { useLogout } from "../hooks/useLogout";
import toggleTheme from "./ui/ToggleTheme";

const Navbar = () => {
  const user = useAppSelector((store) => store.user);
  const logout = useLogout();
  const handleLogout = () => {
     logout();
  }

  return (
<div className="navbar bg-base-300">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevMatch</Link>
  </div>
  <div className="flex-none gap-2">
    {/* <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div> */}
    <ul className="sm:menu sm:menu-horizontal hidden">
{user.firstName ? ( <> <li><Link to="/feed">Feed</Link></li>
  <li><Link to="/connections">Connections</Link></li>
  <li><Link to="/requests">Requests</Link></li></>) :
  <>
  <li><Link to="/login">Login</Link></li>
  <li><Link to="/signup">Signup</Link></li>
  </>}
</ul>
{toggleTheme()}

    <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User"
            src= {user?.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {user.firstName && (<li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>)}
        {user.firstName ? (<> <span className="sm:hidden">
        <li><Link to="/feed">Feed</Link></li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        </span>
        <li><a onClick={handleLogout}>Logout</a></li></>) :
        <>
        <span className="sm:hidden">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signjup">Signup</Link></li>
        </span></>}
      </ul>
    </div>
  </div>
</div>  )
}

export default Navbar