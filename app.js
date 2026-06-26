const STORAGE_KEY = "dmvHuarenMarketLocalV1";

const seedListings = [
  {
    id: "rent-rockville",
    type: "rent",
    title: "Rockville 单间出租，近地铁和超市",
    price: "$850/月",
    area: "Rockville, MD",
    time: "12分钟前",
    tags: ["可立即入住", "包水电"],
    detailTags: ["单间", "拎包入住", "近地铁"],
    photoCount: 6,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=700&q=80",
    desc:
      "独立屋内单间出租，家具齐全，步行可到超市和公交站。适合学生或上班族，室友安静，公共区域保持干净。",
    owner: "Rockville 房东"
  },
  {
    id: "rent-wanted-bethesda",
    type: "wanted",
    title: "求租 Bethesda / Rockville 附近单间",
    price: "预算 $900/月",
    area: "Bethesda / Rockville",
    time: "28分钟前",
    tags: ["女生", "无宠物", "8月入住"],
    detailTags: ["近红线", "独立卫浴优先", "长租"],
    photoCount: 0,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=80",
    desc:
      "求租 Bethesda 或 Rockville 附近单间，希望交通方便、室友安静，可从 8 月开始入住。预算 900 美元左右。",
    owner: "Lisa Chen"
  },
  {
    id: "used-macbook",
    type: "used",
    title: "MacBook Pro 14 寸 9 成新，带原装充电器",
    price: "$980",
    area: "College Park, MD",
    time: "36分钟前",
    tags: ["可小刀", "自取"],
    detailTags: ["13英寸", "M1芯片", "8G+256G"],
    photoCount: 5,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80",
    desc:
      "自用电脑，外观保持很好，电池健康正常。适合学习、办公和轻度剪辑，可当面验机。",
    owner: "陈同学"
  },
  {
    id: "used-desk",
    type: "used",
    title: "IKEA 书桌和办公椅打包转让",
    price: "$120",
    area: "Fairfax, VA",
    time: "1小时前",
    tags: ["可自取", "家具"],
    detailTags: ["书桌", "办公椅", "可拆装"],
    photoCount: 4,
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=700&q=80",
    desc:
      "书桌和办公椅状态良好，搬家出清，适合学生或居家办公。Fairfax 自取，可帮忙搬到楼下。",
    owner: "Fairfax 卖家"
  }
];

const categories = [
  { key: "rent", name: "租房", icon: "房" },
  { key: "wanted", name: "求租", icon: "求" },
  { key: "used", name: "二手", icon: "物" }
];

const app = document.querySelector("#app");
let state = loadState();

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return {
    user: { name: "xlw0980", subtitle: "DMV 华人租房二手", avatar: "B" },
    listings: seedListings,
    favorites: ["rent-rockville"],
    drafts: [],
    history: [],
    conversations: [
      {
        id: "conv-rockville",
        listingId: "rent-rockville",
        name: "Rockville 房东",
        avatar: "王",
        lastMessage: "可以今晚 7 点以后看房，地址我发你。",
        time: "2分钟前",
        messages: ["你好，房间还在吗？", "还在，可以今晚 7 点以后看房。"]
      },
      {
        id: "conv-lisa",
        listingId: "rent-wanted-bethesda",
        name: "Lisa Chen",
        avatar: "L",
        lastMessage: "我有一间 Bethesda 附近单间，预算符合。",
        time: "18分钟前",
        messages: ["你好，我看到你的求租需求。", "我有一间 Bethesda 附近单间。"]
      }
    ]
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function allListings() {
  return [...state.listings].sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
}

function findListing(id) {
  return state.listings.find((entry) => entry.id === id) || state.listings[0];
}

function route() {
  const hash = location.hash.replace("#", "") || "home";
  const [page, id] = hash.split("/");
  document.body.dataset.page = page;

  if (page === "home") return renderHome();
  if (page === "category") return renderCategory(id || "all");
  if (page === "listing") return renderDetail(id);
  if (page === "publish") return renderPublish();
  if (page === "post-used") return renderUsedForm();
  if (page === "post-rent") return renderRentForm();
  if (page === "post-wanted") return renderWantedForm();
  if (page === "messages") return renderMessages();
  if (page === "conversation") return renderConversation(id);
  if (page === "me") return renderProfile();
  if (page === "me-posts") return renderSavedList("我的发布", myListings(), "你发布的信息会显示在这里。");
  if (page === "drafts") return renderDrafts();
  if (page === "favorites") return renderSavedList("我的收藏", favoriteListings(), "收藏过的帖子会显示在这里。");
  if (page === "history") return renderSavedList("浏览历史", historyListings(), "看过的帖子会显示在这里。");
  if (page === "feedback") return renderFeedback();
  if (page === "help") return renderHelp();
  if (page === "settings") return renderSettings();
  renderHome();
}

function renderHome() {
  app.innerHTML = `
    <section class="home-screen">
      ${mobileHeader()}

      <form class="home-search" data-search-form>
        <span class="search-symbol">⌕</span>
        <input name="q" placeholder="搜租房、求租、二手物品..." />
      </form>

      <div class="home-chips" aria-label="分类筛选">
        <a class="home-chip active" href="#category/all">全部</a>
        <a class="home-chip" href="#category/rent">租房</a>
        <a class="home-chip" href="#category/wanted">求租</a>
        <a class="home-chip" href="#category/used">二手</a>
      </div>

      <a class="today-strip" href="#category/all">
        <span class="strip-icon">新</span>
        <b>当前帖子 <strong>${state.listings.length}</strong> 条</b>
        <i></i>
        <b>租房 <strong>${countType("rent")}</strong> 条</b>
        <b>二手 <strong>${countType("used")}</strong> 条</b>
        <span class="strip-arrow">›</span>
      </a>

      <div class="home-feed">
        ${allListings().map(homeListingCard).join("")}
      </div>

      ${bottomNav("home")}
    </section>
  `;
}

function renderCategory(type, query = "") {
  const lowerQuery = query.trim().toLowerCase();
  const shown = allListings().filter((item) => {
    const matchesType = type === "all" || item.type === type;
    const text = `${item.title} ${item.area} ${item.price} ${item.desc}`.toLowerCase();
    return matchesType && (!lowerQuery || text.includes(lowerQuery));
  });

  app.innerHTML = `
    <section class="page-screen">
      ${pageHeader(type === "all" ? "全部信息" : categoryName(type))}
      <form class="home-search inner-search" data-search-form>
        <span class="search-symbol">⌕</span>
        <input name="q" value="${escapeHtml(query)}" placeholder="搜索关键词或地区" />
      </form>
      <div class="filters">
        <a class="chip ${type === "all" ? "active" : ""}" href="#category/all">全部</a>
        ${categories.map((c) => `<a class="chip ${type === c.key ? "active" : ""}" href="#category/${c.key}">${c.name}</a>`).join("")}
      </div>
      <div class="listing-list">
        ${shown.length ? shown.map(listingCard).join("") : emptyBlock("没有找到相关帖子")}
      </div>
      ${bottomNav("category")}
    </section>
  `;
}

function renderDetail(id) {
  const item = findListing(id);
  rememberHistory(item.id);
  const favored = state.favorites.includes(item.id);

  app.innerHTML = `
    <section class="page-screen">
      ${pageHeader("详情")}
      <div class="detail-layout">
        <div class="detail-gallery">
          <img class="detail-photo" src="${item.image}" alt="${escapeHtml(item.title)}" />
        </div>
        <article class="detail-panel">
          <div class="detail-title-row">
            <h1>${item.title}</h1>
            <button class="favorite-button ${favored ? "active" : ""}" type="button" data-favorite="${item.id}">
              ${favored ? "已收藏" : "♡ 收藏"}
            </button>
          </div>
          <div class="price">${item.price}</div>
          <div class="meta">
            <span>${item.area}</span>
            <span>${item.time}</span>
            ${item.tags.map((tag) => `<span class="pill">${tag}</span>`).join("")}
          </div>
          <p class="body-copy">${item.desc}</p>
          <div class="mini-note">建议先站内沟通，确认身份和细节后再交换私人联系方式。</div>
          <div class="detail-actions">
            <a class="secondary-button" href="#category/all">继续浏览</a>
            <button class="primary-button" type="button" data-contact="${item.id}">联系发布者</button>
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderPublish() {
  app.innerHTML = `
    <section class="page-screen">
      ${pageHeader("发布")}
      <div class="publish-grid">
        <a class="publish-card" href="#post-rent">
          <span class="category-icon">房</span>
          <span><b>发布房源</b><p>出租单间、主卧、整租或合租。</p></span>
          <span>›</span>
        </a>
        <a class="publish-card" href="#post-wanted">
          <span class="category-icon">求</span>
          <span><b>发布求租需求</b><p>说明预算、位置、入住时间和偏好。</p></span>
          <span>›</span>
        </a>
        <a class="publish-card" href="#post-used">
          <span class="category-icon">物</span>
          <span><b>发布二手物品</b><p>家具、数码、服饰和生活用品。</p></span>
          <span>›</span>
        </a>
      </div>
      ${bottomNav("publish")}
    </section>
  `;
}

function renderUsedForm() {
  app.innerHTML = formShell({
    kind: "used",
    title: "发布二手物品",
    intro: "适合家具、数码、服饰、母婴、运动用品等本地转让。",
    imageTitle: "物品照片",
    imageHelper: "可填图片链接；不填会使用默认图片。",
    fields: `
      ${inputField("title", "标题", "例如：IKEA 书桌 / MacBook Pro 9成新", true)}
      <div class="field-grid two">
        ${inputField("price", "价格", "$", true)}
        ${inputField("area", "所在地区", "例如：Rockville, MD", true)}
      </div>
      ${inputField("tags", "标签", "例如：可小刀, 自取, 家具")}
    `,
    category: "二手物品",
    chips: ["家具", "数码", "服饰", "母婴", "运动", "其他"],
    description: "补充尺寸、购买时间、取货方式...",
    note: "发布后会保存在本地版本里，可以在我的发布中查看。",
    submit: "发布二手物品"
  });
}

function renderRentForm() {
  app.innerHTML = formShell({
    kind: "rent",
    title: "发布房源",
    intro: "把租金、房型、入住时间和联系方式讲清楚，看房沟通会顺很多。",
    imageTitle: "房源照片",
    imageHelper: "可填图片链接；不填会使用默认房源图。",
    fields: `
      ${inputField("title", "标题", "例如：Rockville 单间出租，近地铁", true)}
      <div class="field-grid two">
        ${inputField("price", "月租", "$ / 月", true)}
        ${inputField("area", "所在地区", "例如：Rockville, MD", true)}
      </div>
      <div class="field-grid two">
        ${selectField("roomType", "房源类型", ["单间", "主卧", "整租", "合租"])}
        ${selectField("moveIn", "入住时间", ["可立即入住", "一周内", "下个月"])}
      </div>
      ${inputField("tags", "条件标签", "例如：独立卫浴, 包水电, 近地铁")}
    `,
    category: "租房",
    chips: ["独立卫浴", "包水电", "可做饭", "有车位", "近地铁", "可养宠物"],
    description: "介绍房间大小、室友情况、交通、家具、看房时间...",
    note: "发布后会保存在本地版本里，可以在我的发布中查看。",
    submit: "发布房源"
  });
}

function renderWantedForm() {
  app.innerHTML = formShell({
    kind: "wanted",
    title: "发布求租需求",
    intro: "告诉房东你想找什么位置、预算和入住时间，让合适房源主动找到你。",
    imageTitle: "需求封面",
    imageHelper: "可选图片链接；不填会使用默认求租图。",
    fields: `
      ${inputField("title", "需求标题", "例如：求租 Rockville 附近单间，8月入住", true)}
      <div class="field-grid two">
        ${inputField("price", "预算上限", "$ / 月", true)}
        ${inputField("area", "目标地区", "例如：Bethesda / Rockville", true)}
      </div>
      <div class="field-grid two">
        ${selectField("moveIn", "入住时间", ["可立即入住", "8月入住", "9月入住"])}
        ${selectField("roomType", "求租类型", ["单间", "主卧", "整租", "合租"])}
      </div>
      ${inputField("tags", "需求标签", "例如：近地铁, 独立卫浴, 长租")}
    `,
    category: "租房 > 求租需求",
    chips: ["近地铁", "独立卫浴", "女生优先", "无宠物", "长租", "可合租"],
    description: "描述你的预算、期望位置、室友偏好、作息和必须条件...",
    note: "求租需求发布后，其他用户可以通过站内消息联系你。",
    submit: "发布求租需求"
  });
}

function formShell(config) {
  return `
    <section class="page-screen form-page">
      ${pageHeader(config.title)}
      <p class="form-intro">${config.intro}</p>
      <form data-listing-form="${config.kind}">
        <section class="form-card">
          <h2>${config.imageTitle}</h2>
          <p class="helper">${config.imageHelper}</p>
          ${inputField("image", "图片链接", "https://...")}
        </section>
        <section class="form-card">
          <h2>基本信息</h2>
          <div class="field-grid">${config.fields}</div>
        </section>
        <section class="form-card">
          <h2>分类与条件</h2>
          <a class="select-like" href="#publish">${config.category}　›</a>
          <div class="chip-cloud" style="margin-top: 10px;">
            ${config.chips.map((chip, index) => `<button type="button" class="chip ${index < 2 ? "active" : ""}" data-chip="${chip}">${chip}</button>`).join("")}
          </div>
        </section>
        <section class="form-card">
          <h2>描述</h2>
          <div class="field"><textarea name="desc" placeholder="${config.description}" required></textarea></div>
        </section>
        <section class="form-card">
          <h2>联系方式</h2>
          <div class="contact-options">
            <button type="button" class="active">站内消息</button><button type="button">电话</button><button type="button">微信</button>
          </div>
          <div class="mini-note">${config.note}</div>
        </section>
        <div class="sticky-submit">
          <button class="secondary-button" type="button" data-save-draft="${config.kind}">存草稿</button>
          <button class="primary-button" type="submit">${config.submit}</button>
        </div>
      </form>
    </section>
  `;
}

function renderProfile() {
  const menus = [
    ["我的发布", "me-posts"],
    ["草稿", "drafts"],
    ["我的收藏", "favorites"],
    ["浏览历史", "history"],
    ["意见反馈", "feedback"],
    ["帮助中心", "help"],
    ["设置", "settings"]
  ];

  app.innerHTML = `
    <section class="page-screen me-screen">
      ${pageHeader("我的")}
      <section class="me-profile-card">
        <div class="avatar">${state.user.avatar}</div>
        <div>
          <strong>${state.user.name}</strong>
          <span>${state.user.subtitle}</span>
        </div>
      </section>
      <section class="me-menu">
        ${menus.map(([label, routeName]) => `<a href="#${routeName}"><b>${label}</b><span>›</span></a>`).join("")}
      </section>
      ${bottomNav("me")}
    </section>
  `;
}

function renderMessages() {
  app.innerHTML = `
    <section class="page-screen">
      ${pageHeader("消息")}
      <section class="message-list">
        ${state.conversations.length ? state.conversations.map(conversationItem).join("") : emptyBlock("还没有消息")}
      </section>
      ${bottomNav("messages")}
    </section>
  `;
}

function renderConversation(id) {
  const conversation = state.conversations.find((item) => item.id === id) || state.conversations[0];
  if (!conversation) return renderMessages();

  app.innerHTML = `
    <section class="page-screen">
      ${pageHeader(conversation.name)}
      <section class="chat-panel">
        ${conversation.messages.map((message, index) => `<div class="chat-bubble ${index % 2 ? "other" : "mine"}">${message}</div>`).join("")}
      </section>
      <form class="chat-compose" data-message-form="${conversation.id}">
        <input name="message" placeholder="输入消息..." required />
        <button type="submit">发送</button>
      </form>
    </section>
  `;
}

function renderSavedList(title, entries, emptyText) {
  app.innerHTML = `
    <section class="page-screen">
      ${pageHeader(title)}
      <div class="listing-list">
        ${entries.length ? entries.map(listingCard).join("") : emptyBlock(emptyText)}
      </div>
      ${bottomNav(title === "我的收藏" ? "me" : "category")}
    </section>
  `;
}

function renderDrafts() {
  app.innerHTML = `
    <section class="page-screen">
      ${pageHeader("草稿")}
      <section class="subpage-card">
        ${
          state.drafts.length
            ? `<div class="subpage-list">${state.drafts.map((draft) => `<a href="#publish">${draft.title || "未命名草稿"}<span>${typeLabel(draft.type)}</span></a>`).join("")}</div>`
            : emptyBlock("保存的草稿会显示在这里")
        }
      </section>
    </section>
  `;
}

function renderFeedback() {
  app.innerHTML = `
    <section class="page-screen">
      ${pageHeader("意见反馈")}
      <section class="subpage-card">
        <p>告诉我们哪里不好用，或者你希望增加什么功能。</p>
        <textarea class="feedback-box" placeholder="例如：希望增加地图找房、帖子置顶、微信提醒..."></textarea>
        <a class="primary-button" href="#me">提交反馈</a>
      </section>
    </section>
  `;
}

function renderHelp() {
  app.innerHTML = `
    <section class="page-screen">
      ${pageHeader("帮助中心")}
      <section class="subpage-card">
        <div class="subpage-list">
          <a href="#post-rent">如何发布房源？<span>›</span></a>
          <a href="#post-wanted">如何发布求租需求？<span>›</span></a>
          <a href="#messages">如何联系对方？<span>›</span></a>
        </div>
      </section>
    </section>
  `;
}

function renderSettings() {
  app.innerHTML = `
    <section class="page-screen">
      ${pageHeader("设置")}
      <section class="subpage-card">
        <div class="subpage-list">
          <a href="#me">账号资料<span>${state.user.name}</span></a>
          <a href="#messages">消息通知<span>已开启</span></a>
          <a href="#home">清除演示数据<span data-reset>重置</span></a>
        </div>
      </section>
    </section>
  `;
}

function mobileHeader() {
  return `
    <header class="home-header">
      <a class="home-logo" href="#home"><b>DMV</b><span>华人市场</span></a>
      <button class="location-pill" type="button">DMV ▾</button>
    </header>
  `;
}

function pageHeader(title) {
  return `
    <header class="page-header">
      <button class="plain-back" type="button" data-back>‹</button>
      <h1>${title}</h1>
      <a href="#publish">发布</a>
    </header>
  `;
}

function bottomNav(active) {
  return `
    <nav class="home-bottom-nav" aria-label="底部导航">
      <a class="${active === "home" ? "active" : ""}" href="#home"><span>⌂</span>首页</a>
      <a class="${active === "category" ? "active" : ""}" href="#category/all"><span>▦</span>分类</a>
      <a class="home-publish ${active === "publish" ? "active" : ""}" href="#publish"><span>＋</span>发布</a>
      <a class="${active === "messages" ? "active" : ""}" href="#messages"><span>信</span>消息${state.conversations.length ? `<em>${state.conversations.length}</em>` : ""}</a>
      <a class="${active === "me" ? "active" : ""}" href="#me"><span>○</span>我的</a>
    </nav>
  `;
}

function listingCard(item) {
  return `
    <a class="listing-card" href="#listing/${item.id}">
      <img src="${item.image}" alt="${escapeHtml(item.title)}" />
      <span class="listing-content">
        <span class="listing-title">${item.title}</span>
        <span class="price">${item.price}</span>
        <span class="meta">
          <span>${item.area}</span>
          <span>${item.time}</span>
          ${item.tags.slice(0, 2).map((tag) => `<span class="pill">${tag}</span>`).join("")}
        </span>
      </span>
    </a>
  `;
}

function homeListingCard(item) {
  return `
    <a class="home-listing" href="#listing/${item.id}">
      <span class="home-photo-wrap">
        <img src="${item.image}" alt="${escapeHtml(item.title)}" />
        <span class="photo-count">${item.photoCount ? `图 ${item.photoCount}` : "求租"}</span>
      </span>
      <span class="home-listing-body">
        <span class="home-row">
          <span class="home-title">${item.title}</span>
          <span class="home-time">${item.time}</span>
        </span>
        <span class="home-price">${item.price}</span>
        <span class="home-area">位置 ${item.area}</span>
        <span class="tag-row">
          ${item.detailTags.map((tag) => `<span>${tag}</span>`).join("")}
        </span>
      </span>
      <span class="heart">${state.favorites.includes(item.id) ? "♥" : "♡"}</span>
    </a>
  `;
}

function conversationItem(item) {
  return `
    <a class="message-item" href="#conversation/${item.id}">
      <span class="message-avatar">${item.avatar}</span>
      <span class="message-body">
        <b>${item.name}</b>
        <small>${item.lastMessage}</small>
      </span>
      <time>${item.time}</time>
    </a>
  `;
}

function inputField(name, label, placeholder, required = false) {
  return `<div class="field"><label>${label}</label><input name="${name}" placeholder="${placeholder}" ${required ? "required" : ""} /></div>`;
}

function selectField(name, label, options) {
  return `<div class="field"><label>${label}</label><select name="${name}">${options.map((item) => `<option>${item}</option>`).join("")}</select></div>`;
}

function emptyBlock(text) {
  return `<div class="empty-card">${text}</div>`;
}

function countType(type) {
  return state.listings.filter((item) => item.type === type).length;
}

function categoryName(type) {
  return categories.find((item) => item.key === type)?.name || "全部信息";
}

function typeLabel(type) {
  return { rent: "房源", wanted: "求租", used: "二手" }[type] || "帖子";
}

function favoriteListings() {
  return state.favorites.map(findListing).filter(Boolean);
}

function historyListings() {
  return state.history.map(findListing).filter(Boolean);
}

function myListings() {
  return allListings().filter((item) => item.mine);
}

function rememberHistory(id) {
  state.history = [id, ...state.history.filter((item) => item !== id)].slice(0, 20);
  saveState();
}

function toggleFavorite(id) {
  state.favorites = state.favorites.includes(id)
    ? state.favorites.filter((item) => item !== id)
    : [id, ...state.favorites];
  saveState();
  renderDetail(id);
}

function createConversation(listingId) {
  const listing = findListing(listingId);
  let conversation = state.conversations.find((item) => item.listingId === listingId);
  if (!conversation) {
    conversation = {
      id: `conv-${listingId}`,
      listingId,
      name: listing.owner || "发布者",
      avatar: (listing.owner || "发").slice(0, 1).toUpperCase(),
      lastMessage: `你好，我想了解「${listing.title}」。`,
      time: "刚刚",
      messages: [`你好，我想了解「${listing.title}」。`]
    };
    state.conversations = [conversation, ...state.conversations];
    saveState();
  }
  location.hash = `#conversation/${conversation.id}`;
}

function submitListing(form, type) {
  const data = Object.fromEntries(new FormData(form).entries());
  const selectedChips = [...form.querySelectorAll(".chip.active")].map((chip) => chip.dataset.chip).filter(Boolean);
  const tags = normalizeList(data.tags).length ? normalizeList(data.tags) : selectedChips;
  const detailTags = tags.length ? tags : [typeLabel(type)];
  const fallbackImages = {
    rent: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=700&q=80",
    wanted: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=80",
    used: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=700&q=80"
  };

  const listing = {
    id: `${type}-${Date.now()}`,
    type,
    title: data.title.trim(),
    price: data.price.trim(),
    area: data.area.trim(),
    time: "刚刚",
    tags,
    detailTags,
    photoCount: data.image ? 1 : 0,
    image: data.image.trim() || fallbackImages[type],
    desc: data.desc.trim(),
    owner: state.user.name,
    mine: true,
    createdAt: Date.now()
  };

  state.listings = [listing, ...state.listings];
  saveState();
  location.hash = `#listing/${listing.id}`;
}

function saveDraft(form, type) {
  const data = Object.fromEntries(new FormData(form).entries());
  state.drafts = [{ id: `draft-${Date.now()}`, type, title: data.title || "未命名草稿", data }, ...state.drafts];
  saveState();
  location.hash = "#drafts";
}

function normalizeList(value = "") {
  return value
    .split(/[,，、]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function sendMessage(form, conversationId) {
  const input = form.elements.message;
  const text = input.value.trim();
  if (!text) return;
  const conversation = state.conversations.find((item) => item.id === conversationId);
  conversation.messages.push(text);
  conversation.lastMessage = text;
  conversation.time = "刚刚";
  saveState();
  renderConversation(conversationId);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]
  );
}

document.addEventListener("submit", (event) => {
  const searchForm = event.target.closest("[data-search-form]");
  if (searchForm) {
    event.preventDefault();
    const query = new FormData(searchForm).get("q") || "";
    renderCategory("all", String(query));
    return;
  }

  const listingForm = event.target.closest("[data-listing-form]");
  if (listingForm) {
    event.preventDefault();
    submitListing(listingForm, listingForm.dataset.listingForm);
    return;
  }

  const messageForm = event.target.closest("[data-message-form]");
  if (messageForm) {
    event.preventDefault();
    sendMessage(messageForm, messageForm.dataset.messageForm);
  }
});

document.addEventListener("click", (event) => {
  const backButton = event.target.closest("[data-back]");
  if (backButton) {
    history.length > 1 ? history.back() : (location.hash = "#home");
    return;
  }

  const favorite = event.target.closest("[data-favorite]");
  if (favorite) {
    toggleFavorite(favorite.dataset.favorite);
    return;
  }

  const contact = event.target.closest("[data-contact]");
  if (contact) {
    createConversation(contact.dataset.contact);
    return;
  }

  const draft = event.target.closest("[data-save-draft]");
  if (draft) {
    const form = draft.closest("form");
    saveDraft(form, draft.dataset.saveDraft);
    return;
  }

  const reset = event.target.closest("[data-reset]");
  if (reset) {
    localStorage.removeItem(STORAGE_KEY);
    state = loadState();
    location.hash = "#home";
    route();
    return;
  }

  const chip = event.target.closest("[data-chip]");
  if (chip) {
    chip.classList.toggle("active");
  }
});

window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", route);
