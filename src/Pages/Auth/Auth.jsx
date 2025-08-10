import React, { useState, useContext } from 'react'
import classes from './SignUp.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {auth} from "../../Utility/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import {DataContext} from '../../Componenets/DataProvider/DataProvider'
import { ClipLoader } from 'react-spinners';
import { Padding } from '@mui/icons-material';


function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const[loading, setLoading] =useState({
    signIn:false,
    signUp:false
  })

const [{user}, dispatch ]= useContext(DataContext);
const navigate = useNavigate();
const navStateData = useLocation();
console.log(navStateData)


console.log(user)


const authHandler = async(e)=>{
  e.preventDefault();
  console.log(e.target.name);
   if (e.target.name == 'signIn'){
    setLoading({...loading, signIn:true})       
    signInWithEmailAndPassword(auth, email, password)
    .then((userInfo)=>{
      
      dispatch({
        type:'SET_USER',
        user:userInfo.user
      })
      setLoading({...loading, signIn:false})
      navigate(navStateData?.state?.redirect || '/')
       
    }).catch((err)=>{
     setError(err.message);
     setLoading({...loading, signIn:false})       
    })

  }else{
    setLoading({...loading, signUp:true})       
    createUserWithEmailAndPassword(auth, email, password).then((userInfo)=>{
    
           dispatch({
        type:'SET_USER',
        user:userInfo.user
      })
      setLoading({...loading, signUp:false})
      navigate(navStateData?.state?.redirect || '/')
      
    }).catch((err)=>{
    setError(err.message);
    setLoading({...loading, signUp:false})       
    })
  }
}
 


  return(
   <section className={classes.login}>
    {/* logo */}

<Link to ="/">
<img src="https://cdn.freebiesupply.com/images/large/2x/amazon-logo-black-transparent.png" alt="" />

</Link>
{/* form */}
<div className={classes.login__container}>
  <h1>Sign in</h1>

  { navStateData?.state?.msg && (
      <small
      style={{
            padding: '10px',
            color: 'red',
            textAlign: 'center',
            fontWeight: 'bold',
      }}
      >
        {navStateData?.state?.msg}
      </small>
    )}

  <form action="">

    <div>
    <label htmlFor='email'>Email</label>
    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email"/>
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input value={password} onChange={(e)=>setPassword(e.target.value)}type="password" id="password"/>
    </div>
    <button type="submit"
            name='signIn'
            onClick={authHandler}
    className={classes.login__signIn}> {
      loading.signIn ?
      (<ClipLoader color = '#000' size={15}/>)
      : 
      ("SignIn")
      }
      </button>
    </form>
    <p>
      by sigining-in you agree to the amazon fake page conditions of us & sale.Please see our Privacey Notice, our Cookies Notice and our Interest-Bed Ads Notice.
    </p>
    {/* creat account btn */}
    <button type="submit"
            name='signUp'
            onClick={authHandler}
    className={classes.login__registerButton}>

      {
      loading.signUp ?
      (<ClipLoader color = '#000' size={15}/>)
      : 
      ("Sign UP")
      }

    </button>
    {
      error && <small style={{paddingTop:'10px',color:'red'}}>{error}</small>
    }
  </div>



  </section>
  
    

  )
}

export default Auth;