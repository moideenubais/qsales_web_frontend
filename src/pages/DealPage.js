import React from 'react'
import DealDetail from '../components/Deal/DealDetail'
import Navigation from '../components/Navigation'
import FloatingButton from '../components/whatsappFloatingButton/FloatingButton'
import Footer from '../Footer'
import Header from '../Header'

const DealPage = () => {
    return (
       <>
      <Header />
      <Navigation />
      <DealDetail />
      <Footer />
      <FloatingButton />
       </>
    )
}

export default DealPage
