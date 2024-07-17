import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuthButton = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async() => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL
        })
      });

      const data = await res.json();
      if(res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <button 
      type='button'
      onClick={handleGoogleClick}
      className="relative bg-custom-gradient-oauth flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group hover:text-white dark:text-white ">
      <span className="relative  w-full font-normal px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-custom-dark dark:text-white text-black hover:text-white rounded-md group-hover:bg-opacity-0">
        <div className="flex items-center justify-center">
          <AiFillGoogleCircle className='w-6 h-6 mr-2'/>  
        Continue with Google
        </div>
      </span>
    </button>
  )
}

export default OAuthButton
