import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CommentSection, Toc } from '../components/index.js'; // Import the TOC component
import PostCard from '../components/PostCard.jsx';

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [user, setUser] = useState({});
  const [recentPosts, setRecentPosts] = useState(null);
  

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          setError(data.message);
        } else {
          setLoading(false);
          setError(null);
          setPost(data.posts[0]);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const getUser = async()=>{
      try{
        const res = await fetch(`/api/user/${post.userId}`);
        const data = await res.json();
        if(res.ok) {
          setUser(data);
        }
      } catch(error) {
        console.log(error.message)
      }
    }
    getUser();
    if (post) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, 'text/html');
      const headingsArray = [];

      let index = 1; // Start indexing from 1

      doc.querySelectorAll('h1, h2').forEach((tag) => {
        const id = tag.innerText.replace(/\s+/g, '-').toLowerCase();
        tag.id = id; // Set an id for the heading
        const headingText = `${index}. ${tag.innerText}`;
        headingsArray.push({ id, text: headingText });
        index++;
      });

      setHeadings(headingsArray);
    }
}, [post]);

  useEffect(()=>{
    try{
      const fetchRecentPosts = async() => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if(res.ok) {
          setRecentPosts(data.posts)
        }
      }
      fetchRecentPosts();
    } catch(error) {
      console.log(error.message)
    }
  },[])



  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-custom-dark">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );

  return (
    <main className=" flex flex-col max-w-6xl mx-auto min-h-screen bg-white dark:bg-custom-dark">
      <div className="max-w-full p-8 mb-8 bg-custom-purple text-white sm:p-14 lg:p-16">
        <div className="p-3 w-full flex flex-col gap-4">
          <div className="flex z-1 text-md font-semi-bold">
            <span className="mr-3">
              {post && new Date(post.createdAt).toLocaleDateString()}.
            </span>
            <span>
              {post && (post.content.length / 1000).toFixed(0)}mins read
            </span>
          </div>
          <h1 className="z-1 text-3xl sm:text-4xl lg:text-5xl font-bold  font-serif max-w-2xl">
            {post && post.title}
          </h1>
          <div className="flex flex-col items-start sm:flex-row sm:items-center  gap-3 sm:gap-4">
            <div className="flex items-center gap-4">
              <img src={user.profilePicture} alt={user.userName} className='w-10 h-10 object-cover bg-gray-100 rounded-full' />
              <p className="uppercase font-bold text-md hover:underline cursor-pointer">{user.userName}</p>
            </div>
            <Link to={`/search?category=${post && post.category}` } className='max-w-14 sm:ml-14'>
              <button
                type="button"
                className="z-1 uppercase text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                {post && post.category}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <aside className="hidden lg:block lg:w-1/4 lg:p-3">
          <Toc headings={headings} />
        </aside>
        <div className="flex flex-col w-full lg:w-3/4">
          {/* Image section */}
          {post && post.image && (
            <div className="w-[92%] mx-auto mb-4 object-cover">
              <img
                src={post.image}
                alt="Post illustration"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          {/* Content section */}
          <div
            className="p-3 max-w-2xl mx-auto w-full post-content"
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          ></div>

          {/* Comment Section */}
          <CommentSection postId={post && post._id} />
          <div className="flex flex-col items-center justify-center mb-5">
            <h1 className="text-xl mt-5">Recent articles</h1>
            <div className="">
              {
                recentPosts && recentPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostPage;
