import React from 'react';
import { useEffect, useState } from 'react';
import './StopWatch.css';

function StopWatch() {
  const [audio] = useState(new Audio('./sounds/alarm.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevValue) => prevValue + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startWatch = () => {
    if (isRunning === false) {
      setIsRunning(true);
      playAudio();
    }
  };

  const stopWatch = () => {
    setIsRunning(false);
    stopAudio();
  };

  const resetWatch = () => {
    setIsRunning(false);
    setTime(0);
    stopAudio();
  };

  function formatNumber(number) {
    return number.toString().padStart(2, '0');
  }

  const formatTime = (time) => {
    const getSeconds = formatNumber(time % 60);
    const minutes = Math.floor(time / 60);
    const getMinutes = formatNumber(minutes % 60);
    const hours = Math.floor(time / 3600);
    const getHours = formatNumber(hours);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const playAudio = () => {
    if (isPlaying === false) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (isPlaying === true) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <header className="header">
      <h1>StopWatch</h1>
      <div style={{ fontSize: '100px', marginBottom: '40px' }}>
        {formatTime(time)}
      </div>
      <div>
        <button className="button" onClick={stopWatch}>
          Stop
        </button>
        <button className="button" onClick={startWatch}>
          Start
        </button>
        <button className="button" onClick={resetWatch}>
          Reset
        </button>
      </div>
    </header>
  );
}

export default StopWatch;
