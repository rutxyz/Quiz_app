import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz';
import FullScreenPrompt from './components/FullScreenPrompt';
import './index.css';

const App = () => {
  const [isFullScreen, setIsFullScreen] = useState(
    document.fullscreenElement != null
  );

  const handleFullScreenChange = () => {
    setIsFullScreen(document.fullscreenElement != null);
    if (!document.fullscreenElement) {
      alert(
        'You have exited full-screen mode. Please return to full-screen mode to continue the quiz.'
      );
    }
  };

  const handleEnableFullScreen = () => {
    document.documentElement.requestFullscreen();
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  if (!isFullScreen) {
    return <FullScreenPrompt onEnableFullScreen={handleEnableFullScreen} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Quiz />
    </div>
  );
};

export default App;
