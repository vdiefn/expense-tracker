## 老爸的私房錢 （又名【廣志の私帳】）
### 這是一個簡單的網路記帳工具

### 功能
使用者可以：
- 可以註冊帳號
  * 註冊之後，可以登入/登出
  * 只有登入狀態的使用者可以看到 app 內容，否則一律被導向登入頁
- 在首頁一次瀏覽所有支出的清單
- 在首頁看到所有支出清單的總金
- 新增一筆支出
- 編輯支出
- 刪除任何一筆支
- 根據「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和

## 開發工具
- Node.js
- Express@4.16.4
- Express-handlebars@3.0.0
- dotenv@16.0.3
- Mongoose@5.9.13
- Method-override@3.0.0
- Express-session@1.17.1
- Passport@0.4.1
- Passport-local@1.0.0
- Connect-flash@0.1.1
- Bcrypt.js@2.4.3
- Passport-Facebook@3.0.0

## 開始使用
- clone專案至電腦
- 進入專案資料夾
- 專案下載完成後輸入：npm install
- 安裝完成後接續安裝Express, Express-handlebars......等
- 新增.env檔案設定環境變數，可於.env.example內看到更多環境變數的設定。
- 新增種子資料：npm run seed
- 安裝完成會看到：category seeder done! 以及 Demo user seeder done!
- 啟動程式請輸入：npm run dev
- 成功啟動後會於終端機看到：Express is running on http://localhost:3000 以及 mongodb connected!
- 於瀏覽器輸入http://localhost:3000 後可開始使用