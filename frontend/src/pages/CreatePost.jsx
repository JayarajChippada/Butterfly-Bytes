import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className='h-full w-full bg-white dark:bg-custom-dark'>
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
        <div className="h-full  flex flex-col gap-4 my-4 md:flex-row justify-between">
          <input 
            type="text" 
            id='title'
            placeholder='Title'
            required
            className='block flex-1 w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 
                focus:border-cyan-500 focus:ring-cyan-500 
                dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 
                  p-2.5 text-sm rounded-lg'
          />

          <select id="languages" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                            focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
            <option value='uncategorized'>Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <input 
            type="file"  
            accept='image/*'
            className='text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                    bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400'
          />
          <button className="bg-custom-gradient-oauth inline-flex items-center justify-center overflow-hidden text-sm font-medium rounded-lg group hover:text-white dark:text-white ">
            <span className=" m-0.5 font-normal px-4 py-2 transition-all ease-in duration-75 bg-white text-black hover:text-white rounded-md group-hover:bg-opacity-0 dark:bg-custom-dark dark:text-white">
              Upload Image
            </span>
          </button>
        </div>
        <ReactQuill 
          theme="snow" 
          placeholder='Write something...' 
          className='mt-4 h-72 mb-16'
          required
        />
        <button 
          type='submit'
          className="relative my-4 w-full bg-custom-gradient-button flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group hover:text-white dark:text-white">
          <span className="relative  w-full font-normal px-4 py-2 transition-all ease-in duration-75 bg-transparent text-white rounded-md hover:shadow-lg group-hover:bg-opacity-0">
            <div className="flex items-center justify-center">
              Publish
            </div>
          </span>
        </button>

      </div>
    </div>
  )
}

export default CreatePost;