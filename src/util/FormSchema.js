import * as yup from "yup";


const phoneNumberValid=/^09[0-9]{8}$/;
const userNameValid=/^[^`~!@#$%^&*()_+={}\]|\\:;“’<,>.?๐฿]*$/;
export const formSchema=yup.object({
    firstName:yup.string().max(12,"長度不得超過12").required("欄位不得為空"),
    secondName:yup.string().max(12,"長度不得超過12").required("欄位不得為空"),
    email:yup.string().email("電子郵件格式錯誤").required("欄位不得為空"),
    phoneNumber:yup.string().matches(phoneNumberValid,"手機號碼錯誤").required("欄位不得為空"),
    street:yup.string().required("欄位不得為空")
});

export const loginSchema=yup.object({
    loginEmail:yup.string().email("電子郵件格式錯誤").required("欄位不得為空"),
    loginPassword:yup.string().min(5,"密碼長度不得低於五位數").max(12,"密碼長度不得超過12位數").required("欄位不得為空")
})

export const signupSchema=yup.object({
    userName:yup.string().matches(userNameValid,"格式錯誤!!").min(3,"稱號不可低於3個字元!!").max(10,"稱號不可大於10個字元!!").required("欄位不得為空"),
    signupEmail:yup.string().email("電子郵件格式錯誤").required("欄位不得為空"),
    signupPassword:yup.string().min(5,"密碼長度不得低於五位數").max(12,"密碼長度不得超過12位數").required("欄位不得為空"),
    confirmPassword:yup.string().oneOf([yup.ref("signupPassword"),null],"密碼不符合!!").required("欄位不得為空")
})