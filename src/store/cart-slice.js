import { createSlice } from "@reduxjs/toolkit";

const itemS =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const totalNumber =
  localStorage.getItem("totalNumber") !== null
    ? JSON.parse(localStorage.getItem("totalNumber"))
    : 0;

const initialState = { itemS: itemS, totalNumber: totalNumber };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    onAdd(state, action) {
      const newItem = action.payload;
      if (newItem.quantity === 0) {
        return;
      }

      const existingItem = state.itemS.find((item) => item.id === newItem.id);
      state.totalNumber += newItem.quantity;
      let temp;
      if (!existingItem) {
        state.itemS.push({
          id: newItem.id,
          price: newItem.price,
          number: newItem.number,
          allPrice: newItem.price,//同種商品的總金額
          name: newItem.title,
          img: newItem.img,
        });
        temp = [...state.itemS];
        for (let i = temp.length - 1; i < temp.length; i++) {
          temp[i].allPrice = temp[i].price * newItem.quantity;
          temp[i].number = newItem.quantity; //淺複製
        }
      } else {
        existingItem.number += newItem.quantity;

        existingItem.allPrice =
          existingItem.allPrice + existingItem.price * newItem.quantity;
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.itemS.map((item) => item))
      );

      localStorage.setItem("totalNumber", JSON.stringify(state.totalNumber));
    },
    addItemToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.itemS.find((item) => item.id === newItem.id);
      state.totalNumber++;
      if (!existingItem) {
        state.itemS.push({
          id: newItem.id,
          price: newItem.price,
          number: newItem.number,
          allPrice: newItem.price,
          name: newItem.title,
          img: newItem.img,
        });
      } else {
        existingItem.number++;

        existingItem.allPrice = existingItem.allPrice + existingItem.price;
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.itemS.map((item) => item))
      );

      localStorage.setItem("totalNumber", JSON.stringify(state.totalNumber));
    },
    removeItemToCart(state, action) {
      const oldItem = action.payload;

      const existingItem = state.itemS.find((item) => item.id === oldItem);
      state.totalNumber--;
      if (existingItem.number === 1) {
        state.itemS = state.itemS.filter((item) => item.id !== oldItem);
      } else {
        existingItem.number--;
        existingItem.allPrice = existingItem.number * existingItem.price;
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.itemS.map((item) => item))
      );
      localStorage.setItem("totalNumber", JSON.stringify(state.totalNumber));
    },
    removeAllItem(state, action) {
      const oldItem = action.payload;

      const existingItem = state.itemS.find((item) => item.id === oldItem);
      state.itemS = state.itemS.filter((item) => item.id !== oldItem);
      state.totalNumber = state.totalNumber - existingItem.number;
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.itemS.map((item) => item))
      );
      localStorage.setItem("totalNumber", JSON.stringify(state.totalNumber));
    },
    clearItem(state, action) {
      localStorage.removeItem("cartItems", JSON.stringify(state.itemS));
      localStorage.removeItem("totalNumber", JSON.stringify(state.totalNumber));
      return initialState;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
