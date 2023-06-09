import axios from 'axios'
import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

export default function PlayerPage (props) {
    const [playerInfo, setPlayerInfo] = useState(null)
    const [playerStats, setPlayerStats] = useState(null)
    const playerId = useParams().playerId
    let today = new Date();

    let playerInfoElement = <div>loading...</div>
    let playerStatsElement = <div>loading...</div>


    async function getPlayerStats(playerId) {
        const response = await axios.get(`https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=${today.getFullYear()}`)
        setPlayerStats(response.data)
    }
    async function getPlayerInfo(playerId) {
        const response = await axios.get(`https://statsapi.mlb.com/api/v1/people/${playerId}`)
        setPlayerInfo(response.data)
    }
    useEffect(() => {
        getPlayerStats(playerId)
        getPlayerInfo(playerId)
    }, [playerId])

    if (playerInfo) {
        playerInfoElement = (
            <div className="text-center">
                <h1 className="text-4xl font-bold">{playerInfo.people[0].fullName}</h1>
                <h2 className="text-2xl">{playerInfo.people[0].primaryPosition.name}</h2>
                <img
                className="my-4 mx-auto rounded-full"
                src={`https://img.mlbstatic.com/mlb-photos/image/upload/w_300,q_auto:best/v1/people/${playerId}/headshot/67/current`}
                alt={`${playerInfo.people[0].fullName} headshot`}
                />
            </div>
        )
    }
    // if playerStats exists and the player's primary position is not pitcher
    if (playerStats && playerInfo ) {
        if (playerInfo.people[0].primaryPosition.name != 'Pitcher') {
            playerStatsElement = (
                <div className="mt-8">
    <h1 className="text-2xl font-bold mx-10">Stats</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mx-10">
      <h2>Season:</h2>
      <h2>{playerStats.stats[0].splits[0].season}</h2>
      <h2>Games Played:</h2>
      <h2>{playerStats.stats[0].splits[0].stat.gamesPlayed}</h2>
      <h2>At Bats:</h2>
      <h2>{playerStats.stats[0].splits[0].stat.atBats}</h2>
      <h2>Runs:</h2>
      <h2>{playerStats.stats[0].splits[0].stat.runs}</h2>
      <h2>Hits:</h2>
      <h2>{playerStats.stats[0].splits[0].stat.hits}</h2>
      <h2>Home Runs:</h2>
      <h2>{playerStats.stats[0].splits[0].stat.homeRuns}</h2>
      <h2>Runs Batted In:</h2>
      <h2>{playerStats.stats[0].splits[0].stat.rbi}</h2>
      <h2>Stolen Bases:</h2>
      <h2>{playerStats.stats[0].splits[0].stat.stolenBases}</h2>
      <h2>Caught Stealing:</h2>
      <h2>{playerStats.stats[0].splits[0].stat.caughtStealing}</h2>
      <h2>Walks:</h2>
      <h2>{playerStats.stats[0].splits[0].stat.baseOnBalls}</h2>
      <h2>Strikeouts:</h2>
      <h2>{playerStats.stats[0].splits[0].stat.strikeOuts}</h2>
      <h2>Batting Average:</h2>
      <h2>{playerStats.stats[0].splits[0].stat.avg}</h2>
      <h2>On Base Percentage:</h2>
      <h2>{playerStats.stats[0].splits[0].stat.obp}</h2>
      <h2>Slugging Percentage:</h2>
      <h2>{playerStats.stats[0].splits[0].stat.slg}</h2>
      <h2>On Base Plus Slugging:</h2>
      <h2>{playerStats.stats[0].splits[0].stat.ops}</h2>
    </div>
  </div>
            )
        }
    }
    // if playerStats exists and the player's primary position is pitcher
    if (playerStats && playerInfo){
        if (playerInfo.people[0].primaryPosition.name == 'Pitcher') {
            playerStatsElement = (
                <div className="mt-8">
                <h1 className="text-2xl font-bold mb-4 mx-10">Stats</h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mx-10">
                    
                    <h2>Season: {playerStats.stats[0].splits[0].season}</h2>
                    <h2>Games Played: {playerStats.stats[0].splits[0].stat.gamesPlayed}</h2>
                    <h2>Wins: {playerStats.stats[0].splits[0].stat.wins}</h2>
                    <h2>Losses: {playerStats.stats[0].splits[0].stat.losses}</h2>
                    <h2>Games Started: {playerStats.stats[0].splits[0].stat.gamesStarted}</h2>
                    <h2>Complete Games: {playerStats.stats[0].splits[0].stat.completeGames}</h2>
                    <h2>Shutouts: {playerStats.stats[0].splits[0].stat.shutouts}</h2>
                    <h2>Saves: {playerStats.stats[0].splits[0].stat.saves}</h2>
                    <h2>Outs: {playerStats.stats[0].splits[0].stat.outs}</h2>
                    <h2>Hits: {playerStats.stats[0].splits[0].stat.hits}</h2>
                    <h2>Home Runs: {playerStats.stats[0].splits[0].stat.homeRuns}</h2>
                    <h2>Runs: {playerStats.stats[0].splits[0].stat.runs}</h2>
                    <h2>Earned Runs: {playerStats.stats[0].splits[0].stat.earnedRuns}</h2>
                    <h2>Walks: {playerStats.stats[0].splits[0].stat.baseOnBalls}</h2>
                    <h2>Strikeouts: {playerStats.stats[0].splits[0].stat.strikeOuts}</h2>
                    <h2>ERA: {playerStats.stats[0].splits[0].stat.era}</h2>
                    <h2>WHIP: {playerStats.stats[0].splits[0].stat.whip}</h2>
                </div>
            </div>

            )
        }
    }


    return (
        <>
            {playerInfoElement}
            {playerStatsElement}
        </>
    )
}
