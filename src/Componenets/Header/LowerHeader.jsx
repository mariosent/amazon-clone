import React from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import classes from "./Header.module.css";
function LowerHeader() {
  return (
    <div className={classes.lower__container}>
        <ul>
            <li>
                <MenuOutlinedIcon />
                <p>All</p>
            </li>
            <li>Today's Deals</li>
            <li>Costumer Service</li>
            <li>Registry</li>
            <li>Gift Cards</li>
            <li>Sell</li>
        </ul>
    </div>
  )
}

export default LowerHeader