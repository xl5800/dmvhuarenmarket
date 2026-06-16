const STORAGE_KEY = "dmv-huaren-market-fallback-listings";

const areaCoordinates = {
  Rockville: { lat: 39.083997, lng: -77.152758 },
  Gaithersburg: { lat: 39.14344, lng: -77.20137 },
  Germantown: { lat: 39.173162, lng: -77.27165 },
  Bethesda: { lat: 38.984652, lng: -77.094711 },
  "Silver Spring": { lat: 38.990666, lng: -77.026088 },
  "College Park": { lat: 38.989697, lng: -76.937759 },
  UMD: { lat: 38.986918, lng: -76.942555 },
  Arlington: { lat: 38.88162, lng: -77.090981 },
  Alexandria: { lat: 38.804836, lng: -77.046921 },
  Annandale: { lat: 38.83039, lng: -77.19637 },
  Ashburn: { lat: 39.043757, lng: -77.487442 },
  Chantilly: { lat: 38.894279, lng: -77.431099 },
  Fairfax: { lat: 38.846223, lng: -77.306374 },
  Tysons: { lat: 38.918722, lng: -77.231093 },
  "Falls Church": { lat: 38.882334, lng: -77.171091 },
  Herndon: { lat: 38.969555, lng: -77.386097 },
  Laurel: { lat: 39.099276, lng: -76.848306 },
  Leesburg: { lat: 39.115662, lng: -77.563601 },
  McLean: { lat: 38.933868, lng: -77.17726 },
  Potomac: { lat: 39.018166, lng: -77.208591 },
  Reston: { lat: 38.958631, lng: -77.357003 },
  Vienna: { lat: 38.901222, lng: -77.26526 },
  Woodbridge: { lat: 38.658172, lng: -77.249704 },
  "Washington DC": { lat: 38.907192, lng: -77.036871 },
  "20850": { lat: 39.0891, lng: -77.1835 },
  "20852": { lat: 39.0533, lng: -77.1205 },
  "20742": { lat: 38.9869, lng: -76.9426 },
  "22201": { lat: 38.8847, lng: -77.0947 },
  "22030": { lat: 38.8462, lng: -77.3064 },
};

const areas = [
  "全部地区",
  ...Object.keys(areaCoordinates).filter((key) => !/^\d/.test(key) && key !== "UMD"),
  "其他/自定义",
];

const fallbackImages = {
  rental:
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
  secondhand:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
};

const seedListings = [
  rentalSeed(
    "Rockville 主卧转租，近红线 Twinbrook",
    "Rockville",
    1180,
    "主卧 / 独卫",
    "Twinbrook Metro、H Mart、Rockville Pike",
    "Twinbrook Metro, Rockville, MD",
    39.062402,
    -77.120775,
    "微信 dmv_rent_001",
    "主卧带独立卫生间，步行可到红线地铁和超市。室友安静，适合 NIH、Bethesda 或 DC 通勤。家具齐全，可拎包入住。",
    1,
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    "2026-07-01"
  ),
  rentalSeed(
    "College Park 2B2B 次卧，UMD 步行圈",
    "College Park",
    980,
    "2B2B 次卧",
    "UMD、绿线 Metro、Whole Foods",
    "University of Maryland, College Park, MD",
    38.986918,
    -76.942555,
    "邮箱 housing@dmvlocal.test",
    "适合 UMD 学生或访问学者。小区安全，有健身房和停车位。租期可到明年 7 月，家具可商量。",
    2,
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    "2026-08-15"
  ),
  rentalSeed(
    "Tysons 1B1B 整租，适合上班族",
    "Tysons",
    2050,
    "1B1B 整租",
    "Tysons Corner、Silver Line、Capital One",
    "Tysons Corner Center, Tysons, VA",
    38.918873,
    -77.220607,
    "电话 571-000-1688",
    "高层公寓，通勤方便，楼下餐厅和商场多。可续租，适合在 Tysons、Reston、Arlington 工作的人。",
    6,
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    "2026-07-10"
  ),
  secondhandSeed(
    "搬家出 IKEA Queen 床架和床垫",
    "Fairfax",
    180,
    "家具",
    "Fairfax / GMU",
    "微信 fairfax_move",
    "Queen size 床架和床垫一起出，使用一年多，干净无宠无烟。自取优先，周末可看。",
    0,
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
  ),
  secondhandSeed(
    "Arlington 出书桌、办公椅、显示器",
    "Arlington",
    120,
    "搬家清仓",
    "Rosslyn / Clarendon",
    "短信 202-000-1688",
    "打包优先，适合刚搬家或学生。桌子稳，办公椅可升降，显示器 24 寸。",
    4,
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80"
  ),
];

const els = {
  areaFilter: document.querySelector("#areaFilter"),
  customAreaFilter: document.querySelector("#customAreaFilter"),
  postArea: document.querySelector("[name='area']"),
  searchInput: document.querySelector("#searchInput"),
  maxPriceInput: document.querySelector("#maxPriceInput"),
  locationInput: document.querySelector("#locationInput"),
  radiusFilter: document.querySelector("#radiusFilter"),
  useLocationButton: document.querySelector("#useLocationButton"),
  locationStatus: document.querySelector("#locationStatus"),
  rentalList: document.querySelector("#rentalList"),
  secondhandList: document.querySelector("#secondhandList"),
  postForm: document.querySelector("#postForm"),
  loginButton: document.querySelector("#loginButton"),
  loginDialog: document.querySelector("#loginDialog"),
  closeLoginDialog: document.querySelector("#closeLoginDialog"),
  loginForm: document.querySelector("#loginForm"),
  accountStatus: document.querySelector("#accountStatus"),
  accountList: document.querySelector("#accountList"),
  typeSelect: document.querySelector("#typeSelect"),
  adminList: document.querySelector("#adminList"),
  pendingCount: document.querySelector("#pendingCount"),
  detailDialog: document.querySelector("#detailDialog"),
  detailContent: document.querySelector("#detailContent"),
  closeDialog: document.querySelector("#closeDialog"),
  seedButton: document.querySelector("#seedButton"),
  statRental: document.querySelector("#statRental"),
  statSecondhand: document.querySelector("#statSecondhand"),
  statFresh: document.querySelector("#statFresh"),
};

let db = null;
let onlineMode = false;
let currentUser = null;
let currentProfile = null;
let userLocation = null;
let listings = [];

init();

async function init() {
  setupSupabase();
  renderAreaOptions();
  bindEvents();
  updateLocationFromInput();
  await loadCurrentUser();
  await loadListings();
  render();
}

function setupSupabase() {
  const config = window.DMV_SUPABASE_CONFIG;
  if (!window.supabase || !config?.url || !config?.anonKey) return;
  db = window.supabase.createClient(config.url, config.anonKey);
  onlineMode = true;
}

function bindEvents() {
  els.searchInput.addEventListener("input", render);
  els.areaFilter.addEventListener("change", render);
  els.customAreaFilter.addEventListener("input", render);
  els.maxPriceInput.addEventListener("input", render);
  els.radiusFilter.addEventListener("change", render);
  els.locationInput.addEventListener("input", () => {
    updateLocationFromInput();
    render();
  });

  els.closeDialog.addEventListener("click", () => els.detailDialog.close());
  els.closeLoginDialog.addEventListener("click", () => els.loginDialog.close());
  els.loginButton.addEventListener("click", handleLoginButton);
  els.useLocationButton.addEventListener("click", useBrowserLocation);
  els.seedButton.addEventListener("click", resetFallbackData);

  document.querySelectorAll("[data-post-type]").forEach((link) => {
    link.addEventListener("click", () => {
      els.typeSelect.value = link.dataset.postType;
    });
  });

  els.loginForm.addEventListener("submit", handleLoginSubmit);
  els.postForm.addEventListener("submit", handlePostSubmit);

  els.detailContent.addEventListener("click", (event) => {
    const map = event.target.closest("[data-map-id]");
    if (!map) return;
    const chooser = document.querySelector(`[data-map-chooser="${map.dataset.mapId}"]`);
    chooser?.classList.toggle("is-open");
  });
}

function renderAreaOptions() {
  els.areaFilter.innerHTML = areas.map((area) => `<option value="${area}">${area}</option>`).join("");
  els.postArea.innerHTML = areas
    .filter((area) => area !== "全部地区")
    .map((area) => `<option value="${area}">${area}</option>`)
    .join("");
}

async function loadCurrentUser() {
  if (!onlineMode) return;
  const { data } = await db.auth.getUser();
  currentUser = data.user || null;
  await loadProfile();
}

async function loadProfile() {
  currentProfile = null;
  if (!onlineMode || !currentUser) return;
  const { data } = await db
    .from("profiles")
    .select("email, display_name, role")
    .eq("id", currentUser.id)
    .maybeSingle();
  currentProfile = data || null;
}

async function loadListings() {
  if (!onlineMode) {
    listings = normalizeListings(loadFallbackListings());
    return;
  }

  const { data, error } = await db
    .from("listings")
    .select("*")
    .or(buildReadableListingFilter())
    .order("updated_at", { ascending: false });

  if (error) {
    showLoadError(error.message);
    listings = [];
    return;
  }

  listings = normalizeListings((data || []).map(fromDbListing));
}

function buildReadableListingFilter() {
  if (!currentUser) return "status.eq.approved";
  return `status.eq.approved,user_id.eq.${currentUser.id}`;
}

function render() {
  const approved = filterListings(listings.filter((item) => item.status === "approved"));
  renderCards(els.rentalList, approved.filter((item) => item.type === "rental"));
  renderCards(els.secondhandList, approved.filter((item) => item.type === "secondhand"));
  renderAdmin();
  renderAccount();
  renderUser();
  renderStats();
}

function filterListings(items) {
  const keyword = els.searchInput.value.trim().toLowerCase();
  const area = els.areaFilter.value;
  const customArea = els.customAreaFilter.value.trim().toLowerCase();
  const maxPrice = Number(els.maxPriceInput.value);
  const radius = Number(els.radiusFilter.value);

  return items.filter((item) => {
    const matchesKeyword =
      !keyword ||
      [item.title, item.description, item.category, item.area, item.nearby, item.address]
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    const searchableArea = [item.area, item.address, item.nearby].join(" ").toLowerCase();
    const matchesArea = area === "全部地区" || area === "其他/自定义" || item.area === area;
    const matchesCustomArea = !customArea || searchableArea.includes(customArea);
    const matchesPrice = !maxPrice || item.price <= maxPrice;
    const matchesDistance =
      item.type !== "rental" ||
      !radius ||
      !userLocation ||
      distanceMiles(userLocation, item) <= radius;
    return matchesKeyword && matchesArea && matchesCustomArea && matchesPrice && matchesDistance;
  });
}

function renderCards(target, items) {
  if (!items.length) {
    target.innerHTML = `<div class="empty">暂时没有符合条件的信息。可以换个筛选，或者先发布第一条。</div>`;
    return;
  }

  target.innerHTML = items.map(cardTemplate).join("");
  target.querySelectorAll("[data-detail]").forEach((button) => {
    button.addEventListener("click", () => showDetail(button.dataset.detail));
  });
  target.querySelectorAll("[data-report]").forEach((button) => {
    button.addEventListener("click", () => reportListing(button.dataset.report));
  });
}

function cardTemplate(item) {
  const label = item.type === "rental" ? "租房" : "二手";
  const distance = getDistanceLabel(item);
  return `
    <article class="listing-card">
      <div class="listing-image">
        ${imageTemplate(item)}
        <span class="status-badge">${label}</span>
        <span class="fresh-badge">${timeAgo(item.updatedAt)}</span>
      </div>
      <div class="listing-body">
        <h3>${escapeHtml(item.title)}</h3>
        <div class="meta">
          <span>${escapeHtml(item.area)}</span>
          <span>·</span>
          <span>${escapeHtml(item.category)}</span>
          ${distance ? `<span>·</span><span>${distance}</span>` : ""}
        </div>
        <div class="price">$${Number(item.price).toLocaleString()}</div>
        <p class="desc">${escapeHtml(item.description)}</p>
        <div class="card-actions">
          <button type="button" data-detail="${item.id}">查看详情</button>
          <button type="button" data-report="${item.id}">举报</button>
        </div>
      </div>
    </article>
  `;
}

function showDetail(id) {
  const item = listings.find((entry) => entry.id === id);
  if (!item) return;
  const rentalExtra =
    item.type === "rental"
      ? `
        <p><strong>入住时间：</strong>${escapeHtml(item.moveIn || "可商议")}</p>
        <p><strong>房源位置：</strong>${escapeHtml(item.address || item.area)}</p>
        ${mapTemplate(item)}
      `
      : "";

  els.detailContent.innerHTML = `
    <div class="detail-inner">
      ${imageTemplate(item)}
      <p class="eyebrow">${item.type === "rental" ? "租房/转租" : "二手/清仓"}</p>
      <h2>${escapeHtml(item.title)}</h2>
      <div class="price">$${Number(item.price).toLocaleString()}</div>
      <p><strong>地区：</strong>${escapeHtml(item.area)}</p>
      <p><strong>分类：</strong>${escapeHtml(item.category)}</p>
      ${rentalExtra}
      <p><strong>附近：</strong>${escapeHtml(item.nearby || "未填写")}</p>
      <p><strong>更新时间：</strong>${timeAgo(item.updatedAt)}</p>
      <p>${escapeHtml(item.description)}</p>
      ${contactTemplate(item)}
    </div>
  `;
  els.detailDialog.showModal();
}

function imageTemplate(item) {
  const image = item.image || fallbackImages[item.type];
  if (!image) {
    return `<div class="image-fallback">${item.type === "rental" ? "DMV 租房" : "DMV 二手"}</div>`;
  }
  return `<img src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" loading="lazy" />`;
}

function contactTemplate(item) {
  if (!currentUser) {
    return `
      <div class="contact-box locked-contact">
        登录后查看联系方式，减少骚扰和爬虫抓取。
        <button class="secondary-btn" type="button" onclick="document.querySelector('#loginDialog').showModal()">登录查看</button>
      </div>
    `;
  }

  return `
    <div class="contact-box">
      联系方式：${escapeHtml(item.contact)}
      <small>发布者：${escapeHtml(item.userName || "平台用户")}</small>
    </div>
  `;
}

function mapTemplate(item) {
  if (!item.lat || !item.lng) return "";
  const bbox = getBbox(item.lat, item.lng);
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${item.lat},${item.lng}`;
  const appleUrl = `https://maps.apple.com/?q=${encodeURIComponent(item.address || item.title)}&ll=${item.lat},${item.lng}`;
  const googleUrl = `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`;

  return `
    <div class="map-block">
      <button class="map-preview" type="button" data-map-id="${item.id}" aria-label="打开地图选择">
        <iframe title="${escapeHtml(item.title)} 地图" src="${osmUrl}" loading="lazy"></iframe>
        <span class="map-pin">●</span>
        <span class="map-hint">点击地图选择 Apple Maps 或 Google Maps 打开</span>
      </button>
      <div class="map-chooser" data-map-chooser="${item.id}">
        <a target="_blank" rel="noopener" href="${appleUrl}">Apple Maps 打开</a>
        <a target="_blank" rel="noopener" href="${googleUrl}">Google Maps 打开</a>
      </div>
    </div>
  `;
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  if (!onlineMode) {
    alert("当前没有连接 Supabase，暂时只能看本地演示。");
    return;
  }

  const data = new FormData(els.loginForm);
  const email = data.get("email").trim().toLowerCase();
  const password = data.get("password");
  const name = data.get("name").trim() || email.split("@")[0];

  let result = await db.auth.signInWithPassword({ email, password });
  if (result.error) {
    result = await db.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } },
    });
  }

  if (result.error) {
    alert(`登录失败：${getAuthErrorHelp(result.error.message)}`);
    return;
  }

  currentUser = result.data.user;
  await loadProfile();
  await loadListings();
  els.loginDialog.close();
  els.loginForm.reset();
  render();

  if (!result.data.session) {
    alert("账号已创建。请先去邮箱完成确认，然后再登录。");
  }
}

async function handleLoginButton() {
  if (!currentUser) {
    els.loginDialog.showModal();
    return;
  }

  const shouldLogout = confirm(`当前登录：${currentUser.email}\n是否退出登录？`);
  if (!shouldLogout) return;
  if (onlineMode) await db.auth.signOut();
  currentUser = null;
  currentProfile = null;
  await loadListings();
  render();
}

async function handlePostSubmit(event) {
  event.preventDefault();
  if (!currentUser) {
    els.loginDialog.showModal();
    return;
  }

  const formData = new FormData(els.postForm);
  const listing = listingFromForm(formData);

  if (onlineMode) {
    const uploadedImageUrl = await uploadListingImage(formData.get("imageFile"));
    if (uploadedImageUrl) listing.image = uploadedImageUrl;

    const { error } = await db.from("listings").insert(toDbListing(listing));
    if (error) {
      alert(`发布失败：${error.message}`);
      return;
    }
    alert("已提交，等待管理员审核。");
    await loadListings();
  } else {
    listings.unshift(listing);
    saveFallbackListings(listings);
  }

  els.postForm.reset();
  render();
  location.hash = "#account";
}

async function uploadListingImage(file) {
  if (!file || !file.size) return "";
  if (!file.type.startsWith("image/")) {
    alert("只能上传图片文件。");
    return "";
  }

  const maxSizeMb = 6;
  if (file.size > maxSizeMb * 1024 * 1024) {
    alert(`图片不能超过 ${maxSizeMb}MB。`);
    return "";
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExtension = extension.replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${currentUser.id}/${Date.now()}-${createId()}.${safeExtension}`;
  const { error } = await db.storage.from("listing-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    alert(`图片上传失败：${error.message}`);
    return "";
  }

  const { data } = db.storage.from("listing-images").getPublicUrl(path);
  return data.publicUrl;
}

function listingFromForm(data) {
  const selectedArea = data.get("area");
  const customArea = data.get("customArea").trim();
  const area = selectedArea === "其他/自定义" && customArea ? customArea : selectedArea;
  const parsedCoords = parseCoordinates(data.get("coordinates"));
  const areaCoord = areaCoordinates[area] || areaCoordinates["Washington DC"];
  const now = new Date().toISOString();
  return {
    id: createId(),
    userId: currentUser.id,
    type: data.get("type"),
    status: "pending",
    title: data.get("title").trim(),
    area,
    price: Number(data.get("price")),
    category: data.get("category").trim(),
    moveIn: data.get("moveIn") || null,
    nearby: data.get("nearby").trim(),
    address: data.get("address").trim() || area,
    lat: parsedCoords?.lat ?? areaCoord.lat,
    lng: parsedCoords?.lng ?? areaCoord.lng,
    image: data.get("image").trim(),
    contact: data.get("contact").trim(),
    description: data.get("description").trim(),
    userName: currentProfile?.display_name || currentUser.email,
    createdAt: now,
    updatedAt: now,
  };
}

async function reportListing(id) {
  if (!currentUser) {
    els.loginDialog.showModal();
    return;
  }

  if (!onlineMode) {
    alert("已收到举报。正式上线后会进入后台待处理列表。");
    return;
  }

  const { error } = await db.from("reports").insert({
    listing_id: id,
    reporter_id: currentUser.id,
    reason: "用户举报",
  });
  alert(error ? `举报失败：${error.message}` : "已收到举报。");
}

function renderAdmin() {
  if (!currentUser) {
    els.pendingCount.textContent = "需管理员登录";
    els.adminList.innerHTML = `<div class="empty">管理员登录后可以审核待发布内容。</div>`;
    return;
  }

  if (!isAdmin()) {
    els.pendingCount.textContent = "无管理员权限";
    els.adminList.innerHTML = `<div class="empty">当前账号不是管理员。请确认 profiles 表里 role 是否为 admin。</div>`;
    return;
  }

  const pending = listings.filter((item) => item.status === "pending");
  els.pendingCount.textContent = `${pending.length} 条待审核`;
  if (!pending.length) {
    els.adminList.innerHTML = `<div class="empty">目前没有待审核内容。</div>`;
    return;
  }

  els.adminList.innerHTML = pending
    .map(
      (item) => `
        <div class="admin-item">
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <div class="meta">
              <span>${item.type === "rental" ? "租房" : "二手"}</span>
              <span>·</span>
              <span>${escapeHtml(item.area)}</span>
              <span>·</span>
              <span>$${Number(item.price).toLocaleString()}</span>
            </div>
          </div>
          <div class="admin-actions">
            <button class="approve-btn" type="button" data-approve="${item.id}">通过</button>
            <button class="reject-btn" type="button" data-reject="${item.id}">拒绝</button>
          </div>
        </div>
      `
    )
    .join("");

  els.adminList.querySelectorAll("[data-approve]").forEach((button) => {
    button.addEventListener("click", () => updateListingStatus(button.dataset.approve, "approved"));
  });
  els.adminList.querySelectorAll("[data-reject]").forEach((button) => {
    button.addEventListener("click", () => updateListingStatus(button.dataset.reject, "rejected"));
  });
}

function renderAccount() {
  if (!currentUser) {
    els.accountStatus.textContent = "未登录";
    els.accountList.innerHTML = `
      <div class="empty">
        登录后可以查看你发布过的房源和二手信息。
        <button class="primary-btn inline-action" type="button" onclick="document.querySelector('#loginDialog').showModal()">现在登录</button>
      </div>
    `;
    return;
  }

  els.accountStatus.textContent = currentUser.email;
  const mine = listings.filter((item) => item.userId === currentUser.id);
  if (!mine.length) {
    els.accountList.innerHTML = `<div class="empty">你还没有发布内容。可以先发布一条租房或二手信息。</div>`;
    return;
  }

  els.accountList.innerHTML = mine
    .map(
      (item) => `
        <div class="admin-item">
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <div class="meta">
              <span>${item.type === "rental" ? "租房" : "二手"}</span>
              <span>·</span>
              <span>${escapeHtml(item.area)}</span>
              <span>·</span>
              <span>$${Number(item.price).toLocaleString()}</span>
              <span>·</span>
              <span>${statusLabel(item.status)}</span>
            </div>
          </div>
          <div class="admin-actions">
            <button class="approve-btn" type="button" data-renew="${item.id}">刷新</button>
            <button class="reject-btn" type="button" data-expire="${item.id}">下架</button>
          </div>
        </div>
      `
    )
    .join("");

  els.accountList.querySelectorAll("[data-renew]").forEach((button) => {
    button.addEventListener("click", () => updateListingStatus(button.dataset.renew, "pending"));
  });
  els.accountList.querySelectorAll("[data-expire]").forEach((button) => {
    button.addEventListener("click", () => updateListingStatus(button.dataset.expire, "expired"));
  });
}

async function updateListingStatus(id, status) {
  if (onlineMode) {
    const { error } = await db.from("listings").update({ status }).eq("id", id);
    if (error) {
      alert(`更新失败：${error.message}`);
      return;
    }
    await loadListings();
  } else {
    const item = listings.find((entry) => entry.id === id);
    if (item) item.status = status;
    saveFallbackListings(listings);
  }
  render();
}

function renderUser() {
  if (!onlineMode) {
    els.loginButton.textContent = "演示模式";
    return;
  }
  els.loginButton.textContent = currentUser
    ? currentProfile?.display_name || currentUser.email.split("@")[0]
    : "登录";
  els.loginButton.classList.toggle("is-logged-in", Boolean(currentUser));
}

function renderStats() {
  const approved = listings.filter((item) => item.status === "approved");
  els.statRental.textContent = approved.filter((item) => item.type === "rental").length;
  els.statSecondhand.textContent = approved.filter((item) => item.type === "secondhand").length;
  els.statFresh.textContent = approved.filter((item) => daysSince(item.updatedAt) <= 7).length;
}

function isAdmin() {
  return currentProfile?.role === "admin";
}

function toDbListing(item) {
  return {
    user_id: item.userId,
    type: item.type,
    status: item.status,
    title: item.title,
    description: item.description,
    price: item.price,
    area: item.area,
    category: item.category,
    move_in: item.moveIn || null,
    nearby: item.nearby || null,
    address: item.address || null,
    lat: item.lat,
    lng: item.lng,
    image_url: item.image || null,
    contact: item.contact,
  };
}

function fromDbListing(row) {
  return {
    id: row.id,
    userId: row.user_id,
    type: row.type,
    status: row.status,
    title: row.title,
    description: row.description,
    price: Number(row.price),
    area: row.area,
    category: row.category,
    moveIn: row.move_in,
    nearby: row.nearby,
    address: row.address,
    lat: row.lat,
    lng: row.lng,
    image: row.image_url,
    contact: row.contact,
    userName: "平台用户",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function updateLocationFromInput() {
  const value = els.locationInput.value.trim();
  if (!value) {
    userLocation = null;
    els.locationStatus.textContent = "距离筛选仅用于租房。";
    return;
  }

  userLocation = resolveLocation(value);
  els.locationStatus.textContent = userLocation
    ? `已识别：${userLocation.label}`
    : "暂未识别该地点，可试试 Rockville、UMD、Tysons 或邮编。";
}

function useBrowserLocation() {
  if (!navigator.geolocation) {
    els.locationStatus.textContent = "当前浏览器不支持定位。";
    return;
  }

  els.locationStatus.textContent = "正在获取当前位置...";
  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation = {
        label: "当前位置",
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      els.locationInput.value = "当前位置";
      els.locationStatus.textContent = "已使用你的当前位置。";
      render();
    },
    () => {
      els.locationStatus.textContent = "无法获取当前位置，请手动输入地点。";
    }
  );
}

function resolveLocation(value) {
  if (value === "当前位置" && userLocation?.label === "当前位置") return userLocation;
  const normalized = value.toLowerCase();
  const match = Object.entries(areaCoordinates).find(([name]) => {
    const key = name.toLowerCase();
    return normalized.includes(key) || key.includes(normalized);
  });
  if (!match) return null;
  return { label: match[0], ...match[1] };
}

function getDistanceLabel(item) {
  if (item.type !== "rental" || !userLocation || !item.lat || !item.lng) return "";
  return `${distanceMiles(userLocation, item).toFixed(1)} mi`;
}

function distanceMiles(a, b) {
  const earthRadiusMiles = 3958.8;
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(h));
}

function parseCoordinates(value) {
  const parts = String(value || "")
    .split(",")
    .map((part) => Number(part.trim()));
  if (parts.length !== 2 || parts.some((part) => Number.isNaN(part))) return null;
  return { lat: parts[0], lng: parts[1] };
}

function normalizeListings(items) {
  return items.map((item) => {
    const coord = areaCoordinates[item.area] || areaCoordinates["Washington DC"];
    return {
      ...item,
      address: item.address || item.nearby || item.area,
      lat: item.lat ?? coord.lat,
      lng: item.lng ?? coord.lng,
    };
  });
}

function loadFallbackListings() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedListings));
    return cloneListings(seedListings);
  }
  try {
    return JSON.parse(raw);
  } catch {
    return cloneListings(seedListings);
  }
}

function saveFallbackListings(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function resetFallbackData() {
  if (onlineMode) {
    alert("已连接线上数据库，示例重置只在离线演示模式使用。");
    return;
  }
  listings = cloneListings(seedListings);
  saveFallbackListings(listings);
  render();
}

function showLoadError(message) {
  els.rentalList.innerHTML = `<div class="empty">连接 Supabase 失败：${escapeHtml(message)}</div>`;
  els.secondhandList.innerHTML = `<div class="empty">请检查 API key、RLS 策略和网络。</div>`;
}

function getAuthErrorHelp(message) {
  if (message === "Failed to fetch") {
    return [
      "Failed to fetch",
      "",
      "这通常不是密码错误，而是浏览器连不上 Supabase Auth。",
      "请检查：",
      "1. Supabase Authentication -> URL Configuration 里加入 http://localhost:8088",
      "2. Redirect URLs 里加入 http://localhost:8088/**",
      "3. Authentication -> Sign In / Providers 里 Email 是否启用",
      "4. 浏览器能否打开 https://difazkplusfmojvfznzt.supabase.co/auth/v1/settings",
    ].join("\n");
  }
  return message;
}

function statusLabel(status) {
  return (
    {
      pending: "待审核",
      approved: "已发布",
      rejected: "未通过",
      expired: "已下架",
    }[status] || status
  );
}

function getBbox(lat, lng) {
  const delta = 0.055;
  return [lng - delta, lat - delta, lng + delta, lat + delta].join(",");
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function rentalSeed(
  title,
  area,
  price,
  category,
  nearby,
  address,
  lat,
  lng,
  contact,
  description,
  days,
  image,
  moveIn
) {
  return {
    id: createId(),
    userId: "demo-user",
    type: "rental",
    status: "approved",
    title,
    area,
    price,
    category,
    moveIn,
    nearby,
    address,
    lat,
    lng,
    image,
    contact,
    description,
    userName: "平台示例用户",
    createdAt: daysAgo(days),
    updatedAt: daysAgo(days),
  };
}

function secondhandSeed(title, area, price, category, nearby, contact, description, days, image) {
  const coord = areaCoordinates[area] || areaCoordinates["Washington DC"];
  return {
    id: createId(),
    userId: "demo-user",
    type: "secondhand",
    status: "approved",
    title,
    area,
    price,
    category,
    moveIn: "",
    nearby,
    address: nearby,
    lat: coord.lat,
    lng: coord.lng,
    image,
    contact,
    description,
    userName: "平台示例用户",
    createdAt: daysAgo(days),
    updatedAt: daysAgo(days),
  };
}

function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function daysSince(dateString) {
  return Math.floor((Date.now() - new Date(dateString).getTime()) / 86400000);
}

function timeAgo(dateString) {
  const days = daysSince(dateString);
  if (days <= 0) return "今天更新";
  if (days === 1) return "1天前更新";
  return `${days}天前更新`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cloneListings(items) {
  return JSON.parse(JSON.stringify(items));
}
