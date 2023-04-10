import {createApi,fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import { db } from "./firebase";
import { collection,getDocs,getDoc,addDoc,deleteDoc,doc } from "firebase/firestore";

export const fgoApi=createApi({
    reducerPath:"fgoApi",
    baseQuery:fakeBaseQuery(),
    tagTypes:["userdata"],
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
                    return {data:result}
                }catch(e){
                    return{error:e}
                }
            },
           
        }),
        setData:builder.mutation({
            async queryFn(data){
                try{
                  const {user,orderItems,totalAmount,totalPrice,id}=data;
                  console.log(totalPrice);
                  console.log(data);
                  await addDoc(collection(db,id),{
                    user,orderItems,totalAmount,totalPrice
                  })
                    return { data: 'ok' }
                }catch(e){
                    return {error:e}
                }
            },
            invalidatesTags:["userdata"]
        }),
        fetchUserData:builder.query({
            async queryFn(uid){
                try{  
                    console.log("fetchUserData test")                 
                    const userData=collection(db,uid);
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
            },
            providesTags:["userdata"]
        }),
        fetchItemDetailData:builder.query({
            async queryFn(data){
                try{   
                    console.log("fetchItemDetailData test")
                    const {uid,id}=data;
                    const docRef=doc(db,uid,id);
                    const fetchData=await getDoc(docRef);
                    let result;
                    if(fetchData.exists()){
                     result=fetchData.data()
                    }
                   return {data:result}
                }catch(e){
                    return {error:e}
                }
            },
           providesTags:["userdata"]
        }),
        deleteData:builder.mutation({
            async queryFn(data){
                try{
                    const {uid,id}=data;
                    const docRef=doc(db,uid,id);
                    await deleteDoc(docRef);
                    return {data:"刪除成功"}
                }catch(e){
                    return {error:e}
                }
            },
            invalidatesTags:["userdata"]
        })
    })
})


export const {useFetchDataQuery,
              useFetchUserDataQuery,
              useSetDataMutation,
              useFetchItemDetailDataQuery,
              useDeleteDataMutation} = fgoApi;