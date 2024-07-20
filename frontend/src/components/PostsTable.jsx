import React from 'react';
import { Link } from 'react-router-dom';

const PostsTable = ({ userPosts, setUserPosts }) => {
  return (
    <div className='relative shadow-md rounded-lg overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Date updated
              </th>
              <th scope='col' className='px-6 py-3'>
                Post image
              </th>
              <th scope='col' className='px-6 py-3'>
                Post title
              </th>
              <th scope='col' className='px-6 py-3'>
                Category
              </th>
              <th scope='col' className='px-6 py-3'>
                Delete
              </th>
              <th scope='col' className='px-6 py-3'>
                <span>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className='divide-y'>
            {userPosts.map((post) => (
              <tr key={post._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='px-6 py-4'>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </td>
                <td className='px-6 py-4'>
                  <Link to={`/post/${post.slug}`}>
                    <img src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-gray-100' />
                  </Link>
                </td>
                <td className='px-6 py-4'>
                  <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>
                    {post.title}
                  </Link>
                </td>
                <td className='px-6 py-4'>
                  {post.category}
                </td>
                <td className='px-6 py-4'>
                  <span className='font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer'>
                    Delete
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <Link to={`/update-post/${post._id}`}>
                    <span className='font-medium text-teal-700 dark:text-teal-500 hover:underline cursor-pointer'>
                      Edit
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostsTable;
