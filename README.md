# Nini Universe 홈페이지

https://nini-universe.github.io/ — GitHub Pages(이 저장소 `main` 루트).

- `index.html` — 히어로 + 앱 목록(냥냥아일랜드 · 타임 디펜더스 · Catlog) + 문의. 한 파일에 CSS·JS·3개 언어 문구(`T`)가 모두 들어 있다.
  글꼴은 Pretendard(jsdelivr CDN)를 쓰고, 못 받으면 시스템 글꼴로 떨어진다.
- `img/` — 앱 아이콘 (256px)
- `app-ads.txt` — **AdMob 판매자 확인 파일. 지우지 말 것.** AdMob은 앱 스토어에 적힌
  개발자 웹사이트 도메인의 **맨 앞 경로**(`https://nini-universe.github.io/app-ads.txt`)만 읽는다.
  같은 AdMob 계정을 쓰는 세 앱이 모두 이 파일 하나로 확인된다.

- `analytics.js` — **모든 앱 사이트가 같이 쓰는 GA4 스크립트** (측정 ID `G-C5DM8ZJ9N5`). 각 사이트가 `<script src="/analytics.js">`로 불러온다.
  스토어 링크 클릭과 자동 이동을 `store_click` 이벤트(`app_name`·`store`·`method`)로, 앱 안 브라우저(인스타·틱톡 등)를 `in_app`으로 보낸다.
  새 앱을 추가하면 파일 안 `APPS`에 스토어 앱 ID를 넣는다. 다른 사이트보다 **먼저 배포**해야 한다.

앱별 소개 사이트는 각자 저장소다: `meow-island-website`, `time-defenders-website`, `catlog-website`.

## 검색 (SEO)
- `robots.txt` · `sitemap.xml` — 이 루트에 두면 `nini-universe.github.io` 아래 모든 앱 사이트에 적용된다.
  **새 앱 사이트를 추가하면 `sitemap.xml`에 언어별 주소를 넣는다.** `/download/` 페이지는 넣지 않는다(`noindex`).
- 언어별 주소: 한국어 = 기본 주소, 영어·일본어 = `?lang=en` / `?lang=ja` (캣로그만 `index-en.html` / `index-ja.html`).
  각 페이지 `<head>`의 `hreflang`·canonical이 이 규칙을 따른다.
- 검색 봇에게는 언어 자동 감지를 끄고 한국어 기본 HTML을 보여 준다 (구글봇은 영어 환경이라 그대로 두면 영어로 색인된다).
- 링크 미리보기 이미지는 `og:image`에 **절대 주소**로 넣는다 (상대 주소는 카카오톡 등에서 안 보인다).
- `google7df81d4ecfaa1aca.html` — **Google Search Console 소유권 확인 파일. 지우지 말 것** (지우면 소유권이 풀린다).
- `naverbc86dc23c95f940566e25923a65e6d87.html` — **네이버 서치어드바이저 소유 확인 파일. 지우지 말 것.**
