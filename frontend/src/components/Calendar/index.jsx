import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CalendarPage from '../CalendarPage';
import Ticker from '../Ticker';
import { getSchedule } from '../../../utils/api';

export const ScheduleContext = React.createContext();
export const DateContext = React.createContext();

export default function Calendar() {
  const [schedule, setSchedule] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isTickerVisible, setIsTickerVisible] = useState(false); // New state for showing the ticker

  useEffect(() => {
    const storedDate = localStorage.getItem('currentDate');
    const storedDateObj = storedDate ? new Date(storedDate) : null;

    if (storedDateObj && storedDateObj.getTime() !== currentDate.getTime()) {
      setCurrentDate(storedDateObj);
    } else if (!storedDateObj) {
      localStorage.setItem('currentDate', currentDate.toISOString());
    }

    const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    getSchedule(dateString).then(apiResponse => {
      setSchedule(apiResponse.data);
      setIsTickerVisible(apiResponse.data.totalGames > 0); // Update the ticker visibility state
    });
  }, [currentDate]);

  return (
    <div className="calendar">
      <ScheduleContext.Provider value={schedule}>
        <DateContext.Provider value={currentDate}>
          <CalendarPage setCurrentDate={setCurrentDate} />
          {isTickerVisible && <Ticker />} {/* Conditionally render the Ticker */}
        </DateContext.Provider>
      </ScheduleContext.Provider>
    </div>
  );
}
