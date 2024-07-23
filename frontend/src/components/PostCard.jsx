import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className='group'>
      <Link to={`/post/${post.slug}`}>
        <img 
            src={post.image} 
            alt="post cover" 
            className='h-[260px] w-full object-cover'
        />
      </Link>
    </div>
  )
}

export default PostCard
