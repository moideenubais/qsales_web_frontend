import i18next from 'i18next';
import React from 'react'
import ReactSelect from 'react-select'

const TopBar = ({switchLanguage}) => {

    const languages = [
        { label: "English", value: "en" },
        { label: "Arabic", value: "ar" },
      ];
    return (
      <div id="top-bar" className="w-100 py-1 px-3 bg-dark  d-flex flex-row justify-content-between align-items-center flex-wrap">
        <span className="text-white flex-1 orders-2 d-flex flex-row align-items-center " ><img alt="call" style={{marginRight:"4px !important"}} src="/assets/images/callIcon.png" width="24" /> <a style={{textDecoration:"none",color:"white"}} href="tel:+97477322358">+974 7732 2358</a></span>
        <div class="ticker-wrap text-white flex-2">
          {/* <div class="ticker"> */}
            <div class="ticker__item"> FREE DELIVERY FOR ORDERS ABOVE QR 100 | DELIVERY IN 24 HRS ALL OVER
          QATAR</div>
          {/* <div class="ticker__item"> FREE DELIVERY FOR ORDERS ABOVE QR 100 | DELIVERY IN 24 HRS ALL OVER
          QATAR</div> */}
          {/* </div> */}
        </div>
        {/* <span className="">
         
        </span> */}
        <div className="d-flex flex-1 flex-row align-items-center pointer px-3 lang-change language-selector orders-3">
          <ReactSelect
            value={languages.find((lan) => lan.value == i18next.language)}
            options={languages}
            onChange={switchLanguage}
            isSearchable={false}
            menuPortalTarget={document.body} 
            styles={{
              control: (styles) => ({
                ...styles,
                backgroundColor: "inherit",
                color: "white",
                border: "none",
                boxShadow: "none",
                zIndex: "99",
              }),
              
              menuPortal: base => ({ ...base, zIndex: 99 })
            }}
          />
        </div>
      </div>
    );
}

export default TopBar
