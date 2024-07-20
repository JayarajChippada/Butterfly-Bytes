import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DashPosts, DashProfile, DashSidebar } from '../components';

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl) {
      setTab(tabFromUrl);
    }
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row '>
      {/* Sidebar */}
      <div className="md:w-56">
        <DashSidebar tab={tab}/>
      </div>

      {/* Profile */}
      <div className="h-full max-w-lg mx-auto p-3 w-full">
        {tab === 'profile' && <DashProfile /> }
      </div>

      {/* Posts */}
      <div className="h-full max-w-lg mx-auto p-3 w-full">
        {tab === 'posts' && <DashPosts /> }
      </div>
    </div>
  )
}

export default Dashboard
