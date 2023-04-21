import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom"
import HomePage from '../HomePage'
import Game from '../Game'
import axios from 'axios'
import MLBStatsAPI from "mlb-stats-api";

console.log(typeof(MLBStatsAPI))


export default function App() {
    
    const [schedule, setSchedule] = useState([]);
    const [game, setGame] = useState({});

    async function getSchedule() {
        const response = await axios.get('https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1')
        setSchedule(response.data)
    }
    
      
      useEffect(() => {
        getSchedule()
        }, [])


    
      let scheduleElement = <p> Loading... </p>
        if (schedule.dates) {
            console.log(schedule.dates[0].games)
            scheduleElement = schedule.dates[0].games.map((game) => {
                return (
                    <div>
                        <Link to="/game" onClick={() => setGame(game)}>{game.teams.away.team.name} @ {game.teams.home.team.name}</Link>
                    </div>
                )
            })
        }

        
    return (
        <>
            {schedule.dates && scheduleElement}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game" element={<Game gameData={game}/>} />
            
                
            </Routes>
        </>
    );

    }