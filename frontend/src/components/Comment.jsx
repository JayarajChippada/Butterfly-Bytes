import React, { useEffect, useState } from 'react'

const Comment = ({ comment }) => {
  const [user, setUser] = useState({})
  
  useEffect(()=>{
    const getUser = async()=>{
      try{
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if(res.ok) {
          setUser(data);
        }
      } catch(error) {
        console.log(error.message)
      }
    }
    getUser();
  },[comment])
  return (
    <div>
      {comment.content}
    </div>
  )
}

export default Comment
