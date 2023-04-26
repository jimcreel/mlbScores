import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom"
import GamePage from '../GamePage'
import axios from 'axios'
import MLBStatsAPI from "mlb-stats-api";
import Ticker from '../Ticker'
import Calendar from '../Calendar'
import Nav from '../Nav'
import Home from '../Home'
import CommentSection from '../CommentSection'
import PlayerPage from '../PlayerPage'



export default function App() {
    
    const [currentGame, setCurrentGame] = useState({});
    const [schedule, setSchedule] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [gameOrPlayer, setGameOrPlayer] = useState('game')
    const [currentPlayer, setCurrentPlayer] = useState({})
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
            <Ticker schedule={schedule} setGame={setCurrentGame} setPlayer={setCurrentPlayer} setGameOrPlayer={setGameOrPlayer}/>
            <Routes>
                <Route path="/" element={<Home />} />
                {gameOrPlayer=='game' && 
                <Route path="/game" element={<GamePage game = {currentGame} setCurrentPlayer={setCurrentPlayer} setGameOrPlayer={setGameOrPlayer} />}
                 />
                }
                {gameOrPlayer=='player' &&
                <Route path="/player" element={<PlayerPage player = {currentPlayer} />} />
                }

            </Routes>   
            {gameOrPlayer=='game' && currentGame &&
            <CommentSection game={currentGame} />
            }
            </>
        )
    }