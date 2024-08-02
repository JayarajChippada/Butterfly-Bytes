import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../assets/home-page-banner.jpg';
import userbanner from '../assets/user-banner.png';
import { HomePostCard } from '../components';
import { FaInstagram } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [editors, setEditors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state)=>state.user);
  const [activeLink, setActiveLink] = useState('');
  const [showMore, setShowMore] = useState(true);

  const navRef = useRef(null);

  const scrollLeft = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(()=>{
    const fetchPosts = async() => {
        try{
          const category = activeLink;
          setLoading(true);
          const res = await fetch(`/api/post/getposts?category=${category}`);
          const data = await res.json();
          if(!res.ok) {
            setLoading(false);
            setError(data.message);
          }
          else {
            setLoading(false);
            setError(null);
            setPosts(data.posts);
            if(data.posts.length < 9) {
              setShowMore(false);
            }
            else {
              setShowMore(true);
            }
          }
        } catch(error) {
          setError(error.message);
        }
    }
    fetchPosts();
  },[activeLink])

  useEffect(()=>{
    const fetchEditors = async() => {
        try{
          setLoading(true);
          const res = await fetch('/api/user/geteditors/');
          const data = await res.json();
          if(!res.ok) {
            setLoading(false);
            setError(data.message);
          }
          else {
            setLoading(false);
            setError(null);
            setEditors(data.users);
          }
        } catch(error) {
          setError(error.message);
        }
    }
    fetchEditors();
  }, [])


  const handleShowMore = async()=>{
    const startIndex = posts.length;
    try{
      const res = await fetch(`/api/post/getposts?category=${activeLink}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok) {
        setPosts((prev)=>[...prev, ...data.posts])
        if(data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch(error) {
      console.log(error.message)
    }
  }

  return (
    <div className='min-h-screen bg-white dark:bg-custom-dark'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col lg:flex-row'>
          {/* left */}
          <div className='flex-1 w-full'>
            <Link to='/'>
              <img 
                src={Banner}
                className='h-32 w-full object-cover'
                alt="banner" />
            </Link>
            <div className="mx-3">
              <div className="max-w-3xl mx-auto">
                <div className="py-4 md:py-12">
                   <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start lg:hidden">
                        <div className="flex flex-col gap-1">
                          <img 
                            src={userbanner}
                            className='h-28 w-28 object-cover bg-transparent'
                            alt="logo" />
                        </div>
                        <div className="flex flex-col gap-5">
                          <button className='rounded-2xl bg-blue-500 text-white px-5 py-2'>
                            Follow
                          </button>
                          <div className="flex items-center justify-center">
                            <p className='text-md font-semibold'>Connect with Jayaraj</p>
                            <a href="#" className="ml-10 text-2xl"><FaInstagram /></a>
                          </div>
                        </div>
                    </div>

                     <div className="flex items-center bg-transparent p-2">
                      <button className="text-gray-500 text-2xl mx-2" onClick={scrollLeft}>
                        {'<'}
                      </button>
                      <div
                        ref={navRef}
                        className="flex space-x-4 overflow-x-auto whitespace-nowrap scrollbar-none"
                      >
                        {[
                          { href: '', label: 'Home' },
                          { href: 'javascript', label: 'JavaScript' },
                          { href: 'reactjs', label: 'React' },
                          { href: 'nextjs', label: 'NextJS' },
                          { href: 'datastructres', label: 'Data Structures' },
                          { href: 'databases', label: 'Databases' },
                          { href: 'uncategorized', label: 'Interview Challenges' },
                        ].map((link) => (
                          <a
                            key={link.href}
                            href='#'
                            onClick={() => handleLinkClick(link.href)}
                            className={`relative px-4 py-2 hover:text-gray-300 dark:hover:text-gray-300 ${
                              activeLink === link.href ? 'active' : ''
                            }`}
                          >
                            {link.label}
                            {activeLink === link.href && (
                              <span className="absolute bottom-0 left-0 right-0 h-1 bg-gray-500 dark:bg-white"></span>
                            )}
                          </a>
                        ))}
                      </div>
                      <button className="text-gray-500 text-2xl mx-2" onClick={scrollRight}>
                        {'>'}
                      </button>
                    </div>

                    {
                      loading 
                      ? (
                         <div className="flex mt-15 items-center justify-center font-sm">
                            <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="font-bold text-sm pl-3">Loading...</span>
                          </div>
                      ) 
                      :(<div className="mt-15">
                      <>
                      {
                        posts && posts.length > 0 
                        ? (
                          posts.map((post)=>(
                          <Link key={post._id} to={`/post/${post.slug}`}>
                            <HomePostCard  post={post} />
                          </Link>   
                        ))) 
                        : (
                          <div className="w-full flex items-center justify-center">There are no posts yet!</div>
                        )
                      }
                      {
                        posts && posts.length > 0 && showMore && (
                          <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">
                            Show More
                          </button>
                        )
                      }
                      </>
                    </div>)
                    }
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className='hidden lg:block w-[352px]'>
            <aside className='h-screen sticky top-0 p-4'>
                <div className="flex flex-col justify-start items-start ml-5">
                    <img 
                    src={userbanner}
                    className='h-32 w-32 object-cover bg-transparent'
                    alt="logo" />
                    <p className='text-md font-semibold'>Discover modern web development with React.js, JavaScript, and Next.js through our in-depth blogs</p>
                    <button className='rounded-2xl bg-blue-500 text-white px-5 py-2 my-4'>
                      Follow
                    </button>
                    <div className="flex items-center justify-center">
                      <p className='text-md font-semibold'>Connect with Jayaraj</p>
                      <a href="#" className="ml-10 text-2xl"><FaInstagram /></a>
                    </div>
                    <p className='mt-8 text-lg font-bold'>Editors</p>
                    {
                      editors && editors.length > 0 && (
                        editors.map((editor)=>(
                          <div key={editor.userName} className="flex items-center justify-start gap-2 mt-3">
                          <img 
                            src={editor && editor.profilePicture}
                            alt={editor && editor.userName}
                            className='w-8 h-8 rounded-full object-cover bg-gray-200'
                            />
                          <p className='uppercase text-sm font-bold'>{editor && editor.userName}</p></div>
                        ))
                      )
                    }
                </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
