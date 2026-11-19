
import React, { useState, useEffect, useRef } from "react";

function App() {
  // Store timer value in milliseconds
  const [time, setTime] = useState(0);

  // Store all recorded lap times
  const [laps, setLaps] = useState([]);

  // Store interval ID
  const intervalRef = useRef(null);

  // Start Timer
  const handleStart = () => {
    // Prevent multiple intervals
    if (intervalRef.current !== null) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  };

  // Stop Timer
  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Record Lap
  const handleLap = () => {
    if (intervalRef.current === null) {
      return;
    }

    setLaps((prevLaps) => [...prevLaps, time]);
  };

  // Reset Timer
  const handleReset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setTime(0);
    setLaps([]);
  };

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  // Format time into MM:SS:CC
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0") +
      ":" +
      String(centiseconds).padStart(2, "0")
    );
  };

  return (
    <div>
      <h1>Lap Timer</h1>

      <h2>{formatTime(time)}</h2>

      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleLap}>Lap</button>
      <button onClick={handleReset}>Reset</button>

      <h3>Recorded Laps</h3>

      <ul>
        {laps.map((lap, index) => (
          <li key={index}>
            Lap {index + 1}: {formatTime(lap)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
