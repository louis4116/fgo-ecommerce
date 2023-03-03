import { useState } from "react";

const useShow=(defaultShow)=>{
    const [show,setShow]=useState(defaultShow);
    
    const showHandler=(show)=>{
        console.log(typeof show === "boolean")
        setShow((currentValue)=>typeof show === "boolean" ? show: !currentValue)
    }
    
    return [show,showHandler];
}

export default useShow;