import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { GameContext } from '../GamePage';

export default function PitchingBoxScore (props) {
const {setGameOrPlayer} = props;
const {setCurrentPlayer} = props;
const game = useContext(GameContext)
const {playerList} = props;

function handlePlayerClick (playerId) {
    setGameOrPlayer('player')
    setCurrentPlayer(playerId)  
}   

let teamElement = <tr>
        <th>Loading...</th>
    </tr>

function buildBoxScorePitching(playerList) {
    teamElement = Object.values(playerList.pitchers).map((player) => {
        let playerId = `ID${player}`
        let playerIdLookup = player
        let playerPositions = Object.values(playerList.players[playerId].allPositions).map((position) => [position.abbreviation])
        let playerNameDiv = playerList.players[playerId].gameStatus.isSubstitute ? 'flex flex-row justify-between pr-5 pl-3' : 'flex flex-row justify-between pr-5'

        return playerPositions.length ==1 && playerPositions[0] == 'P' ? (
        <tr key={playerId}>
            <td><Link to={'/player/'+ playerIdLookup} onClick={() => handlePlayerClick(playerIdLookup)}>
                <div className = {playerNameDiv} >{game.gameData.players[playerId].boxscoreName}
                <span className='opacity-50'> 
                {playerList.players[playerId].stats.pitching.wins == '1' ? `W, ${playerList.players[playerId].seasonStats.pitching.wins}` : null}
                {playerList.players[playerId].stats.pitching.losses == '1' ? `L, ${playerList.players[playerId].seasonStats.pitching.losses}` : null}
                {playerList.players[playerId].stats.pitching.saves == '1' ? `SV, ${playerList.players[playerId].seasonStats.pitching.saves}` : null}
                {playerList.players[playerId].stats.pitching.holds == '1' ? `H, ${playerList.players[playerId].seasonStats.pitching.holds}` : null}
                {playerList.players[playerId].stats.pitching.blownSaves == '1' ? `BS, ${playerList.players[playerId].seasonStats.pitching.blownSaves}` : null}
                 </span>

                </div></Link></td>
            <td className='w-[25px] text-center'>{playerList.players[playerId].stats.pitching.inningsPitched}</td>
            <td className='w-[25px] text-center'>{playerList.players[playerId].stats.pitching.hits}</td>
            <td className='w-[25px] text-center'>{playerList.players[playerId].stats.pitching.runs}</td>
            <td className='w-[25px] text-center'>{playerList.players[playerId].stats.pitching.earnedRuns}</td>
            <td className='w-[25px] text-center'>{playerList.players[playerId].stats.pitching.baseOnBalls}</td>
            <td className='w-[25px] text-center'>{playerList.players[playerId].stats.pitching.strikeOuts}</td>
            <td className='w-[25px] text-center'>{playerList.players[playerId].stats.pitching.homeRuns}</td>
            <td className='w-[25px] text-center'>{playerList.players[playerId].seasonStats.pitching.era}</td>
        </tr>) : null
    })
}

if (playerList && game) {
    buildBoxScorePitching(playerList)
}

const pitchingTableHead = <thead>
    <tr>
        <th className='w-[175px] text-left'> Pitchers </th>
        <th className='w-[25px] text-center'> IP </th>
        <th className='w-[25px] text-center'> H </th>
        <th className='w-[25px] text-center'> R </th>
        <th className='w-[25px] text-center'> ER </th>
        <th className='w-[25px] text-center'> BB </th>
        <th className='w-[25px] text-center'> SO </th>
        <th className='w-[25px] text-center'> HR </th>
        <th className='w-[25px] text-center'> ERA </th>
    </tr>
</thead>


    return (
        <table className='table-fixed'>
            {pitchingTableHead}
            <tbody>
                {teamElement}
            </tbody>
        </table>
    )
}