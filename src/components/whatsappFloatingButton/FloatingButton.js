import React from 'react'

function FloatingButton() {
    return (
        <React.Fragment>
            {/*  https://wa.me/ */}

          
            <a href="https://wa.me/" target="_blank">
                <div className="floating-btn">
                    <img src="../assets/images/icons8-whatsapp.svg" className="position-fixed img-fluid"/>
                </div>
                </a>
        </React.Fragment>
    )
}

export default FloatingButton
