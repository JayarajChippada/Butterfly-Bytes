import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
const DashPosts = () => {
  const { currentUser } = useSelector((state)=>state.user);

  useEffect(()=>{
    const fetchPosts = async()=> {
      try{
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        console.log(data);
      } catch(error) {
        console.log(error.message);
      }
    }
  },[])
  return (
    <div>
      dashposts
    </div>
  )
}

export default DashPosts
