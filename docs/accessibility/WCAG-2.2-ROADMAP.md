# Mov. WCAG 2.2 접근성 개선 로드맵

**대상:** Mov. Hugo 블로그 템플릿 (`layouts/`, `static/js/`, `assets/css/`)  
**목표 수준:** [WCAG 2.2](https://www.w3.org/TR/WCAG22/) **Level AA** (법·정책 요구가 AAA인 경우 별도 표기)  
**작성일:** 2026-09-19

---

## 1. 목표와 범위

| 항목 | 내용 |
|------|------|
| **포함** | 공개 HTML/CSS/JS, Hugo 레이아웃·숏코드, 기본 콘텐츠 샘플 |
| **제외(1차)** | 서드파티 CDN(KaTeX, Fuse.js), 작성자가 추가하는 마크다운 본문 품질(가이드만 제공) |
| **성공 정의** | 자동 검사(axe) Critical/Serious 0건 + 핵심 사용자 흐름 수동 검증 체크리스트 통과 |

---

## 2. 현재 상태 요약 (베이스라인)

코드 리뷰 기준 **이미 있는 것**:

- `html lang`, 시맨틱 `main` / `article` / `nav` 일부 사용
- 이미지 `alt` (포스트 카드·커버)
- 모바일 메뉴 `aria-label`, 코드 복사 `aria-label`
- 검색 `Escape`, `Ctrl/Cmd+K` 단축키
- 모바일 메뉴 버튼 최소 터치 영역(`min-w/h-[44px]`)

**주요 갭 (AA 관점):**

| 영역 | 관련 WCAG | 현재 이슈 | 주요 파일 |
|------|-----------|-----------|-----------|
| 건너뛰기 | 2.4.1 | 본문으로 가는 skip link 없음 | `baseof.html` |
| 이름·역할 | 4.1.2 | 검색 input 라벨 없음(placeholder만), combobox 패턴 미적용 | `header.html`, `search.js` |
| 포커스 | 2.4.7, **2.4.11** | `outline-none`, 고정 헤더가 포커스 가림 가능 | `header.html`, CSS, `main.js` |
| 대비 | 1.4.3 | `text-gray-400/500` 보조 텍스트 다수 | Tailwind 클래스 전역 |
| 키보드 | 2.1.1 | 검색 결과 화살표 이동 없음, 필터/정렬 `aria-pressed` 없음 | `search.js`, `sort.js` |
| 메뉴 | 4.1.2 | `aria-expanded` / `aria-controls` 없음, 포커스 트랩·복귀 미정 | `header.html`, `main.js` |
| 호버 전용 UI | 2.1.1 | 코드 복사 버튼 hover 시에만 표시 | `main.css`, `copy-code.js` |
| 툴팁 | 2.1.1, 4.1.2 | 인라인 코멘트가 `span` + 마우스 위주 | `comment.html`, `comments.js` |
| 동작 감소 | **2.3.3** | `animate-fade-in`, load-more 애니메이션, smooth scroll | CSS, `load-more.js`, `toc.js` |
| 상태 알림 | 4.1.3 | 필터·검색·더 보기 결과 변경 시 SR 알림 없음 | `sort.js`, `search.js`, `load-more.js` |
| 링크 | 2.4.4 | 푸터 `href="#"` placeholder | `footer.html` |
| 목표 크기 | **2.5.8** | 필터 pill `text-xs` 등 24×24px 미만 가능 | `list.html` |
| 콜아웃 | 1.3.1 | SVG 장식/정보 구분, `role=note` 등 미정 | `callout.html` |

**WCAG 2.2에서 새로 강조되는 AA 항목(본 템플릿 해당):**

- **2.4.11 Focus Not Obscured (Minimum)** — 고정 헤더 + `pt-32` 레이아웃
- **2.5.8 Target Size (Minimum)** — 작은 pill 버튼·태그
- **2.3.3 Animation from Interactions** — 스크롤·로드·페이지 진입 애니메이션

(드래그만으로 조작하는 UI 없음 → **2.5.7** 은 해당 없음으로 기록)

---

## 3. 준수 전략

1. **디자인 토큰:** 접근 가능한 회색 단계(`secondary` 등)를 Tailwind `theme.extend.colors`에 고정하고, 본문/캡션/비활성 구분.
2. **포커스 시스템:** 전역 `:focus-visible` 링(색상·두께) + `outline-none`은 `:focus-visible` 대체와 쌍으로만 사용.
3. **위젯 패턴:** [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/) 기준 — Disclosure(모바일 메뉴), Combobox(검색), Toggle button(필터/정렬).
4. **Progressive enhancement:** JS 없이도 네비·본문·RSS·페이지네이션 동작 유지.
5. **검증 3종:** axe-core CI + 키보드-only 수동 + VoiceOver/NVDA 스모크.

---

## 4. 단계별 실행 계획

### Phase 0 — 베이스라인 & 거버넌스 (선행)

**산출물**

- [ ] `npm run build` 후 `public/` 대상 Lighthouse Accessibility / axe 리포트 스냅샷
- [ ] 페이지 유형별 테스트 매트릭스: 홈, `/posts/` 목록, 포스트 상세, About, Contact
- [ ] Definition of Done: PR마다 axe Serious+, 키보드 스모크 5분

**작업**

- `package.json`에 `@axe-core/cli` 또는 Playwright + axe 스크립트 추가 검토
- `hugo.toml` `languageCode`와 실제 콘텐츠 언어 정책 문서화

---

### Phase 1 — 문서 구조 & 전역 내비 (낮은 리스크, 높은 ROI)

**목표 WCAG:** 2.4.1, 2.4.2, 1.3.1, 2.4.6

| # | 작업 | 파일 |
|---|------|------|
| 1.1 | “본문으로 건너뛰기” 링크 + `:target`/focus 시 헤더 아래 여백 | `baseof.html`, CSS |
| 1.2 | 헤더 `role="banner"`, 푸터 `contentinfo`, 보조 `nav`에 `aria-label` | `header.html`, `footer.html` |
| 1.3 | 페이지당 단일 `h1` 유지 검토(홈 히어로 vs 섹션 제목) | `index.html`, `list.html` |
| 1.4 | 푸터 placeholder `#` → 실제 URL 또는 `<span>`(링크 아님) | `footer.html` |

**검증:** Tab 첫 입력이 skip link → main; 랜드마크 트리 1회 확인.

---

### Phase 2 — 포커스·시각 (WCAG 2.2 핵심)

**목표 WCAG:** 2.4.7, **2.4.11**, 1.4.3, 1.4.11(필요 시)

| # | 작업 | 파일 |
|---|------|------|
| 2.1 | 전역 `focus-visible` 스타일 (링크, 버튼, input, TOC) | `assets/css/main.css` |
| 2.2 | 검색/모바일 input: `<label class="sr-only">` 또는 `aria-label` | `header.html` |
| 2.3 | `scroll-margin-top` on `h2–h4` / `:target` — 고정 헤더 높이(≈80px) 반영 | CSS, `single.html` |
| 2.4 | 대비 실패 색상 치환: `gray-400` → `gray-600` 등 (본문 vs 장식 분리) | 레이아웃, `tailwind.config.js` |
| 2.5 | 링크 식별: underline 또는 3:1 비텍스트 대비 유지 (prose 링크 border-bottom 유지) | typography 설정 |

**검증:** axe color-contrast; 키보드로 하단 링크 포커스 시 헤더에 가려지지 않는지 확인 (2.4.11).

---

### Phase 3 — 상호작용 위젯

**목표 WCAG:** 2.1.1, 2.1.2, 4.1.2, 4.1.3, **2.5.8**

#### 3A — 헤더·검색

| # | 작업 | 파일 |
|---|------|------|
| 3A.1 | 모바일 메뉴: `aria-expanded`, `aria-controls="mobile-menu"`, 열릴 때 포커스 첫 링크 | `main.js`, `header.html` |
| 3A.2 | 검색 combobox: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant` | `search.js`, `header.html` |
| 3A.3 | 결과 목록 `role="listbox"` / option, ↑↓ Enter, 결과 수 `aria-live="polite"` | `search.js` |
| 3A.4 | `Ctrl+K` 힌트를 시각/스크린리더용으로 노출(예: sr-only “단축키 Ctrl+K”) | `header.html` |

#### 3B — 목록·홈

| # | 작업 | 파일 |
|---|------|------|
| 3B.1 | 필터/정렬: `aria-pressed="true|false"`, 그룹 `role="group"` + `aria-label` | `list.html`, `sort.js` |
| 3B.2 | 필터 후 “N개 포스트 표시” live region | `sort.js` |
| 3B.3 | Load more: 로드 후 포커스 이동 또는 live region | `load-more.js` |
| 3B.4 | 터치/클릭 타깃 최소 24×24 (padding 확대) | `list.html`, `index.html` |

#### 3C — 포스트 읽기

| # | 작업 | 파일 |
|---|------|------|
| 3C.1 | 코드 복사: 항상 포커스 가능, `aria-live`로 “복사됨” | `copy-code.js`, CSS |
| 3C.2 | TOC: `aria-current="location"` on active link; xl 미만에서 접근 가능한 대안(접이식 TOC 또는 본문 앵커) | `toc.js`, `single.html` |
| 3C.3 | 인라인 코멘트: `button` + `aria-expanded` / `popover` 또는 항상 보이는 각주 스타일 | `comment.html`, `comments.js` |

**검증:** 키보드만으로 검색→결과→포스트, 필터→정렬, 모바일 메뉴 열기/닫기.

---

### Phase 4 — 콘텐츠 컴포넌트 & 미디어

**목표 WCAG:** 1.1.1, 1.3.1, 1.4.5

| # | 작업 | 파일 |
|---|------|------|
| 4.1 | 콜아웃: `role="note"` 또는 `role="region"` + `aria-labelledby`, 장식 SVG `aria-hidden="true"` | `callout.html` |
| 4.2 | 오버레이 카드: 그라데이션 위 흰 텍스트 대비 측정·조정 | `post-card.html` |
| 4.3 | KaTeX: `math` 페이지에서 SR 대안(필요 시 `aria-label` 또는 본문 텍스트) 가이드 | README, 콘텐츠 가이드 |
| 4.4 | 작성자 가이드: 이미지 alt, 제목 계층, 링크 텍스트 | `docs/accessibility/AUTHOR-GUIDE.md` (Phase 4 산출) |

---

### Phase 5 — 동작·모션 (WCAG 2.2)

**목표 WCAG:** **2.3.3**, 2.2.2(자동 재생 없음 — 해당 없음 확인)

| # | 작업 | 파일 |
|---|------|------|
| 5.1 | `@media (prefers-reduced-motion: reduce)` — fade-in, load-more, smooth scroll → instant | CSS, `toc.js`, `load-more.js` |
| 5.2 | `animate-fade-in`을 장식 optional로 (`.motion-safe:`) | CSS, 레이아웃 |

---

### Phase 6 — CI·회귀 방지 & 릴리스

| # | 작업 |
|---|------|
| 6.1 | GitHub Actions: `hugo build` + axe on `public/**/*.html` (대표 URL 5개) |
| 6.2 | PR 템플릿 체크리스트: 키보드, 포커스, 새 상호작용 APG 패턴 |
| 6.3 | README_ko.md에 접근성 섹션 + 로드맵 링크 |
| 6.4 | (선택) VPAT/Accessibility statement 페이지 |

---

## 5. 우선순위 백로그 (MoSCoW)

**Must (AA 차단)**

- Phase 1 skip link + Phase 2 포커스/대비
- Phase 3A 검색·모바일 메뉴 ARIA
- Phase 3C 코드 복사 키보드 접근
- Phase 5 reduced motion

**Should**

- Phase 3B 필터/정렬/더 보기 상태 알림
- Phase 4 콜아웃·카드 대비
- Phase 3C 인라인 코멘트

**Could**

- Phase 6 full CI matrix
- TOC 모바일 패턴
- AAA 일부 (2.4.12 Enhanced focus not obscured)

---

## 6. 검증 체크리스트 (릴리스 전)

- [ ] 키보드만: 홈 → 검색 → 포스트 → TOC 앵커 → 뒤로
- [ ] 키보드만: `/posts/` 필터·정렬·(홈) load more
- [ ] 200% 줌: 가로 스크롤 없이 주요 페이지 사용
- [ ] VoiceOver 또는 NVDA: 검색 결과 개수·필터 변경 알림
- [ ] `prefers-reduced-motion`: 애니메이션 없이 동일 기능
- [ ] axe: Critical/Serious 0 (대표 5 URL)
- [ ] Lighthouse Accessibility ≥ 95 (참고 지표)

---

## 7. 추적 방식

| Phase | GitHub 이슈 라벨 제안 | 예상 PR 수 |
|-------|----------------------|------------|
| 0 | `a11y`, `wcag-baseline` | 1 |
| 1 | `a11y`, `wcag-structure` | 1 |
| 2 | `a11y`, `wcag-visual` | 1–2 |
| 3 | `a11y`, `wcag-widgets` | 2–3 |
| 4 | `a11y`, `wcag-content` | 1 |
| 5 | `a11y`, `wcag-motion` | 1 |
| 6 | `a11y`, `wcag-ci` | 1 |

이슈 본문에는 **WCAG 성공 기준 번호**와 **Acceptance criteria**를 Phase 표의 행 단위로 복사해 사용합니다.

---

## 8. 참고 자료

- [WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/)
- [How to Meet WCAG (Quick Reference)](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/)
- [Understanding Focus Not Obscured (2.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)

---

## 9. 다음 액션 (즉시 착수 가능)

1. **Phase 0** axe 스냅샷으로 수치 베이스라인 확정  
2. **Phase 1 + 2.1–2.2** 단일 PR로 skip link + focus-visible + 검색 라벨  
3. 이슈 6개 생성 후 Phase 3을 위젯별로 분할

구현 착수 시 이 문서의 Phase 순서를 따르면 WCAG 2.2 AA 요구와 Mov. 템플릿 구조를 맞춰 회귀를 줄일 수 있습니다.
