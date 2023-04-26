import {Link} from 'react-router-dom'
import LineScore from '../LineScore';
import HittingBoxScore from '../HittingBoxScore';
import PitchingBoxScore from '../PitchingBoxScore';
import CommentSection from '../CommentSection'

export default function GamePage(props){
    const {setGameOrPlayer} = props;
    const {setCurrentPlayer} = props;
    const {gameOrPlayer} = props;
    const {game} = props;
    

    let homePlayers = []
    let awayPlayers = []

    if(game.liveData){
        homePlayers = game.liveData.boxscore.teams.home
        awayPlayers = game.liveData.boxscore.teams.away
    }

    return(
        <div>
            <div className='flex flex-col'>
                <div className = 'flex flex-row justify-center'><LineScore game={game} /></div>
                <div className = 'flex flex-row mt-5 justify-center flex-wrap'>
                    <div className='m-5'><HittingBoxScore playerList={awayPlayers} game={game} setGameOrPlayer = {setGameOrPlayer} setCurrentPlayer={setCurrentPlayer}/></div>
                    <div className='m-5'><HittingBoxScore playerList={homePlayers} game={game} setGameOrPlayer = {setGameOrPlayer} setCurrentPlayer={setCurrentPlayer}/></div>
                </div>
                <div className = 'flex flex-row mt-5 justify-center flex-wrap'>
                    <div className='m-5'><PitchingBoxScore playerList={awayPlayers} game={game} setGameOrPlayer = {setGameOrPlayer} setCurrentPlayer={setCurrentPlayer} /></div>
                    <div className='m-5'><PitchingBoxScore playerList={homePlayers} game={game} setGameOrPlayer = {setGameOrPlayer} setCurrentPlayer={setCurrentPlayer} /></div>
                </div>
            </div>
        {game.liveData &&
            <CommentSection game={game}/>
        }
        </div> 
        
    )

}