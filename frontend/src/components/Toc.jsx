import React from 'react';

const Toc = ({ headings }) => {
  const handleClick = (id) => {
    // Find the element by its ID and scroll into view
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="toc">
      <h2>Table of Contents</h2>
      <ul>
        {headings.map((heading, index) => (
          <li key={index}>
            {heading.text}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Toc;
