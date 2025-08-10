import React, { useContext } from 'react'
import classes from './Cart.module.css'
import LayOut from '../../Componenets/LayOut/LayOut'
import { DataContext } from '../../Componenets/DataProvider/DataProvider';
import ProductCard from '../../Componenets/Product/ProductCard';
import CurrencyFormat from '../../Componenets/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import {Type} from '../../Utility/action.type'
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";

 
function Cart() {
  const [{ basket, user}, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item)=>{
     
    return item.price *item.amount + amount
  },0)


  const increment = (item)=>{
    dispatch({
      type:Type.Add_TO_BASKET,
      item
    })
  }
    const decrement = (id)=>{
      dispatch({
        type:Type.REMOVE_FROM_BASKET,
        id
      })
    } 

  return (
    <LayOut>
  <section className={classes.container}>
    <div className={classes.cart__container}>
      <h2>Hello</h2>
      <h3>Your shooping basket</h3>
      <hr />
      {
        basket?.length==0?(<p>Your basket is empty</p>):(
          basket?.map((item,i)=>{
            return <section className={classes.cart_product}> 
            <ProductCard
            key = {i}
            product={item}
            reanderDesc={true}
            renderAdd={false}
            flex={true}
            
            
            />
            <div className={classes.btn_container}>
              <button className={classes.btn} onClick={()=>increment(item)}> <BiSolidUpArrow size={20}/> </button>
              <span>{item.amount}</span>
              <button className={classes.btn} onClick={()=>decrement(item.id)}><BiSolidDownArrow size={20}/></button>
            </div>
            </section>
          })
        )

      }
    </div>
    <div>
    {  basket?.length !==0&&(
      <div className={classes.subtotal}>
        <div>
        <p>Subtotal ({basket?.length} items) </p> 
        <CurrencyFormat amount={total}/>
        
         </div>
         <span>
          <input type='checkbox'/>
          <small>This order contains a gift</small>
         </span>
         <Link to ="/payments">Continu to checkout</Link>
         </div>
    )}
    </div>
  </section>
    </LayOut>
  )
}

export default Cart