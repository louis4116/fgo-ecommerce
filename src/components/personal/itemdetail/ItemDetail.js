import React from 'react';
import { useOutletContext ,useParams} from 'react-router-dom';
import { useFetchItemDetailDataQuery } from '../../../api/DataSlice';
import { skipToken } from '@reduxjs/toolkit/dist/query';
const ItemDetail = (props) => {
    const {id}=useParams();
    const {currentUser}=useOutletContext();
    const uid=currentUser.uid;
    const {data,error,isLoading}=useFetchItemDetailDataQuery({id,uid}?{id,uid}:skipToken);
  return (
    <div>ItemDetail</div>
  )
}

export default ItemDetail