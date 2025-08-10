import React, { useContext, useState } from 'react'
import classes from './Payment.module.css'
import LayOut from '../../Componenets/LayOut/LayOut'
import {DataContext} from "../../Componenets/DataProvider/DataProvider";
import ProductCard from "../../Componenets/Product/ProductCard"
import { useElements, useStripe, CardElement} from '@stripe/react-stripe-js'
import CurrencyFormat from '../../Componenets/CurrencyFormat/CurrencyFormat';
import {axiosInstance} from "../../Api/axios";
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';
function Payment() {
  const [{user,basket}, dispatch] = useContext(DataContext)
  // console.log(user)
  const totalItem = basket?.reduce((amount, item)=> {
    return item.amount + amount;
  },0)
   const total = basket.reduce((amount, item)=>{
     
    return item.price *item.amount + amount
  },0)
  const [cardError, setCardError] = useState(null)
  const [processing, setProcessing] = useState(false)


  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()


  const handleChange = (e) =>{
    console.log(e)
    e?.error?.message? setCardError(e?.error?.message): setCardError("") 
  };

  const handlePayment = async (e) =>{
    e.preventDefault();


    try{
      setProcessing(true)
      const response = await axiosInstance({
        method:"POST",
        url:`/payment/create?total=${total * 100}`,  
      
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret,
        {
        payment_method:{
        card: elements.getElement(CardElement),
      }

        }
      );

      await db
      .collection("users")
      .doc(user.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        basket:basket,
        amount:paymentIntent.amount,
        created:paymentIntent.created,
      });

      dispatch(
        {type: Type.EMPTY_BASKET}
      ) 



      // console.log(confirmation)
      setProcessing(false)
      navigate("/orders", {state:{msg:"Order placed successfully"}})
    }catch (error){
      console.log(error)
      setProcessing(false)
    }
  }



  return (
    <LayOut>
      {/* header */}
    <div className = {classes.payment__header}>Checkout ({totalItem}) items</div>
    {/* payment mathod */}
    <section className={classes.payment}>
      {/* address */}
      <div className={classes.flex}>
        <h3>Delivery Address</h3>
        <div>
          <div>{user?.email}</div>
          <div>123 Main Street</div>
          <div>New York, NY 10018</div>
        </div>
      </div>
      <hr />
      {/* product*/}
      <div className={classes.flex}>
        <h3>Review items and delivery</h3>
        <div>
          {
            basket?.map((item)=><ProductCard product={item} flex={true}/>)
          }
        </div>
      </div>
      <hr />
      {/*card form */}
      <div className={classes.flex}>
        <h3>Payment methods</h3>
        <div className={classes.payment__card__container}>
         <div className={classes.payment__details}>
       <form onSubmit={handlePayment}>
        {cardError && <small style= {{color:"red"}}>{cardError}</small>}
          <CardElement onChange={handleChange}/>
          <div className={classes.payment__price}>
          <div>
            <span>
              <p>Total order | </p> <CurrencyFormat amount={total}/>
            </span>
          </div>
          <button type="submit">
            {
              processing? (
                <div className={classes.loading}>
                <ClipLoader color="#fff" size={20}/>
                <p>Processing...</p>
                </div>
              ):"Pay Now"
            }
            
          </button>
          </div>
       </form>
          </div>
          
        </div>
      </div>
    </section>

    </LayOut>

  )
}

export default Payment
