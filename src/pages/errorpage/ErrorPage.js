import React,{useEffect,useState,useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import classes from "./errorpage.module.css";


const ErrorPage = () => {
    const [time,setTime]=useState(3)
    const navigate=useNavigate();

    //時間到會自動跳轉到首頁
    useEffect(()=>{
          let countTime;
           if(time>0){
            countTime=setInterval(()=>{
                setTime((pre)=>pre-1)
            },1000)
           }else if(time===0){
            navigate("/",{replace:true})
          
           }
           return ()=>clearInterval(countTime)
    },[time])
  return (
    <div className={classes.container}>
        <div className={classes.content}>
        <h1 className={classes.h1}>404</h1>
        <div className={classes.main}>頁面不存在</div>
        <p className={classes.des}>{time}秒後將會重新定位置首頁</p>
        </div>
    </div>
  )
}

export default ErrorPage