import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import LowerHeader  from "./LowerHeader";
import SearchIcon from '@mui/icons-material/Search';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import BiCart from '@mui/icons-material/ShoppingCartOutlined';
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from '../../Utility/firebase'


  const Header = ()=>{

  const[{user, basket},dispatch]=useContext(DataContext)
  const totalItems =basket?.reduce((amount,item)=>{
return item.amount + amount
  },0) 
 

  return (
 <section className={classes.fixed}>
   
    <section >
      <div className={classes.header__container}>
          {/* logo */}
        <div className={classes.logo__container}>
      
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon logo" />
          </Link>
          {/* delivery */}
          <div className={classes.delivery}>
          <span>
            <LocationPinIcon/>
            </span>
          <div>
            <p>Deliverd to </p>
            <span>Ethiopia</span>
          </div>
        </div>
        </div>
       {/* search bar */}
        <div className = {classes.search}> 
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" name="" id="" placeholder="Search product" />
        <SearchIcon size={25}/>
        </div>
        
        <div className={classes.order__container}>
        
            <a href="" className={classes.language}>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png" alt="" />
          <section name ="" id="">
            <option value="">EN</option>
          </section>
          </a>
        <Link to={!user && "/auth"}>
          <div>
            {
              user?(
               <>
            <p>hello {user?.email?.split('@')[0] }</p>
            <span onClick={()=>auth.signOut()}>Sign Out</span>
               </>
          ):(
            <>
            <p>Sign In</p>
            <span>Account & Lists</span>
            </>
          )
           }
          </div>
           
        </Link>
  
        <Link to="/orders">
          <p>returns</p>
          <span>& Orders</span>
        </Link>
       <div className={classes.cart__container}>
        <Link to="/cart" className={classes.cart}>
        <BiCart sx={{ fontSize: 38 }} /> 
      <span>{totalItems}</span>
        </Link>
      </div>
         <Link to="/cart" className={classes.cart__text}>Cart</Link>
        </div>
      </div>
    
    <LowerHeader />
    </section>
</section>
  );
    } 

  
export default Header;
