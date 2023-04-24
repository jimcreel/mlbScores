import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom"
import GamePage from '../GamePage'
import axios from 'axios'
import MLBStatsAPI from "mlb-stats-api";
import Ticker from '../Ticker'
import Calendar from '../Calendar'
import Nav from '../Nav'




export default function App() {
    
    const [currentGame, setCurrentGame] = useState({});
    const [schedule, setSchedule] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    async function getSchedule(dateString) {
        // const response = await axios.get(`https://statsapi.mlb.com/api/v1/schedule/?sportId=1`)
        const response = await axios.get(`https://statsapi.mlb.com/api/v1/schedule/?sportId=1&date=${dateString}`)
        setSchedule(response.data)
        
    }
    
    
    useEffect(() => {
        
        let dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
        getSchedule(dateString)
        
        }, [currentDate])

        
    
        
        return (
            <>
            <Nav />
            <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
            <Ticker schedule={schedule} setGame={setCurrentGame}/>
            <Routes>
                <Route path="/" element={<Ticker schedule={schedule} setGame={setCurrentGame}/>} />
                <Route path="/game" element={<GamePage game = {currentGame} />} />

            </Routes>

            </>
        )
    }