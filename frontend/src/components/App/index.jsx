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
    
   
    
    
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userToken') ? true : false)  
    
    
   

        
    
        
        return (
            <>
            <Nav loggedIn={loggedIn} setLoggedIn = {setLoggedIn} />
            <Calendar />
            <Routes>
                <Route path="/" element={<Home />} />
                
                <Route path="/game/:gameId" element={<GamePage   />}
                 />
                
                
                <Route path="/player/:playerId" element={<PlayerPage />} />
                
                <Route path="/auth/:formType" element={<AuthFormPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
                <Route path="/standings" element={<Standings />} />


            </Routes>   
            
            </>
        )
    }