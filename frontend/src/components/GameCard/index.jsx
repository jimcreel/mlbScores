import {Link} from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from 'axios'

export default function GameCard(props) {
    const [tickerGame, setTickerGame] = useState({});
    const game = props.game;
    const setGame = props.setGame;
    

    useEffect(() => {
        getGameUpdate()
    }, [])

    function handleGameClick() {
        setGame(game);
    }

    async function getGameUpdate() {
        if (game.status.statusCode == 'I') {
            const response = await axios.get(`https://statsapi.mlb.com/api/v1.1/game/${game.gamePk}/feed/live`)
            setTickerGame(response.data)
            console.log(tickerGame.gameData.teams.away.id)
        }
    }

    let cardElement = <p> Loading... </p>;

    if (game.status.statusCode == 'F') {
        cardElement = (
            <div className="flex flex-row  justify-around items-center align-baseline">
                <img src={`/assets/${game.teams.away.team.id}.svg`} className="w-7" />
                <p className="text-center text-xl">{game.teams.away.score}</p>
                <p> @ </p>
                <img src={`/assets/${game.teams.home.team.id}.svg`} className="w-7"/>
                <p className="text-center text-xl">{game.teams.home.score}</p>
            </div>
        )
    } else if (game.status.statusCode == 'I') {
       
        if (tickerGame.gameData) {
            let awayId = tickerGame.gameData.teams.away.id;
            let homeId = tickerGame.gameData.teams.home.id;
            let awayScore = tickerGame.liveData.linescore.teams.away.runs;
            let homeScore = tickerGame.liveData.linescore.teams.home.runs;
          
            cardElement = (
              <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between w-2/3">
                  <div className="flex flex-col items-center justify-center mr-8">
                    <p className="font-bold text-lg">Inning</p>
                    <p>R H E</p>
                  </div>
          
                  <div className="flex items-center justify-center">
                    <img src={`/assets/${awayId}.svg`} className="w-7 mr-2" />
                    <p className="text-xl font-bold">{awayScore}</p>
                  </div>
          
                  <div className="flex items-center justify-center ml-8">
                    <img src={`/assets/${homeId}.svg`} className="w-7 mr-2" />
                    <p className="text-xl font-bold">{homeScore}</p>
                  </div>
                </div>
              </div>
            );
          }
          
    } else {   
            cardElement = (
                <div className="flex flex-row  justify-around items-center align-baseline">
                    <img src={`/assets/${game.teams.away.team.id}.svg`} className="w-7" />
                    <p> @ </p>
                    <img src={`/assets/${game.teams.home.team.id}.svg`} className="w-7"/>
                </div>
            )
        } 
    
            
        
    return (
        <div className="w-48 mr-4 flex-shrink-0">
            <Link to="/game" onClick={() => handleGameClick()}>
                {cardElement}
            </Link>
        </div>

    )

}

    // if (schedule.dates) {
    // console.log(schedule.dates[0].games);
    
    // scheduleElement = schedule.dates[0].games.map((game) => {
    //     let awayTeamScore = null;
    //     let homeTeamScore = null;
    //     let gamePk = game.gamePk
    //     if (game.teams.away.team.id) {
    //         awayTeamScore = (
    //         <div className="flex flex-row items-center align-baseline">
    //             <img src={`/assets/${game.teams.away.team.id}.svg`} className="w-7" />
    //             <p className="text-center text-base">{game.teams.away.score}</p>
    //         </div>
    //         );
    //     }
        
    //     if (game.teams.home.team.id) {
    //         homeTeamScore = (
    //         <div className="flex flex-row items-center align-baseline">
    //             <img src={`/assets/${game.teams.home.team.id}.svg`} className="w-7"/>
    //             <p className="text-center text-xl">{game.teams.home.score}</p>
    //         </div>
    //         );
    //     }
        
    //     return (
    //         <div className="w-48 mr-4 flex-shrink-0">
    //         <Link to="/game" onClick={() => handleGameClick()}>
    //             <div className="flex flex-row  justify-around items-center align-baseline">
    //             <p className="text-xl">{awayTeamScore}  @ {homeTeamScore} </p>
    //             </div>
    //         </Link>
    //         </div>
    //     );
    //     });
    // }