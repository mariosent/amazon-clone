import React from 'react'
import { useEffect, useState } from 'react'
import classes from './ProductDetail.module.css'
import LayOut from '../../Componenets/LayOut/LayOut'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {productUrl} from '../../Api/endPoints'
import ProductCard from '../../Componenets/Product/ProductCard'
import Loder from '../../Componenets/Loader/Loder'

function ProductDetail() {
  const {productId} = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [product, setproduct] = useState({})
  useEffect(()=>{
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setproduct(res.data)
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err)
      setIsLoading(false)
    })
  }, [])
  return (
    <LayOut>
    {isLoading? (<Loder/>):(<ProductCard
 product={product} 
 flex={true}
reanderDesc={true}
renderAdd={true}
      />
)}  
 
    </LayOut>
  )
}

export default ProductDetail