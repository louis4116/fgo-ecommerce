import React,{useState,useEffect} from 'react';
import useShow from '../../../custom-hook/useShow';
import classes from "./loading.module.css";
const Loading = () => {
  const [time,setTime]=useState(5);
  const [show, setShow] = useShow(false);
  //讀取畫面，如果太久或沒有資料就會跳出其他資訊
  useEffect(()=>{
    let countTime;
    if(time>0){
      countTime=setInterval(()=>{
        setTime((pre)=>pre-1)
    },1000)
    }else if(time==0){
      setShow(true);
    }
    return ()=>clearInterval(countTime)
  },[time])


  const showTip=show&&(
                       <>
                       <p className={classes.inTip}>讀取過久，請重新確認是否進入錯誤的頁面</p>
                       <button className={classes.reload} onClick={()=>window.location.reload()}>重新整理</button>
                       </>)

  return (
    <div className={classes.box}>
      <div className={classes.spinner}>讀取中。。。</div>
        {showTip}
    </div>
  )
}

export default Loading