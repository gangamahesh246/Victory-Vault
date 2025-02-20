import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PlayerStats = () => {
  const { playerinfo } = useParams();
  const [player, setPlayer] = useState(null);
  const [stat, setStat] = useState([]); 
  const [bow, setBow] = useState(false); 

  useEffect(() => {
    axios.get(`http://localhost:7000/match/${playerinfo}`)
      .then(res => {
        setPlayer(res.data[0]); 
        setStat(res.data[0].formats); 
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (!player) return <div>Loading...</div>;

  return (
    <div>
      <h3>{player.player_name}</h3>
      <h3>{player.country}</h3>
      <div
      className='w-[150px] h-[150px] border-2 border-black rounded-[10px] bg-ore-700'>
      <Img
      src={player.player_photo}
      />
      </div>
      {
        bow ?
        <table>
          <thead>
            <tr>
              <th>Format</th>
              <th>Matches</th>
              <th>Innings</th>
              <th>Wickets</th>
              <th>Economy</th>
              <th>Average</th>
              <th>Best Bowling</th>
              <th>Strike Rate</th>
              <th>Maidens</th>
            </tr>
          </thead>
          <tbody>
            {
              stat.map((format, index) => (
                <tr key={index}>
                  <td>{format.format}</td>
                  <td>{format.bowling.matches}</td>
                  <td>{format.bowling.innings}</td>
                  <td>{format.bowling.wickets}</td>
                  <td>{format.bowling.economy}</td>
                  <td>{format.bowling.average}</td>
                  <td>{format.bowling.best}</td>
                  <td>{format.bowling.strike_rate}</td>
                  <td>{format.bowling.maiden}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        :
        <table>
          <thead>
            <tr>
              <th>Format</th>
              <th>Matches</th>
              <th>Innings</th>
              <th>Runs</th>
              <th>Centuries</th>
              <th>Fifties</th>
              <th>Highest Score</th>
              <th>Average</th>
              <th>Strike Rate</th>
              <th>Fours</th>
              <th>Sixes</th>
            </tr>
          </thead>
          <tbody>
            {
              stat.map((format, index) => (
                <tr key={index}>
                  <td>{format.format}</td>
                  <td>{format.batting.matches}</td>
                  <td>{format.batting.innings}</td>
                  <td>{format.batting.runs}</td>
                  <td>{format.batting.centuries}</td>
                  <td>{format.batting.fifties}</td>
                  <td>{format.batting.highest_score}</td>
                  <td>{format.batting.average}</td>
                  <td>{format.batting.strike_rate}</td>
                  <td>{format.batting.fours}</td>
                  <td>{format.batting.sixes}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      }

      <button
        className='border-2 border-black p-[2px] text-sm rounded-md'
        onClick={() => setBow(!bow)}
      >
        {bow ? "Show Batting" : "Show Bowling"}
      </button>
    </div>
  );
}

export default PlayerStats;
