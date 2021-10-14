import React from 'react'

function Layout({children}) {
    return (
        <div>
                <div className="col-lg-12 col-md-12 col-sm-12 bg-white">
                <div className="col-lg-9 col-md-9 col-sm-12 mx-auto d-flex align-items-center flex-column justify-content-start">
                    {children}
                    </div>
                    </div>
        </div>
    )
}

export default Layout
