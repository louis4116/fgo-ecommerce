import { useState } from "react";

const useShow=(defaultShow)=>{
    const [show,setShow]=useState(defaultShow);
    
    const showHandler=(show)=>{
        setShow((currentValue)=>typeof show === "boolean" ? show: !currentValue)
    }
    
    return [show,showHandler];
}

export default useShow;