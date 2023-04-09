import React,{useState,useEffect} from 'react';
import { useOutletContext } from 'react-router-dom';
import Item from './Item';
import ReactPaginate from 'react-paginate';
import classes from "./personalitem.module.css";
const PersonalItem = () => {
  const [currentData,setCurrentData]=useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount,setPageCount]=useState(0);
  const {data,itemsPerPage} = useOutletContext();
  //計算要把資料分割成幾個，然後透過reactpaginate呈現
  useEffect(()=>{
    const endOffset = itemOffset + itemsPerPage;
    setCurrentData(data?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data?.length / itemsPerPage));
  },[itemsPerPage,itemOffset,data])

const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % data?.length;
  setItemOffset(newOffset);
};
  return (
    <>
      <h2 className={classes["personal-item-h2"]}>我的訂單</h2>
      {data.length===0?(<h3 className={classes["personal-item-h3"]}>無訂單!!</h3>):currentData?.map((item)=>(
    <Item key={item.name} name={item.name}  user={item.user} orderItems={item.orderItems} totalAmount={item.totalAmount} totalPrice={item.totalPrice}/>
      ))}
        {currentData?.length===0?"":<ReactPaginate  
        className={classes.paginate}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        containerClassName={classes.pagination}
        pageLinkClassName={classes["page-num"]}
        previousClassName={classes["page-num"]}
        nextClassName={classes["page-num"]}
        activeClassName={classes.active}
        />}
</>
  )
}

export default PersonalItem