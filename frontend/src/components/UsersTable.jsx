import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const UsersTable = ({ users,  setShowModel, setUserIdToDelete }) => {
 
  return (
    <div className='relative shadow-md rounded-lg overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Date created
              </th>
              <th scope='col' className='px-6 py-3'>
                User image
              </th>
              <th scope='col' className='px-6 py-3'>
                Username
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              <th scope='col' className='px-6 py-3'>
                Admin
              </th>
              <th scope='col' className='px-6 py-3'>
                Delete
              </th>
            </tr>
          </thead>
          <tbody className='divide-y'>
            {users.map((user) => (
              <tr key={user._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='px-6 py-4'>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className='px-6 py-4'>
                  <img src={user.profilePicture} alt={user.userName} className='w-10 h-10 object-cover bg-gray-100 rounded-full' />
                </td>
                <td className='px-6 py-4'>
                  <p className='font-medium text-gray-900 dark:text-white'>
                    {user.userName}
                  </p>
                </td>
                <td className='px-6 py-4'>
                  <p className='font-medium text-gray-900 dark:text-white'>
                    {user.email}
                  </p>
                </td>
                <td className='px-6 py-4'>
                  {user.isAdmin ? <FaCheck className='text-green-500'/> : <FaTimes className='text-red-500'/>}
                </td>
                <td className='px-6 py-4'>
                  <span 
                    onClick={(e)=>{
                      setShowModel(true);
                      setUserIdToDelete(user._id);
                    }}
                    className='font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer'>
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
