import React from 'react'
import DealDetail from '../components/Deal/DealDetail'
import Navigation from '../components/Navigation'
import FloatingButton from '../components/whatsappFloatingButton/FloatingButton'
import Footer from '../Footer'
import Header from '../Header'
import { Helmet } from 'react-helmet'
const DealPage = () => {
    return (
       <>
        <Helmet>
        <title>Deal - Qsales</title>

      </Helmet>
      <Header />
      {
        window.innerWidth > 786 &&
        <Navigation />
      }
      <DealDetail />
      <Footer />
      <FloatingButton />
       </>
    )
}

export default DealPage
