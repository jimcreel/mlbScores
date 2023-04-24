import {Link} from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from 'axios'

export default function Calendar (props) {
    const {setCurrentDate} = props
    console.log('calendar')
    let dateArray = []
    for (let i = -4; i < 3; i++) {
        let newDate = new Date()
        newDate.setDate(newDate.getDate() + i)
        dateArray.push(newDate)
    }
    function handleCalendarClick (date) {
        setCurrentDate(date)
    }
    let calendarDiv = <p> Loading... </p>;

        calendarDiv = dateArray.map((date) => {
            return (
            <div>
                 <Link to='/' onClick={() => handleCalendarClick(date)}> {`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`} </Link> 
            </div>)
        })
    




    return (
        <div className="bg-white-800 flex flex-row overflow-x-auto max-h-30">
            {calendarDiv}
        </div>
    )
}

