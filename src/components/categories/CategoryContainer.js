import React from 'react'
import Carousel from 'react-elastic-carousel'
import { Link } from 'react-router-dom';
import Product from '../Products/Product';
import { useForm } from 'react-hook-form';
import Select from 'react-select'

function CategoryContainer(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    const options = [
        { value: 'High to Low', label: 'High to Low' },
        { value: 'Low to High', label: 'Low to High' }
      ]

    // console.log(props.datas)
    const [Data,setData] = React.useState(props.datas)
    // const {title} = props;

    const breakPoints = [
        { width: 1, itemsToShow: 2 },
        { width: 550, itemsToShow: 3, itemsToScroll: 2, pagination: false },
        { width: 850, itemsToShow: 4 },
        { width: 1150, itemsToShow: 7, itemsToScroll: 2 },
        { width: 1450, itemsToShow: 5 },
        { width: 1750, itemsToShow: 6 },
      ]

    return (
        <React.Fragment>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <div className="col-12 col-sm-12 col-md-12 col-lg-9 mx-auto pt-4 ">
                {/* Product Container */}
                <div className="p-4 bg-white">
                    {/* Title of Product Container */}
                    <div className="border p-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Select options={options} {...register("sort by", { required: true })}/>
                        <input type="submit" />
                        </form>
                    </div>
                    
                    <div className="py-4">
                        <h4 className="p-0 m-0">{"title"}</h4>
                    </div>
                    {/* List of product */}
                    <div className="d-flex flex-row justify-content-xs-between justify-content-start flex-wrap flex-md-wrap">
                    
                  
                    {Data?.map((items,index)=>{
                        const {productName,ratings,description,price,productImage,id} = items;
                        return (<Link className="text-decoration-none" to={{pathname: `product/${productName}`, query: { id: id }}}>
                            <Product key={index} productName={productName} ratings={ratings} description={description} productImage={productImage} price={price}/>
                    </Link>)})}
                        
                    </div>
                </div>
            </div>
            </div>
        </React.Fragment>
    )
}

export default CategoryContainer
