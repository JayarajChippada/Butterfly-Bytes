import React from 'react';
import { useSelector } from 'react-redux';

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme}>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-[rgb(16, 23, 42)] text-gray-200' : 'bg-white text-gray-700'}`}>
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
