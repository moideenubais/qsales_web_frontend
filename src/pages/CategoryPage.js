import React from 'react'
import CategoryListHolder from '../components/categories/CategoryListHolder'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'
import Header from '../Header'

function CategoryPage() {
    return (
        <React.Fragment>
            <Header/>
            <Navigation/>
            <Layout>
                <CategoryListHolder/>
            </Layout>
        </React.Fragment>
    )
}

export default CategoryPage
