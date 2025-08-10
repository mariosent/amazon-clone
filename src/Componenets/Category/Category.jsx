import React from 'react'
import {categoryInfos} from './CatagoryFullinfos'
import CategoryCard from './CategoryCard'
import classes from "./catagory.module.css";

function Category() {
  return (
  <section className={classes.category__container}>
    {
    categoryInfos.map((infos)=>( 
      
         <CategoryCard key={infos?.id} data = {infos} renderAdd/>
       
    ))
    }
  </section>
  )
}

export default Category