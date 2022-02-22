import React, { useEffect } from 'react'
import ReactTooltip from 'react-tooltip';
import Strings from '../../Constants';

function FloatingButton() {

    const [toggleWhatsapp,setToggleWhatsapp]=React.useState(false);
    const toggleHandler=()=>setToggleWhatsapp(!toggleWhatsapp);


    let buttonRef=React.useRef();

    useEffect(() => {
        if(buttonRef){
            ReactTooltip.show(buttonRef);
        }
    },[buttonRef])
    return (
        <React.Fragment>
            {/*  https://wa.me/ */}

          <div className="floating-btns-container">
                <div ref={ref => buttonRef = ref} onClick={() =>toggleHandler()} id="floating-btn" className="floating-btn pointer" data-tip="Chat with us">
                    <img src="../assets/images/whatsApp-icon.png" height="50" width="50" className="img-fluid"/>
                </div>
            <a href={Strings.whatsappUrl} onClick={() =>toggleHandler()} target="_blank">
                <div className={`whatsapp-message ${toggleWhatsapp ? 'whatsapp-show':'whatsapp-hidden'}`}>
                <div className="message">
                    Chat with us
                </div>
                </div>
                {/* <ReactTooltip 
                resizeHide={false}
                disable={true}
                place='left'
                type='light'
                effect='solid'
                offset={{left:10}}
                className="floating-tooltip"
                scrollHide={false}
                /> */}
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
