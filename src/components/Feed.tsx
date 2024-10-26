import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { setFeed } from "../utils/redux/feedSlice";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useAppDispatch();
  const feed = useAppSelector(store => store.feed);
  const [page] = useState(1);
  const totalPages = feed.pagination.totalPages;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFeed = async (page: number) => {
    try {
      const res = await axios.get(BASE_URL + `/user/feed?page=${page}`, {
        withCredentials: true,
      });
      dispatch(setFeed(res.data));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if(feed.data.length === 0 && page <= totalPages) {
      getFeed(page);
    }
  }, [dispatch, feed]);
  return feed.data.length ? (
<div className="flex justify-center my-10">
<UserCard {...feed.data[0]} />

</div>  ):
<h1 className="flex justify-center text-3xl font-bold my-10">No Users Found</h1>
}

export default Feed