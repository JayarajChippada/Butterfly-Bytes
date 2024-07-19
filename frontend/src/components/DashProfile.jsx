import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';

import { app } from '../firebase';
import { ref } from 'firebase/storage';

const DashProfile = () => {
    const [formData, setFormData] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerRef = useRef();
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const dispatch = useDispatch();

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
      setImageFileUploading(true);
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
          setImageFileUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setFormData({ ...formData, profilePicture: downloadURL });
            setImageFileUploading(false);
          })
        }
      )
    }

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async(e) => {
      e.preventDefault();
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
      if(Object.keys(formData).length === 0) {
        setUpdateUserError('No changes made');
        return;
      }
      if(imageFileUploading) {
        setUpdateUserError('Please wait for image to upload');
        return;
      }

      try {
        dispatch(updateStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        })

        const data = await res.json();
        if(!res.ok) {
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message);
        }
        else {
          dispatch(updateSuccess(data));
          setUpdateUserSuccess("User's Profile updated Successfully");
        }
      } catch(error) {
        dispatch(updateFailure(error.message));
      }
    }

  return (
    <div className='max-w-lg mx-auto p-3 w-full '>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col  gap-4">
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 
                    focus:border-cyan-500 focus:ring-cyan-500 
                    dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 
                    p-2.5 text-sm rounded-lg'
            />
        </div>

        <button 
          type='submit'
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
      {updateUserSuccess && (
        <div className="mt-5 text-sm p-4 text-green-800 rounded-lg bg-green-50 ">
          <span className="font-semibold">{updateUserSuccess}</span>
        </div>
      )}
      {updateUserError && (
        <div className="mt-5 text-sm p-4 text-red-800 rounded-lg bg-red-50 ">
          <span className="font-semibold">{updateUserError}</span>
        </div>
      )}
    </div>
  )
}

export default DashProfile
