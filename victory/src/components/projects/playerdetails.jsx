import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';  // Import Chart components
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import './PlayerDetails.css'; // Updated custom CSS

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

function PlayerDetails() {
    console.log("PlayerDetails component loaded");
    const { name } = useParams();
    const [player, setPlayer] = useState(null);
    const [activeTab, setActiveTab] = useState('Overview'); // Tabs state
    const [batting, setBatting] = useState(true); // Batting/Bowling switch state
    // const [matches, setMatches] = useState('ODI'); // Matches state

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                console.log(`Fetching player details for: ${name}`);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/player/${name}`);
                // const playerData = response.data.find(p => p.player_name.toLowerCase() === name.toLowerCase());
                setPlayer(response.data);
                console.log("playerdetails", playerData)
            } catch (error) {
                console.error('Error fetching player details:', error);
            }
        };

        fetchPlayer();
    }, [name]);

    console.log(name)

    if (!player) {
        return (
            <div class="player-not-found">
                <div class="icon-container" aria-hidden="true">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="120"
                        height="120"
                        viewBox="0 0 64 64"
                        fill="none"
                        stroke="#94A3B8"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="magnify-icon"
                    >
                        <circle cx="27" cy="27" r="16" />
                        <line x1="41" y1="41" x2="58" y2="58" />
                    </svg>
                </div>
                <h2>Oops! Player Not Found</h2>
                <p>We couldn't locate the player you’re searching for. Please try again later.</p>
                {/* <button class="btn-back" onclick="window.history.back()">Go Back</button> */}
            </div>

        )
    }

    // Prepare data for Batting Statistics chart
    const battingData = {
        labels: player.formats.map(format => format.format), // Formats like ODI, T20, etc.
        datasets: [
            {
                label: 'Runs',
                data: player.formats.map(format => format.batting.runs),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Centuries',
                data: player.formats.map(format => format.batting.centuries),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
            {
                label: 'Fifties',
                data: player.formats.map(format => format.batting.fifties),
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            }
        ],
    };

    // Prepare data for Bowling Statistics chart
    const bowlingData = {
        labels: player.formats.map(format => format.format),
        datasets: [
            {
                label: 'Wickets',
                data: player.formats.map(format => format.bowling.wickets),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Economy',
                data: player.formats.map(format => format.bowling.economy),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };


    const chartOptions = {
        maintainAspectRatio: false, // Allows custom sizing
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                min: 0,            // Minimum value on Y-axis
                max: 150,          // Maximum value on Y-axis
                ticks: {
                    stepSize: 20,    // Steps between Y-axis values
                },
            },
            x: {
                ticks: {
                    autoSkip: false, // Don't skip labels automatically
                    maxRotation: 90, // Rotation of X-axis labels
                    minRotation: 0,  // Minimum rotation for X-axis labels
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    const chartStyle = { height: '450px', width: '800px' }; // Custom chart size

    return (
        <div className="player-page">
            {/* Player Header */}
            <div className="player-header">
                <div className="player-photo-container">
                    <img
                        src={player.player_photo}
                        alt={player.player_name}
                        className="player-photo"
                    />
                </div>
                <div className="player-summary">
                    <h1>{player.player_name}</h1>
                    <p className="player-country">{player.country} • {player.age} yrs • {player.type}</p>
                    <p className="player-title">{player.title}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs">
                <button className={activeTab === 'Overview' ? 'active' : ''} onClick={() => setActiveTab('Overview')}>
                    Overview
                </button>
                {/* <button className={activeTab === 'Matches' ? 'active' : ''} onClick={() => setActiveTab('Matches')}>
          Matches
        </button> */}
                <button className={activeTab === 'Statistics' ? 'active' : ''} onClick={() => setActiveTab('Statistics')}>
                    Statistics
                </button>
                {/* <button className={activeTab === 'Player Info' ? 'active' : ''} onClick={() => setActiveTab('Player Info')}>
          Player Info
        </button> */}
            </div>

            <div className="content-area">
                {/* Main Content Area */}
                <div className="stats-container">
                    {activeTab === 'Overview' && (
                        <>
                            <h2>Career & Stats</h2>
                            <div className="recent-form">
                                <h3>Overview of Player</h3>
                                <div className='bat_ball_switch'>
                                    <button onClick={() => setBatting(true)}>Batting</button>
                                    <button onClick={() => setBatting(false)}>Bowling</button>
                                </div>
                                {
                                    batting ? (
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
                                                    <th>Strike Rate</th>
                                                    <th>Average</th>
                                                    <th>Fours</th>
                                                    <th>Sixes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {player.formats.map((format, index) => (
                                                    <tr key={index}>
                                                        <td>{format.format}</td>
                                                        <td>{format.batting.matches}</td>
                                                        <td>{format.batting.innings}</td>
                                                        <td>{format.batting.runs}</td>
                                                        <td>{format.batting.centuries}</td>
                                                        <td>{format.batting.fifties}</td>
                                                        <td>{format.batting.highest_score}</td>
                                                        <td>{format.batting.strike_rate}</td>
                                                        <td>{format.batting.average}</td>
                                                        <td>{format.batting.fours}</td>
                                                        <td>{format.batting.sixes}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Format</th>
                                                    <th>Matches</th>
                                                    <th>Innings</th>
                                                    <th>Wickets</th>
                                                    <th>Economy</th>
                                                    <th>Average</th>
                                                    <th>Best</th>
                                                    <th>Strike Rate</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {player.formats.map((format, index) => (
                                                    <tr key={index}>
                                                        <td>{format.format}</td>
                                                        <td>{format.bowling.matches}</td>
                                                        <td>{format.bowling.innings}</td>
                                                        <td>{format.bowling.wickets}</td>
                                                        <td>{format.bowling.economy}</td>
                                                        <td>{format.bowling.average}</td>
                                                        <td>{format.bowling.best}</td>
                                                        <td>{format.bowling.strike_rate}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )
                                }
                            </div>
                        </>
                    )}


                    {/* Statistics Tab */}
                    {activeTab === 'Statistics' && (
                        <div className="statistics-tab">

                            <div className='bat_ball_switch'>
                                <button onClick={() => setBatting(true)}>Batting</button>
                                <button onClick={() => setBatting(false)}>Bowling</button>
                            </div>
                            {
                                batting ? (
                                    <>
                                        <h2>Batting Statistics</h2>
                                        <div style={chartStyle}>
                                            <Bar data={battingData} options={chartOptions} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2>Bowling Statistics</h2>
                                        <div style={chartStyle}>
                                            <Line data={bowlingData} options={chartOptions} />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PlayerDetails;