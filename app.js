/* BANGKOK AFTER DARK — source of truth: latest travel workbook + confirmed Gmail bookings (Nov 2026).
   Public website: never include booking PINs, confirmation codes, QR codes, payment cards, or pickup home addresses. */
"use strict";

const gmailBase = "https://mail.google.com/mail/u/0/#all/";
const mail = Object.freeze({
  flight:"19f3c2b374cbd6b9", hotel:"1a1832a4ae06e204", airport:"1a1833a9b70fd8e4",
  lennons:"1a130aaaca99f010", massage:"1a130c15c1ac6cfd",
  seafood:"1a18229e9797e6a2", whiteparty:"1a0f5b6fb9b552f0",
  cote:"1a13ad7c557853e1"
});

/* Monochrome brand SVGs are immune to iOS emoji font substitution. */
function siteIconSvg(name, className="site-icon") {
  const shapes={
    sparkle:'<path d="M12 2.75v5.5M12 15.75v5.5M2.75 12h5.5M15.75 12h5.5M5.46 5.46l3.89 3.89M14.65 14.65l3.89 3.89M18.54 5.46l-3.89 3.89M9.35 14.65l-3.89 3.89"/>',
    arrow:'<path d="M7 17 17 7M7 7h10v10"/>',
    plane:'<path d="M19.6 4.4c.9-.9 2.1-.9 2.5-.5.4.4.3 1.6-.5 2.5L15 13l2 7-2.4 1.4-4.3-6.1-4.1 4.1-3.2.2.2-3.2 4.1-4.1-6.1-4.3L2.6 5.6l7 2z"/>',
    sun:'<circle cx="12" cy="12" r="4.1"/><path d="M12 1.7v2.5M12 19.8v2.5M1.7 12h2.5M19.8 12h2.5M4.72 4.72l1.77 1.77m11.02 11.02 1.77 1.77M19.28 4.72l-1.77 1.77M6.49 17.51l-1.77 1.77"/>',
    diamond:'<path d="m12 2 9.5 10L12 22 2.5 12 12 2Z"/><path d="M12 7v10M7 12h10"/>'
  };
  if(!Object.prototype.hasOwnProperty.call(shapes,name))return "";
  return '<svg class="'+className+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">'+shapes[name]+'</svg>';
}

const mapLink = place => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place);
const mailLink = key => key && mail[key] ? gmailBase + mail[key] : null;
const stateNames = Object.freeze({ confirmed:"已確認", planned:"規劃中", flexible:"彈性安排" });

const days = [
  {
    date:"2026-12-30",tab:"12.30",weekday:"週三",name:"DAY 01",headline:"Touchdown, Bangkok.",subtitle:"從抵達開始，讓城市帶我們走。",symbol:"plane",
    route:["Amara Bangkok Hotel","Siam Discovery Bangkok","Central Embassy Bangkok","Lennon's Rosewood Bangkok"],
    events:[
      {time:"07:00",type:"交通",title:"出發去桃園機場",desc:"已確認台灣端機場接送，2 人。集合位置請查看私人通知，不在公開網站顯示。",status:"confirmed",mail:"airport"},
      {time:"09:25",type:"航班",title:"星宇 JX741｜桃園 → 曼谷",desc:"桃園 T2 起飛，12:35 抵達曼谷 BKK。抵達與出發時間均為各機場當地時間。",status:"confirmed",place:"Suvarnabhumi Airport Bangkok",mail:"flight"},
      {time:"15:00 起",type:"住宿",title:"Check-in · Amara Bangkok",desc:"行政雙人房，12/30–1/3 共 4 晚，含早餐。入住時間依飯店確認信。",status:"confirmed",place:"Amara Bangkok Hotel 180/1 Surawong",mail:"hotel"},
      {time:"下午",type:"城市散步",title:"Siam Discovery 領取 White Party 手環",desc:"12/30 11:00–18:00，4F Welcome Center（Virgin Active 對面）。需先完成 12/15 起開放的票券預登記。若抵達後來不及，可依票券規範改至會場領取。",status:"planned",place:"Siam Discovery Bangkok",mail:"whiteparty"},
      {time:"傍晚",type:"咖啡",title:"Bacha Coffee · Siam Paragon",desc:"依當天交通與領手環進度彈性前往。",status:"flexible",place:"Bacha Coffee Siam Paragon Bangkok"},
      {time:"晚餐",type:"美食",title:"Central Embassy 吃晚餐",desc:"以當晚想吃的料理決定，不預先鎖定餐廳。",status:"flexible",place:"Central Embassy Bangkok"},
      {time:"20:00",type:"預約酒吧",title:"Lennon's · Rosewood Bangkok",desc:"已確認 4 位。Smart casual，建議包鞋，訂位逾 15 分鐘可能釋出。",status:"confirmed",place:"Lennon's Rosewood Bangkok",mail:"lennons"},
      {time:"深夜",type:"Nightlife",title:"BEEF / DJ Station",desc:"看體力與當晚氣氛自由安排，不是固定預約。",status:"flexible",place:"DJ Station Bangkok"}
    ]
  },
  {
    date:"2026-12-31",tab:"12.31",weekday:"週四",name:"DAY 02",headline:"The last dance of 2026.",subtitle:"一場按摩、一頓海鮮，然後跳舞迎接新年。",symbol:"sparkle",
    route:["Amara Bangkok Hotel","Health Land Sathorn Bangkok","Somboon Seafood Surawong Bangkok","Siam Paragon Bangkok"],
    events:[
      {time:"早上",type:"早餐",title:"飯店早餐",desc:"慢慢開始跨年這一天。",status:"planned",place:"Amara Bangkok Hotel"},
      {time:"中午",type:"咖啡 / 午餐",title:"Rocket Coffeebar",desc:"店址與當天營業資訊建議出發前再確認。",status:"planned",place:"Rocket Coffeebar Bangkok"},
      {time:"14:00",type:"預約按摩",title:"Health Land · Sathorn",desc:"已確認 2 人，泰式草藥熱敷按摩。預計安排約 2 小時。",status:"confirmed",place:"Health Land Sathorn Bangkok",mail:"massage"},
      {time:"18:00",type:"預約晚餐",title:"建興海鮮 · Surawong",desc:"已確認 6 人，Main Dining。餐廳提示訂位可保留約 15 分鐘，建議提前抵達。",status:"confirmed",place:"Somboon Seafood Surawong Branch Bangkok",mail:"seafood"},
      {time:"夜間",type:"NEW YEAR'S EVE",title:"White Party · AmaXon",desc:"已找到 VIP NYE 票券。須先預登記並領取手環，票券標示最晚 22:00 入場，建議 21:00 前抵達。",status:"confirmed",place:"Paragon Hall Siam Paragon Bangkok",mail:"whiteparty"}
    ]
  },
  {
    date:"2027-01-01",tab:"01.01",weekday:"週五",name:"DAY 03",headline:"A new year, a slow morning.",subtitle:"2027 的第一天，走進曼谷有趣的街區。",symbol:"sun",
    route:["Amara Bangkok Hotel","Song Wat Road Bangkok","Dusit Central Park Bangkok"],
    events:[
      {time:"早上",type:"早餐",title:"飯店早餐 · 慢慢醒來",desc:"不用趕行程，把節奏留給自己。",status:"planned",place:"Amara Bangkok Hotel"},
      {time:"中午後",type:"街區散步",title:"Song Wat Road · 宋瓦路",desc:"老城區的咖啡店、設計小店、老建築，適合隨意走走。",status:"planned",place:"Song Wat Road Bangkok"},
      {time:"下午",type:"街區探索",title:"Dusit Central Park",desc:"市中心逛街、散步與補充能量。",status:"planned",place:"Dusit Central Park Bangkok"},
      {time:"晚餐",type:"隨興美食",title:"今晚吃什麼？",desc:"預留給現場想吃的店，沒有固定訂位。",status:"flexible"},
      {time:"深夜",type:"Nightlife",title:"曼谷夜生活",desc:"夜店、酒吧或三溫暖依當晚狀況決定。",status:"flexible"}
    ]
  },
  {
    date:"2027-01-02",tab:"01.02",weekday:"週六",name:"DAY 04",headline:"A little luxury.",subtitle:"讓午後療癒，讓夜晚有儀式感。",symbol:"diamond",
    route:["Amara Bangkok Hotel","Côte by Mauro Colagreco Capella Bangkok"],
    events:[
      {time:"早上",type:"早餐",title:"飯店早餐",desc:"最後一個完整的曼谷白天。",status:"planned",place:"Amara Bangkok Hotel"},
      {time:"13:00",type:"按摩規劃",title:"Makkha Health & Spa",desc:"行程表規劃 13:00；尚未核對確認信，分店也待確認，請勿當作已完成預約。",status:"planned"},
      {time:"午後",type:"自由散步",title:"留一點時間給曼谷",desc:"視按摩分店位置與交通安排，避免晚餐遲到。",status:"flexible"},
      {time:"18:30",type:"預約 Fine Dining",title:"Côte by Mauro Colagreco",desc:"Capella Bangkok，5 位，Carte Blanche 8 道式。Smart casual：男性長褲與包鞋，不可穿短褲或拖鞋。取消與更動須留意 24 小時規定。",status:"confirmed",place:"Côte by Mauro Colagreco Capella Bangkok",mail:"cote"}
    ]
  },
  {
    date:"2027-01-03",tab:"01.03",weekday:"週日",name:"DAY 05",headline:"Until next time, BKK.",subtitle:"把最後一點曼谷的光，帶回家。",symbol:"arrow",
    route:["Amara Bangkok Hotel","Suvarnabhumi Airport Bangkok"],
    events:[
      {time:"早上",type:"早餐",title:"飯店早餐、整理行李",desc:"最後檢查護照、行李與隨身物品。",status:"planned",place:"Amara Bangkok Hotel"},
      {time:"11:00 前後",type:"住宿",title:"Amara Bangkok 退房",desc:"行程表計畫約 11:00 離開；飯店確認的最晚退房時間為 12:00。",status:"planned",place:"Amara Bangkok Hotel",mail:"hotel"},
      {time:"中午",type:"機場交通",title:"前往 Suvarnabhumi Airport",desc:"計畫使用機場捷運；請預留轉乘、安檢與出境時間。泰國端送機交通尚無確認信。",status:"planned",place:"Suvarnabhumi Airport Bangkok"},
      {time:"13:45",type:"回程航班",title:"星宇 JX742｜曼谷 → 桃園",desc:"曼谷 BKK 起飛，18:25 抵達桃園 T2。",status:"confirmed",place:"Suvarnabhumi Airport Bangkok",mail:"flight"}
    ]
  }
];

const bookings = [
  {type:"AIR / TRANSPORT",name:"STARLUX · JX741 / JX742",detail:"12/30 去程・01/03 回程",date:"30 DEC — 03 JAN",mail:"flight"},
  {type:"STAY",name:"Amara Bangkok Hotel",detail:"12/30–01/03・兩人・四晚",date:"04 NIGHTS",mail:"hotel"},
  {type:"TRANSFER",name:"台灣端機場接送",detail:"12/30 07:00・2 人",date:"30 DEC / 07:00",mail:"airport"},
  {type:"BAR",name:"Lennon's",detail:"12/30 20:00・4 人",date:"30 DEC / 20:00",mail:"lennons"},
  {type:"SPA",name:"Health Land Sathorn",detail:"12/31 14:00・2 人",date:"31 DEC / 14:00",mail:"massage"},
  {type:"DINNER",name:"建興海鮮 · Surawong",detail:"12/31 18:00・6 人",date:"31 DEC / 18:00",mail:"seafood"},
  {type:"PARTY",name:"White Party · AmaXon",detail:"12/31 NYE・記得先預登記",date:"31 DEC / NIGHT",mail:"whiteparty"},
  {type:"FINE DINING",name:"Côte · Capella Bangkok",detail:"01/02 18:30・5 人",date:"02 JAN / 18:30",mail:"cote"}
];

const $ = selector => document.querySelector(selector);
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
function makeRoute(points) {
  if(!points || points.length<2) return "https://www.google.com/maps/";
  const q = new URLSearchParams({api:"1",origin:points[0],destination:points[points.length-1],travelmode:"driving"});
  if(points.length>2) q.set("waypoints",points.slice(1,-1).join("|"));
  return "https://www.google.com/maps/dir/?" + q.toString();
}
function entryMarkup(entry) {
  const status = entry.status || "planned";
  const map = entry.place ? '<a class="action-btn map" href="'+mapLink(entry.place)+'" target="_blank" rel="noopener noreferrer" aria-label="開啟 '+escapeHtml(entry.title)+' Google Maps">地圖導航 <span class="arrow-wrap" aria-hidden="true">'+siteIconSvg("arrow","arrow-svg")+'</span></a>' : "";
  const email = mailLink(entry.mail) ? '<a class="action-btn mail" href="'+mailLink(entry.mail)+'" target="_blank" rel="noopener noreferrer" aria-label="開啟 '+escapeHtml(entry.title)+' 訂位信">訂位信 <span class="arrow-wrap" aria-hidden="true">'+siteIconSvg("arrow","arrow-svg")+'</span></a>' : "";
  return '<article class="timeline-entry"><div class="timeline-time">'+escapeHtml(entry.time)+'</div><div class="timeline-rail" aria-hidden="true"></div><div class="entry-card"><div><div class="entry-labels"><span class="category">'+escapeHtml(entry.type)+'</span><span class="state state-'+status+'">'+stateNames[status]+'</span></div><h4 class="entry-title">'+escapeHtml(entry.title)+'</h4><p class="entry-note">'+escapeHtml(entry.desc)+'</p></div>'+(map||email?'<div class="entry-actions">'+map+email+'</div>':"")+'</div></article>';
}
function bookingMarkup(booking) {
  return '<a class="booking-card" href="'+mailLink(booking.mail)+'" target="_blank" rel="noopener noreferrer" aria-label="在 Gmail 開啟 '+escapeHtml(booking.name)+' 確認信"><span class="booking-type">'+escapeHtml(booking.type)+'</span><h3>'+escapeHtml(booking.name)+'</h3><p class="booking-desc">'+escapeHtml(booking.detail)+'</p><div class="booking-foot"><strong>'+escapeHtml(booking.date)+'</strong><span>OPEN EMAIL '+siteIconSvg("arrow","booking-arrow-svg")+'</span></div></a>';
}
function getDayIndex() {
  const day = new URLSearchParams(location.search).get("day");
  const n = Number(day);
  return Number.isInteger(n) && n>=1 && n<=days.length ? n-1 : 0;
}
let currentDay = getDayIndex();
function drawDay(index, updateHistory=true) {
  currentDay = index;
  const day = days[index];
  document.querySelectorAll(".day-tab").forEach((tab,i)=>{
    tab.setAttribute("aria-selected",String(i===index));
    tab.tabIndex=i===index?0:-1;
  });
  $("#dayFeature").innerHTML='<div><div class="feature-kicker">'+escapeHtml(day.name)+' / '+escapeHtml(day.weekday)+' / '+escapeHtml(day.date)+'</div><h3 class="feature-title">'+escapeHtml(day.headline)+'</h3><p class="feature-desc">'+escapeHtml(day.subtitle)+'</p></div><div class="feature-graphic" aria-hidden="true">'+siteIconSvg(day.symbol,"feature-svg")+'</div>';
  $("#itemCount").textContent=String(day.events.length).padStart(2,"0");
  $("#timeline").innerHTML=day.events.map(entryMarkup).join("");
  $("#dayRoute").href=makeRoute(day.route);
  $("#dayRoute").setAttribute("aria-label",day.tab+" 的 Google Maps 路線");
  if(updateHistory) {
    const url = new URL(location.href);
    url.searchParams.set("day",String(index+1).padStart(2,"0"));
    history.replaceState(null,"",url.pathname+url.search+url.hash);
  }
}
function initTabs() {
  $("#dayTabs").innerHTML=days.map((day,i)=>'<button type="button" class="day-tab" role="tab" aria-selected="'+(i===currentDay)+'" tabindex="'+(i===currentDay?0:-1)+'" data-index="'+i+'"><span class="day-num">'+day.name+'</span><span class="day-date">'+day.tab+'</span><span class="day-name">'+day.weekday+'</span></button>').join("");
  $("#dayTabs").addEventListener("click", e=>{
    const tab=e.target.closest(".day-tab");if(!tab)return;
    drawDay(Number(tab.dataset.index));
  });
  $("#dayTabs").addEventListener("keydown", e=>{
    if(!["ArrowRight","ArrowLeft","Home","End"].includes(e.key))return;
    e.preventDefault();
    let next=e.key==="Home"?0:e.key==="End"?days.length-1:(currentDay+(e.key==="ArrowRight"?1:-1)+days.length)%days.length;
    drawDay(next);document.querySelectorAll(".day-tab")[next].focus();
  });
  window.addEventListener("popstate",()=>drawDay(getDayIndex(),false));
  drawDay(currentDay,false);
}

/* Entire itinerary, generated from the same days[] as the daily view. */
function renderOverview() {
  const jumpTarget=$("#overviewJumps");
  const countTarget=$("#overviewCount");
  const target=$("#overviewDays");
  if(!jumpTarget || !countTarget || !target)return;
  const count=days.reduce((n,day)=>n+day.events.length,0);
  const confirmed=days.reduce((n,day)=>n+day.events.filter(ev=>ev.status==="confirmed").length,0);
  countTarget.textContent=days.length+" 天・"+count+" 項安排・"+confirmed+" 項已確認";
  jumpTarget.innerHTML=days.map((day,index)=>
    '<a href="#overview-day-'+(index+1)+'" class="overview-jump"><span>DAY '+String(index+1).padStart(2,"0")+'</span><strong>'+escapeHtml(day.tab)+'</strong></a>'
  ).join("");
  target.innerHTML=days.map((day,index)=>{
    const meta='<div class="overview-day-meta">'+
      '<span class="overview-day-kicker">'+escapeHtml(day.name)+' / '+escapeHtml(day.weekday)+'</span>'+
      '<h3>'+escapeHtml(day.tab)+'</h3>'+
      '<p class="overview-day-headline">'+escapeHtml(day.headline)+'</p>'+
      '<p class="overview-day-subtitle">'+escapeHtml(day.subtitle)+'</p>'+
      '<a href="?day='+String(index+1).padStart(2,"0")+'#itinerary" data-overview-day="'+index+'" class="overview-open-day">查看當天詳細行程 '+siteIconSvg("arrow","overview-link-icon")+'</a>'+
      '</div>';
    const events=day.events.map(event=>{
      const status=event.status||"planned";
      const map=event.place
        ? '<a href="'+mapLink(event.place)+'" class="overview-small-action" target="_blank" rel="noopener noreferrer" aria-label="在 Google Maps 查看 '+escapeHtml(event.title)+'" title="地圖">'+siteIconSvg("arrow","overview-action-icon")+'</a>'
        : "";
      const email=mailLink(event.mail)
        ? '<a href="'+mailLink(event.mail)+'" class="overview-small-action overview-email" target="_blank" rel="noopener noreferrer" aria-label="開啟 '+escapeHtml(event.title)+' 訂位確認信" title="訂位信">'+siteIconSvg("arrow","overview-action-icon")+'</a>'
        : "";
      return '<li class="overview-event">'+
        '<time class="overview-event-time">'+escapeHtml(event.time)+'</time>'+
        '<div class="overview-event-main"><strong>'+escapeHtml(event.title)+'</strong><span>'+escapeHtml(event.type)+'</span></div>'+
        '<span class="overview-event-status overview-'+status+'"><i class="key-dot '+status+'"></i>'+stateNames[status]+'</span>'+
        '<div class="overview-event-actions">'+map+email+'</div>'+
      '</li>';
    }).join("");
    return '<article class="overview-day" id="overview-day-'+(index+1)+'">'+meta+'<ol class="overview-event-list">'+events+'</ol></article>';
  }).join("");
  target.addEventListener("click",event=>{
    const link=event.target.closest("[data-overview-day]");
    if(!link)return;
    event.preventDefault();
    drawDay(Number(link.dataset.overviewDay));
    const destination=document.getElementById("itinerary");
    if(destination)destination.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
  });
}

function updateCountdown() {
  const now=Date.now();
  const start=Date.parse("2026-12-30T00:00:00+07:00");
  const end=Date.parse("2027-01-04T00:00:00+07:00");
  const node=$("#countdown");
  if(now<start) {
    const d=Math.ceil((start-now)/86400000);
    node.innerHTML=d+' <small>'+ (d===1?"DAY TO GO":"DAYS TO GO") +'</small>';
  } else if(now<end) {
    node.innerHTML='WE ARE <small>IN BANGKOK '+siteIconSvg("sparkle","countdown-sparkle")+'</small>';
  } else {
    node.innerHTML='WHAT A <small>TRIP '+siteIconSvg("sparkle","countdown-sparkle")+'</small>';
  }
}
function init() {
  initTabs();
  renderOverview();
  $("#bookingGrid").innerHTML=bookings.map(bookingMarkup).join("");
  updateCountdown();
  window.setInterval(updateCountdown,60000);
}
document.addEventListener("DOMContentLoaded",init);