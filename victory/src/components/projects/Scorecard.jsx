import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ScoreCard = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(true);
  const [team2, setTeam2] = useState(true);
  const [scoreCard, setScoreCard] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:7000/scorecard/${id}`)
      .then((res) => {
        console.log(res.data);
        setScoreCard(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="bg-[#F2F3F4] pb-10">
      <button
        className="border-2 border-slate-700 fonn p-[2px] mt-10 ml-20 text-lg text-slate-700 rounded-md"
        onClick={() => setTeam(!team)}
      >
        {team
          ? scoreCard?.match?.first_team?.code + " 1st Innings"
          : scoreCard?.match?.second_team?.code +
              scoreCard?.match?.match_type ===
            "T20"
          ? "2nd innings"
          : scoreCard?.match?.second_team?.code + " 1st Innings"}
      </button>
      <p className="fon font-bold mt-10 ml-20 text-2xl">BATTING</p>
      {team ? (
        <>
          <table className="min-w-[1100px] fon shadow-[0_10px_25px_rgba(0,0,0,0.1)] bg-white mt-3 ml-20 border text-start border-gray-200">
            <thead>
              <tr className="bg-slate-700 text-[#F2F3F4]">
                <th className="py-1 px-4 border-b text-left">Batter</th>
                <th className="py-1 px-4 border-b text-left">How_Out</th>
                <th className="py-1 px-4 border-b text-left">R</th>
                <th className="py-1 px-4 border-b text-left">B</th>
                <th className="py-1 px-4 border-b text-left">4s</th>
                <th className="py-1 px-4 border-b text-left">6s</th>
                <th className="py-1 px-4 border-b text-left">SR</th>
              </tr>
            </thead>
            <tbody>
              {scoreCard?.match_info?.scorecard[0]?.batting.map(
                (format, index) => (
                  <>
                    <tr
                      key={index}
                      className={`odd:bg-gray-100 even:bg-gray-200`}
                    >
                      <td className="py-1 px-4 border-b">
                        {format.player_name}
                      </td>
                      <td className="py-1 px-4 border-b">{format.how_out}</td>
                      <td className="py-1 px-4 border-b">{format.runs}</td>
                      <td className="py-1 px-4 border-b">{format.balls}</td>
                      <td className="py-1 px-4 border-b">{format.fours}</td>
                      <td className="py-1 px-4 border-b">{format.sixes}</td>
                      <td className="py-1 px-4 border-b">
                        {format.strike_rate}
                      </td>
                    </tr>
                  </>
                )
              )}
                <td className="py-1 px-4 underline bg-gray-200 border-b text-right" colSpan={7}>
                  Extras: {scoreCard?.match_info?.scorecard[0].extras}
                  {scoreCard?.match_info?.scorecard[0].extras_detail}
                </td>
            </tbody>
          </table>
          <p className="fon font-bold mt-10 ml-20 text-2xl">BOWLING</p>
          <table className="min-w-[1100px] fon shadow-[0_10px_25px_rgba(0,0,0,0.1)] text-start ml-20 bg-white border border-gray-200 mt-4">
            <thead>
              <tr className="bg-slate-700 text-[#F2F3F4]">
                <th className="py-1 px-4 border-b text-left">Bowler</th>
                <th className="py-1 px-4 border-b text-left">O</th>
                <th className="py-1 px-4 border-b text-left">M</th>
                <th className="py-1 px-4 border-b text-left">R</th>
                <th className="py-1 px-4 border-b text-left">W</th>
                <th className="py-1 px-4 border-b text-left">ER</th>
              </tr>
            </thead>
            <tbody>
              {scoreCard?.match_info?.scorecard[0]?.bowling.map(
                (format, index) => (
                  <tr
                    key={index}
                    className={`odd:bg-gray-100 even:bg-gray-200`}
                  >
                    <td className="py-1 px-4 border-b">{format.player_name}</td>
                    <td className="py-1 px-4 border-b">{format.overs}</td>
                    <td className="py-1 px-4 border-b">{format.maidens}</td>
                    <td className="py-1 px-4 border-b">
                      {format.runs_conceded}
                    </td>
                    <td className="py-1 px-4 border-b">{format.wickets}</td>
                    <td className="py-1 px-4 border-b">{format.economy}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <table className="min-w-[1100px] text-start ml-20 fon shadow-[0_10px_25px_rgba(0,0,0,0.1)] bg-white border border-gray-200">
            <thead>
              <tr className="bg-slate-700 text-[#F2F3F4]">
                <th className="py-1 px-4 border-b text-left">Batter</th>
                <th className="py-1 px-4 border-b text-left">How_Out</th>
                <th className="py-1 px-4 border-b text-left">R</th>
                <th className="py-1 px-4 border-b text-left">B</th>
                <th className="py-1 px-4 border-b text-left">4s</th>
                <th className="py-1 px-4 border-b text-left">6s</th>
                <th className="py-1 px-4 border-b text-left">SR</th>
              </tr>
            </thead>
            <tbody>
              {scoreCard?.match_info?.scorecard[1]?.batting.map(
                (format, index) => (
                  <tr
                    key={index}
                    className={`odd:bg-gray-100 even:bg-gray-200`}
                  >
                    <td className="py-1 px-4 border-b">{format.player_name}</td>
                    <td className="py-1 px-4 border-b">{format.how_out}</td>
                    <td className="py-1 px-4 border-b">{format.runs}</td>
                    <td className="py-1 px-4 border-b">{format.balls}</td>
                    <td className="py-1 px-4 border-b">{format.fours}</td>
                    <td className="py-1 px-4 border-b">{format.sixes}</td>
                    <td className="py-1 px-4 border-b">{format.strike_rate}</td>
                  </tr>
                )
              )}
              <td className="py-1 px-4 underline bg-gray-200 border-b text-right" colSpan={7}>
                  Extras: {scoreCard?.match_info?.scorecard[1].extras}
                  {scoreCard?.match_info?.scorecard[1].extras_detail}
                </td>
            </tbody>
          </table>
          <p className="fon font-bold mt-10 ml-20 text-2xl">BOWLING</p>
          <table className="min-w-[1100PX] fon shadow-[0_10px_25px_rgba(0,0,0,0.1)] text-start ml-20 bg-white border border-gray-200 mt-4">
            <thead>
              <tr className="bg-slate-700 text-[#F2F3F4]">
                <th className="py-1 px-4 border-b text-left">Bowler</th>
                <th className="py-1 px-4 border-b text-left">O</th>
                <th className="py-1 px-4 border-b text-left">M</th>
                <th className="py-1 px-4 border-b text-left">R</th>
                <th className="py-1 px-4 border-b text-left">W</th>
                <th className="py-1 px-4 border-b text-left">ER</th>
              </tr>
            </thead>
            <tbody>
              {scoreCard?.match_info?.scorecard[1]?.bowling.map(
                (format, index) => (
                  <tr
                    key={index}
                    className={`odd:bg-gray-100 even:bg-gray-200`}
                  >
                    <td className="py-1 px-4 border-b">{format.player_name}</td>
                    <td className="py-1 px-4 border-b">{format.overs}</td>
                    <td className="py-1 px-4 border-b">{format.maidens}</td>
                    <td className="py-1 px-4 border-b">
                      {format.runs_conceded}
                    </td>
                    <td className="py-1 px-4 border-b">{format.wickets}</td>
                    <td className="py-1 px-4 border-b">{format.economy}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </>
      )}
      {scoreCard?.match?.match_type === "Test" && (
        <>
          <button
            className="border-2 border-slate-700 fonn p-[2px] mt-10 ml-20 text-lg text-slate-700 rounded-md"
            onClick={() => setTeam2(!team2)}
          >
            {team2
              ? scoreCard?.match?.first_team?.code + " 2nd Innings"
              : scoreCard?.match?.second_team?.code + " 2nd Innings"}
          </button>
          <p className="fon font-bold mt-10 ml-20 text-2xl">BATTING</p>
          {team2 ? (
            <>
              <table className="min-w-[1100px] fon shadow-[0_10px_25px_rgba(0,0,0,0.1)] bg-white mt-3 ml-20 border text-start border-gray-200">
                <thead>
                  <tr className="bg-slate-700 text-[#F2F3F4]">
                    <th className="py-1 px-4 border-b text-left">Batter</th>
                    <th className="py-1 px-4 border-b text-left">How_Out</th>
                    <th className="py-1 px-4 border-b text-left">R</th>
                    <th className="py-1 px-4 border-b text-left">B</th>
                    <th className="py-1 px-4 border-b text-left">4s</th>
                    <th className="py-1 px-4 border-b text-left">6s</th>
                    <th className="py-1 px-4 border-b text-left">SR</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreCard?.match_info?.scorecard[2]?.batting.map(
                    (format, index) => (
                      <tr
                        key={index}
                        className={`odd:bg-gray-100 even:bg-gray-200`}
                      >
                        <td className="py-1 px-4 border-b">
                          {format.player_name}
                        </td>
                        <td className="py-1 px-4 border-b">{format.how_out}</td>
                        <td className="py-1 px-4 border-b">{format.runs}</td>
                        <td className="py-1 px-4 border-b">{format.balls}</td>
                        <td className="py-1 px-4 border-b">{format.fours}</td>
                        <td className="py-1 px-4 border-b">{format.sixes}</td>
                        <td className="py-1 px-4 border-b">
                          {format.strike_rate}
                        </td>
                      </tr>
                    )
                  )}
                  <td className="py-1 px-4 underline bg-gray-200 border-b text-right" colSpan={7}>
                  Extras: {scoreCard?.match_info?.scorecard[2].extras}
                  {scoreCard?.match_info?.scorecard[2].extras_detail}
                </td>
                </tbody>
              </table>
              <p className="fon font-bold mt-10 ml-20 text-2xl">BOWLING</p>
              <table className="min-w-[1100px] fon shadow-[0_10px_25px_rgba(0,0,0,0.1)] text-start ml-20 bg-white border border-gray-200 mt-4">
                <thead>
                  <tr className="bg-slate-700 text-[#F2F3F4]">
                    <th className="py-1 px-4 border-b text-left">Bowler</th>
                    <th className="py-1 px-4 border-b text-left">O</th>
                    <th className="py-1 px-4 border-b text-left">M</th>
                    <th className="py-1 px-4 border-b text-left">R</th>
                    <th className="py-1 px-4 border-b text-left">W</th>
                    <th className="py-1 px-4 border-b text-left">ER</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreCard?.match_info?.scorecard[2]?.bowling.map(
                    (format, index) => (
                      <tr
                        key={index}
                        className={`odd:bg-gray-100 even:bg-gray-200`}
                      >
                        <td className="py-1 px-4 border-b">
                          {format.player_name}
                        </td>
                        <td className="py-1 px-4 border-b">{format.overs}</td>
                        <td className="py-1 px-4 border-b">{format.maidens}</td>
                        <td className="py-1 px-4 border-b">
                          {format.runs_conceded}
                        </td>
                        <td className="py-1 px-4 border-b">{format.wickets}</td>
                        <td className="py-1 px-4 border-b">{format.economy}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <>
              <table className="min-w-[1100px] text-start ml-20 fon shadow-[0_10px_25px_rgba(0,0,0,0.1)] bg-white border border-gray-200">
                <thead>
                  <tr className="bg-slate-700 text-[#F2F3F4]">
                    <th className="py-1 px-4 border-b text-left">Batter</th>
                    <th className="py-1 px-4 border-b text-left">How_Out</th>
                    <th className="py-1 px-4 border-b text-left">R</th>
                    <th className="py-1 px-4 border-b text-left">B</th>
                    <th className="py-1 px-4 border-b text-left">4s</th>
                    <th className="py-1 px-4 border-b text-left">6s</th>
                    <th className="py-1 px-4 border-b text-left">SR</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreCard?.match_info?.scorecard[3]?.batting.map(
                    (format, index) => (
                      <tr
                        key={index}
                        className={`odd:bg-gray-100 even:bg-gray-200`}
                      >
                        <td className="py-1 px-4 border-b">
                          {format.player_name}
                        </td>
                        <td className="py-1 px-4 border-b">{format.how_out}</td>
                        <td className="py-1 px-4 border-b">{format.runs}</td>
                        <td className="py-1 px-4 border-b">{format.balls}</td>
                        <td className="py-1 px-4 border-b">{format.fours}</td>
                        <td className="py-1 px-4 border-b">{format.sixes}</td>
                        <td className="py-1 px-4 border-b">
                          {format.strike_rate}
                        </td>
                      </tr>
                    )
                  )}
                  <td className="py-1 px-4 underline bg-gray-200 border-b text-right" colSpan={7}>
                  Extras: {scoreCard?.match_info?.scorecard[3].extras}
                  {scoreCard?.match_info?.scorecard[3].extras_detail}
                </td>
                </tbody>
              </table>
              <p className="fon font-bold mt-10 ml-20 text-2xl">BOWLING</p>
              <table className="min-w-[1100PX] fon shadow-[0_10px_25px_rgba(0,0,0,0.1)] text-start ml-20 bg-white border border-gray-200 mt-4">
                <thead>
                  <tr className="bg-slate-700 text-[#F2F3F4]">
                    <th className="py-1 px-4 border-b text-left">Bowler</th>
                    <th className="py-1 px-4 border-b text-left">O</th>
                    <th className="py-1 px-4 border-b text-left">M</th>
                    <th className="py-1 px-4 border-b text-left">R</th>
                    <th className="py-1 px-4 border-b text-left">W</th>
                    <th className="py-1 px-4 border-b text-left">ER</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreCard?.match_info?.scorecard[3]?.bowling.map(
                    (format, index) => (
                      <tr
                        key={index}
                        className={`odd:bg-gray-100 even:bg-gray-200`}
                      >
                        <td className="py-1 px-4 border-b">
                          {format.player_name}
                        </td>
                        <td className="py-1 px-4 border-b">{format.overs}</td>
                        <td className="py-1 px-4 border-b">{format.maidens}</td>
                        <td className="py-1 px-4 border-b">
                          {format.runs_conceded}
                        </td>
                        <td className="py-1 px-4 border-b">{format.wickets}</td>
                        <td className="py-1 px-4 border-b">{format.economy}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ScoreCard;
