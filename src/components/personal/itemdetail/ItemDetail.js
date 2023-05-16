import React,{useEffect,useState} from 'react';
import { useOutletContext ,useParams,useNavigate} from 'react-router-dom';
import { useFetchItemDetailDataQuery,useDeleteDataMutation } from '../../../api/DataSlice';
import { DeleteOutline } from '@mui/icons-material';
import OrderItems from './orderitems/OrderItems';
import User from './user/User';
import Loading from '../../ui/loading/Loading';
import Swal from 'sweetalert2';
import classes from "./itemdetail.module.css";
const ItemDetail = () => {
    const [totalPrice,setTotalPrice]=useState(0);
    const {id}=useParams();
    const {uid}=useOutletContext();
    const {data}=useFetchItemDetailDataQuery({id,uid},{skip:!uid});
    const [deleteData]=useDeleteDataMutation();
    const navigate=useNavigate();
    const userDetail=data?.user;
    console.log(data)
    //判斷資料存在與否
    useEffect(()=>{
      let result=0;
    if(data!==undefined){
        for(let i=0;i<data?.orderItems?.length;i++){
          result+=data?.orderItems[i].allPrice
        }
        setTotalPrice(result)
      }
      
    },[data])
    if(data===undefined)return <div className={classes["item-detail-loading"]}><Loading /></div>;
    
 
    const removeHanlder=()=>{
      Swal.fire({
        title: '確定刪除?',
        text: "刪除後無法復原",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'blue',
        cancelButtonColor: 'red',
        confirmButtonText: '確認',
        cancelButtonText:"取消"
      }).then((result) => {
        if (result.isConfirmed) {
          deleteData({id,uid})   
        }
        return result.isConfirmed
      }).then((result)=>{
        if(result){
          Swal.fire(
            '刪除成功!',
            '訂單已經刪除',
            'success'
          );
          navigate("/personal/order")
        }})
        .catch((e)=>console.log(e))
    }

    const Order=data?.orderItems?.map((item)=>(<OrderItems key={item.name} price={item.price} img={item.img} number={item.number} allPrice={item.allPrice} name={item.name} />))
    const UserComponent=(<User 
      firstName={userDetail?.firstName} 
      secondName={userDetail?.secondName} 
      city={userDetail?.city} 
      district={userDetail?.district} 
      email={userDetail?.email} 
      phoneNumber={userDetail?.phoneNumber} 
      street={userDetail?.street} 
      zipCode={userDetail?.zipCode} 
      totalAmount={userDetail?.totalAmount}
      totalPrice={totalPrice}/>);
    return (
    <>
      <h2 className={classes.h2}>訂單內容</h2>
      {Order}
      {UserComponent}
      <div className={classes["item-detail-button"]}>
        <button className={classes["item-detail-cancel"]} onClick={removeHanlder}><DeleteOutline /><span>取消訂單</span></button>
      </div>
    
    </>
    
  )
}

export default ItemDetail