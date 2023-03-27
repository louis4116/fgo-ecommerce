import React,{useState} from 'react'
import useAccountAuth from '../../custom-hook/useAccountState'
import classes from "./personalcategory.module.css"
const PersonalCategory = () => {
    const [nowphoto,setNowPhoto]=useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")
    const {currentUser} = useAccountAuth();
    const name=currentUser.displayName;
   
  return (
    <div className={classes.container}>
        <div className={classes.profile}>
            <img src={nowphoto} className={classes.photo}/>
            <h3>{name}</h3>
        </div>

        {/* <div className={classes.category}>
            <div>
            <div>個人帳戶</div>
            </div>
            <div>
            <div>訂單</div></div>
        </div> */}
    </div>
  )
}

export default PersonalCategory