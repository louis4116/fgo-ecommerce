import {createApi,fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import { db } from "./firebase";
import { collection,getDocs,addDoc,setDoc,doc } from "firebase/firestore";

export const fgoApi=createApi({
    reducerPath:"fgoApi",
    baseQuery:fakeBaseQuery(),
    endpoints:(builder)=>({
        fetchData:builder.query({
           async queryFn(){
                try{
                    const fgoData=collection(db,"fgo");
                    const fetchData= await getDocs(fgoData);
                    let result=[];
                    fetchData.forEach(doc=>{
                        result.push(doc.data());
                    })
                    console.log(result)
                    return {data:result}
                }catch(e){
                    return{error:e}
                }
            }
        }),
        fetchUserData:builder.query({
            async queryFn(id){
                try{
                    const userData=collection(db,id);
                    const fetchData= await getDocs(userData);
                    
                    let data=[];
                    let name=[];
                    let result=[];
                    fetchData.forEach(doc=>{
                        data.push(doc.data());
                        name.push(doc.id)
                    });
                    for(let i=0;i<data.length;i++){
                        data[i].name=name[i]
                        result.push(data[i])
                    }
                    return {data:result}
                }catch(e){
                    return{error:e}
                }
            }
        }),
        fetchItemDetailData:builder.query({
            async queryFn(data){
                try{   
                   const {uid,id}=data;
                   console.log(id);
                   console.log(uid)
                   return {data:"ok"}
                }catch(e){
                    console.log(e)
                }
            }
        }),
        setData:builder.mutation({
            async queryFn(data){
                try{
                  const {user,orderItems,totalAmount,id}=data
                  await addDoc(collection(db,id),{
                    user,orderItems,totalAmount
                  })
                    return { data: 'ok' }
                }catch(e){
                    return {error:e}
                }
            }
        })
    })
})


export const {useFetchDataQuery,useFetchUserDataQuery,useSetDataMutation,useFetchItemDetailDataQuery} = fgoApi;