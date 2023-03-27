import {createApi,fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import { createUserWithEmailAndPassword,updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import {auth,storage} from "./firebase";
import { getDownloadURL,  ref, uploadBytes } from "firebase/storage";

export const authApi=createApi({
    reducerPath:"authAPi",
    baseQuery:fakeBaseQuery(),
    endpoints:(builder)=>({
        signUpSlice:builder.mutation({
            async queryFn(data){
                try{
                    const {userName,email,password}=data;
                    const {user}=await createUserWithEmailAndPassword(auth,email,password);
                    await  updateProfile(user,{
                        displayName:userName
                    })
                    return {data:"ok"}
                }catch(e){
                    return {error:e}
                }
            }
        }),
        loginSlice:builder.mutation({
            async queryFn(data){
                try{
                const {email,password}=data;
                await signInWithEmailAndPassword(auth,email,password)
             
                return {data:"登入成功!!"}
                }catch(e){
                return {error:e}
            }
            }
        }),
        updatedProfile:builder.mutation({
            async queryFn(data){
                try{
                    const {currentUser,image,name}=data
                    const fileRef=ref(storage,currentUser.uid+".png");
                    await uploadBytes(fileRef,image);
                    const photoURL=await getDownloadURL(fileRef);

                    updateProfile(currentUser,{photoURL:photoURL,displayName:name});
                    return {data:[photoURL,name]}
                }catch(e){
                    return {error:e}
                }
            }
        })
    })
})


export const {useSignUpSliceMutation,useLoginSliceMutation,useUpdatedProfileMutation}=authApi;