# Fgo e-commerce

本次專案是小型電商網站，除了基本商品購買功能，也提供了會員功能


在個人頁面提供了查詢已訂購商品和刪除訂購商品，也可以更新個人資料

專案網址
https://fgo-project-260c6.firebaseapp.com/
![image](https://github.com/louis4116/picuture/blob/main/FGO%E5%95%86%E5%93%81%E5%B0%8F%E8%88%96-%E9%87%8D%E6%A7%8B.png)

# 專案主要使用到的技術

1.使用lazy處理載入問題，使用suspense和自製的loading畫面來處理元件尚未讀取之前的空窗期

2.React-Router來進行頁面管理，並且使用React-Router提供的context來處理元件內的資料傳輸

3.路由方面，有獨立拉出來進行管理，並且用protected route來判斷使用者可進入的頁面

4.登入、註冊和結帳的表單使用react-hook-form製作，並且使用yup來進行驗證

5.在尚未結帳的商品方面，主要使用Redux Toolkit來進行全域的狀態管理，並且使用localStorage來儲存在瀏覽器

6.使用RTK Query來與Firebase進行串接，使用了Firebase提供的Firestore、Authentication和Storage功能

# 專案主要架構
![image](https://github.com/louis4116/picuture/blob/main/%E6%9E%B6%E6%A7%8B%E5%9C%96.png)

# 專案歷程

  此專案經歷過兩個時段，第一個是在去年12月時製作，那時候只有購物車功能，且在串接API時不是用custom-hook，表單的製作也沒有把UI給獨立出來，造成程式碼在閱讀上會有點困難。 

  在3月中時，把這項專案進行重構，除了重構之外也增加了會員功能，重構方面主要幾點，第一是把結帳表單的UI從原本的物件抽離出來，讓物件內的程式碼更簡潔，第二是新增page的資料夾，讓每一頁分離出來，物件的顯示與否也是寫在這邊，第三是連接API的方式改為RTK Query，會使用RTK Query的原因，是因為原本管理商品的數量就是用Redux Toolkit，而RTK Query的管理與Redux Toolkit相同，可以集中在一個地方進行管理，所以管理上也比較容易。 

  在重構這個專案時，主要遇到的一些困難點，像是在串接API時，使用了RTK Query，而這個hook提供了 data、error、isLoading，但是react在第一次渲染的時候，會發生data回傳undefined，isLoading是false的狀況，所以後來就用data來進行判斷，不使用這個hook提供的isLoading來判斷要不要有loading的畫面，還有在撰寫商品頁面的RWD時，原本想要像購物車一樣使用createPortal，但是在圖片的大小會出現問題，因為我的商品圖片的大小都不一樣，如果使用createPortal來跳出一個畫面，而不是給予一整頁空間的話，那麼在縮放上就會出現問題。 
