import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./page.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { GrLocation } from "react-icons/gr";
import { Line, Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

// Register the necessary components for the line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  BarElement
);

const MatchInfo = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState({});
  const [chartData, setChartData] = useState({});
  const [chartData2, setChartData2] = useState({});
  const [testMatch, setTestMatch] = useState({});
  const [players, setPlayers] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/match/${id}`)
      .then((response) => {
        setMatch(response.data);
        const data = response.data;

        if (data) {
          const first_team_first_innings_overs =
            data.graph.first_team_first_innings_overs;
          const first_team_first_innings_runs =
            data.graph.first_team_first_innings_runs;
          const second_team_first_innings_runs =
            data.graph.second_team_first_innings_runs;
          const first_team_second_innings_runs =
            data.graph.first_team_second_innings_runs;
          const second_team_second_innings_runs =
            data.graph.second_team_second_innings_runs;

          const runrate = data.graph.first_team_run_rate;
          const runratee = data.graph.second_team_run_rate;

          // Set the chart data
          setChartData({
            labels: first_team_first_innings_overs,
            datasets: [
              {
                label: response.data.match.first_team.code,
                data: first_team_first_innings_runs,
                pointRadius: 0,
                borderColor: "#334054",
              },
              {
                label: response.data.match.second_team.code,
                data: second_team_first_innings_runs,
                borderColor: "#93A2B7",
                borderWidth: 2,
                pointRadius: 0,
              },
            ],
          });
          const overs = Array.from({ length: 100 }, (_, index) => index + 1);
          setTestMatch({
            labels: overs,
            datasets: [
              {
                label: response.data.match.first_team.code + " (1st Innings)",
                data: first_team_first_innings_runs,
                pointRadius: 0,
                borderColor: "#334054",
              },
              {
                label: response.data.match.second_team.code + " (1st Innings)",
                data: second_team_first_innings_runs,
                borderColor: "#93A2B7",
                borderWidth: 2,
                pointRadius: 0,
              },
              {
                label: response.data.match.first_team.code + " (2nd Innings)",
                data: first_team_second_innings_runs, // First team's second innings runs
                pointRadius: 0,
                borderColor: "#FF6347", // Different color for the second innings
                borderWidth: 2,
              },
              {
                label: response.data.match.second_team.code + " (2nd Innings)",
                data: second_team_second_innings_runs, // Second team's second innings runs
                pointRadius: 0,
                borderColor: "#4682B4", // Another color for the second innings
                borderWidth: 2,
              },
            ],
          });
          setChartData2({
            labels: first_team_first_innings_overs,
            datasets: [
              {
                label: response.data.match.first_team.code,
                data: runrate,
              },
              {
                label: response.data.match.second_team.code,
                data: runratee,
              },
            ],
          });
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <div>
      <div className="full bg-[#F2F3F4]">
        <div className="match">
          <div
            style={{ marginLeft: 30 }}
            className="text-3xl fon font-semibold"
          >
            <p className="text-lg text-slate-700 flex items-center">
              <SlCalender />
              <p className="ml-1">{match?.match?.dates[0]?.date}</p>
            </p>
            <p className="text-xl flex items-center fonn text-slate-700 ">
              <GrLocation /> <p className="ml-1">{match?.match?.venue}</p>
            </p>
          </div>
          <div className="w-[740px] -mx-10">
            <p className="text-3xl fon font-semibold underline mt-5 ml-4">
              Graphs
            </p>
            <div>
              <div className="mb-10">
                {match?.match?.match_type === "T20" && (
                  <>
                    <div>
                      {chartData.labels ? (
                        <Line
                          data={chartData}
                          options={{
                            responsive: true, // Ensure the chart is responsive
                            maintainAspectRatio: true, // Maintain aspect ratio
                            scales: {
                              x: {
                                grid: {
                                  display: false, // Hide grid lines on the x-axis
                                },
                                title: {
                                  display: true, // Display title for x-axis
                                  text: "Overs", // Custom label for x-axis
                                  font: {
                                    size: 16, // Set font size
                                  },
                                },
                              },
                              y: {
                                beginAtZero: true, // Y-axis starts at 0
                                title: {
                                  display: true, // Display title for y-axis
                                  text: "Runs Per Over", // Custom label for y-axis
                                  font: {
                                    size: 16, // Set font size
                                  },
                                },
                              },
                            },
                          }}
                        />
                      ) : (
                        <p>...Loading Graph</p>
                      )}
                    </div>
                    <div>
                      {chartData2.labels ? (
                        <Bar
                          data={{
                            ...chartData2,
                            datasets: [
                              {
                                ...chartData2.datasets[0],
                                backgroundColor: "#334054", // Custom color for dataset 1
                                barThickness: 15, // Set bar thickness
                              },
                              {
                                ...chartData2.datasets[1],
                                backgroundColor: "#93A2B7", // Custom color for dataset 2
                                barThickness: 15, // Set bar thickness
                              },
                            ],
                          }}
                          options={{
                            responsive: true, // Ensure the chart is responsive
                            maintainAspectRatio: true, // Maintain aspect ratio
                            scales: {
                              x: {
                                grid: {
                                  display: false, // Hide grid lines on the x-axis
                                },
                                title: {
                                  display: true, // Display title for x-axis
                                  text: "Overs", // Custom label for x-axis
                                  font: {
                                    size: 16, // Set font size
                                  },
                                },
                              },
                              y: {
                                beginAtZero: true, // Y-axis starts at 0
                                title: {
                                  display: true, // Display title for y-axis
                                  text: "Run rate", // Custom label for y-axis
                                  font: {
                                    size: 16, // Set font size
                                  },
                                },
                              },
                            },
                          }}
                        />
                      ) : (
                        <p>Loading chart...</p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {match?.match?.match_type === "Test" ? (
                <div>
                  {testMatch.labels ? (
                    <Line
                      data={testMatch}
                      options={{
                        responsive: true, // Ensure the chart is responsive
                        maintainAspectRatio: true, // Maintain aspect ratio
                        scales: {
                          x: {
                            grid: {
                              display: false, // Hide grid lines on the x-axis
                            },
                            title: {
                              display: true, // Display title for x-axis
                              text: "Overs", // Custom label for x-axis
                              font: {
                                size: 16, // Set font size
                              },
                            },
                          },
                          y: {
                            beginAtZero: true, // Y-axis starts at 0
                            title: {
                              display: true, // Display title for y-axis
                              text: "Runs Per Over", // Custom label for y-axis
                              font: {
                                size: 16, // Set font size
                              },
                            },
                          },
                        },
                      }}
                    />
                  ) : (
                    <p>Loading chart...</p>
                  )}
                </div>
              ) : (
                " "
              )}
            </div>
          </div>

          <div className="seriesinfo rounded-[30px] -ml-1 shadow-[0_10px_25px_rgba(0,0,0,0.1)] border-2 my-4">
            <p className="text-2xl font-semibold fon underline mb-3">Umpires</p>
            <div className="mb-1">
              <p className="font-semibold">On-field Umpire</p>
              <p>{match?.match_info?.officials?.On_field_Umpire}</p>
            </div>
            <div className="mb-1">
              <p className="font-semibold">Third Umpire</p>
              <p>{match?.match_info?.officials?.Third_Umpire}</p>
            </div>
            <div className="mb-1">
              <p className="font-semibold">Referee</p>
              <p>{match?.match_info?.officials?.Referee}</p>
            </div>
          </div>
        </div>
        <div className="Keystats bg-slate-400 mt-4 rounded-[20px] shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
          <h1 className="text-3xl font-semibold underline fon">Players</h1>
          <div>
            <button
              onClick={() => setPlayers(!players)}
              className="border-2 border-slate-700 ml-6 mr-4 mt-3 rounded-[10px] p-1"
            >
              {match?.match?.first_team?.code}
            </button>
            <button
              onClick={() => setPlayers(!players)}
              className="border-2 border-slate-700 rounded-[10px] p-1"
            >
              {match?.match?.second_team?.code}
            </button>
          </div>
          {players ? (
            <div className="grid grid-cols-2">
              {match?.players?.first_team?.map((player, index) => (
                <div
                  key={index}
                  className="mostt w-fit mt-5 p-4 bg-white cursor-pointer text-slate-700 shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
                >
                  <a
                    href={`/player/${encodeURIComponent(player)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 w-52 fon font-semibold h-10 rounded-xl flex items-center justify-center cursor-pointer"
                  >
                    {player}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 ml-11">
              {match?.players?.second_team.map((player, index) => (
                <div
                  key={index}
                  className="mostt w-fit mt-5 p-4 cursor-pointer bg-white text-slate-700 shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
                >
                  <a
                    href={`/player/${encodeURIComponent(player)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 w-52 fon font-semibold h-10 rounded-xl flex items-center justify-center cursor-pointer"
                  >
                    {player}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default MatchInfo;
