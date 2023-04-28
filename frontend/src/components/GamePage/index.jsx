import {Link} from 'react-router-dom'
import React from 'react'
import LineScore from '../LineScore';
import HittingBoxScore from '../HittingBoxScore';
import PitchingBoxScore from '../PitchingBoxScore';
import CommentSection from '../CommentSection'
import {useEffect } from 'react'
import {useParams} from 'react-router-dom'

export const GameContext = React.createContext({})


export default function GamePage( props){
    
    const {game} = props;
    
    const {setGameOrPlayer} = props;
    const {setCurrentPlayer} = props;
    let gameId = useParams
    useEffect(() => {
        console.log('useEffect')
        if (!game.gamePk){
            getGame(gameId).then((apiResponse) => {
                setGame(apiResponse.data)
            })
        }
    }, [gameId, game.gamePk])



    let homePlayers = []
    let awayPlayers = []
    

    if(game.liveData){
        homePlayers = game.liveData.boxscore.teams.home
        awayPlayers = game.liveData.boxscore.teams.away
    }

    console.log(game)

    if(!game.gamePk){
        return (
            <div>
                <p> Loading... </p>
            </div>

        )
    }else{
        return(
            
            <GameContext.Provider value={game}>
                <div>
                    <div className='flex flex-col'>
                        <div className = 'flex flex-row justify-center'> <LineScore  /></div>
                        <div className = 'flex flex-row mt-5 justify-center flex-wrap'>
                            <div className='m-5'><HittingBoxScore playerList={awayPlayers}  setGameOrPlayer = {setGameOrPlayer} setCurrentPlayer={setCurrentPlayer}/></div>
                            <div className='m-5'><HittingBoxScore playerList={homePlayers}  setGameOrPlayer = {setGameOrPlayer} setCurrentPlayer={setCurrentPlayer}/></div>
                        </div>
                        <div className = 'flex flex-row mt-5 justify-center flex-wrap'>
                            <div className='m-5'><PitchingBoxScore playerList={awayPlayers}  setGameOrPlayer = {setGameOrPlayer} setCurrentPlayer={setCurrentPlayer} /></div>
                            <div className='m-5'><PitchingBoxScore playerList={homePlayers}  setGameOrPlayer = {setGameOrPlayer} setCurrentPlayer={setCurrentPlayer} /></div>
                        </div>
                    </div>
                {game.liveData && localStorage.getItem('userToken') &&
                    <CommentSection />
                }
                </div> 
            </GameContext.Provider>
            
            
        )
            }

}