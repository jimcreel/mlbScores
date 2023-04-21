export default function Game(props){
    const {gameData} = props
    console.log(gameData)
    return (
        <div>
            <h1>Game</h1>
            <h2>{gameData.teams.away.team.name} @ {gameData.teams.home.team.name}</h2>
            <h2> {gameData.status.abstractGameCode}</h2>
            <h2> {gameData.teams.away.team.name} - {gameData.teams.away.score}</h2>
            <h2> {gameData.teams.home.team.name} - {gameData.teams.home.score}</h2>

        </div>
    )
}