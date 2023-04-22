export default function Game(props){
    
    const {game} = props;
    console.log(game)

    let homePlayers = []
    let awayPlayers = []

    if(game.liveData){
        homePlayers = game.liveData.boxscore.teams.home.players
        awayPlayers = game.liveData.boxscore.teams.away.players
    }

    let playerNames = []
    if(game.gameData){
        playerNames = game.gameData.players
    }
    
    let homeElement = <p> Loading... </p>;
    let awayElement = <p> Loading... </p>;
    let homePitcher = <p> Loading... </p>;
    let awayPitcher = <p> Loading... </p>;

    console.log((homePlayers))
    if(game.liveData){
       
    }   
    return(
        <div>
            {homeElement}
        </div>
        
    )

}