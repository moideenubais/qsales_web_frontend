import React, { useEffect, Fragment } from 'react';
import { useLocation, withRouter } from 'react-router-dom';

function ScrollToTop({ history, children }) {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
}

export default withRouter(ScrollToTop);