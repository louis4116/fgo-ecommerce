import React,{useEffect,useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useFetchDataQuery } from "../../api/DataSlice";
import FgoInformation from "../../components/information/FgoInformation";
import Bottom from "../../components/bottom/footer-content";
import ErrorPage from "../errorpage/ErrorPage";
import Loading from "../../components/ui/loading/Loading";
import classes from "./productdetail.module.css"

const ProductDetail = () => {
  const [firebaseData, setFirebaseData] = useState([]);
  const params = useParams();
  const navigate=useNavigate()
 
  const {data,error,isLoading}=useFetchDataQuery();


  useEffect(()=>{
    const check=data?.find((item)=>item.id===params.id)
    if(check){
      const fetchDetail= data?.filter((item)=>item.id===params.id);
      setFirebaseData(fetchDetail)
    }else{
       navigate("*")
    }
    

    
  },[params.id,isLoading])
 

  const fgoData = firebaseData?.map((item) => (
    <FgoInformation
      key={item.id}
      id={item.id}
      title={item.title}
      price={item.price}
      img={item.img}
      img2={item.img2}
      img3={item.img3}
      number={item.number}
      description={item.description}
      manufacturer={item.manufacturer}
      scale={item.scale}
      size={item.size}
      des={item.des}
    />
  ));

  const result=isLoading ? <Loading /> :fgoData;

  return (
    <div className={classes.page}>
      {result}
  
    </div>
  );
};

export default ProductDetail;
