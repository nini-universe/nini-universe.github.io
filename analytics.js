// Nini Universe 공용 GA4 — 같은 출처(nini-universe.github.io)의 모든 앱 사이트가 <script src="/analytics.js">로 불러 쓴다.
// 스토어 링크(<a href="apps.apple.com|play.google.com">) 클릭은 자동으로 store_click 이벤트가 된다 — 페이지에 따로 표시할 필요 없음.
// 자동 이동은 location 대신 niniStoreGo(url)을 부른다. GA가 막혀 있어도 이동은 반드시 일어난다.
(function () {
  var MEASUREMENT_ID = 'G-C5DM8ZJ9N5';

  // 스토어 URL 속 앱 ID → 앱 이름
  var APPS = {
    id6761288407: 'meow_island', 'com.nini.catisland': 'meow_island',
    id6759893172: 'time_defenders', 'com.nini.timedefenders': 'time_defenders',
    id6752438401: 'catlog', 'com.catlog.catlog': 'catlog',
  };

  // 앱 안 브라우저는 UA에 자기 이름을 적는다 — referrer가 비어 있어도 어느 앱에서 열렸는지 알 수 있다.
  // 유튜브 앱은 Safari/Chrome 탭으로 열어서 여기 안 잡힌다 (referrer가 있으면 GA가 youtube.com으로 잡는다)
  function detectInApp() {
    var ua = navigator.userAgent || '';
    if (/Instagram/i.test(ua)) return 'instagram';
    if (/musical_ly|BytedanceWebview|TikTok/i.test(ua)) return 'tiktok';
    if (/FBAN|FBAV|FB_IAB/.test(ua)) return 'facebook';
    if (/KAKAOTALK/i.test(ua)) return 'kakaotalk';
    if (/NAVER\(inapp/i.test(ua)) return 'naver';
    if (/\bLine\//.test(ua)) return 'line';
    if (/Twitter/i.test(ua)) return 'twitter';
    return 'none';
  }

  function storeInfo(url) {
    var store = /apps\.apple\.com/.test(url) ? 'app_store' : /play\.google\.com/.test(url) ? 'google_play' : '';
    if (!store) return null;
    var app = 'unknown';
    for (var key in APPS) if (url.indexOf(key) !== -1) { app = APPS[key]; break; }
    return { app_name: app, store: store };
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID, { in_app: detectInApp() }); // config 파라미터는 이후 모든 이벤트에 붙는다

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  document.head.appendChild(s);

  // 버튼 클릭 — 새 탭(target=_blank)이든 같은 탭이든 이동은 막지 않고 beacon으로만 보낸다
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    var info = a && storeInfo(a.href);
    if (!info) return;
    info.method = 'button';
    info.transport_type = 'beacon';
    gtag('event', 'store_click', info);
  }, true);

  // 자동 이동 — 최소 delay(기존 0.5초 안내 문구)만큼 기다리고, 이벤트 전송이 끝나면 이동.
  // gtag.js가 광고 차단 등으로 안 오면 1.5초에 그냥 이동한다
  window.niniStoreGo = function (url, delay, replace) {
    var sent = false, waited = false, gone = false;
    function go() { if (gone) return; gone = true; if (replace) location.replace(url); else location.href = url; }
    var info = storeInfo(url) || { app_name: 'unknown', store: 'unknown' };
    info.method = 'auto_redirect';
    info.transport_type = 'beacon';
    info.event_callback = function () { sent = true; if (waited) go(); };
    gtag('event', 'store_click', info);
    setTimeout(function () { waited = true; if (sent) go(); }, delay == null ? 500 : delay);
    setTimeout(go, 1500);
  };
})();
