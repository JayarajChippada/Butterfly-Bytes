import React, { useEffect, useState } from 'react'

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
    <div className='w-full py-5 border-b dark:border-gray-400'>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-start gap-2">
            <img 
            src={user && user.profilePicture}
            alt={user && user.userName}
            className='w-6 h-6 rounded-full object-cover bg-gray-200'
            />
          <p className='uppercase text-xs font-bold'>{user && user.userName}</p>
      </div>
      <div className="flex items-center justify-between">
            <div className="flex flex-col gap-3 mr-5">
                <h2 className='text-xl font-bold max-w-xs sm:max-w-md'>{post.title}</h2>
                <div
                  className="max-w-xs sm:max-w-md truncated overflow-hidden line-clamp-3 post-card-content"
                  dangerouslySetInnerHTML={{ __html: post && post.content }}
                ></div>
            </div>
            <img 
                src={post.image}
                alt={post.title}
                className='w-52 h-32 object-contain bg-transparent'
            />
        </div>

      </div>
    </div>
  )
}

export default HomePostCard
