import axios from 'axios';

export async function getSchedule(dateString) {
    const response = await axios.get(`https://statsapi.mlb.com/api/v1/schedule/?sportId=1&date=${dateString}`)
    return response;
    
}

export async function getGame(gameId) {
    
    const response = await axios.get(`https://statsapi.mlb.com/api/v1/game/${gameId}/feed/live`)
    return response;
}

export async function getStandings(leagueId) {
    const response = await axios.get(`https://statsapi.mlb.com/api/v1/standings?leagueId=${leagueId}`)
    return response;
}