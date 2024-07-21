import React from 'react';
import { MdClose } from "react-icons/md";
import { TbAlertCircle } from "react-icons/tb";

const ShowModel = ({ showModel, setShowModel, handleDeleteUser=null, handleDeletePost = null, isPost = false, isUser = false }) => {
  return (
    <div>
      { showModel && (
        <div className="fixed top-0 right-0 left-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full
                        items-center justify-center flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80">
            <div className='relative h-full w-full p-4 md:h-auto max-w-md'>
              <div className="relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]">
                
                <div className="flex items-start justify-between rounded-t dark:border-gray-700 p-2 border-b-0">
                  <h3 className='text-xl font-medium text-gray-900 dark:text-white'></h3>
                  <button 
                     onClick={(e) => setShowModel(false)}
                    className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm 
                              text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 
                              dark:hover:text-white"
                  >
                    <MdClose  className='w-5 h-5' />
                  </button>
                </div>

                <div className="p-6 flex-1 overflow-auto pt-0">
                  <div className="text-center">
                    <TbAlertCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200'/>
                    <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                      {isUser ? 'Are you sure you want to delete this user?' : `Are you sure you want to delete your ${isPost ? 'Post' : 'Account'}?`}
                    </h3>
                    <div className='flex justify-center gap-4'>
                      <button 
                        onClick={isPost ? handleDeletePost : handleDeleteUser}
                        className="flex items-center justify-center p-0.5 text-center font-medium 
                                         relative focus:z-10 focus:outline-none text-white bg-red-700 
                                         border border-transparent enabled:hover:bg-red-800 focus:ring-red-300 
                                         dark:bg-red-600 dark:enabled:hover:bg-red-700 dark:focus:ring-red-900 rounded-lg focus:ring-2"
                      >
                        <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
                          Yes, I'm sure
                        </span>
                      </button>

                      <button 
                        onClick={()=>setShowModel(false)}
                        className="flex items-center justify-center p-0.5 text-center font-medium 
                                         relative focus:z-10 focus:outline-none text-gray-900 bg-white
                                         border border-gray-200  enabled:hover:bg-gray-100 
                                         enabled:hover:text-cyan-700 :ring-cyan-700 focus:text-cyan-700 
                                         dark:bg-transparent dark:text-gray-400 dark:border-gray-600 
                                       dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 
                                         rounded-lg focus:ring-2"
                      >
                        <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
                          No, cancel
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default ShowModel
