import React, { useState } from 'react';
import logo from '../assets/butterfly-logo.png';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

import { OAuthButton } from '../components';

const SignIn = () => {
  const [formData, setFormData] = useState({}); 

  const { loading, error: errorMessage } = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields."));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/sign-in',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );

      const data = await res.json();
      if(data.success === false) {
        return dispatch(signInFailure(data.message))
      }
      if(res.ok) {
        dispatch(signInSuccess(data))
        navigate('/');
      }
    } catch(error) {
      dispatch(signInFailure(error.message));
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          {/* Logo Div */}
          <div className='flex flex-col'>
            <div className='flex items-center justify-start'>
              <Link to='/' className='flex items-center font-bold text-3xl'>
                <span className='px-2 py-1 rounded-md text-3xl font-bold bg-clip-text text-white bg-custom-gradient'>
                  Jayaraj's 
                </span>
                |Blog
              </Link>

              <Link to="/">
                <img src={logo} alt="Logo" className='w-16 h-16'/>
              </Link>
            </div>

            <p className="text-md text-gray-700 md:hidden dark:text-white">Your stories await. Sign in and keep your creative wings in motion.</p>

            <div className='hidden md:flex flex-col text-gray-700 dark:text-white'>
              <p className="text-md">Your stories await.</p>
              <p className="text-md">Sign in and keep your creative wings in motion.</p>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-normal mb-2">Your email</label>
              <input 
                type="email" 
                id='email'
                placeholder='name@company.com'
                className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 
                    focus:border-cyan-500 focus:ring-cyan-500 
                    dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 
                      p-2.5 text-sm rounded-lg'
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-normal mb-2 ">Your password</label>
              <input 
                type="password" 
                id='password'
                placeholder='********'
                className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 
                    focus:border-cyan-500 focus:ring-cyan-500 
                    dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 
                      p-2.5 text-sm rounded-lg'
                onChange={handleChange}
              />
            </div>

            <button 
              type='submit'
              disabled={loading}
              className="relative bg-custom-gradient-button inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group hover:text-white dark:text-white ">
              <span className="relative m-0.5 font-bold px-4 py-2 transition-all ease-in duration-75 bg-transparent text-white hover:text-white rounded-md group-hover:bg-opacity-0">
                { loading ? (
                              <div className="flex items-center justify-center font-sm">
                                <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="font-bold text-sm pl-3">Loading...</span>
                              </div>
                            ) 
                            : "Sign In"
                }
              </span>
            </button>
            <OAuthButton />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <div className="mt-4 text-sm p-4 text-red-800 rounded-lg bg-red-50">
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn
