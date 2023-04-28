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
import AuthFormPage from '../AuthFormPage'
import {getSchedule} from '../../../utils/api'
import Standings from '../Standings'




export default function App() {
    
    const [currentGame, setCurrentGame] = useState({});
    const [schedule, setSchedule] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const [currentPlayer, setCurrentPlayer] = useState({})
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userToken') ? true : false)  
    
    
    useEffect(() => {
        
        let dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
        getSchedule(dateString).then((apiResponse) => {
            
            setSchedule(apiResponse.data)
        })
        
        }, [currentDate, loggedIn])

        
    
        
        return (
            <>
            <Nav loggedIn={loggedIn} setLoggedIn = {setLoggedIn} />
            <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
            <Ticker schedule={schedule} setGame={setCurrentGame} setPlayer={setCurrentPlayer} />
            <Routes>
                <Route path="/" element={<Home />} />
                
                <Route path="/game/:gameId" element={<GamePage game = {currentGame} setGame = {setCurrentGame} setCurrentPlayer={setCurrentPlayer}  />}
                 />
                
                
                <Route path="/player/:playerId" element={<PlayerPage />} />
                
                <Route path="/auth/:formType" element={<AuthFormPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
                <Route path="/standings" element={<Standings />} />


            </Routes>   
            
            </>
        )
    }