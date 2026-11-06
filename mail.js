/* Mobile booking email navigation.
   No credential, API key or email content is ever sent from this site. */
"use strict";
(() => {
  const mailSearchById = Object.freeze({
    "19f3c2b374cbd6b9": { title:"星宇航空 · 機票確認信", query:'subject:"預訂行程已完成" after:2026/06/01'},
    "1a1832a4ae06e204": { title:"Amara Bangkok · 飯店訂房信", query:'"Amara Bangkok Hotel" after:2026/03/01'},
    "1a1833a9b70fd8e4": { title:"機場接送 · 預約通知", query:'subject:"機場接送預約通知" after:2026/10/01'},
    "1a130aaaca99f010": { title:"Lennon’s · 訂位確認信", query:'"Lennon" "Reservation" after:2026/10/01'},
    "1a130c15c1ac6cfd": { title:"Health Land Sathorn · 按摩確認信", query:'"Health Land" "Booking Confirmation" after:2026/10/01'},
    "1a18229e9797e6a2": { title:"建興海鮮 · 訂位確認信", query:'"Somboon Seafood Surawong" after:2026/10/01'},
    "1a0f5b6fb9b552f0": { title:"White Party · 電子票券信", query:'"WHITE PARTY BANGKOK" "E-Ticket" after:2026/09/01'},
    "1a13ad7c557853e1": { title:"Côte · 餐廳確認信", query:'"Côte by Mauro Colagreco" after:2026/10/01'}
  });
  const ua = navigator.userAgent || "";
  const ios = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
  const android = /Android/i.test(ua);
  const onMobile = () => ios || android || window.matchMedia("(max-width: 680px)").matches;
  let lastFocus = null;
  let sheet = null;
  function initSheet() {
    if(sheet) return sheet;
    sheet = document.createElement("div");
    sheet.id = "mailSheet";
    sheet.className = "mail-sheet-layer";
    sheet.hidden = true;
    sheet.innerHTML = [
      '<div class="mail-sheet-backdrop" data-mail-close="1" aria-hidden="true"></div>',
      '<section class="mail-sheet" role="dialog" aria-modal="true" aria-labelledby="mailSheetTitle" aria-describedby="mailSheetHelp">',
      '  <div class="mail-sheet-head"><span>BOOKING MAIL / GMAIL</span><button type="button" class="mail-sheet-close" data-mail-close="1" aria-label="關閉信件選單">✕</button></div>',
      '  <div class="mail-sheet-deco" aria-hidden="true">✳</div>',
      '  <h3 id="mailSheetTitle">訂位確認信</h3>',
      '  <p id="mailSheetHelp" class="mail-sheet-help">由於 Gmail 手機版未必能直接開啟指定信件，建議優先從 App 搜尋。若跳轉失敗，也可以複製下方搜尋文字。</p>',
      '  <div class="mail-sheet-actions">',
      '    <a id="mailAppAction" class="mail-sheet-primary" href="https://mail.google.com/" rel="noopener noreferrer">嘗試在 Gmail App 搜尋 <span aria-hidden="true">↗</span></a>',
      '    <button type="button" id="mailCopyAction" class="mail-sheet-secondary">複製 Gmail 搜尋字詞 <span aria-hidden="true">⧉</span></button>',
      '    <a id="mailWebAction" class="mail-sheet-text-link" href="https://mail.google.com/" target="_blank" rel="noopener noreferrer">改用網頁版開啟原信 ↗</a>',
      '  </div>',
      '  <div class="mail-sheet-query"><span>SEARCH IN GMAIL</span><code id="mailSearchText" tabindex="0"></code></div>',
      '  <p class="mail-sheet-disclaimer">搜尋結果只會出現在有收到信件的 Gmail 帳號中。岳君若無法開啟，請先轉寄原信給他。</p>',
      '</section>'
    ].join("");
    document.body.appendChild(sheet);
    const close = () => {
      sheet.hidden = true;
      document.body.classList.remove("mail-sheet-open");
      if(lastFocus && lastFocus.isConnected) lastFocus.focus();
    };
    sheet.querySelectorAll("[data-mail-close]").forEach(x => x.addEventListener("click",close));
    document.addEventListener("keydown",event => {
      if(sheet.hidden) return;
      if(event.key === "Escape") { event.preventDefault();close();return; }
      if(event.key !== "Tab") return;
      const focusable = Array.from(sheet.querySelectorAll("button,a[href]"));
      if(!focusable.length) return;
      if(event.shiftKey && document.activeElement === focusable[0]) {
        event.preventDefault();focusable[focusable.length-1].focus();
      } else if(!event.shiftKey && document.activeElement === focusable[focusable.length-1]) {
        event.preventDefault();focusable[0].focus();
      }
    });
    sheet.querySelector("#mailCopyAction").addEventListener("click", async () => {
      const value=sheet.querySelector("#mailSearchText").textContent;
      const button=sheet.querySelector("#mailCopyAction");
      try {
        if(navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
        } else {
          const field=document.createElement("textarea");
          field.value=value;field.setAttribute("readonly","true");
          field.style.cssText="position:fixed;left:-9999px;top:0";
          document.body.append(field);field.select();
          const copied=document.execCommand("copy");field.remove();
          if(!copied) throw new Error("Copy unavailable");
        }
        button.textContent="已複製！請在 Gmail 搜尋列貼上 ✓";
        window.setTimeout(() => { if(button.isConnected) button.textContent="複製 Gmail 搜尋字詞 ⧉"; },2500);
      } catch(_error) {
        button.textContent="複製失敗，請長按下方搜尋文字";
        sheet.querySelector("#mailSearchText").focus();
      }
    });
    return sheet;
  }
  function openMailSheet(anchor, messageId) {
    const data=mailSearchById[messageId];
    if(!data)return;
    const el=initSheet();
    lastFocus=anchor;
    el.querySelector("#mailSheetTitle").textContent=data.title;
    el.querySelector("#mailSearchText").textContent=data.query;
    el.querySelector("#mailCopyAction").textContent="複製 Gmail 搜尋字詞 ⧉";
    el.querySelector("#mailWebAction").href="https://mail.google.com/mail/u/0/#all/"+messageId;
    const app=el.querySelector("#mailAppAction");
    if(ios){
      app.href="googlegmail:///search?query="+encodeURIComponent(data.query);
      app.innerHTML='嘗試在 Gmail App 搜尋 <span aria-hidden="true">↗</span>';
      el.querySelector("#mailSheetHelp").textContent="iPhone 將嘗試切換至 Gmail App 並搜尋。此功能依 Gmail 版本可能失效，若沒有正確開啟，請用下方「複製搜尋字詞」。";
    }else if(android){
      app.href="intent://#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;package=com.google.android.gm;S.browser_fallback_url=https%3A%2F%2Fmail.google.com%2F;end";
      app.innerHTML='開啟 Gmail App <span aria-hidden="true">↗</span>';
      el.querySelector("#mailSheetHelp").textContent="Android 可嘗試啟動 Gmail App，但需先複製搜尋字詞再貼到 App 搜尋列。部分瀏覽器可能改開網頁版。";
    }else{
      app.href="https://mail.google.com/mail/u/0/#search/"+encodeURIComponent(data.query);
      app.innerHTML='在 Gmail 搜尋這封信 <span aria-hidden="true">↗</span>';
    }
    el.hidden=false;
    document.body.classList.add("mail-sheet-open");
    el.querySelector(".mail-sheet-close").focus();
  }
  document.addEventListener("click",event => {
    if(!onMobile())return;
    const link=event.target.closest("a[href]");
    if(!link || link.id==="mailWebAction") return;
    const href=link.getAttribute("href") || "";
    if(!href.startsWith("https://mail.google.com/mail/"))return;
    const match=href.match(/#all\/([a-f0-9]{16,})/i);
    if(!match || !mailSearchById[match[1]])return;
    event.preventDefault();
    openMailSheet(link,match[1]);
  });
})();