import {Link} from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from 'axios'

export default function Calendar (props) {
    const {setCurrentDate} = props
    const [weekOffset, setWeekOffset] = useState(0)
    const [weekArray, setWeekArray] = useState([])
    
    useEffect(() => {
      let dateArray = []
      
      for (let i = -3; i < 4; i++) {
          let newDate = new Date()
          newDate.setDate(newDate.getDate() + i + weekOffset)
          dateArray.push(newDate)
      }
      console.log(dateArray)
      setWeekArray(dateArray)
    }, [weekOffset])

    function handleCalendarClick (date) {
        setCurrentDate(date)
    }
    function handleArrowClick (direction) {
        if (direction === 'left') {
            setWeekOffset(weekOffset - 7)
        } else {
            setWeekOffset(weekOffset + 7)
        }
    }
    
  const calendarDiv = weekArray.map((date) => {
    const dateStr = date.toLocaleString("default", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
    
    return (
      <div key={dateStr} className='m-2'>
        <Link
          to="/"
          onClick={() => handleCalendarClick(date)}
        >
          <div className="block rounded-t overflow-hidden bg-white text-center w-24">
            <div className="bg-red text-white bg-black py-1">{date.toLocaleString("default", { month: "short" })}</div>
            <div className="pt-1 border-l border-r">
              <span className="text-4xl font-bold">{date.getDate()}</span>
            </div>
            <div className="pb-2 px-2 border-l border-r border-b rounded-b flex justify-center">
              <span className="text-xs font-bold">{date.toLocaleString("default", { weekday: "short" })}</span>
              
            </div>
          </div>
        </Link>
      </div>
    );
  });
    




    return (
        <div className="bg-white-800 flex flex-row overflow-x-auto max-h-30">
            <div onClick={() => handleArrowClick('left')}> left arrow </div> 
            {calendarDiv}
            <div onClick={() => handleArrowClick('right')}> right arrow </div>
        </div>
    )
}

