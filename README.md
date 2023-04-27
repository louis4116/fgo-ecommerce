# Fgo e-commerce

本次專案是小型電商網站，除了基本商品購買功能，也提供了會員功能


在個人頁面提供了查詢已訂購商品和刪除訂購商品，也可以更新個人資料

專案網址
https://fgo-project-260c6.firebaseapp.com/


# 專案主要使用到的技術

1.使用lazy處理載入問題，使用suspense和自製的loading畫面來處理元件尚未讀取之前的空窗期

2.React-Router來進行頁面管理，並且使用React-Router提供的context來處理元件內的資料傳輸

3.路由方面，有獨立拉出來進行管理，並且用protected route來判斷使用者可進入的頁面

4.登入、註冊和結帳的表單使用react-hook-form製作，並且使用yup來進行驗證

5.在尚未結帳的商品方面，主要使用Redux Toolkit來進行全域的狀態管理，並且使用localStorage來儲存在瀏覽器

6.使用RTK Query來與Firebase進行串接，使用了Firebase提供的Firestore、Authentication和Storage功能
