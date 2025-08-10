import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import Classes from './product.module.css'
import Loder from '../Loader/Loder';

function Product() {
    const [products, setProducts] = useState();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true)
        axios.get('https://fakestoreapi.com/products')     
        .then((res)=>{
           setProducts(res.data)
           setIsLoading(false)
        }).catch((err)=>{
            console.log(err)
            setIsLoading(false)
        })
    }, [])
  return (
    <>
{

  isLoading? (<Loder/>):(    <section className={Classes.products_container }>
{
    products?.map((singleProduct)=> {
      return <ProductCard renderAdd = {true} product={singleProduct} key={singleProduct.id}/>     
    }) 
}

    </section>)
}




    </>
  )
}

export default Product