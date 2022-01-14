import React from 'react'
import ReactTooltip from 'react-tooltip';

function FloatingButton() {
    return (
        <React.Fragment>
            {/*  https://wa.me/ */}

          <div className="floating-btns-container">
          <a href="https://api.whatsapp.com/send?phone=+974 31223030" target="_blank">
                <div id="floating-btn" className="floating-btn" data-tip="Chat with us">
                    <img src="../assets/images/whatsApp-icon.png" height="50" width="50" className="img-fluid"/>
                </div>
                <ReactTooltip 
                place='left'
                type='light'
                effect='solid'
                offset={{left:10}}
                className="floating-tooltip"
                scrollHide={false}
                />
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
