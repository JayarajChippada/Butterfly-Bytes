import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { app } from '../firebase';
import { ref } from 'firebase/storage';

const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerRef = useRef();
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);

    useEffect(()=>{
      if(imageFile) {
        uploadImage();
      }
    },[imageFile]);


    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if(file) {
        setImageFile(e.target.files[0]);
        //setImageFileUrl(URL.createObjectURL(file));
      }
    }

    const uploadImage = async() => {
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadingProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError('Could not upload image (File must be less than 2MB)');
          setImageFileUploadingProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
          })
        }
      )
    }

    

  return (
    <div className='max-w-lg mx-auto p-3 w-full '>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form action="" className="flex flex-col  gap-4">
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=>{
          filePickerRef.current.click()
        }}>
            {imageFileUploadingProgress && (
              <CircularProgressbar 
                value={imageFileUploadingProgress || 0}
                text={`${imageFileUploadingProgress}%`}
                strokeWidth={5}
                styles={
                  {
                    root: {
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    },
                    path: {
                      stroke: `rgba(62, 152, 199, ${imageFileUploadingProgress/100})`
                    }
                  }
                }
              />
            )}
            <img 
                src={imageFileUrl || currentUser.profilePicture} 
                alt="user" 
                className={`rounded-full w-full h-full object-cover border-8 border-[light-gray] ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-60'}`}
            />
        </div>

        {
            imageFileUploadError && (
              <div className="mt-4 text-sm p-4 text-red-800 rounded-lg bg-red-50 ">
                <span className="font-semibold">{imageFileUploadError}</span>
              </div>
            )
          }

        <div className='relative w-full'>
            <input 
                type="text" 
                placeholder='Username'
                id='userName'
                defaultValue={currentUser.userName}
                className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 
                    focus:border-cyan-500 focus:ring-cyan-500 
                    dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 
                    p-2.5 text-sm rounded-lg'
            />
        </div>

        <div className='relative w-full'>
            <input 
                type="text" 
                placeholder='email'
                id='email'
                defaultValue={currentUser.email}
                className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 
                    focus:border-cyan-500 focus:ring-cyan-500 
                    dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 
                    p-2.5 text-sm rounded-lg'
            />
        </div>

        <div className='relative w-full'>
            <input 
                type="text" 
                placeholder='Password'
                id='password'
                className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 
                    focus:border-cyan-500 focus:ring-cyan-500 
                    dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 
                    p-2.5 text-sm rounded-lg'
            />
        </div>

        <button 
          type='button'
          className="relative bg-custom-gradient-oauth flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group hover:text-white dark:text-white ">
          <span className="relative  w-full font-normal px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-custom-dark dark:text-white text-black hover:text-white rounded-md group-hover:bg-opacity-0">
            <div className="flex items-center justify-center">
              Update
            </div>
          </span>
        </button>
      </form>
      <div className= "text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile
