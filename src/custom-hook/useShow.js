import { useState } from "react";
//反轉布林值的功用
const useShow=(defaultShow)=>{
    const [show,setShow]=useState(defaultShow);

    const showHandler=(show)=>{
        setShow((currentValue)=>typeof show === "boolean" ? show: !currentValue)
    }

    return [show,showHandler];
}

export default useShow;