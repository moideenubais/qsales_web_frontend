import React from 'react'
import {categoryLists} from '../../categoryList'
import CategoryContainer from './CategoryContainer'

function CategoryListHolder() {

    return (
        <React.Fragment>
            {
                categoryLists.map((data,index)=>{
                    return(
                        <CategoryContainer key={index} datas={data.data}/>  
                    )
                })
            }
            
        </React.Fragment>
    )
}

export default CategoryListHolder
