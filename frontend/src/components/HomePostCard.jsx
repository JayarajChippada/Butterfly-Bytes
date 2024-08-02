import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePostCard = ({ post }) => {
    const [user, setUser] = useState(null);

    useEffect(() =>{
        const fetchUser = async() => {
            try{
                const res = await fetch(`/api/user/${post.userId}`);
                const data = await res.json();
                if(res.ok) {
                    setUser(data);
                }
            }
            catch(error) {
                console.log(error.message);
            }
        }
        fetchUser();
    },[post]) 
  return (
    <div className='w-full py-5 border-b hover:shadow-lg rounded-lg px-4 my-5 dark:hover:bg-gray-800 dark:border-gray-700'>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-start gap-2">
            <img 
            src={user && user.profilePicture}
            alt={user && user.userName}
            className='w-6 h-6 rounded-full object-cover bg-gray-200'
            />
          <p className='uppercase text-xs font-bold'>{user && user.userName}</p>
      </div>
      <div className="flex justify-between items-center">
            <div className="flex flex-col gap-3 mr-5">
                <h2 className='text-xl font-bold line-clamp-2'>{post.title}</h2>
                 <div
                  className="line-clamp-3 overflow-hidden blog-card"
                  dangerouslySetInnerHTML={{ __html: post && post.content }}
                ></div>
            </div>
            <img 
                src={post.image}
                alt=""
                className='w-24 h-16  sm:w-52 sm:h-36 object-contain bg-transparent'
            />
        </div>
      </div>
      <div className="flex text-md font-semi-bold">
        <span className="mr-3">
          {post && new Date(post.createdAt).toLocaleDateString()}.
        </span>
        <span>
          {post && (post.content.length / 1000).toFixed(0)}mins read
        </span>
        <span className='uppercase ml-5'>
          {post && post.category}
        </span>
      </div>
    </div>
  )
}

export default HomePostCard
