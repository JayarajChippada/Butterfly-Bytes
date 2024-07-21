import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import UsersTable from './UsersTable';
import ShowModel from './ShowModel';

const DashUsers = () => {
  const { currentUser } = useSelector((state)=>state.user);
  const [showMore, setShowMore] = useState(true);
  const [users, setUsers] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  
  useEffect(()=>{
    const fetchUsers = async()=> {
      try{
        const res = await fetch('/api/user/getusers');
        const data = await res.json();
        if(res.ok) {
          setUsers(data.users);
          if(data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch(error) {
        console.log(error.message);
      }
    }

    if(currentUser.isAdmin) {
      fetchUsers();
    }
  },[currentUser._id]);

  const handleShowMore = async()=>{
    const startIndex = users.length;
    try{
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok) {
        setUsers((prev)=>[...prev, ...data.users])
        if(data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch(error) {
      console.log(error.message)
    }
  }

  const handleDeleteUser = async()=>{
    setShowModel(false);
    const userId = currentUser._id;
    console.log("User is deleted")
    // try{
    //   const res = await fetch(`/api/user/deleteuser/${userIdToDelete}/${userId}`, {
    //     method: 'DELETE',
    //   });

    //   const data = await res.json();
    //   if(!res.ok) {
    //     console.log(data.message);
    //   }
    //   else {
    //     setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
    //   }
    // } catch(error) {
    //   console.log(error.message);
    // }
  }


  return (
    <div className='table-auto overflow-x-scroll rounded-lg  p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <UsersTable users={users}  setShowModel={setShowModel} setUserIdToDelete={setUserIdToDelete}/>
          
          {
            showMore && (
              <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">
                Show More
              </button>
            )
          }

        </>
      ) : (
        <p>There is no users yet!</p>
      )}
      
      <ShowModel  showModel={showModel} setShowModel={setShowModel} isUser={true} handleDeleteUser={handleDeleteUser} />
    
    </div>
  )
}

export default DashUsers
