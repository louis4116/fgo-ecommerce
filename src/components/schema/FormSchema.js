import * as yup from "yup";


const phoneNumberValid=/^09[0-9]{8}$/;

export const formSchema=yup.object.shape({
    firstName:yup.string.max(12,"長度不得超過12").required("欄位不得為空"),
    secondName:yup.string.max(12,"長度不得超過12").required("欄位不得為空"),
    email:yup.string().email("電子郵件格式錯誤").required("欄位不得為空"),
    phoneNumber:yup.string().matches(phoneNumberValid,"手機號碼錯誤").required("欄位不得為空"),
    street:yup.string().required("欄位不得為空")
});