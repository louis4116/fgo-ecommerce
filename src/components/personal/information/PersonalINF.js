import { async } from '@firebase/util';
import React,{useState,useEffect,useCallback,useRef} from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import { useUpdatedProfileMutation } from '../../../api/AuthSlice';
import classes from "./personalinf.module.css";
const PersonalINF = () => {
  const [photo,setPhoto]=useState();
  const [nowphoto,setNowPhoto]=useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const imgRef=useRef();
  const {currentUser:currentUser,profilePhoto:[setProfilePhoto],profileName:[setProfileName]}=useOutletContext();
  const [updatedProfile]=useUpdatedProfileMutation();
  const {register,handleSubmit,reset,watch,formState:{errors}}=useForm();
  const email=currentUser?.email;
  const defaultName=currentUser?.displayName;
  const emailVerified=currentUser?.emailVerified;
  const emailVerifiedResult=emailVerified?(<>以認證</>):(<>尚未認證</>);

  const imgChangeHandler=(e)=>{
    console.log(e.target.files[0])
    if (e.target.files[0]) {
      
      setPhoto(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setNowPhoto(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);//轉換成網頁能讀懂的形式
    }
  };

  const submitHandler=async(data)=>{
    const {changedName}=data; 
    const image=photo;
    let result;
    if(changedName===defaultName){
      result={currentUser,image,name:defaultName}
    }else if(changedName!==defaultName){
      result={currentUser,image,name:changedName}
    }
    try{
     const returnData= await updatedProfile(result)
     setProfilePhoto(returnData.data[0]);
     setProfileName(returnData.data[1]);
    }catch(e){
      console.log(e)
    }
  }


 
  return (
    <div className={classes.container}>
        <div className={classes["personalInf-header"]}> 
            <h2>個人檔案</h2>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>  
          <div className={classes["personalInf-main"]}>
            <table className={classes["personalInf-detail"]}>
              <tbody>
                <tr><td className={classes["personalInf-title"]}>使用者帳號</td><td className={classes["personalInf-content"]}>{email}</td></tr>
                <tr><td className={classes["personalInf-title"]}>使用者名稱</td><td  className={classes["personalInf-input"]}>
                  <input type="text"  defaultValue={defaultName} 
                {...register("changedName")}/></td></tr>
                <tr><td className={classes["personalInf-title"]}>信箱認證</td><td className={classes["personalInf-content"]}>{emailVerifiedResult}</td></tr>
                <tr><td className={classes["personalInf-title"]}></td><td className={classes["personalInf-content"]}><button>儲存</button>  </td></tr>
              </tbody>
            </table>
            <div className={classes["personalInf-img"]}>
              <img src={nowphoto} />
              <label htmlFor={classes.file} className={classes.file}>上傳</label>
              <input type="file" ref={imgRef} id={classes.file}  onChange={imgChangeHandler}/>  
            </div>
          </div>
          
        </form>
    </div>
  )
}

export default PersonalINF