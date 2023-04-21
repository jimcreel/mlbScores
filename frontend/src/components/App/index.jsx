import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom"
import HomePage from '../HomePage'
import Game from '../Game'
import axios from 'axios'
import MLBStatsAPI from "mlb-stats-api";
import Ticker from '../Ticker'




export default function App() {
    
    const [currentGame, setCurrentGame] = useState({});
    const [schedule, setSchedule] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    async function getSchedule() {
        const response = await axios.get(`https://statsapi.mlb.com/api/v1/schedule/?sportId=1`)
        setSchedule(response.data)
    }
    
    
    useEffect(() => {
        const today = new Date();
        today.setDate(today.getDate());

        setCurrentDate(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
        getSchedule()
        
        }, [])


    
        
        return (
            <>
            <Ticker schedule={schedule} setGame={setCurrentGame}/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game" element={<Game game={currentGame} />} />

            </Routes>

            </>
        )
    }