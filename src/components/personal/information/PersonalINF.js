import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext, Link } from "react-router-dom";
import {
  useUpdatedProfileMutation,
  useSendEmailVerifiedMutation,
} from "../../../api/AuthSlice";
import ProfileImg from "../../../img/Profile.jpg";
import classes from "./personalinf.module.css";
const PersonalINF = () => {
  const [photo, setPhoto] = useState();
  const [nowPhoto, setNowPhoto] = useState(ProfileImg);
  const imgRef = useRef();
  const {
    currentUser: currentUser,
    profilePhoto: [setProfilePhoto],
    profileName: [setProfileName],
  } = useOutletContext();
  const [updatedProfile] = useUpdatedProfileMutation();
  const [sendEmailVerified] = useSendEmailVerifiedMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const email = currentUser?.email;
  const defaultName = currentUser?.displayName;
  const emailVerified = currentUser?.emailVerified;
  const emailVerifiedResult = emailVerified ? <>已認證</> : <>尚未認證</>;

  const imgChangeHandler = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setNowPhoto(reader.result);
      });
      //轉換成網頁能讀懂的形式
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const submitHandler = async (data) => {
    const { changedName } = data;
    if (changedName === "") return alert("請輸入名字");
    if (nowPhoto === ProfileImg) return alert("請更改大頭貼");
    let result;
    //暱稱更改與否的後續行動
    if (changedName === defaultName) {
      result = { currentUser, photo, name: defaultName };
    } else if (changedName !== defaultName) {
      result = { currentUser, photo, name: changedName };
    }
    try {
      const returnData = await updatedProfile(result);
      //0是照片位置，1是暱稱位置
      console.log(returnData);
      setProfilePhoto(returnData.data[0]);
      setProfileName(returnData.data[1]);
      alert("偵測到資料變更，請重新整理");
    } catch (e) {
      console.log(e);
    }
  };

  const isVerified = emailVerified ? (
    ""
  ) : (
    <span className={classes["personalInf-verified"]}>
      <Link onClick={() => sendEmailVerified(currentUser)}>驗證</Link>
    </span>
  );

  return (
    <>
      <div className={classes["personalInf-header"]}>
        <h2>個人檔案</h2>
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={classes["personalInf-main"]}>
          <table className={classes["personalInf-detail"]}>
            <tbody>
              <tr>
                <td className={classes["personalInf-title"]}>使用者帳號</td>
                <td className={classes["personalInf-content"]}>{email}</td>
              </tr>
              <tr>
                <td className={classes["personalInf-title"]}>使用者名稱</td>
                <td className={classes["personalInf-input"]}>
                  <input
                    type="text"
                    defaultValue={defaultName}
                    {...register("changedName")}
                  />
                </td>
              </tr>
              <tr>
                <td className={classes["personalInf-title"]}>信箱認證</td>
                <td className={classes["personalInf-content"]}>
                  {emailVerifiedResult}
                  {isVerified}
                </td>
              </tr>
              <tr>
                <td className={classes["personalInf-title"]}></td>
                <td className={classes["personalInf-content"]}>
                  <button>儲存</button>{" "}
                </td>
              </tr>
            </tbody>
          </table>
          <div className={classes["personalInf-img"]}>
            <img src={nowPhoto} />
            <label htmlFor={classes.file} className={classes.file}>
              上傳
            </label>
            <input
              type="file"
              ref={imgRef}
              id={classes.file}
              onChange={imgChangeHandler}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default PersonalINF;
