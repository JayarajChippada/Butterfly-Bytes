import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import PostsTable from './PostsTable';
const DashPosts = () => {
  const { currentUser } = useSelector((state)=>state.user);
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts)
  useEffect(()=>{
    const fetchPosts = async()=> {
      try{
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if(!res.ok) {

        }
        else {
          setUserPosts(data.posts)
        }
      } catch(error) {
        console.log(error.message);
      }
    }

    if(currentUser.isAdmin) {
      fetchPosts();
    }
  },[currentUser._id])
  return (
    <div className='table-auto overflow-x-scroll rounded-lg  p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <PostsTable userPosts={userPosts} setUserPosts={setUserPosts}/>
      ) : (
        <p>There is no posts yet!</p>
      )}
    </div>
  )
}

export default DashPosts
