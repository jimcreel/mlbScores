import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Ticker() {
    const [schedule, setSchedule] = useState([]);
    const [game, setGame] = useState({});

    async function getSchedule() {
        const response = await axios.get('https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1')
        setSchedule(response.data)
    }

    
    useEffect(() => {
        getSchedule()
        }, [])

    async function handleGameClick() {
        const response = await axios.get(`https://statsapi.mlb.com/api/v1/game/${game.gamePk}/feed/live`)
        setGame(response.data)
        
    }

        let scheduleElement = <p> Loading... </p>;

        if (schedule.dates) {
        console.log(schedule.dates[0].games);
        
        scheduleElement = schedule.dates[0].games.map((game) => {
            let awayTeamScore = null;
            let homeTeamScore = null;
          
            if (game.teams.away.team.id) {
              awayTeamScore = (
                <div className="flex flex-row items-center align-baseline m-3">
                  <img src={`/assets/${game.teams.away.team.id}.svg`} className="w-7" />
                  <p className="text-center">{game.teams.away.score}</p>
                </div>
              );
            }
          
            if (game.teams.home.team.id) {
              homeTeamScore = (
                <div className="flex flex-row items-center align-baseline m-3">
                  <img src={`/assets/${game.teams.home.team.id}.svg`} className="w-7"/>
                  <p className="text-center">{game.teams.home.score}</p>
                </div>
              );
            }
          
            return (
              <div>
                <Link to="/game" onClick={() => handleGameClick(game.gamePk)}>
                  <div className="flex flex-row m-7 justify-around items-center align-baseline">
                    {awayTeamScore}  @ {homeTeamScore} 
                  </div>
                </Link>
              </div>
            );
          });
          

        return (
        <div className="bg-white-800 text-black flex flex-row">
            {scheduleElement}
        </div>
        );
    }
}