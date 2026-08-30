/* =========================================================================
   FASTFILM ENGINE // APPLICATION LOGIC
   100% Pure Client-Side Architecture (Cloudflare Pages & GitHub Pages Ready)
   ========================================================================= */

/* =========================================================================
   VIDSRC SERVERS REGISTRY
   ========================================================================= */
const VIDSRC_SERVERS = [
  { name: "VidLink (No Ads)", url: "https://vidlink.pro" },
  { name: "AutoEmbed (Clean)", url: "https://player.autoembed.app/embed" },
  { name: "4KHD (Fast)", url: "https://mapple.uk/watch" },
  { name: "VidBinge", url: "https://vidbinge.com/embed" },
  { name: "Main", url: "https://player.vidzee.wtf/embed" },
  { name: "Fade", url: "https://rivestream.org/embed" },
  { name: "Vidora", url: "https://anyembed.xyz/embed" },
  { name: "Nero", url: "https://vidfast.pro" },
  { name: "Vidplay", url: "https://vidsrc.to/embed" },
  { name: "Flixify", url: "https://vidflix.club" },
  { name: "Yoru", url: "https://video.moviepire.co/embed" },
  { name: "4K", url: "https://player.videasy.net" },
  { name: "Nest", url: "https://vidnest.fun" },
  { name: "Mist", url: "https://play.xpass.top/e" },
  { name: "Peach", url: "https://peachify.top/embed" },
  { name: "Pass", url: "https://vidcore.net" },
  { name: "Simplify", url: "https://zxcstream.xyz/player" },
  { name: "Asia", url: "https://nhdapi.com/embed" },
  { name: "Cine", url: "https://cinesrc.st/embed" },
  { name: "Vidmux", url: "https://vidlux.site/embed" },
  { name: "Pablo", url: "https://vidsrc.pm/embed" },
  { name: "Braflix", url: "https://api.cineby.homes/embed" },
  { name: "India", url: "https://vidup.to" },
  { name: "Diablo", url: "https://tanime.tv" },
  { name: "Italian", url: "https://vixsrc.to" },
  { name: "Vidind", url: "https://player.vidify.top/embed" },
  { name: "4K2", url: "https://www.vidking.net/embed" },
  { name: "Prime", url: "https://player.vidrush.net/embed" },
  { name: "Hindi", url: "https://vidsrc.wtf/api/1" },
  { name: "Vidsrc", url: "https://vidsrc.me/embed" },
  { name: "2embed", url: "https://www.2embed.cc/embed" },
  { name: "PrimeWire", url: "https://primesrc.me/embed" },
  { name: "French", url: "https://frembed.asia/api" },
  { name: "Club", url: "https://moviesapi.to" },
  { name: "Sage", url: "https://111movies.com" },
  { name: "Spanish", url: "https://play.modocine.com/play.php/embed" },
  { name: "Flix", url: "https://multiembed.mov" },
  { name: "Portuguese", url: "https://superflixapi.buzz" }
];

function buildStreamUrl(server, id, type = "movie") {
  const s = server.name.toLowerCase();
  const base = server.url;
  const isTv = (type === "tv" || type === "series");

  if (isTv) {
    if (s.includes("vidlink")) return `${base}/tv/${id}/1/1`;
    if (s.includes("autoembed")) return `${base}/tv/${id}/1/1`;
    if (s.includes("vidbinge")) return `${base}/tv/${id}/1/1`;
    if (s === "simplify") return `${base}/tv/${id}/1/1?color=addc35&back=false&domainAd=braflix.win`;
    if (s === "hindi") return `${base}/tv/?id=${id}&s=1&e=1&poster=https://image.tmdb.org/t/p/w780/enNubozHn9pXi0ycTVYUWfpHZm.jpg&color=ffffff`;
    if (s === "4k2") return `${base}/tv/${id}/1/1`;
    if (s === "prime") return `${base}/tv/${id}/1/1`;
    if (s === "4khd") return `${base}/tv/${id}/1/1?theme=addc35`;
    if (s === "primewire") return `${base}/tv?imdb=${id}&season=1&episode=1&fallback=true&server_order=PrimeVid,Voe,Dood`;
    if (s === "french") return `${base}/serie.php?id=${id}&sa=1&epi=1`;
    if (s === "fade") return `${base}?type=tv&id=${id}&season=1&episode=1&sendMetadata=true`;
    if (s === "vidora") return `${base}/tmdb-tv-${id}-1-1`;
    if (s === "pass" || s === "portuguese") return `${base}/serie/${id}/1/1`;
    return `${base}/tv/${id}/1/1`;
  } else {
    if (s.includes("vidlink")) return `${base}/movie/${id}`;
    if (s.includes("autoembed")) return `${base}/movie/${id}`;
    if (s.includes("vidbinge")) return `${base}/movie/${id}`;
    if (s === "simplify") return `${base}/movie/${id}?color=addc35&back=false&domainAd=braflix.win`;
    if (s === "hindi") return `${base}/movie/?id=${id}&s=undefined&e=undefined&poster=https://image.tmdb.org/t/p/w780/enNubozHn9pXi0ycTVYUWfpHZm.jpg&color=ffffff`;
    if (s === "4k2") return `${base}/movie/${id}`;
    if (s === "prime") return `${base}/${id}`;
    if (s === "4khd") return `${base}/movie/${id}?theme=addc35`;
    if (s === "primewire") return `${base}/movie?imdb=${id}&fallback=true&server_order=PrimeVid,Voe,Dood`;
    if (s === "french") return `${base}/film.php?id=${id}`;
    if (s === "fade") return `${base}?type=movie&id=${id}&sendMetadata=true`;
    if (s === "vidora") return `${base}/tmdb-movie-${id}`;
    if (s === "pass" || s === "portuguese") return `${base}/filme/${id}`;
    return `${base}/movie/${id}`;
  }
}

/* =========================================================================
   GLOBAL STATE & LOCALIZATION ENGINE
   ========================================================================= */
let currentProvider = 'all';
let currentLang = (typeof localStorage !== 'undefined' && localStorage.getItem("fastfilm_lang")) ? localStorage.getItem("fastfilm_lang") : 'en';
let currentItem = null;
let activeProvider = 'vidsrc';
let selectedBalancerIndex = 0;
let browseData = null;

let currentOriginalSynopsis = "";
let currentTranslatedSynopsis = null;
let isSynopsisTranslated = false;

// Embedded fallback dictionary (prevents breaks when opened via file:///)
let DICT = {
  en: {
    name: "ENGLISH",
    code: "en",
    placeholder: "Search movies, TV series, directors, anime...",
    execute: "EXECUTE",
    results: "[ SEARCH RESULTS ]",
    primaryKinobox: "SELECT KINOBOX BALANCER:",
    primaryVidsrc: "SELECT VIDSRC SERVER:",
    subs: "AVAILABLE SUBTITLES:",
    back: "[ ← BACK TO CATALOG ]",
    play: "[ PLAY NOW ]",
    tabFilterAll: "[ 01. ALL ]",
    tabFilterVidsrc: "[ 02. VIDSRC ]",
    tabFilterKinobox: "[ 03. KINOBOX ]",
    watchTabVidsrc: "[ 01. VIDSRC ]",
    watchTabKinobox: "[ 02. KINOBOX ]",
    lblYear: "YEAR",
    lblRating: "RATING",
    lblType: "TYPE",
    lblSources: "SOURCES",
    lblMovie: "MOVIE",
    lblSeries: "SERIES",
    sourcesVal: "VIDSRC • KINOBOX",
    lblSynopsis: "SYNOPSIS:",
    btnTranslate: "[ TRANSLATE ]",
    btnOriginal: "[ ORIGINAL (EN) ]",
    btnTranslating: "[ TRANSLATING... ]",
    btnError: "[ ERROR ]",
    trendingMovies: "TRENDING MOVIES THIS WEEK",
    trendingSeries: "TRENDING SERIES THIS WEEK",
    popularMovies: "POPULAR MOVIES",
    popularSeries: "POPULAR SERIES",
    topRatedMovies: "TOP RATED MOVIES",
    topRatedSeries: "TOP RATED SERIES",
    upcomingReleases: "UPCOMING RELEASES",
    nowPlaying: "NOW PLAYING IN CINEMAS",
    recentlyWatched: "RECENTLY WATCHED",
    clearHistory: "[ CLEAR HISTORY ]",
    releases: "RELEASES",
    itemsFound: "ITEMS FOUND",
    noItemsFound: "[ NO ITEMS FOUND IN TMDB ]",
    adblockTag: "[ RECOMMENDATION // AD-BLOCKER ]",
    adblockTitle: "Enable an AdBlocker for a Clean Experience",
    adblockDesc: "Third-party video streaming servers may display intrusive popups and casino redirects. We strongly recommend installing AdBlock or using Brave Browser for uninterrupted, ad-free playback.",
    adblockInstall: "[ GET ADBLOCK ]",
    adblockBtnHeader: "[ ADBLOCK ]",
    adblockClose: "[ CONTINUE ]",
    adblockDontShow: "[ DON'T REMIND AGAIN ]",
    reloadServices: "[ RELOAD SERVICES ]",
    reloading: "[ RELOADING... ]"
  },
  uk: {
    name: "УКРАЇНСЬКА",
    code: "uk",
    placeholder: "Пошук фільмів, серіалів, режисерів, аніме...",
    execute: "ВИКОНАТИ",
    results: "[ РЕЗУЛЬТАТИ ПОШУКУ ]",
    primaryKinobox: "ВИБЕРІТЬ БАЛАНСЕР KINOBOX:",
    primaryVidsrc: "ВИБЕРІТЬ СЕРВЕР VIDSRC:",
    subs: "ДОСТУПНІ СУБТИТРИ:",
    back: "[ ← НАЗАД ДО КАТАЛОГУ ]",
    play: "[ ДИВИТИСЯ ЗАРАЗ ]",
    tabFilterAll: "[ 01. ВСІ ]",
    tabFilterVidsrc: "[ 02. VIDSRC ]",
    tabFilterKinobox: "[ 03. KINOBOX ]",
    watchTabVidsrc: "[ 01. VIDSRC ]",
    watchTabKinobox: "[ 02. KINOBOX ]",
    lblYear: "РІК",
    lblRating: "РЕЙТИНГ",
    lblType: "ТИП",
    lblSources: "ДЖЕРЕЛА",
    lblMovie: "ФІЛЬМ",
    lblSeries: "СЕРІАЛ",
    sourcesVal: "VIDSRC • KINOBOX",
    lblSynopsis: "СИНОПСИС:",
    btnTranslate: "[ ПЕРЕКЛАСТИ (UK) ]",
    btnOriginal: "[ ОРИГІНАЛ (EN) ]",
    btnTranslating: "[ ПЕРЕКЛАДАЮ... ]",
    btnError: "[ ПОМИЛКА ]",
    trendingMovies: "ТРЕНДОВІ ФІЛЬМИ ТИЖНЯ",
    trendingSeries: "ТРЕНДОВІ СЕРІАЛИ ТИЖНЯ",
    popularMovies: "ПОПУЛЯРНІ ФІЛЬМИ",
    popularSeries: "ПОПУЛЯРНІ СЕРІАЛИ",
    topRatedMovies: "ТОПОВІ ФІЛЬМИ",
    topRatedSeries: "ТОПОВІ СЕРІАЛИ",
    upcomingReleases: "МАЙБУТНІ РЕЛІЗИ",
    nowPlaying: "ЗАРАЗ У КІНОТЕАТРАХ",
    recentlyWatched: "НЕЩОДАВНО ПЕРЕГЛЯНУТІ",
    clearHistory: "[ ОЧИСТИТИ ІСТОРІЮ ]",
    releases: "РЕЛІЗІВ",
    itemsFound: "ЗНАЙДЕНО ТАЙТЛІВ",
    noItemsFound: "[ НІЧОГО НЕ ЗНАЙДЕНО В TMDB ]",
    adblockTag: "[ РЕКОМЕНДАЦІЯ // АНТИРЕКЛАМА ]",
    adblockTitle: "Увімкніть AdBlocker для чистого перегляду без реклами",
    adblockDesc: "Сторонні стрімінг-сервери можуть показувати нав'язливу спливаючу рекламу та казино-редиректи при кліку на Play. Рекомендуємо встановити розширення AdBlock або використовувати браузер Brave для максимального захисту.",
    adblockInstall: "[ ВСТАНОВИТИ ADBLOCK ]",
    adblockBtnHeader: "[ ADBLOCK ]",
    adblockClose: "[ ПРОДОВЖИТИ ]",
    adblockDontShow: "[ БІЛЬШЕ НЕ НАГАДУВАТИ ]",
    reloadServices: "[ ОНОВИТИ СЕРВІСИ ]",
    reloading: "[ ОНОВЛЕННЯ... ]"
  }
};

/* =========================================================================
   APP INITIALIZATION & ROUTING
   ========================================================================= */
document.addEventListener("DOMContentLoaded", async () => {
  const savedLang = (typeof localStorage !== 'undefined' && localStorage.getItem("fastfilm_lang")) ? localStorage.getItem("fastfilm_lang") : currentLang;
  currentLang = savedLang;
  await loadLocales();
  if (savedLang && savedLang !== 'en') {
    changeLanguage(savedLang);
  }
  handleRoute();
  detectAdBlock();
  sanitizeAndMigrateWatchHistory();

  window.addEventListener("hashchange", () => {
    handleRoute();
  });

  document.getElementById("searchInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") triggerSearch();
  });
});

async function loadLocales() {
  // 1. Пріоритет: якщо підключено locales.js (миттєво працює на file:/// та http/https без жодних CORS помилок)
  if (window.FASTFILM_LOCALES && Object.keys(window.FASTFILM_LOCALES).length > 0) {
    DICT = window.FASTFILM_LOCALES;
    populateLanguageDropdown();
    return;
  }

  // 2. Якщо запущено на веб-сервері (http: або https:), динамічно завантажуємо locales.json
  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    try {
      const res = await fetch("locales.json");
      if (res.ok) {
        DICT = await res.json();
      }
    } catch (err) {}
  }

  populateLanguageDropdown();
}

function populateLanguageDropdown() {
  const select = document.getElementById("langSelect");
  if (!select) return;

  const currentSelected = (typeof localStorage !== 'undefined' && localStorage.getItem("fastfilm_lang")) ? localStorage.getItem("fastfilm_lang") : currentLang;
  select.innerHTML = "";

  Object.keys(DICT).forEach(code => {
    const item = DICT[code];
    const opt = document.createElement("option");
    opt.value = code;
    opt.innerText = `[ ${code.toUpperCase()} ] ${item.name || code.toUpperCase()}`;
    if (code === currentSelected) opt.selected = true;
    select.appendChild(opt);
  });
}

/* =========================================================================
   WATCH HISTORY MODULE (LAST 6 RECENTLY VIEWED ITEMS)
   ========================================================================= */
function normalizeTitleKey(t) {
  return (t || "").toLowerCase().replace(/[^a-z0-9а-яіїєґ]/gi, "").trim();
}

function getWatchHistory() {
  try {
    const raw = localStorage.getItem("fastfilm_watch_history");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const deduplicated = [];
    parsed.forEach(it => {
      if (!it) return;
      const itId = (it.id !== null && it.id !== undefined && it.id !== "") ? String(it.id) : null;
      const itKp = (it.kp_id !== null && it.kp_id !== undefined && it.kp_id !== "") ? String(it.kp_id) : null;
      const itTitle = normalizeTitleKey(it.title_en || it.title || it.name);

      const exists = deduplicated.some(u => {
        const uId = (u.id !== null && u.id !== undefined && u.id !== "") ? String(u.id) : null;
        const uKp = (u.kp_id !== null && u.kp_id !== undefined && u.kp_id !== "") ? String(u.kp_id) : null;
        const uTitle = normalizeTitleKey(u.title_en || u.title || u.name);

        if (itId && uId && itId === uId) return true;
        if (itKp && uKp && itKp === uKp) return true;
        if (itTitle && uTitle && itTitle === uTitle) return true;
        return false;
      });

      if (!exists) {
        deduplicated.push(it);
      }
    });

    return deduplicated.slice(0, 6);
  } catch (e) {
    return [];
  }
}

function addToWatchHistory(item) {
  if (!item || (!item.id && !item.kp_id && !item.title && !item.title_en)) return;
  try {
    let history = getWatchHistory();
    const cleanItem = {
      id: (item.id !== null && item.id !== undefined && item.id !== "") ? String(item.id) : null,
      kp_id: (item.kp_id !== null && item.kp_id !== undefined && item.kp_id !== "") ? String(item.kp_id) : null,
      title: item.title || item.name || "Movie",
      title_en: item.title_en || item.title || item.name || "Movie",
      poster: item.poster || "",
      rating: item.rating || "8.0",
      rating_tmdb: item.rating_tmdb || null,
      rating_kp: item.rating_kp || null,
      rating_imdb: item.rating_imdb || null,
      year: item.year || "2026",
      type: item.type || "movie",
      provider: item.last_provider || item.provider || activeProvider || "vidsrc",
      last_provider: item.last_provider || activeProvider || "vidsrc",
      last_balancer_index: (item.last_balancer_index !== undefined && item.last_balancer_index !== null) ? Number(item.last_balancer_index) : (selectedBalancerIndex || 0),
      last_balancer_name: item.last_balancer_name || null
    };

    const targetId = cleanItem.id;
    const targetKp = cleanItem.kp_id;
    const targetTitle = normalizeTitleKey(cleanItem.title_en || cleanItem.title);

    history = history.filter(h => {
      const hId = (h.id !== null && h.id !== undefined && h.id !== "") ? String(h.id) : null;
      const hKp = (h.kp_id !== null && h.kp_id !== undefined && h.kp_id !== "") ? String(h.kp_id) : null;
      const hTitle = normalizeTitleKey(h.title_en || h.title || h.name);

      if (targetId && hId && targetId === hId) return false;
      if (targetKp && hKp && targetKp === hKp) return false;
      if (targetTitle && hTitle && targetTitle === hTitle) return false;
      return true;
    });

    history.unshift(cleanItem);
    history = history.slice(0, 6);

    localStorage.setItem("fastfilm_watch_history", JSON.stringify(history));
  } catch (e) {}
}

function clearWatchHistory() {
  localStorage.removeItem("fastfilm_watch_history");
  renderWatchHistory();
}

function renderWatchHistory() {
  const historySec = document.getElementById("historySection");
  const historyGrid = document.getElementById("historyGrid");
  const historyTitle = document.getElementById("historyTitle");
  const btnClear = document.getElementById("btnClearHistory");
  if (!historySec || !historyGrid) return;

  const dict = DICT[currentLang] || DICT.en;
  if (historyTitle) historyTitle.innerText = `[ ${dict.recentlyWatched || 'RECENTLY WATCHED'} ]`;
  if (btnClear) btnClear.innerText = dict.clearHistory || '[ CLEAR HISTORY ]';

  const history = getWatchHistory();
  if (!history || history.length === 0) {
    historySec.style.display = "none";
    historyGrid.innerHTML = "";
    return;
  }

  historySec.style.display = "block";
  historyGrid.innerHTML = "";
  history.forEach(item => {
    historyGrid.appendChild(createCard(item));
  });
}

/* =========================================================================
   WATCH HISTORY ASYNC TMDB AUTO-CONVERTER & SANITIZER
   ========================================================================= */
async function sanitizeAndMigrateWatchHistory() {
  const history = getWatchHistory();
  if (!history || history.length === 0) return;

  let needsSave = false;

  const migratedItems = await Promise.all(history.map(async (item) => {
    if (!item) return null;

    const posterStr = String(item.poster || "");
    const isBadPoster = !posterStr || posterStr.includes("unsplash") || posterStr.includes("yandex") || posterStr.includes("kinopoisk");
    const isMissingId = !item.id || String(item.id).startsWith("undefined") || String(item.id).length < 2;
    const isNonAscii = /[^\x00-\x7F]/.test(item.title || "");

    // Якщо все чисто, валідно і є TMDB ID — залишаємо як є
    if (!isMissingId && !isBadPoster && !isNonAscii) {
      return item;
    }

    // Інакше — асинхронно знаходимо канонічний TMDB фільм
    try {
      let queryTitle = item.title_en || item.title || "";
      if (isNonAscii) {
        try {
          const tr = await translateWithMyMemory(queryTitle, 'en');
          if (tr && tr.trim()) queryTitle = tr.trim();
        } catch(e) {}
      }

      const r = await fetch(`https://moviepire.co/search?q=${encodeURIComponent(queryTitle)}`);
      const json = await r.json();
      const items = json.data || json.results || json || [];
      if (Array.isArray(items) && items.length > 0) {
        const tmdb = items[0];
        const cleanPoster = tmdb.poster || tmdb.image || (tmdb.poster_path ? `https://image.tmdb.org/t/p/w500${tmdb.poster_path}` : '');
        
        needsSave = true;
        return {
          id: String(tmdb.id),
          kp_id: item.kp_id || null,
          title: tmdb.title || tmdb.name || queryTitle,
          title_en: tmdb.title || tmdb.name || queryTitle,
          poster: cleanPoster || item.poster || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80",
          rating: tmdb.vote_average || tmdb.rating || item.rating || "8.0",
          rating_tmdb: tmdb.vote_average || tmdb.rating || item.rating_tmdb || null,
          rating_kp: item.rating_kp || null,
          rating_imdb: item.rating_imdb || null,
          year: tmdb.year || (tmdb.release_date ? tmdb.release_date.slice(0, 4) : item.year || "2026"),
          type: tmdb.type || item.type || "movie",
          provider: "both",
          last_provider: item.last_provider || "vidsrc",
          last_balancer_index: item.last_balancer_index || 0,
          last_balancer_name: item.last_balancer_name || null
        };
      }
    } catch(e) {}

    // Якщо пошук не повернув TMDB, принаймні очищаємо московитські банери
    if (isBadPoster) {
      item.poster = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80";
      needsSave = true;
    }
    return item;
  }));

  if (needsSave) {
    const validItems = migratedItems.filter(Boolean);
    const dedupMap = new Map();
    validItems.forEach(it => {
      const key = it.id ? `tmdb_${it.id}` : `${normalizeTitleKey(it.title)}_${it.year}`;
      if (!dedupMap.has(key)) dedupMap.set(key, it);
    });
    const finalHistory = Array.from(dedupMap.values()).slice(0, 6);
    localStorage.setItem("fastfilm_watch_history", JSON.stringify(finalHistory));
    renderWatchHistory();
  }
}

function handleRoute() {
  const hash = window.location.hash;
  if (hash.startsWith("#watch")) {
    const queryStr = hash.replace("#watch?", "");
    const params = new URLSearchParams(queryStr);
    openWatchPageFromParams(params);
  } else {
    navigateHome(false);
  }
}

function navigateHome(updateHash = true) {
  document.title = "FastFilm";
  document.getElementById("homePageView").style.display = "block";
  document.getElementById("watchPageView").style.display = "none";
  document.getElementById("btnBackToHome").style.display = "none";
  document.getElementById("videoIframe").src = "";
  if (updateHash && window.location.hash.startsWith("#watch")) {
    window.location.hash = "";
  }
  renderWatchHistory();
  sanitizeAndMigrateWatchHistory();
  if (!browseData) loadBrowseCatalog();
}

function setProvider(prov) {
  currentProvider = prov;
  document.querySelectorAll(".tab-btn[data-provider]").forEach(b => {
    b.classList.toggle("active", b.dataset.provider === prov);
  });
  const q = document.getElementById("searchInput").value.trim();
  if (q) triggerSearch();
}

function changeLanguage(lang) {
  currentLang = lang;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem("fastfilm_lang", lang);
  }
  const select = document.getElementById("langSelect");
  if (select && select.value !== lang) {
    select.value = lang;
  }
  const dict = DICT[lang] || DICT.en;
  
  document.getElementById("searchInput").placeholder = dict.placeholder;
  document.getElementById("btnSearch").innerText = dict.execute;
  
  const tabAll = document.getElementById("tabFilterAll");
  if (tabAll) tabAll.innerText = dict.tabFilterAll;
  const tabVidsrc = document.getElementById("tabFilterVidsrc");
  if (tabVidsrc) tabVidsrc.innerText = dict.tabFilterVidsrc;
  const tabKinobox = document.getElementById("tabFilterKinobox");
  if (tabKinobox) tabKinobox.innerText = dict.tabFilterKinobox;

  const watchTabVid = document.getElementById("tabVidSrc");
  if (watchTabVid) watchTabVid.innerText = dict.watchTabVidsrc;
  const watchTabKino = document.getElementById("tabKinobox");
  if (watchTabKino) watchTabKino.innerText = dict.watchTabKinobox;

  const labelSubs = document.getElementById("labelSubs");
  if (labelSubs) labelSubs.innerText = dict.subs;
  const labelPrimary = document.getElementById("labelPrimarySelector");
  if (labelPrimary) {
    labelPrimary.innerText = (activeProvider === 'kinobox') ? dict.primaryKinobox : dict.primaryVidsrc;
  }
  const labelSynopsis = document.getElementById("labelSynopsis");
  if (labelSynopsis) labelSynopsis.innerText = dict.lblSynopsis;

  const lblYear = document.getElementById("lblYear");
  if (lblYear) lblYear.innerText = dict.lblYear;
  const lblRating = document.getElementById("lblRating");
  if (lblRating) lblRating.innerText = dict.lblRating;
  const lblType = document.getElementById("lblType");
  if (lblType) lblType.innerText = dict.lblType;
  const lblSources = document.getElementById("lblSources");
  if (lblSources) lblSources.innerText = dict.lblSources;
  const watchSources = document.getElementById("watchSources");
  if (watchSources) watchSources.innerText = dict.sourcesVal;

  document.getElementById("btnBackToHome").innerText = dict.back;
  const btnHeadAd = document.getElementById("btnHeaderAdblock");
  if (btnHeadAd) btnHeadAd.innerText = dict.adblockBtnHeader || "[ ADBLOCK ]";
  const playBtn = document.getElementById("heroPlayBtn");
  if (playBtn) playBtn.innerText = dict.play;

  // Автоматично оновлюємо опис: якщо англійська — показуємо оригінал, якщо інша — автоматично перекладаємо
  const synopsisEl = document.getElementById("watchSynopsis");
  const btnTr = document.getElementById("btnTranslateSynopsis");

  if (currentOriginalSynopsis && synopsisEl && !currentOriginalSynopsis.includes("Loading")) {
    if (lang === 'en' || lang.startsWith('en')) {
      synopsisEl.innerText = currentOriginalSynopsis;
      isSynopsisTranslated = false;
      currentTranslatedSynopsis = null;
      if (btnTr) btnTr.style.display = 'none';
    } else {
      if (btnTr) {
        btnTr.style.display = 'inline-block';
        btnTr.innerText = dict.btnTranslating || '[ TRANSLATING... ]';
        btnTr.classList.remove("active");
      }
      translateWithMyMemory(currentOriginalSynopsis, lang).then(translated => {
        if (translated) {
          currentTranslatedSynopsis = translated;
          isSynopsisTranslated = true;
          synopsisEl.innerText = translated;
          if (btnTr) {
            btnTr.innerText = dict.btnOriginal || '[ ORIGINAL (EN) ]';
            btnTr.classList.add("active");
          }
        } else if (btnTr) {
          btnTr.innerText = dict.btnTranslate || '[ TRANSLATE ]';
        }
      }).catch(() => {
        if (btnTr) btnTr.innerText = dict.btnTranslate || '[ TRANSLATE ]';
      });
    }
  }

  const lblSearchResults = document.getElementById("searchResultsTitle");
  if (lblSearchResults) lblSearchResults.innerText = dict.results || "[ SEARCH RESULTS ]";

  const historyTitle = document.getElementById("historyTitle");
  if (historyTitle) historyTitle.innerText = `[ ${dict.recentlyWatched || 'RECENTLY WATCHED'} ]`;
  const btnClearHist = document.getElementById("btnClearHistory");
  if (btnClearHist) btnClearHist.innerText = dict.clearHistory || '[ CLEAR HISTORY ]';

  const lblReload = document.getElementById("lblReloadServers");
  if (lblReload) lblReload.innerText = dict.reloadServices || "[ RELOAD SERVICES ]";

  renderWatchHistory();
  if (browseData) renderCollections(browseData);
  if (currentItem) {
    updateWatchSidebarTitles();
    renderProviderControls(false);
  }
}

/* =========================================================================
   BROWSE CATALOG (CLIENT-SIDE FETCH)
   ========================================================================= */
async function loadBrowseCatalog() {
  try {
    const res = await fetch("https://moviepire.co/browse");
    const json = await res.json();
    browseData = json.data || json;

    if (browseData.hero) {
      const hero = browseData.hero;
      const dict = DICT[currentLang] || DICT.en;
      document.getElementById("heroSection").style.display = "flex";
      document.getElementById("heroBg").src = hero.images?.backdrop || "";
      document.getElementById("heroTitle").innerText = hero.title || "Featured";
      document.getElementById("heroDesc").innerText = hero.description || "";
      const hBtn = document.getElementById("heroPlayBtn");
      if (hBtn) hBtn.innerText = dict.play || "[ PLAY NOW ]";
      document.getElementById("heroPlayBtn").onclick = () => openWatchPage({
        id: hero.id,
        title: hero.title,
        title_en: hero.title,
        type: hero.type || 'series'
      });
    }

    renderCollections(browseData);

  } catch (err) {
    console.error("Browse API Error:", err);
  }
}

function renderCollections(data) {
  const container = document.getElementById("collectionsContainer");
  container.innerHTML = "";
  const dict = DICT[currentLang] || DICT.en;

  const cols = data.collections || [];
  cols.forEach(col => {
    const block = document.createElement("div");
    block.className = "collection-block";

    let rawTitle = (col.title || "Collection").trim();
    let displayTitle = rawTitle;

    if (currentLang !== 'en') {
      if (/trending movies/i.test(rawTitle)) displayTitle = dict.trendingMovies || rawTitle;
      else if (/trending series|trending tv/i.test(rawTitle)) displayTitle = dict.trendingSeries || rawTitle;
      else if (/popular movies/i.test(rawTitle)) displayTitle = dict.popularMovies || rawTitle;
      else if (/popular series|popular tv/i.test(rawTitle)) displayTitle = dict.popularSeries || rawTitle;
      else if (/top rated movies/i.test(rawTitle)) displayTitle = dict.topRatedMovies || rawTitle;
      else if (/top rated series|top rated tv/i.test(rawTitle)) displayTitle = dict.topRatedSeries || rawTitle;
      else if (/upcoming/i.test(rawTitle)) displayTitle = dict.upcomingReleases || rawTitle;
      else if (/now playing/i.test(rawTitle)) displayTitle = dict.nowPlaying || rawTitle;
    }

    const countText = `${col.items?.length || 0} ${dict.releases || 'RELEASES'}`;

    block.innerHTML = `
      <div class="collection-header">
        <h3 class="collection-title">${displayTitle}</h3>
        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">${countText}</span>
      </div>
      <div class="movies-grid"></div>
    `;

    const grid = block.querySelector(".movies-grid");
    (col.items || []).forEach(item => {
      grid.appendChild(createCard(item));
    });

    container.appendChild(block);
  });
}

/* =========================================================================
   KINOBOX API HELPER (SUPPORTS CLOUDFLARE ORIGIN PROXY + DIRECT FALLBACK)
   ========================================================================= */
async function fetchKinobox(type, params = {}) {
  const ts = Math.floor(Math.random() * 9000 + 1000);
  const q = new URLSearchParams({ ...params, ts }).toString();

  // 1. Спроба через Cloudflare Edge Function (працює на http: та https:)
  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    try {
      const rProxy = await fetch(`/api/${type}?${q}`);
      if (rProxy.ok) {
        return await rProxy.json();
      }
    } catch (e) {}
  }

  // 2. Прямий виклик Kinobox API
  try {
    const directEndpoint = (type === 'search') 
      ? `https://kinobox.tv/api/movies/search/?${q}`
      : `https://kinobox.tv/api/players?${q}`;
      
    const rDirect = await fetch(directEndpoint);
    if (rDirect.ok) {
      return await rDirect.json();
    }
  } catch (e) {}

  return null;
}

/* =========================================================================
   SEARCH FUNCTION (100% ASYNC TMDB RESOLVER + AUTO-CONVERSION)
   ========================================================================= */
async function triggerSearch() {
  const rawQ = document.getElementById("searchInput").value.trim();
  const searchSec = document.getElementById("searchResultsSection");
  const browseSec = document.getElementById("collectionsContainer");
  const heroSec = document.getElementById("heroSection");
  const historySec = document.getElementById("historySection");

  if (!rawQ) {
    searchSec.style.display = "none";
    browseSec.style.display = "block";
    renderWatchHistory();
    if (heroSec.querySelector("img").src) heroSec.style.display = "flex";
    return;
  }

  heroSec.style.display = "none";
  browseSec.style.display = "none";
  if (historySec) historySec.style.display = "none";
  searchSec.style.display = "block";

  const grid = document.getElementById("searchGrid");
  grid.innerHTML = '<div style="grid-column: 1/-1; padding: 40px 0; color: var(--text-muted); font-family: var(--font-mono);"><span class="spinner"></span> SEARCHING & RESOLVING TMDB METADATA...</div>';

  const cleanQ = rawQ.replace(/[\-_/\\:]+/g, " ").trim();
  const rawList = [];
  const promises = [];

  // Перевірка на кирилицю / не-латинські символи
  const isNonAscii = /[^\x00-\x7F]/.test(cleanQ);

  // 1. Асинхронний пошук напряму в TMDB за оригінальним текстом
  promises.push(
    fetch(`https://moviepire.co/search?q=${encodeURIComponent(cleanQ)}`)
      .then(r => r.json())
      .then(json => {
        const items = json.data || json.results || json || [];
        if (Array.isArray(items)) {
          items.forEach(it => {
            const posterUrl = it.poster || it.image || (it.poster_path ? `https://image.tmdb.org/t/p/w500${it.poster_path}` : '');
            if (posterUrl && (posterUrl.includes('yandex') || posterUrl.includes('kinopoisk'))) return;
            rawList.push({
              id: it.id,
              kp_id: null,
              title: it.title || it.name || 'Movie',
              title_en: it.title || it.name || 'Movie',
              poster: posterUrl,
              rating: it.vote_average || it.rating,
              rating_tmdb: it.vote_average || it.rating,
              year: it.year || (it.release_date ? it.release_date.slice(0, 4) : ''),
              type: it.type || 'movie',
              provider: 'both'
            });
          });
        }
      })
      .catch(() => {})
  );

  // 2. Якщо введено не-латиницею — паралельно перекладаємо на англійську та шукаємо в TMDB
  if (isNonAscii) {
    promises.push(
      translateWithMyMemory(cleanQ, 'en')
        .then(async trRes => {
          if (trRes && trRes.trim() && trRes.toLowerCase() !== cleanQ.toLowerCase()) {
            const trClean = trRes.trim();
            const r = await fetch(`https://moviepire.co/search?q=${encodeURIComponent(trClean)}`);
            const json = await r.json();
            const items = json.data || json.results || json || [];
            if (Array.isArray(items)) {
              items.forEach(it => {
                const posterUrl = it.poster || it.image || (it.poster_path ? `https://image.tmdb.org/t/p/w500${it.poster_path}` : '');
                if (posterUrl && (posterUrl.includes('yandex') || posterUrl.includes('kinopoisk'))) return;
                rawList.push({
                  id: it.id,
                  kp_id: null,
                  title: it.title || it.name || 'Movie',
                  title_en: it.title || it.name || 'Movie',
                  poster: posterUrl,
                  rating: it.vote_average || it.rating,
                  rating_tmdb: it.vote_average || it.rating,
                  year: it.year || (it.release_date ? it.release_date.slice(0, 4) : ''),
                  type: it.type || 'movie',
                  provider: 'both'
                });
              });
            }
          }
        })
        .catch(() => {})
    );
  }

  // 3. Паралельний пошук локалізованих назв із авто-конвертацією в чистий TMDB
  promises.push(
    fetchKinobox('search', { query: cleanQ })
      .then(async json => {
        const items = json?.data?.items || json?.items || [];
        if (Array.isArray(items) && items.length > 0) {
          // Беремо тільки оригінальну англійську назву або TMDB ID та конвертуємо в чистий TMDB фільм
          const tmdbPromises = items.slice(0, 5).map(async it => {
            const targetTitle = it.title?.original || it.title || it.name;
            if (!targetTitle) return;
            try {
              const r = await fetch(`https://moviepire.co/search?q=${encodeURIComponent(targetTitle)}`);
              const resJson = await r.json();
              const tmdbItems = resJson.data || resJson.results || resJson || [];
              if (Array.isArray(tmdbItems) && tmdbItems.length > 0) {
                const matched = tmdbItems[0];
                const posterUrl = matched.poster || matched.image || (matched.poster_path ? `https://image.tmdb.org/t/p/w500${matched.poster_path}` : '');
                if (posterUrl && (posterUrl.includes('yandex') || posterUrl.includes('kinopoisk'))) return;
                rawList.push({
                  id: matched.id,
                  kp_id: it.id || null,
                  title: matched.title || matched.name || targetTitle,
                  title_en: matched.title || matched.name || targetTitle,
                  poster: posterUrl,
                  rating: matched.vote_average || matched.rating,
                  rating_tmdb: matched.vote_average || matched.rating,
                  year: matched.year || it.year || '',
                  type: matched.type || (it.type === 'Series' ? 'series' : 'movie'),
                  provider: 'both'
                });
              }
            } catch(e) {}
          });
          await Promise.allSettled(tmdbPromises);
        }
      })
      .catch(() => {})
  );

  // Чекаємо завершення всіх асинхронних потоків (швидко і без затримок)
  await Promise.allSettled(promises);

  // 4. Повна дедуплікація виключно за унікальним TMDB ID
  const mergedMap = new Map();

  rawList.forEach(it => {
    if (!it.id) return;
    const key = `tmdb_${it.id}`;
    if (!mergedMap.has(key)) {
      mergedMap.set(key, it);
    } else {
      const existing = mergedMap.get(key);
      if (it.kp_id && !existing.kp_id) existing.kp_id = it.kp_id;
      if (!existing.poster || existing.poster.includes('unsplash')) existing.poster = it.poster;
    }
  });

  const combined = Array.from(mergedMap.values());

  grid.innerHTML = "";
  const dict = DICT[currentLang] || DICT.en;
  document.getElementById("searchStats").innerText = `${combined.length} ${dict.itemsFound || 'ITEMS FOUND'}`;

  if (combined.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; padding: 40px 0; color: var(--text-muted); font-family: var(--font-mono);">${dict.noItemsFound || '[ NO ITEMS FOUND IN TMDB ]'}</div>`;
    return;
  }

  combined.forEach(item => {
    grid.appendChild(createCard(item));
  });
}

function formatRatingBadge(item) {
  const r = item.rating_tmdb || item.rating;
  if (r !== undefined && r !== null && r !== "") {
    const num = parseFloat(r);
    if (!isNaN(num) && num > 0) {
      const val = (num > 10) ? (num / 10).toFixed(1) : num.toFixed(1);
      return `★ ${val}`;
    }
  }
  return "★ 8.0";
}

function formatSidebarRating(item) {
  const parts = [];

  const rKp = item.rating_kp || (item.provider === 'kinobox' ? item.rating : null);
  if (rKp !== undefined && rKp !== null && rKp !== "") {
    const num = parseFloat(rKp);
    if (!isNaN(num) && num > 0) {
      const val = (num > 10) ? (num / 10).toFixed(1) : num.toFixed(1);
      parts.push(`KP ${val}`);
    }
  }

  const rImdb = item.rating_imdb || (item.provider !== 'kinobox' && item.rating && !item.rating_kp ? item.rating : null);
  if (rImdb !== undefined && rImdb !== null && rImdb !== "") {
    const num = parseFloat(rImdb);
    if (!isNaN(num) && num > 0) {
      const val = (num > 10) ? (num / 10).toFixed(1) : num.toFixed(1);
      parts.push(`IMDb ${val}`);
    }
  }

  if (parts.length === 0) {
    if (item.rating) {
      const num = parseFloat(item.rating);
      if (!isNaN(num) && num > 0) {
        const val = (num > 10) ? (num / 10).toFixed(1) : num.toFixed(1);
        return `IMDb ${val}`;
      }
    }
    return '8.0';
  }

  return parts.join(' • ');
}

function createCard(item) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.onclick = () => openWatchPage(item);
  card.onkeydown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openWatchPage(item);
    }
  };

  const dict = DICT[currentLang] || DICT.en;
  const isTv = (item.type === 'tv' || item.type === 'series');
  const typeLabel = isTv ? dict.lblSeries : dict.lblMovie;

  let posterSrc = item.poster;
  if (!posterSrc || posterSrc.includes('unsplash') || posterSrc.includes('yandex') || posterSrc.includes('kinopoisk')) {
    posterSrc = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80";
  }
  const ratingBadge = formatRatingBadge(item);
  const displayTitle = item.title_en || item.title || item.name || "Movie";

  let provTag = '[VIDSRC]';
  if (item.provider === 'both') {
    provTag = '[VIDSRC • KINOBOX]';
  } else if (item.provider === 'kinobox') {
    provTag = '[KINOBOX]';
  }

  card.innerHTML = `
    <div class="poster-box">
      <img src="${posterSrc}" alt="${displayTitle}" class="poster-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80'" />
      <span class="badge-provider">${provTag}</span>
      <span class="badge-rating">${ratingBadge}</span>
    </div>
    <div class="card-info">
      <div class="card-title" title="${displayTitle}">${displayTitle}</div>
      <div class="card-meta">
        <span>${item.year || '2026'}</span>
        <span>${typeLabel}</span>
      </div>
    </div>
  `;
  return card;
}

/* =========================================================================
   DEDICATED WATCH PAGE FUNCTIONS (PURE CLIENT-SIDE)
   ========================================================================= */
async function openWatchPage(item, updateHash = true) {
  if (!item.id && item.title) {
    try {
      const rTmdb = await fetch(`https://moviepire.co/search?q=${encodeURIComponent(item.title_en || item.title)}`);
      const tmdbJson = await rTmdb.json();
      const tmdbItems = tmdbJson.data || tmdbJson.results || tmdbJson || [];
      if (tmdbItems.length > 0) {
        item.id = tmdbItems[0].id;
        if (!item.poster || item.poster.includes('unsplash') || item.poster.includes('yandex') || item.poster.includes('kinopoisk')) {
          item.poster = tmdbItems[0].poster || tmdbItems[0].image;
        }
        if (tmdbItems[0].vote_average || tmdbItems[0].rating) {
          item.rating_tmdb = tmdbItems[0].vote_average || tmdbItems[0].rating;
        }
      }
    } catch(e) {}
  }

  currentItem = item;
  renderWatchPage(item, updateHash);
}

function openWatchPageFromParams(params) {
  const id = params.get("id") || "969681";
  const type = params.get("type") || "movie";

  // Перевіряємо, чи є вже цей фільм в історії переглядів із завантаженими метаданими
  const history = getWatchHistory();
  const found = history.find(h => String(h.id) === String(id));

  if (found) {
    openWatchPage(found, false);
    return;
  }

  const item = {
    id: id,
    kp_id: null,
    title: "Movie",
    title_en: "Movie",
    year: "2026",
    rating: "8.0",
    rating_tmdb: null,
    rating_kp: null,
    type: type,
    poster: "",
    provider: "both"
  };
  openWatchPage(item, false);
}

function renderWatchPage(item, updateHash = true) {
  currentItem = item;

  document.getElementById("homePageView").style.display = "none";
  document.getElementById("watchPageView").style.display = "block";
  document.getElementById("btnBackToHome").style.display = "inline-block";
  window.scrollTo(0, 0);

  const dict = DICT[currentLang] || DICT.en;
  const isTv = (item.type === 'tv' || item.type === 'series');

  updateWatchSidebarTitles();
  document.getElementById("watchPoster").src = item.poster || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80";
  document.getElementById("watchYear").innerText = item.year || '2026';
  document.getElementById("watchRating").innerText = formatSidebarRating(item);
  document.getElementById("watchType").innerText = isTv ? dict.lblSeries : dict.lblMovie;
  document.getElementById("watchSources").innerText = dict.sourcesVal;
  
  const lblY = document.getElementById("lblYear");
  if (lblY) lblY.innerText = dict.lblYear;
  const lblR = document.getElementById("lblRating");
  if (lblR) lblR.innerText = dict.lblRating;
  const lblT = document.getElementById("lblType");
  if (lblT) lblT.innerText = dict.lblType;
  const lblS = document.getElementById("lblSources");
  if (lblS) lblS.innerText = dict.lblSources;

  document.getElementById("watchSynopsis").innerText = item.description || item.overview || 'Loading movie synopsis and details...';
  document.getElementById("primarySelectorList").innerHTML = '<span class="spinner"></span> LOADING...';
  document.getElementById("subtitlesList").innerHTML = '—';

  // Відновлення вибраного провайдера та плеєра з історії або параметрів
  if (item.last_provider) {
    activeProvider = item.last_provider;
    selectedBalancerIndex = (item.last_balancer_index !== undefined && item.last_balancer_index !== null) ? Number(item.last_balancer_index) : 0;
  } else if (item.provider === 'kinobox' || item.provider === 'vidsrc') {
    activeProvider = item.provider;
    selectedBalancerIndex = (item.last_balancer_index !== undefined && item.last_balancer_index !== null) ? Number(item.last_balancer_index) : 0;
  } else {
    activeProvider = (currentLang === 'uk') ? 'kinobox' : 'vidsrc';
    selectedBalancerIndex = 0;
  }

  item.last_provider = activeProvider;
  item.last_balancer_index = selectedBalancerIndex;

  // Формуємо чисте та коротке посилання тільки з ID (та типом, якщо серіал)
  if (updateHash) {
    const queryParams = new URLSearchParams({
      id: item.id || '969681'
    });
    if (isTv) queryParams.set("type", "series");
    window.location.hash = `watch?${queryParams.toString()}`;
  }

  // Зберігаємо в історію переглядів
  addToWatchHistory(item);

  document.querySelectorAll(".prov-tab-btn").forEach(b => b.classList.remove("active"));
  if (activeProvider === 'vidsrc') document.getElementById("tabVidSrc").classList.add("active");
  if (activeProvider === 'kinobox') document.getElementById("tabKinobox").classList.add("active");

  renderProviderControls();
  loadSubtitles(item.id, item.type || 'movie');
  loadMovieDetails(item.id, item.type || 'movie');
}

async function loadMovieDetails(id, type) {
  if (!id) return;
  const dict = DICT[currentLang] || DICT.en;
  let ep = (type === 'series' || type === 'tv') ? 'series' : 'movie';
  let data = null;

  try {
    const res = await fetch(`https://moviepire.co/${ep}/${id}`);
    if (res.ok) {
      const json = await res.json();
      data = json.data || json;
    }
  } catch (err) {}

  // Якщо перший запит повернув помилку (наприклад 400 Bad Request для серіалу, який вважався фільмом) — пробуємо альтернативний ендпоінт
  if (!data || data.error || !data.title) {
    const altEp = (ep === 'movie') ? 'series' : 'movie';
    try {
      const altRes = await fetch(`https://moviepire.co/${altEp}/${id}`);
      if (altRes.ok) {
        const altJson = await altRes.json();
        const altData = altJson?.data || altJson;
        if (altData && altData.title) {
          data = altData;
          ep = altEp;
          const detectedType = (ep === 'series') ? 'series' : 'movie';
          if (currentItem) {
            currentItem.type = detectedType;
            const isTv = (detectedType === 'series');
            document.getElementById("watchType").innerText = isTv ? dict.lblSeries : dict.lblMovie;
            const queryParams = new URLSearchParams({ id: currentItem.id || '969681' });
            if (isTv) queryParams.set("type", "series");
            window.location.hash = `watch?${queryParams.toString()}`;
            renderProviderControls(true);
          }
        }
      }
    } catch (altErr) {}
  }

  if (data && data.title) {
    const desc = data.description || data.overview;
    if (desc) {
      currentOriginalSynopsis = desc;
      currentTranslatedSynopsis = null;
      isSynopsisTranslated = false;
      document.getElementById("watchSynopsis").innerText = desc;
      const btn = document.getElementById("btnTranslateSynopsis");
      if (btn) {
        if (currentLang === 'en' || currentLang.startsWith('en')) {
          btn.style.display = 'none';
        } else {
          btn.style.display = 'inline-block';
          btn.innerText = dict.btnTranslating || '[ TRANSLATING... ]';
          btn.classList.remove("active");
        }
      }

      // Автоматично перекладаємо на обрану мову
      if (currentLang && !currentLang.startsWith('en')) {
        translateWithMyMemory(desc, currentLang).then(translated => {
          if (translated && currentOriginalSynopsis === desc) {
            currentTranslatedSynopsis = translated;
            isSynopsisTranslated = true;
            document.getElementById("watchSynopsis").innerText = translated;
            if (btn) {
              btn.innerText = dict.btnOriginal || '[ ORIGINAL (EN) ]';
              btn.classList.add("active");
            }
          } else if (btn) {
            btn.innerText = dict.btnTranslate || '[ TRANSLATE ]';
          }
        }).catch(() => {
          if (btn) btn.innerText = dict.btnTranslate || '[ TRANSLATE ]';
        });
      }
    } else {
      currentOriginalSynopsis = "No extended synopsis available for this title.";
      document.getElementById("watchSynopsis").innerText = currentOriginalSynopsis;
    }
    if (data.poster || data.poster_path || data.images?.poster || data.backdrop) {
      const resolvedPoster = data.poster || data.images?.poster || (data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null) || data.backdrop;
      if (resolvedPoster && (!currentItem.poster || currentItem.poster.includes('unsplash') || currentItem.poster.includes('yandex') || currentItem.poster.includes('kinopoisk'))) {
        currentItem.poster = resolvedPoster;
        const wPoster = document.getElementById("watchPoster");
        if (wPoster) wPoster.src = resolvedPoster;
        addToWatchHistory(currentItem);
      }
    }
    if (data.year || data.release_date || data.date) {
      const relYear = data.year || (data.release_date ? data.release_date.slice(0, 4) : (data.date ? data.date.slice(0, 4) : currentItem.year));
      currentItem.year = relYear;
      document.getElementById("watchYear").innerText = currentItem.year;
    }
    if (data.rating || data.vote_average) {
      currentItem.rating_imdb = data.vote_average || data.rating;
      currentItem.rating_tmdb = data.vote_average || data.rating;
      document.getElementById("watchRating").innerText = formatSidebarRating(currentItem);
    }
    if (data.title || data.name) {
      currentItem.title = data.title || data.name;
      currentItem.title_en = data.title || data.name;
      updateWatchSidebarTitles();
      addToWatchHistory(currentItem);
    }
  } else {
    const cur = document.getElementById("watchSynopsis").innerText;
    if (!cur || cur.includes("Loading")) {
      currentOriginalSynopsis = "Full movie synopsis available via streaming players.";
      document.getElementById("watchSynopsis").innerText = currentOriginalSynopsis;
    }
  }
}

async function toggleSynopsisTranslation() {
  const btn = document.getElementById("btnTranslateSynopsis");
  const synopsisEl = document.getElementById("watchSynopsis");
  const dict = DICT[currentLang] || DICT.en;

  if (!currentOriginalSynopsis || currentOriginalSynopsis.includes("Loading")) {
    return;
  }

  if (isSynopsisTranslated) {
    synopsisEl.innerText = currentOriginalSynopsis;
    isSynopsisTranslated = false;
    btn.innerText = dict.btnTranslate;
    btn.classList.remove("active");
  } else {
    if (currentTranslatedSynopsis) {
      synopsisEl.innerText = currentTranslatedSynopsis;
      isSynopsisTranslated = true;
      btn.innerText = dict.btnOriginal;
      btn.classList.add("active");
    } else {
      btn.innerText = dict.btnTranslating;
      btn.disabled = true;

      const targetLang = currentLang || 'uk';
      const translated = await translateWithMyMemory(currentOriginalSynopsis, targetLang);
      
      btn.disabled = false;
      if (translated) {
        currentTranslatedSynopsis = translated;
        synopsisEl.innerText = currentTranslatedSynopsis;
        isSynopsisTranslated = true;
        btn.innerText = dict.btnOriginal;
        btn.classList.add("active");
      } else {
        btn.innerText = dict.btnError;
        setTimeout(() => {
          btn.innerText = dict.btnTranslate;
        }, 2000);
      }
    }
  }
}

async function translateWithMyMemory(text, targetLang = 'uk') {
  try {
    const words = text.split(' ');
    const chunks = [];
    let curr = [];
    let currLen = 0;

    for (const w of words) {
      if (currLen + w.length + 1 > 380) {
        chunks.push(curr.join(' '));
        curr = [w];
        currLen = w.length;
      } else {
        curr.push(w);
        currLen += w.length + 1;
      }
    }
    if (curr.length > 0) chunks.push(curr.join(' '));

    const promises = chunks.map(async chunk => {
      try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|${targetLang}`;
        const res = await fetch(url);
        const data = await res.json();
        let rawText = data?.responseData?.translatedText || chunk;
        const txt = document.createElement("textarea");
        txt.innerHTML = rawText;
        return txt.value;
      } catch(e) {
        return chunk;
      }
    });

    const results = await Promise.all(promises);
    return results.join(' ');
  } catch (err) {
    console.error("MyMemory Translation Error:", err);
    return null;
  }
}

function updateWatchSidebarTitles() {
  if (!currentItem) return;
  const displayTitle = currentItem.title_en || currentItem.title || currentItem.name || 'Movie';
  document.getElementById("watchTitle").innerText = displayTitle;
  document.getElementById("watchOrigTitle").innerText = currentItem.title_en || currentItem.title || '';
  document.title = `${displayTitle} — FastFilm`;
}

function switchProvider(prov) {
  activeProvider = prov;
  selectedBalancerIndex = (currentItem && currentItem.last_provider === prov && currentItem.last_balancer_index !== undefined)
    ? Number(currentItem.last_balancer_index)
    : 0;

  document.querySelectorAll(".prov-tab-btn").forEach(b => b.classList.remove("active"));
  if (prov === 'vidsrc') document.getElementById("tabVidSrc").classList.add("active");
  if (prov === 'kinobox') document.getElementById("tabKinobox").classList.add("active");

  if (currentItem) {
    currentItem.last_provider = prov;
    currentItem.last_balancer_index = selectedBalancerIndex;
    addToWatchHistory(currentItem);
  }

  renderProviderControls();
}

async function reloadCurrentPlayerServers() {
  const btn = document.getElementById("btnReloadServers");
  const lbl = document.getElementById("lblReloadServers");
  const dict = DICT[currentLang] || DICT.en;

  if (btn) {
    btn.classList.add("rotating");
    if (lbl) lbl.innerText = dict.reloading || "[ RELOADING... ]";
  }

  if (currentItem && currentItem.id) {
    // 1. Оновлюємо метадані фільму з TMDB
    await loadMovieDetails(currentItem.id, currentItem.type || 'movie');

    // 2. Примусово оновлюємо плеєр
    await renderProviderControls(true);
  }

  setTimeout(() => {
    if (btn) btn.classList.remove("rotating");
    if (lbl) lbl.innerText = dict.reloadServices || "[ RELOAD SERVICES ]";
  }, 700);
}

async function renderProviderControls(reloadIframe = true) {
  const dict = DICT[currentLang] || DICT.en;
  const primaryList = document.getElementById("primarySelectorList");
  const subsContainer = document.getElementById("subsContainer");

  primaryList.innerHTML = "";
  subsContainer.style.display = 'none';

  if (activeProvider === 'kinobox') {
    document.getElementById("labelPrimarySelector").innerText = dict.primaryKinobox;
    primaryList.innerHTML = "";

    const tmdbId = currentItem.id || '969681';
    const kpId = currentItem.kp_id || '';
    const isTv = (currentItem.type === 'tv' || currentItem.type === 'series');

    let players = [];

    // 1. Спроба отримати динамічний список плеєрів через Edge Function
    try {
      const q = new URLSearchParams({ kinopoisk: kpId, tmdb: tmdbId, type: currentItem.type || 'movie' }).toString();
      const r = await fetch(`/api/players?${q}`);
      if (r.ok) {
        const json = await r.json();
        if (Array.isArray(json)) players = json;
        else if (Array.isArray(json.data)) players = json.data;
        else if (Array.isArray(json.players)) players = json.players;
      }
    } catch(e) {}

    // 2. Якщо динамічний список порожній — формуємо повний перелік плеєрів Kinobox
    if (!players || players.length === 0) {
      const collapsUrl = isTv 
        ? `https://api.ortified.ws/embed/kp/${kpId || tmdbId}` 
        : `https://api.ortified.ws/embed/movie/${kpId || tmdbId}`;

      players = [
        { type: "Turbo", iframeUrl: isTv ? `https://player.videasy.net/tv/${tmdbId}/1/1` : `https://player.videasy.net/movie/${tmdbId}` },
        { type: "Collaps", iframeUrl: collapsUrl },
        { type: "Veoveo", iframeUrl: isTv ? `https://vixsrc.to/tv/${tmdbId}/1/1` : `https://vixsrc.to/movie/${tmdbId}` },
        { type: "Gencit", iframeUrl: isTv ? `https://vidsrc.to/embed/tv/${tmdbId}/1/1` : `https://vidsrc.to/embed/movie/${tmdbId}` },
        { type: "Videoseed", iframeUrl: isTv ? `https://www.2embed.cc/embedtv/${tmdbId}&s=1&e=1` : `https://www.2embed.cc/embed/${tmdbId}` },
        { type: "Alloha", iframeUrl: `https://sansa.stravers.live/?token_movie=${encodeURIComponent(kpId || tmdbId)}&token=48ac5259825fb8f20103dac69a9029` }
      ];
    }

    primaryList.innerHTML = "";

    players.forEach((player, idx) => {
      const playerUrl = player.iframeUrl || player.iframe_url || player.url || player.link || player.src;
      if (!playerUrl) return;

      const btn = document.createElement("button");
      btn.className = `item-btn ${idx === selectedBalancerIndex ? 'active' : ''}`;
      btn.innerText = `[ ${player.type || 'Плеєр ' + (idx + 1)} ]`;
      btn.onclick = () => {
        selectedBalancerIndex = idx;
        document.querySelectorAll("#primarySelectorList .item-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        if (currentItem) {
          currentItem.last_provider = 'kinobox';
          currentItem.last_balancer_index = idx;
          currentItem.last_balancer_name = player.type || ('Плеєр ' + (idx + 1));
          addToWatchHistory(currentItem);
        }
        setIframe(playerUrl);
      };
      primaryList.appendChild(btn);
    });

    if (reloadIframe && players.length > 0) {
      const initialPlayer = players[selectedBalancerIndex] || players[0];
      const initialUrl = initialPlayer?.iframeUrl || initialPlayer?.iframe_url || initialPlayer?.url || initialPlayer?.link || initialPlayer?.src;
      if (initialUrl) {
        setIframe(initialUrl);
      }
    }
  } else {
    // VIDSRC PROVIDER
    document.getElementById("labelPrimarySelector").innerText = dict.primaryVidsrc;
    subsContainer.style.display = 'block';

    const id = currentItem.id || '969681';
    const type = currentItem.type || 'movie';

    const streams = VIDSRC_SERVERS.map(srv => ({
      name: srv.name,
      iframe_url: buildStreamUrl(srv, id, type)
    }));

    streams.forEach((st, idx) => {
      const btn = document.createElement("button");
      btn.className = `item-btn ${idx === selectedBalancerIndex ? 'active' : ''}`;
      btn.innerText = `[ ${st.name} ]`;
      btn.onclick = () => {
        selectedBalancerIndex = idx;
        document.querySelectorAll("#primarySelectorList .item-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        if (currentItem) {
          currentItem.last_provider = 'vidsrc';
          currentItem.last_balancer_index = idx;
          currentItem.last_balancer_name = st.name;
          addToWatchHistory(currentItem);
        }
        setIframe(st.iframe_url);
      };
      primaryList.appendChild(btn);
    });

    if (reloadIframe && streams.length > 0) {
      const initialStream = streams[selectedBalancerIndex] || streams[0];
      setIframe(initialStream.iframe_url);
    }
  }
}

async function loadSubtitles(id, type) {
  const subList = document.getElementById("subtitlesList");
  subList.innerHTML = '<span class="sub-tag"><span class="spinner"></span> LOADING SUBTITLES...</span>';

  try {
    const isTv = (type === "tv" || type === "series");
    const subEndpoint = isTv 
      ? `https://core.vidzee.wtf/subs/tv/${id}/1/1`
      : `https://core.vidzee.wtf/subs/movie/${id}`;

    const res = await fetch(subEndpoint);
    const json = await res.json();
    const subs = json.data || json || [];

    subList.innerHTML = "";

    if (!Array.isArray(subs) || subs.length === 0) {
      subList.innerHTML = '<span class="sub-tag">[ NO EXTERNAL SUBS ]</span>';
      return;
    }

    const counts = {};
    subs.forEach(s => {
      const rawLbl = (s.label || s.language || s.lang || 'SUB').trim();
      counts[rawLbl] = (counts[rawLbl] || 0) + 1;
    });

    const seenCounts = {};
    subs.forEach(s => {
      const rawLbl = (s.label || s.language || s.lang || 'SUB').trim();
      const lower = rawLbl.toLowerCase();
      // Виключаємо польську та російську
      if (lower.includes('rus') || lower.includes('рос') || lower.includes('рус') || lower.includes('pol') || lower.includes('пол')) return;

      const fileUrl = s.file || s.url || '#';
      seenCounts[rawLbl] = (seenCounts[rawLbl] || 0) + 1;

      let displayLabel = rawLbl.toUpperCase();
      if (counts[rawLbl] > 1) {
        displayLabel = `${rawLbl.toUpperCase()} #${seenCounts[rawLbl]}`;
      }

      const a = document.createElement("a");
      a.className = "sub-tag";
      a.href = fileUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerText = `[ ${displayLabel} ]`;
      subList.appendChild(a);
    });
  } catch (err) {
    subList.innerHTML = '<span class="sub-tag">[ SUBS AVAILABLE IN PLAYER ]</span>';
  }
}

function setIframe(url) {
  const iframe = document.getElementById("videoIframe");
  if (!iframe || !url) return;
  iframe.removeAttribute("sandbox");
  iframe.src = url;
}

/* =========================================================================
   AD-BLOCKER RECOMMENDATION DETECTOR
   ========================================================================= */
function detectAdBlock() {
  const isIgnored = localStorage.getItem("fastfilm_adblock_recommend_dismissed") || localStorage.getItem("fastfilm_adblock_ignore");
  if (isIgnored === "true") return;

  // Показуємо модальне вікно при кожному вході, доки користувач не натисне "Більше не показувати"
  setTimeout(() => {
    showAdblockModal();
  }, 400);
}

function showAdblockModal() {
  const dict = DICT[currentLang] || DICT.en;
  const tag = document.getElementById("labelAdblockTag");
  if (tag) tag.innerText = dict.adblockTag || "[ RECOMMENDATION // AD-BLOCKER ]";
  const title = document.getElementById("labelAdblockTitle");
  if (title) title.innerText = dict.adblockTitle || "Enable an AdBlocker for a Clean Experience";
  const desc = document.getElementById("labelAdblockDesc");
  if (desc) desc.innerText = dict.adblockDesc || "Third-party video streaming servers may display intrusive popups and casino redirects...";
  const btnInstall = document.getElementById("btnAdblockInstall");
  if (btnInstall) btnInstall.innerText = dict.adblockInstall || "[ GET UBLOCK ORIGIN ]";
  const btnClose = document.getElementById("btnAdblockClose");
  if (btnClose) btnClose.innerText = dict.adblockClose || "[ CONTINUE ]";
  const btnDont = document.getElementById("btnAdblockDontShow");
  if (btnDont) btnDont.innerText = dict.adblockDontShow || "[ DON'T REMIND AGAIN ]";

  const modal = document.getElementById("adblockModal");
  if (modal) modal.style.display = "flex";
}

function closeAdblockModal(permanent = false) {
  if (permanent) {
    localStorage.setItem("fastfilm_adblock_recommend_dismissed", "true");
    localStorage.setItem("fastfilm_adblock_ignore", "true");
  }
  const modal = document.getElementById("adblockModal");
  if (modal) modal.style.display = "none";
}
