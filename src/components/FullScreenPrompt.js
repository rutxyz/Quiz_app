import React from 'react';

const FullScreenPrompt = ({ onEnableFullScreen }) => {
  const handleEnableFullScreen = () => {
    onEnableFullScreen();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-violet-200 to-blue-400">
      <h1 className="text-3xl font-semibold text-green-800 mb-8">Welcome to My Quiz</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <h1 className="text-2xl mb-4">Please enable full-screen mode to start the quiz.</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleEnableFullScreen}
        >
          Enable Full-Screen
        </button>
      </div>
    </div>
  );
};

export default FullScreenPrompt;
