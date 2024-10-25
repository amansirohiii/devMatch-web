import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { PatchData, patchUser } from '../utils/auth';
import { setUser } from '../utils/redux/userSlice';
// import UserCard from "./UserCard";

const Profile = () => {
  const user = useAppSelector(store => store.user);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(user.age?.toString() || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photo, setPhoto] = useState<File | null>(null);
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState<string[]>(user.skills || []);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setEmail(user.email || "");
    setAge(user.age?.toString() || "");
    setGender(user.gender || "");
    setAbout(user.about || "");
    setSkills(user.skills || []);
  }, [user]);

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload: PatchData = {
        firstName,
        lastName,
        age: parseInt(age as string),
        gender,
        image: photo,
        about,
        skills,
      }
      if(password) payload.password = password;
      const user = await patchUser(payload);
      dispatch(setUser(user.data));
    } catch (error) {
      console.error("Error Updating:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
    <div className="flex justify-center my-10">
  <div className="card bg-base-300 w-full max-w-4xl shadow-xl">
    <div className="card-body">
      <h2 className="card-title justify-center">Update Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

        {/* First Name */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">First Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        {/* Last Name */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Last Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        {/* Email */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            className="input input-bordered w-full"
            value={email}
            disabled
            // onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {/* Password */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {/* Age */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Age</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>

        {/* Gender */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Gender</span>
          </div>
          <select
            className="select select-bordered w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </label>

        {/* Photo URL */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Photo</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            name="image"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          />
        </label>

        {/* Skills */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Skills</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={skills.join(", ")}
            onChange={(e) => setSkills(e.target.value.split(",").map(skill => skill.trim()))}
            placeholder="Enter skills separated by commas"
          />
        </label>

        {/* About (Full Width) */}
        <label className="form-control w-full col-span-2">
          <div className="label">
            <span className="label-text">About</span>
          </div>
          <textarea
            className="textarea textarea-bordered w-full"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>

      </div>

      <div className="card-actions justify-center my-5">
        <button
          className={loading ? "disabled" : "btn btn-primary"}
          onClick={handleSignup}
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</div>
{/* <UserCard {...user} /> */}
</>

  );
};

export default Profile;
