import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { app } from '../firebase';
import { ref } from 'firebase/storage';
import { getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage';

const UpdatePost = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
   const [formData, setFormData] = useState({
    title: '',
    category: 'uncategorized',
    content: '',
    image: ''
  }); 
  const [publishError, setPublishError] = useState(null);
  const [publishingProgress ,setPublishingProgress] = useState(false);

  const { postId } = useParams();
  const { currentUser } = useSelector((state)=>state.user);

  useEffect(()=>{
    try{
        const fetchPost = async() => {
            const res = await fetch(`/api/post/getposts?postId=${postId}`);
            const data = await res.json();

            if(!res.ok) {
                setPublishError(data.message);
                return;
            }
            if(res.ok) {
                setPublishError(null);
                setFormData(data.posts[0]);
            }
        }
        fetchPost()
    } catch(error) {
        console.log(error)
    }
  }, [postId])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      setImageFile(file);
    }
  }

  const uploadImage = async() => {
    try {
      if(!imageFile) {
        setImageFileUploadError("Please select an image");
        return;
      }
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' +imageFile.name;
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
            setImageFileUrl(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageFileUrl(downloadURL);
              setFormData({ ...formData, image: downloadURL });
              setImageFileUploadError(false);
              setImageFileUploadingProgress(null);
            })
          }
        )
    } catch(error) {
      setImageFileUploadError(error.message);
      setImageFileUploadingProgress(null);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      setPublishingProgress(true);
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setPublishingProgress(false);
      if(!res.ok) {
        setPublishError(data.message);
      }
      else {
        setPublishError(null);
        navigate(`/post/${data.slug}`)
      }
    } catch(error) {
      setPublishError(error.message);
      setPublishingProgress(false);
    }
  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className="text-center text-3xl my-7 font-semibold">Update a Post</h1>
        <form 
          className='flex flex-col gap-4'
          onSubmit={handleSubmit}
          action="" >
          <div className="h-full  flex flex-col gap-4 md:flex-row justify-between">
            <input 
              type="text" 
              id='title'
              placeholder='Title'
              required
              onChange={(e)=>{
                setFormData({...formData, title: e.target.value })
              }}
              value={formData.title}
              className='block flex-1 w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 
                  focus:border-cyan-500 focus:ring-cyan-500 
                  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 
                    p-2.5 text-sm rounded-lg'
            />
            <select 
              onChange={(e)=>{
                setFormData({...formData, category: e.target.value })
              }}
              value={formData.category}
              id="category" 
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
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
              onChange={handleImageChange}
              className='text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                      bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 
                      dark:placeholder-gray-400'
            />
            <button 
              type='button'
              onClick={uploadImage}
              disabled = {imageFileUploadingProgress}
              className="bg-custom-gradient-oauth inline-flex items-center justify-center overflow-hidden text-sm font-medium rounded-lg group hover:text-white dark:text-white ">
              {
                imageFileUploadingProgress ? (
                  <div className='m-1 p-1 bg-white'>
                    <CircularProgressbar 
                      className='w-16 h-16'
                      value={imageFileUploadingProgress}
                      text={`${imageFileUploadingProgress || 0}%`}
                    />
                  </div>
                ) : (
                  <span className=" m-0.5 font-normal px-4 py-2 transition-all ease-in duration-75 bg-white text-black hover:text-white rounded-md group-hover:bg-opacity-0 dark:bg-custom-dark dark:text-white">
                    Upload Image
                  </span>
                )
              }
            </button>
          </div>
          {
              imageFileUploadError && (
                <div className="text-sm p-4 text-red-800 rounded-lg bg-red-50 ">
                  <span className="font-semibold">{imageFileUploadError}</span>
                </div>
              )
            }
            {
              formData.image && (
                <img 
                  src={formData.image}
                  alt='upload'
                  className='w-full h-72 object-cover'
                />
              )
            }
          <ReactQuill 
            value={formData.content}
            theme="snow" 
            placeholder='Write something...' 
            className='h-72 mb-16'
            onChange={(value)=>{
                setFormData({...formData, content: value })
              }}
            required
          />
          <button 
            disabled={publishingProgress}
            type='submit'
            className={`relative w-full bg-custom-gradient-button flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group hover:text-white dark:text-white${publishError ? 'mb-2' : 'mb-20'}`}>
            <span className="relative  w-full font-normal px-4 py-2 transition-all ease-in duration-75 bg-transparent text-white rounded-md hover:shadow-lg group-hover:bg-opacity-0">
              <div className="flex items-center justify-center">
                {publishingProgress ? 'Updating...' : 'Update Post'}
              </div>
            </span>
          </button>
          {
              publishError && (
                <div className="text-sm mb-20 p-4 text-red-800 rounded-lg bg-red-50 ">
                  <span className="font-semibold">{publishError}</span>
                </div>
              )
            }
        </form>
    </div>
  )
}

export default UpdatePost
