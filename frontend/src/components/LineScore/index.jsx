export default function LineScore(props) {
    const { game } = props;

    let innings = game.liveData.linescore.innings.length > 9 ? game.liveData.linescore.innings.length : 9
    let awayLineScore = ''
    let homeLineScore = ''
    
    let inningsHTML = []
    for (let i = 1; i <= innings; i++) {
        inningsHTML.push(<th key={i} className='w-[25px] text-center'> {i} </th>)
    }


    let lineScoreHeader = <p> Loading... </p>;
    if (game.liveData) {
        lineScoreHeader = (
            
                <tr>
                    <th className='w-[175px]'> Team </th>
                    {inningsHTML}
                    <th key={'runs'} className='w-[25px] text-center'> R </th>
                    <th key={'hits'} className='w-[25px] text-center'> H </th>
                    <th key={'errors'} className='w-[25px] text-center'> E </th>
                </tr>
            
        )
        awayLineScore = (
            <tr>
              <td> {game.gameData.teams.away.name} </td>
              {game.liveData.linescore.innings.map((inning, index) => {
                if (inning.away.runs != undefined) {
                  return (
                    <td className='text-center'> {inning.away.runs} </td>
                  )
                } else {
                  return (
                    <td className='text-center'> - </td>
                  )
                }
              })}
              <th></th>
              <td className='text-center font-bold'> {game.liveData.linescore.teams.home.runs} </td>
              <td className='text-center font-bold'> {game.liveData.linescore.teams.home.hits} </td>
              <td className='text-center font-bold'> {game.liveData.linescore.teams.home.errors} </td>
            </tr>
        )
        homeLineScore = (
            <tr>
              <td> {game.gameData.teams.home.name} </td>
              {game.liveData.linescore.innings.map((inning, index) => {
                if (inning.home.runs != undefined) {
                  return (
                    <td className='text-center'> {inning.home.runs} </td>
                  )
                } else {
                  return (
                    <td className='text-center'> - </td>
                  )
                }
              })}
              <th></th>
              <td className='text-center font-bold'> {game.liveData.linescore.teams.home.runs} </td>
              <td className='text-center font-bold'> {game.liveData.linescore.teams.home.hits} </td>
              <td className='text-center font-bold'> {game.liveData.linescore.teams.home.errors} </td>
            </tr>
          )

    }                 
 return (
    <div >
        <table>
            <thead>
            {lineScoreHeader}
            </thead>
            <tbody>
            {awayLineScore}
            {homeLineScore}
            </tbody>
        </table> 
    </div>
 )

}