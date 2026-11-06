# BANGKOK AFTER DARK ✳
**Chia-Hao × Yueh-Chun · 2026.12.30 – 2027.01.03**

手機優先的曼谷跨年行程網站。採用 HTML / CSS / Vanilla JavaScript，無須套件、資料庫或 build step。

## 內容
- 5 天可切換行程（含固定時間、確認／規劃／彈性狀態）
- Google Maps 單站導航與每日路線
- 已核對 Gmail 訂位信件的捷徑
- 航班、飯店與 White Party 行前提醒
- 無編輯 UI，所有內容修改直接更新 \`app.js\` 和 \`index.html\`

## 發布到 GitHub Pages
在此 repo 選擇 **Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save**。

正式網址： https://tad820423NTU.github.io/bangkok_2026/

Pages 啟用後，對 \`main\` 的後續推送會自動更新網站。使用根目錄的 \`index.html\`，不需要 GitHub Actions。

## 修改行程
主要行程資料位於 \`app.js\` 的 \`days\` 陣列。確認信的 Gmail ID 位於 \`mail\` 物件，預約卡片位於 \`bookings\` 陣列。

## 隱私與使用限制
這是公開 GitHub repository 與公開 GitHub Pages 網站。**請勿將訂位編號、訂房 PIN、電子票券 QR code、護照資訊、信用卡或私人接送地址加入網站**。

Gmail 捷徑只是深層連結，只有登入有權存取該郵件的 Google 帳號才能閱讀；與伴侶共用時，需先各自收到或被轉寄相關郵件。Google Maps 按鈕開啟地點搜尋及方向指引，**不是讀取私人 Google Maps 收藏清單或操作帳戶**。

行程資料來源：使用者最新提供的「202612_泰國曼谷(9).xlsx」與截至 2026-11-06 經 Gmail 比對的訂位信。Makkha Spa 尚未有可確認的電子信件，保持「規劃中」。航班時間為各機場當地時間。
