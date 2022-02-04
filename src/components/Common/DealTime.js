import React from 'react'
import './deal-time.css'
const DealTime = ({h,m,s}) => {
    return (
        <div className="time-wrapper d-flex flex-column text-white justify-content-center text-center">
            <h5 className="text-dark text-center">ENDS IN</h5>
            <hr className="text-dark mb-1"/>
            <div className="timer-container d-flex flex-row align-items-center">
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
