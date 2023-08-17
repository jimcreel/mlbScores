import { useEffect, useState } from 'react';
import { getStandings } from '../../../utils/api';
export default function Standings() {
const [standingsAL, setStandingsAL] = useState([])
const [standingsNL, setStandingsNL] = useState([])

    useEffect (() => {
        getStandings(103)
        .then(apiResponse => {
            setStandingsAL(apiResponse.data)
        }).then (() => {
            getStandings(104)
            .then(apiResponse => {
                setStandingsNL(apiResponse.data)
            })
        }
        )
    }, [])

    function buildStandings (league) {
          let standingsElement = league.records.map((division, index) => {
                return (
                    <div className="my-4 mx-4" key={index}>
                        <h2 className="text-lg font-semibold text-center">{divisionNames[index]}</h2>
                        <table className="w-full mt-2 bg-white rounded-lg overflow-hidden">
                            <thead className="text-left">
                            <tr className="bg-gray-100">
                                <th className="py-2 px-3">Team</th>
                                <th className="py-2 px-3">Wins</th>
                                <th className="py-2 px-3">Losses</th>
                                <th className="py-2 px-3">GB</th>
                                <th className="py-2 px-3">Win %</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-700">
                            {division.teamRecords.map((teamRecord) => {
                                return (
                                <tr key={teamRecord.team.id} className="border-t hover:bg-gray-100">
                                    <td className="py-2 px-3">{teamRecord.team.name}</td>
                                    <td className="py-2 px-3">{teamRecord.wins}</td>
                                    <td className="py-2 px-3">{teamRecord.losses}</td>
                                    <td className="py-2 px-3">{teamRecord.divisionGamesBack}</td>
                                    <td className="py-2 px-3">{teamRecord.winningPercentage}</td>
                                </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>

                )
            }
    
            )
            return standingsElement
        }

    let standingsALElements = <p>Loading...</p>
    let standingsNLElements = <p>Loading...</p>

    let divisionNames = ['East', 'Central', 'West']
    
    if (standingsAL.records) {
        standingsALElements = buildStandings(standingsAL)
    }
    if (standingsNL.records) {
        standingsNLElements = buildStandings(standingsNL)
    }

    



    return (
        <div className="flex flex-col justify-around">
            <h1 className='text-center font-bold'> American League </h1>
            <div className='flex flex-row justify-around
            flex-wrap'>
                
                {standingsALElements}
            </div>
            <h1 className='text-center font-bold'> National League </h1>
            <div className='flex flex-row justify-around flex-wrap'>
            
            {standingsNLElements}
            </div>
        </div>
    )
}