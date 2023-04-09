export { useForm,FormProvider } from "react-hook-form";
export { useTwZipCode, cities, districts } from "use-tw-zipcode";
export { useSetDataMutation} from "../../api/DataSlice";
export { cartActions } from "../../store/cart-slice";
export { yupResolver } from '@hookform/resolvers/yup';
export { formSchema } from "../../util/FormSchema";
export { debounce } from "lodash";




//forminput會用到的標籤
export const FormFileds=[
    {
        label:"firstName",
        id:"firstName",
        type:"text",
        name:"姓氏"
    },
    {
        label:"secondName",
        id:"secondName",
        type:"text",
        name:"名字"
    },
    {
        label:"phoneNumber",
        id:"phoneNumbere",
        type:"tel",
        name:"手機號碼"
    },
    {
        label:"email",
        id:"email",
        type:"email",
        name:"信箱"
    },
]