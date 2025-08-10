import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Cart from './Pages/Cart/Cart'
import Orders from './Pages/Orders/Orders'
import Payment from './Pages/Payment/Payment'
import SignIn from './Pages/Auth/Auth'
import Landing from './Pages/Landing/Landing'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Componenets/ProtectedRoute/ProtectedRoute'

const stripePromise = loadStripe('pk_test_51RqtUD6BfcV6gMiDFHv01kSZQDaofC1jczXWYhiyFKUhFs9j50b7EWh5ND2fvi1RjvJbXh4tl2tYTviAfK827nOS00U5i3B81G');


function Routing() {
  return (
    <Router>
        <Routes>
           <Route path="/" element= {<Landing/>}/>
           <Route path="/auth" element= {<SignIn/>}/>
           <Route path="/payments" element= {
            <ProtectedRoute
            msg={"You need to be logged in to view this page"} 
            redirect={"/payments"}>


               <Elements stripe={stripePromise}>
              <Payment/>
              </Elements>
            </ProtectedRoute>
           

            }/>
           <Route path="/orders" element= {
             <ProtectedRoute
              msg= {"You need to be logged in to view this page"} 
              redirect={"/orders"}>
              <Orders/>
             </ProtectedRoute>
            
            
            
            }/>
           <Route path="/category/:categoryName" element={<Results/>}/>
           <Route path="/product/:productId" element={<ProductDetail/>}/>
           <Route path="/cart" element= {<Cart/>}/>
        </Routes>
    </Router>
  )
}

export default Routing