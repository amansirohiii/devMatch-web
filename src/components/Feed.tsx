import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { setFeed } from "../utils/redux/feedSlice";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useAppDispatch();
  const feed = useAppSelector(store => store.feed);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(setFeed(res.data));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getFeed();
  }, [dispatch]);
  // const distance = Math.floor(feed.data[0].distance/1000);
  return feed && (
    // <div>{distance} km</div>
<div className="flex justify-center my-10">
<UserCard {...feed.data[0]} />

</div>  )
}

export default Feed