import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom"
import HomePage from '../HomePage'
import Game from '../Game'
import axios from 'axios'
import MLBStatsAPI from "mlb-stats-api";
import Ticker from '../Ticker'

console.log(typeof(MLBStatsAPI))


export default function App() {
    
    const [schedule, setSchedule] = useState([]);
    const [game, setGame] = useState({});

    
        
        return (
            <>
            <Ticker />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game" element={<Game game={game} />} />

            </Routes>

            </>
        )
    }