import {createApi,fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import { db } from "./firebase";
import { collection,getDocs } from "firebase/firestore";

export const fgoApi=createApi({
    reducerPath:"fgoApi",
    baseQuery:fakeBaseQuery(),
    endpoints:(builder)=>({
        fetchData:builder.query({
           async queryFn(){
                try{
                    const fgoData=collection(db,"fgo");
                    const fetchData= await getDocs(fgoData);
                    console.log(db)
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
    })
})


export const {useFetchDataQuery} = fgoApi;