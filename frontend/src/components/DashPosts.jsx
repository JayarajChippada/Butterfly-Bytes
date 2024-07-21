import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import PostsTable from './PostsTable';
const DashPosts = () => {
  const { currentUser } = useSelector((state)=>state.user);
  const [showMore, setShowMore] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  
  useEffect(()=>{
    const fetchPosts = async()=> {
      try{
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if(res.ok) {
          setUserPosts(data.posts);
          if(data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch(error) {
        console.log(error.message);
      }
    }

    if(currentUser.isAdmin) {
      fetchPosts();
    }
  },[currentUser._id]);

  const handleShowMore = async()=>{
    const startIndex = userPosts.length;
    try{
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok) {
        setUserPosts((prev)=>[...prev, ...data.posts])
        if(data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch(error) {
      console.log(error.message)
    }
  }


  return (
    <div className='table-auto overflow-x-scroll rounded-lg  p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <PostsTable userPosts={userPosts} setUserPosts={setUserPosts}/>
          {
            showMore && (
              <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">
                Show More
              </button>
            )
          }
        </>
      ) : (
        <p>There is no posts yet!</p>
      )}
    </div>
  )
}

export default DashPosts
