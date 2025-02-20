import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const LiveScore = () => {
  const [firstTeamScore, setFirstTeamScore] = useState(0);
  const [secondTeamScore, setSecondTeamScore] = useState(0);

  useEffect(() => {
    const socket = io('http://localhost:7000');

    // Listen for score updates from the server
    socket.on('scoreUpdate', (data) => {
      console.log("Real-time score update:", data);
      setFirstTeamScore(data.firstTeamScore);
      setSecondTeamScore(data.secondTeamScore);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div id="scoreboard">
      <div id="first-team-score">First Team Score: {firstTeamScore}</div>
      <div id="second-team-score">Second Team Score: {secondTeamScore}</div>
    </div>
  );
};

export default LiveScore;
