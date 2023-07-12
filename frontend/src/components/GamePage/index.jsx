import {Link} from 'react-router-dom'
import React from 'react'
import LineScore from '../LineScore';
import HittingBoxScore from '../HittingBoxScore';
import PitchingBoxScore from '../PitchingBoxScore';
import CommentSection from '../CommentSection'
import {useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {getGame} from '../../../utils/api'

export const GameContext = React.createContext({})


export default function GamePage( props){
    

    
    const {setCurrentPlayer} = props;
    const currentGameId = useParams()
    const [gameId, setGameId] = useState(currentGameId.gameId)
    console.log(currentGameId)
    const [game, setGame] = useState({})
   
    useEffect(() => {
        getGame(currentGameId.gameId).then(apiResponse => {
            setGame(apiResponse.data)
        })
    }, [currentGameId.gameId])
    



    let homePlayers = []
    let awayPlayers = []
    

    if(game.liveData){
        homePlayers = game.liveData.boxscore.teams.home
        awayPlayers = game.liveData.boxscore.teams.away
    }

    console.log(game)
    let gameHTML = <>loading...</>

    if(!game.gamePk){
        setTimeout(() => {
            gameHTML = <> No games scheduled for today</>
            }, 3000);
        }
    else{
        gameHTML = (
            <GameContext.Provider value={game}>
                <div>
                    <div className='flex flex-col'>
                        <div className = 'flex flex-row justify-center'> <LineScore  /></div>
                        <div className = 'flex flex-row mt-5 justify-center flex-wrap'>
                            <div className='m-5'><HittingBoxScore playerList={awayPlayers}   /></div>
                            <div className='m-5'><HittingBoxScore playerList={homePlayers}  /></div>
                        </div>
                        <div className = 'flex flex-row mt-5 justify-center flex-wrap'>
                            <div className='m-5'><PitchingBoxScore playerList={awayPlayers}    /></div>
                            <div className='m-5'><PitchingBoxScore playerList={homePlayers}    /></div>
                        </div>
                    </div>
                {game.liveData && localStorage.getItem('userToken') &&
                    <CommentSection />
                }
                </div> 
            </GameContext.Provider>
        )
    }
        return(
            
            <>
                {gameHTML}
            </>
            
            
        )
            }

