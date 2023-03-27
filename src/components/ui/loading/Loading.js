import React from 'react';
import classes from "./loading.module.css";
const Loading = () => {
  return (
    <div className={classes.box}>
     
    <div className={classes.spinner}>讀取中。。。</div>
    </div>
  )
}

export default Loading