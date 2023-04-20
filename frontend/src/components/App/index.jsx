import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom"
import HomePage from '../HomePage'
import MLBStatsAPI from 'mlb-stats-api'



export default function App() {
    const [stats, setStats] = useState({});
    const mlb = new MLBStatsAPI();

    async function getStats() {
        const  response = await fetch('https://statsapi.mlb.com/api/v1/schedule/?sportId=1')
        const data = await response.json()
        return data
      }
      
      useEffect(() => {
        getStats().then(data => setStats(data));
      }, []);
      console.log(stats)
      let schedule = <p> Loading... </p>
        if (stats.dates) {
            schedule = stats.dates.map((date) => {
                return (
                    <div>
                        <h1>{date.date}</h1>
                        <ul>
                            {date.games.map((game) => {
                                return (
                                    <li>
                                        <Link to={`/game/${game.gamePk}`}>{game.teams.home.team.name} vs {game.teams.away.team.name}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })
        }
    return (
        <>
            {stats.dates && schedule}
            <Routes>
                <Route path="/" element={<HomePage />} />
                
            </Routes>
        </>
    );
}
