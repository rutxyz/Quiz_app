import React, { useState, useEffect } from 'react';
import questions from '../data/questions.json';
import Timer from './Timer';

const Quiz = () => {
  const savedQuestionIndex = parseInt(localStorage.getItem('quiz-question-index'), 10) || 0;
  const initialTime = parseInt(localStorage.getItem('quiz-time-left'), 10) || 600;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(savedQuestionIndex);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(document.fullscreenElement != null);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    localStorage.setItem('quiz-question-index', currentQuestionIndex);
  }, [currentQuestionIndex]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement != null);
      if (!document.fullscreenElement) {
        alert('You have exited full-screen mode. Please return to full-screen mode to continue the quiz.');
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setSelectedAnswer('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleTimeUp = () => {
    alert('Time is up! Submitting your quiz.');
    setIsQuizCompleted(true);
  };

  const handleCloseQuiz = () => {
    localStorage.removeItem('quiz-question-index');
    localStorage.removeItem('quiz-time-left');
    setShowThankYou(true); 
  };

  if (showThankYou) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Thank You!</h2>
        <p>Thank you for taking the quiz.</p>
      </div>
    );
  }

  if (isQuizCompleted) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Quiz Completed!</h2>
        <p>Your score is {score} out of {questions.length}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Correct Answers:</h3>
          <ul className="mb-4">
            {questions.map((question, index) => (
              <li key={index} className="mb-2">
                <p>
                  <strong>Question {index + 1}: </strong>{' '}
                  {question.options.find(option => option === question.answer)}
                </p>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCloseQuiz}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <Timer initialTime={initialTime} onTimeUp={handleTimeUp} />
      <h2 className="text-xl font-semibold mb-4">
        Question {currentQuestionIndex + 1} of {questions.length}
      </h2>
      <p className="text-lg mb-4">{currentQuestion.question}</p>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index} className="mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleAnswerSelection(option)}
                className="form-radio h-4 w-4"
              />
              <span>{option}</span>
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        disabled={!selectedAnswer}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default Quiz;
