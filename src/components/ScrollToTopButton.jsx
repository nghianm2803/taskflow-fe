import { Fab } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  //  handle scrolling to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // handle showing/hiding the button based on scroll position
  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      {showButton && (
        <Fab size='medium' color='info' onClick={scrollToTop}>
         <ExpandLessIcon />
        </Fab>
      )}
    </div>
  );
};

export default ScrollToTopButton;

