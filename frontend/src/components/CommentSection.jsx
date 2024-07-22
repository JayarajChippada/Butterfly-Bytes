import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment.jsx';

const CommentSection = ({ postId }) => {
    const { currentUser } = useSelector((state)=>state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(comment.length > 200) { 
            return setCommentError("More than 200 characters");
        }
        try{
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({content: comment, postId: postId, userId: currentUser._id})
            })
            const data = await res.json();
            if(res.ok) {
                setComment('');
                setCommentError(null)
                setComments([data, ...comments])
            }
            else {
                setCommentError(data.message);
            }
        } catch(error) {
            setCommentError(error.message);
        }
    }

    useEffect(()=>{
      const getComments = async()=>{
        try{
          const res = await fetch(`/api/comment/getPostComments/${postId}`);
          const data = await res.json();
          if(res.ok) {
            setComments(data);
            setCommentError(null)
          }
          else setCommentError(data.error)
        } catch(error) {
          setCommentError(error.message)
        }
      }
      getComments();
    },[postId])

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT'
            });
            if (res.ok) {
                const data = await res.json();
                setComments(comments.map((comment) =>
                    comment._id === commentId ? {
                        ...comment,
                        likes: data.likes,
                        numberOfLikes: data.likes.length
                    } : comment
                ));
            }
        } catch (error) {
            setCommentError(error.message);
        }
    }

    const handleEdit = (commentId, editedContent) => {
      setComments(
        comments.map((c)=>c._id === commentId ?  {...c, content: editedContent}  : c)
      );
    }

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {
        currentUser ? (
            <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                <p>Signedin as:</p>
                <img
                    className='rounded-full w-5 h-5 object-cover' 
                    src={currentUser.profilePicture} alt="user" />
                <Link className='text-xs text-cyan-600 hover:underline' to={`/dashboard?tab=profile`}>
                    @{currentUser.userName}
                </Link>
            </div>
        ) : (
            <div className='text-sm text-teal-500 my-5 glex gap-1'>
                You must be signed in to comment
                <Link to='/sign-in' className='text-blue-500 hover:underline'>
                    Sign In
                </Link>
            </div>
        )
      }
      {
        currentUser && (
           <form 
            onSubmit={handleSubmit}
            className='border border-teal-500 rounded-md p-3'>
             <textarea 
                className='p-2.5 text-sm w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
                            focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500'   
                onChange={(e)=>setComment(e.target.value)}
                value={comment}
                name="" 
                rows={3}
                maxLength='200'
                placeholder='Add a comment...'
                id="comment">
            </textarea>
            <div className="flex items-center justify-between mt-5">
                <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
                <button className=" bg-teal-500 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group hover:text-white dark:text-white ">
                  <span className=" font-normal px-4 py-1 transition-all ease-in duration-75 bg-white text-black hover:text-white rounded-md group-hover:bg-opacity-0 dark:bg-custom-dark dark:text-white">
                    Submit
                  </span>
                </button>
            </div>
            {
              commentError && (
                <div className="mt-4 text-sm p-4 text-red-800 rounded-lg bg-red-50 ">
                  <span className="font-semibold">{commentError}</span>
                </div>
              )
            }
           </form>
        )
      }
      {
        comments.length === 0 ? (
          <p className='text-sm my-5'>No comments yet!</p>
        ) : (
          <>
            <div className='flex text-sm my-5 items-center gap-1'>
              <p className="">Comments</p>
              <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                <p className='text-xs'>{comments.length}</p>
              </div>
            </div>
            {
              comments.map((comment) => (
                <Comment key={comment._id} comment={comment} onLike={handleLike} onEdit={handleEdit}/>
              ))
            }
          </>
        )
      }
    </div>
  )
}

export default CommentSection
