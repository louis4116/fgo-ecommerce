import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const authApi = createApi({
  reducerPath: "authAPi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    signUpSlice: builder.mutation({
      async queryFn(data) {
        try {
          const { userName, signupEmail, signupPassword } = data;

          const { user } = await createUserWithEmailAndPassword(
            auth,
            signupEmail,
            signupPassword
          );
          await updateProfile(user, {
            displayName: userName,
          });
          return { data: "ok" };
        } catch (e) {
          return { error: e };
        }
      },
    }),
    loginSlice: builder.mutation({
      async queryFn(data) {
        try {
          const { loginEmail, loginPassword } = data;
          console.log(data);
          await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

          return { data: "登入成功!!" };
        } catch (e) {
          return { error: e };
        }
      },
    }),
    updatedProfile: builder.mutation({
      async queryFn(data) {
        try {
          const { currentUser, photo, name } = data;
          const fileRef = ref(storage, currentUser.uid + ".png");
          await uploadBytes(fileRef, photo);
          const photoURL = await getDownloadURL(fileRef);

          updateProfile(currentUser, { photoURL: photoURL, displayName: name });
          return { data: [photoURL, name] };
        } catch (e) {
          return { error: e };
        }
      },
    }),
    sendEmailVerified: builder.mutation({
      async queryFn(currentUser) {
        try {
          await sendEmailVerification(currentUser);
          return { data: "已傳送認證信" };
        } catch (e) {
          return { error: e };
        }
      },
    }),
  }),
});

export const {
  useSignUpSliceMutation,
  useLoginSliceMutation,
  useUpdatedProfileMutation,
  useSendEmailVerifiedMutation,
} = authApi;
