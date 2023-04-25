import axios from 'axios'
import { useState, useEffect } from 'react'

export default function PlayerPage (props) {
    const [playerInfo, setPlayerInfo] = useState(null)
    const [playerStats, setPlayerStats] = useState(null)
    const playerId = props.player;
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
            <div>
                <h1>{playerInfo.people[0].fullName}</h1>
                <h2>{playerInfo.people[0].primaryPosition.name}</h2>
                

                <img src={`https://img.mlbstatic.com/mlb-photos/image/upload/w_300,q_auto:best/v1/people/${playerId}/headshot/67/current`} />
            </div>
        )
    }
    if (playerStats) {
        playerStatsElement = (
            <div>
                <h1>Stats</h1>
                <h2>Season: {playerStats.stats[0].splits[0].season}</h2>
                <h2>Games Played: {playerStats.stats[0].splits[0].stat.gamesPlayed}</h2>
                <h2>At Bats: {playerStats.stats[0].splits[0].stat.atBats}</h2>
                <h2>Runs: {playerStats.stats[0].splits[0].stat.runs}</h2>
                <h2>Hits: {playerStats.stats[0].splits[0].stat.hits}</h2>
                <h2>Home Runs: {playerStats.stats[0].splits[0].stat.homeRuns}</h2>
                <h2>Runs Batted In: {playerStats.stats[0].splits[0].stat.rbi}</h2>
                <h2>Stolen Bases: {playerStats.stats[0].splits[0].stat.stolenBases}</h2>
                <h2>Caught Stealing: {playerStats.stats[0].splits[0].stat.caughtStealing}</h2>
                <h2>Walks: {playerStats.stats[0].splits[0].stat.baseOnBalls}</h2>
                <h2>Strikeouts: {playerStats.stats[0].splits[0].stat.strikeOuts}</h2>
                <h2>Batting Average: {playerStats.stats[0].splits[0].stat.avg}</h2>
                <h2>On Base Percentage: {playerStats.stats[0].splits[0].stat.obp}</h2>
                <h2>Slugging Percentage: {playerStats.stats[0].splits[0].stat.slg}</h2>
                <h2>On Base Plus Slugging: {playerStats.stats[0].splits[0].stat.ops}</h2>
            </div>
        )
    }

    return (
        <>
            {playerInfoElement}
            {playerStatsElement}
        </>
    )
}
