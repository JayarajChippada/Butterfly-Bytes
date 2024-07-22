import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux'

const Comment = ({ comment, onLike, onEdit }) => {
  const [user, setUser] = useState({})
  const { currentUser } = useSelector((state) => state.user)
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

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

  const handleEdit = async(e) => {
    setIsEditing(true);
    setEditedContent(comment.content);
  }

  const handleSave = async() => {
    try{
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent
        })
      });
      if(res.ok) {
        setIsEditing(false);
        const data = await res.json(); 
        onEdit(comment._id, data.content)
      }
    } catch(error) {
      console.log(error.message)
    }
  }

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className="flex-shrink-0 mr-3">
        <img 
          src={user.profilePicture}
          alt={user.userName}
          className='w-10 h-10 rounded-full object-cover bg-gray-200'
          />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold text-xs mr-1 truncate">{ user ? `@${user.userName}` : "anonymous"}</span>
          <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
        </div>
        {
          isEditing ? (
            <>
              <textarea 
                className='p-2.5 mb-2 text-sm w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
                            focus:ring-teal-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500'   
                onChange={(e)=>setEditedContent(e.target.value)}
                value={editedContent}
                name="" 
                rows={3}
                maxLength='200'
                placeholder='Add a comment...'
                id="comment"></textarea>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={handleSave}
                  className=" bg-teal-500 inline-flex  items-center justify-center p-0.5 overflow-hidden text-xs font-medium rounded-lg group hover:text-white dark:text-white ">
                  <span className=" font-normal px-4 py-1 transition-all ease-in duration-75 bg-transparent text-white hover:text-white rounded-md group-hover:bg-opacity-0 dark:bg-transparent dark:text-white">
                    Save
                  </span>
                </button>
                <button 
                  onClick={()=>setIsEditing(false)}
                  className=" bg-teal-500 inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-medium rounded-lg group hover:text-white dark:text-white ">
                  <span className=" font-normal px-4 py-1 transition-all ease-in duration-75 bg-white text-black hover:text-white rounded-md group-hover:bg-opacity-0 dark:bg-custom-dark dark:text-white">
                    cancel
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
            <p className="text-gray-500 mb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button type='button' onClick={()=>onLike(comment._id)} 
                className={`text-gray-400 hover:text-blue-500 ${ currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
                <FaThumbsUp className='text-sm' />
              </button>
              <p className="text-gray-400">{
                  comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? 'like' : "likes")
                }</p>
                {
                  currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                    <button 
                      onClick={handleEdit}
                      type='button'
                      className="text-gray-400 hover:text-blue-500">
                        Edit
                    </button>
                  ) 
                }
            </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Comment
