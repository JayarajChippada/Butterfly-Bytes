import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DashProfile, DashSidebar, DashPosts } from '../components';

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Sidebar */}
      <div className="md:w-56">
        <DashSidebar tab={tab} />
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-x-auto flex justify-center items-start p-3">
        {tab === 'profile' && <DashProfile />}
        {tab === 'posts' && <DashPosts />}
      </div>
      
    </div>
  );
}

export default Dashboard;
