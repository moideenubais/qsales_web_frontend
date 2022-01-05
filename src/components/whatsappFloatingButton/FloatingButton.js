import React from 'react'

function FloatingButton() {
    return (
        <React.Fragment>
            {/*  https://wa.me/ */}

          <div className="floating-btns-container">
          <a href="https://api.whatsapp.com/send?phone=+974 31223030" target="_blank">
                <div className="floating-btn">
                    <img src="../assets/images/icons8-whatsapp.svg" className="img-fluid"/>
                </div>
            </a>
            {/* <a href="https://api.whatsapp.com/send?phone=+974 31223030" target="_blank">
                <div className="floating-btn">
                    <img src="../assets/images/insta.png" className="img-fluid"/>
                </div>
            </a> */}
          </div>
            
        </React.Fragment>
    )
}

export default FloatingButton
