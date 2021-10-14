import React from 'react'
import ProductsContainer from './ProductsContainer'
// import { useDispatch, useSelector } from 'react-redux'
// import { setProducts } from '../../redux/actions/productActions'
import { productLists } from '../../productsData'
import axios from 'axios'

function ProductsListHolder() {
    // const products = useSelector(state => state.allProducts.products)
    // console.log(products)
    // const dispatch = useDispatch();
    // sending data to setData via dispatch
    // dispatch(setProducts(productLists))
    // const fetchProducts = ()=>{
    //     dispatch(setProducts(productLists))
    // }

    // React.useEffect(() => {
    //     fetchProducts();
    // }, []);

    let [post, setPost] = React.useState(null);

    React.useEffect(() => {

        const getCategories = async () => {
            const datas = await axios.get(`http://ec2-3-133-125-119.us-east-2.compute.amazonaws.com/api/category`).then((response) => {
                setPost(response.data);
                console.log(response.data)
            });
            return datas;
        }

        getCategories();

    }, []);

    // console.log(post.categories)




    return (
        <React.Fragment>
            {
                post?.categories.map((data, index) => {
                    console.log("datas", data)
                    return (
                        <ProductsContainer key={index} title={data.title} datas={data} />
                    )
                })
            }

        </React.Fragment>
    )
}

export default ProductsListHolder
