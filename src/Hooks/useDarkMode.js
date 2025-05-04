import { useState, useEffect } from 'react';

const useDarkMode = () => {
  // Initialize dark mode state based on localStorage or default to false
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to sync dark mode state with the localStorage and document
  useEffect(() => {
    const savedMode = localStorage.getItem('theme') === 'dark';
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode and update localStorage
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;