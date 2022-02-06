import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import './deal-time.css'
const DealTime = ({endDate,daily=false}) => {


    const [time,setTime]=useState({d:'00',h:'00',m:'00',s:'00'});

    const timer = (date) => {
        var now = new Date().getTime();
        date=Date.parse(date);
        var timeleft = date - now;
  
        var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        return { d: days, h: hours, m: minutes, s: seconds };
      };

      const getTime=()=>{
        const {$H:h1,$m:m1,$s:s1}=dayjs().endOf('day');
        const {$H:h2,$m:m2,$s:s2}=dayjs();
        return {h:h1-h2,m:m1-m2,s:s1-s2};
      }

      useEffect(()=>{
        setInterval(()=>{
          setTime(daily?getTime():timer(endDate));
        },1000)
      },[endDate,daily])

      const {d,h,m,s}=time;
    return (
        <div className="time-wrapper d-flex flex-column text-white justify-content-center text-center">
            <h5 className="text-dark text-center">ENDS IN</h5>
            <hr className="text-dark mb-1"/>
            <div className="timer-container d-flex flex-row align-items-center">
                {
                    d && (
                    <div className="mx-2 p-2 d-flex flex-column bg-primary time-card">
                    <h5 className="text-center">{d?d:"00"}</h5>
                    <span className="extra-small">DAYS</span>
                    </div>
                    )
                }
                
                <div className="mx-2 p-2 d-flex flex-column bg-primary time-card">
                    <h5 className="text-center">{h?h:"00"}</h5>
                    <span className="extra-small">HOURS</span>
                </div>
                <div className="mx-2 p-2 d-flex flex-column bg-primary time-card">
                    <h5 className="text-center">{m?m:"00"}</h5>
                    <span className="extra-small">MINUTES</span>
                </div>
                <div className="mx-2 p-2 d-flex flex-column bg-primary time-card">
                    <h5 className="text-center">{s?s:"00"}</h5>
                    <span className="extra-small">SECONDS</span>
                </div>
            </div>
        </div>
    )
}

export default DealTime
