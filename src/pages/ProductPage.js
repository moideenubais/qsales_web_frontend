import React from 'react'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'
import ProductDescription from '../components/ProductDescription'
import Header from '../Header'

function ProductPage() {
    return (
        <div>
            <Header/>
            <Navigation/>
            <Layout>
                <ProductDescription/>
            </Layout>
        </div>
    )
}

export default ProductPage
