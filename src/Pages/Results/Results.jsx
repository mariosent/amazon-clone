import React, { useEffect, useState } from 'react'
import classes from './Results.module.css'
import LayOut from '../../Componenets/LayOut/LayOut'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {productUrl} from '../../Api/endPoints'
import ProductCard from '../../Componenets/Product/ProductCard'
import Loder from '../../Componenets/Loader/Loder'


function Results() {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {categoryName} = useParams()
  useEffect(()=>{
    setIsLoading(true)
  axios.get (`${productUrl}/products/category/${categoryName}`)
  .then((res)=>{
    setResults(res.data)
    setIsLoading(false)
  }).catch((err)=>{
    console.log(err)
    setIsLoading(false)
})
},[])
 
  return (
    <LayOut>
      <section>
      <h1 style = {{padding:"30px"}}>Results</h1>
      <p style= {{padding:"30px"}}>catagory/ {categoryName}</p>
      <hr />
      {isLoading?(<Loder/>):(<div className={classes.products_container}>
        {results?.map((product) => (
          <ProductCard
          key={product.id}
          product={product}
          reanderDesc={false}
          renderAdd={false}

          />
        ))}
      </div>)}
      
      </section>
    </LayOut>
  )
}

export default Results