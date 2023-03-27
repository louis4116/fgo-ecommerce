import React,{useRef} from 'react';
import Signup from '../../components/signup/Signup';
import Login from '../../components/login/Login';
import useShow from '../../custom-hook/useShow';
import { CSSTransition } from 'react-transition-group';
import classes from "./accountpage.module.css";
const AccountPage = () => {
  const [show,setShow]=useShow(true);
  const frontRef=useRef(null);
  const backRef=useRef(null)

 
  return (
    <div className={classes.account}>
      <CSSTransition
      in={show}
      timeout={500}
      classNames={{ 
        enter:classes["front-enter"],
        enterActive:classes["front-enter-active"],
        enterDone:classes["front-enter-done"],
        exit:classes["front-exit"],
        exitActive:classes["front-exit-active"],
        exitDone:classes["front-exit-done"]
      }}
      nodeRef={frontRef}
      ><div ref={frontRef} className={classes["card-front"]}><Login onShow={setShow} /></div></CSSTransition>
      
      <CSSTransition
         in={!show}
         timeout={500}
         classNames={{ 
         exit:classes["back-exit"],
         exitActive:classes["back-exit-active"],
         exitDone:classes["back-exit-done"], 
         enter:classes["back-enter"],
         enterActive:classes["back-enter-active"],
         enterDone:classes["back-enter-done"]
        }}
         nodeRef={backRef}
      ><div ref={backRef} className={classes["card-back"]}><Signup  onShow={setShow}/></div></CSSTransition>
      </div>
  )
}

export default AccountPage