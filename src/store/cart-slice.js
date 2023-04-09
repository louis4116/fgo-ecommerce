import { createSlice } from "@reduxjs/toolkit";

//先從localstorage檢查有無商品
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const totalNumber = JSON.parse(localStorage.getItem("totalNumber")) || 0;

const initialState = { cartItems: cartItems, totalNumber: totalNumber };


//將購物車資訊存入localstorage
const updatedLocalstorage=(cartItems,totalNumber)=>{
      localStorage.setItem("cartItems",JSON.stringify(cartItems.map((item) => item)));
      localStorage.setItem("totalNumber", JSON.stringify(totalNumber));
};


//購物車邏輯
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //商品的詳細頁面增加商品至購物車
    onAdd(state, action) {
      const newItem = action.payload;
      if (newItem.quantity === 0) {
        return;
      }
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);
      state.totalNumber += newItem.quantity;
      let temp;
      //如果沒有商品，就先將商品的資訊加入
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          price: newItem.price,
          number: newItem.number,
          allPrice: newItem.price,//同種商品的總金額
          name: newItem.title,
          img: newItem.img,
        });
        temp = [...state.cartItems];
        for (let i = temp.length - 1; i < temp.length; i++) {
          temp[i].allPrice = temp[i].price * newItem.quantity;
          temp[i].number = newItem.quantity; //因應一次加入大量商品狀況所設置
        }
      } else {
        existingItem.number += newItem.quantity;
        existingItem.allPrice += existingItem.price * newItem.quantity;
      }
      //存入localstorag
      updatedLocalstorage(state.cartItems,state.totalNumber);
    },
    //購物車內增加商品，只會有加一減一的狀況
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);
      state.totalNumber++;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          price: newItem.price,
          number: newItem.number,
          allPrice: newItem.price,
          name: newItem.title,
          img: newItem.img,
        });
      } else {
        existingItem.number++;
        existingItem.allPrice +=  existingItem.price;
      }
      updatedLocalstorage(state.cartItems,state.totalNumber);
    },
    //從購物車內部去掉單一或全部商品
    removeItemToCart(state, action) {
      const oldItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === oldItem);
      state.totalNumber--;
      if (existingItem.number === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== oldItem);//如果商品只剩一個，那就會去掉該商品項目
      } else {
        existingItem.number--;
        existingItem.allPrice = existingItem.number * existingItem.price;
      }
      updatedLocalstorage(state.cartItems,state.totalNumber);
    },
    //直接去掉全部商品
    removeAllItem(state, action) {
      const oldItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === oldItem);
      state.cartItems = state.cartItems.filter((item) => item.id !== oldItem);
      state.totalNumber = state.totalNumber - existingItem.number;
      updatedLocalstorage(state.cartItems,state.totalNumber);
    },
    //結帳完後去掉購物車內的商品
    clearItem(state, action) {
      state.cartItems=[];
      state.totalNumber=0;
      //從localstorage刪除
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalNumber");
    },
    
  },

});

export const cartActions = cartSlice.actions;

export default cartSlice;
