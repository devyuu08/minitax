# MiniTax – 프리랜서를 위한 AI 종합소득세 계산기

### **📌 프로젝트 개요**

> **MiniTax**는 프리랜서와 개인사업자를 위한 **간이 종합소득세 계산기** 웹앱입니다.
> "프리랜서가 복잡한 세법 지식 없이도 세금을 쉽게 이해하고 계산할 수 있도록 돕기 위해 시작되었습니다.”
>
> 복잡한 세법 지식 없이도 **연소득과 필요경비만 입력하면**, 예상 세금을 계산해주고,
>
> **GPT 기반 AI가 결과를 쉽게 요약 설명**해주는 사용자 친화적 도구입니다.

- 개인 프로젝트 (디자인, 프론트엔드 전담)
- 개발 기간: 2025.07.17 - 2025.07.31
- **담당 역할:** 프론트엔드 전반 (기획, 설계, 개발, 배포)

## **🔍 핵심 기능**

- 연소득 / 필요경비 입력 → 간이 세금 계산
- 결과 페이지에서 예상 세액 요약 + 세금 계산 구조 설명 (GPT, 왜 이런 세금이 나왔는지)
- [절세 전략], [세율 기준], [신고 유의사항] 버튼 → AI 설명 추가 요청
- Skeleton UI, 에러 처리, 반응형 디자인
- 최신 Next.js App Router + Server Actions 구조 사용

## **🧱 기술 스택**

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/docs/app)
- **Language**: TypeScript
- **AI 통신**: OpenAI API (GPT-3.5)
- **상태 관리**: useReducer + Context API
- **스타일링**: CSS Module + styled-components (하이브리드)
- **테스트**: Jest (calculateTax 단위 테스트)
- **배포**: Vercel

## **💡 구현 포인트**

### 1. 최신 Next.js 구조 (App Router + Server Actions)

- `/api` 디렉토리를 사용하지 않고, **서버 액션(Server Actions)** 기반으로 GPT API 통신을 처리
- `lib/actions/gptSummary.ts`에서 직접 요청 → 응답 → 캐싱 처리

### 2. GPT 응답 설명 기능 (초보자 대상 UX 설계)

- 사용자가 결과를 이해할 수 있도록, **"왜 이 세금이 나왔는지"**를 AI가 자연어로 요약
- 버튼 클릭 시, 절세 전략 / 세율 기준 / 신고 유의사항 3가지의 **다양한 시나리오 설명** 지원
- **동일 요청 중복 방지**: 사용자가 같은 버튼을 연속 클릭하더라도 GPT API는 **단 1회만 호출**되도록 캐싱 처리

### 3. 상태 관리는 useReducer로 명확하게 분리

- TaxContext + taxReducer 조합으로 결과 상태를 관리
- 계산기와 결과 페이지 간 상태 공유를 간결하게 구현

### 4. UX 중심 로딩 처리

- 결과 페이지 로딩 시 **Skeleton UI를 1.2초간 고정 유지**하여 부드러운 전환 UX 제공
  (사용자가 "로딩 중"임을 충분히 인지할 수 있도록 처리)
- GPT 응답도 각각의 로딩/에러 상태를 타입별로 분리하여 관리

### 5. 반응형 + 접근성 고려한 UI

- **데스크톱 중심 레이아웃**을 기본으로 설계한 뒤, 화면 너비에 따른 반응형 스타일을 추가로 적용
- 버튼, 메뉴, 카드 등의 UI 요소에 대해 **min-width, flex-basis, media query** 등을 활용해 레이아웃 무너짐 방지
- 헤더 드롭다운 메뉴는 **Portal 구조**로 구현하여, `position: fixed` 영역에서도 자연스럽게 겹침 처리 가능
- 버튼에는 `role`, `aria-live`, `aria-label` 등 기본적인 접근성 속성을 적용

### 6. 테스트 코드 작성

- `calculateTax.test.ts`로 세금 계산 로직에 대한 단위 테스트 진행
- 다양한 입력 케이스에서 정확한 세액이 계산되는지 검증

## **📂 폴더 구조 (요약)**

```bash
app/
├── about/                 # 서비스 소개 페이지
├── calculator/            # 소득/경비 입력 폼 페이지
├── policy/                # 이용 고지 및 AI 안내 페이지
├── result/                # 세금 계산 결과 + GPT 요약 페이지
├── not-found.tsx          # 404 페이지 (뒤로가기 방지 포함)
├── layout.tsx             # 전역 레이아웃 (App Router)
├── layout.module.css      # 전역 레이아웃 스타일
├── globals.css            # 앱 전체에 적용되는 글로벌 CSS
└── page.tsx               # 홈 페이지 (서비스 소개 + CTA)

components/
├── calculator/                 # 입력 폼 관련 컴포넌트 (예: InputField, SubmitButton 등)
├── result/                     # 결과 페이지 전용 컴포넌트
├── SkeletonResult.tsx     # 결과 로딩 Skeleton UI
├── SkeletonResult.module.css
├── Header.tsx                  # 고정 헤더 (로고 + 메뉴 버튼 포함)
├── DropdownMenu.tsx           # 드롭다운 오버레이 메뉴 (헤더 밖에 렌더링됨)
├── DropdownMenu.module.css
└── FloatingMenuButton.tsx     # 모바일 대응 플로팅 메뉴 버튼

context/
├── TaxContext.tsx     # Context + Provider 구성, 커스텀 훅 useTaxContext 제공
└── taxReducer.ts      # 세금 상태 전용 reducer 함수 정의

/lib
├── __tests__/                    # 테스트 코드
│   └── calculateTax.test.ts     # 세금 계산 로직 단위 테스트
├── actions/                     # 서버 액션
│   └── gptSummary.ts            # GPT API 응답 처리
├── calculateTax.ts          # 종합소득세 계산 로직
├── getTaxRateLabel.ts       # 세율 구간 라벨 처리 유틸
├── prompt.ts                # GPT 프롬프트 템플릿
└── registry.tsx                 # styled-components SSR 문제 해결용 레지스트리

/types
└── tax.ts    # 세금 계산 및 GPT 요약 응답에 사용되는 주요 타입 정의
```

## 🧠 회고 및 배운 점

이번 프로젝트는 단순한 계산기가 아닌, **사용자의 이해를 돕는 세금 안내 도구**를 목표로 개발하였습니다.

개발 과정에서 기술적인 부분은 물론, **UX, 상태 설계, 서버 통신 최적화** 등 다양한 관점에서 고민하고 구현한 경험이 큰 배움이 되었습니다.

### ✅ 기술적으로 성장한 점

- **서버 액션(Server Actions) 구조 경험**
  기존의 RESTful API 대신 Next.js의 최신 기능인 Server Actions를 활용해, API 핸들러 없이도 클린한 구조로 서버 통신을 구성하는 경험을 쌓았습니다.
- **GPT API 응답 캐싱 및 상태 분리 처리**
  동일 요청에 대한 중복 호출을 막기 위해 캐싱 로직을 설계했으며,
  GPT 응답 상태를 type별로 나누어 (`summary`, `strategy`, `warning`) 로딩/에러를 각각 분리 처리했습니다.
- **Context + useReducer 조합으로 상태 관리 정리**
  계산기 페이지와 결과 페이지 사이에서 전역 상태가 필요한 부분만 Context로 추출하고, Reducer로 흐름을 제어하여 불필요한 rerender를 방지했습니다.
- **정적 타입 시스템 기반 설계 경험 (TypeScript)**
  TaxInput, TaxResult, GptSummary 타입을 구조화하면서, 타입 기반의 안전한 설계 패턴을 체득했습니다.
- **Skeleton UI와 UX 고려 로딩 처리**
  단순한 스피드보다 사용자가 로딩임을 인식할 수 있는 **1.2초 Skeleton 유지 UX**를 도입하며, 사용자 경험에 집중한 처리 방식을 고민했습니다.

---

### 🧭 다음 개선 아이디어

- GPT 프롬프트에 사용자 상황(예: 프리랜서, 유튜버 등)을 추가해 더 맞춤형 설명 제공
- 세율 기준, 절세 전략을 시각적으로 도식화 (세금 그래프, 구간별 안내 등)
- 다국어(i18n) 지원 및 모바일 UX 개선

---

### 👀 사용자가 이해하는 것이 최종 목표

MiniTax는 단순히 숫자를 계산하는 도구가 아니라,

**“세금에 대해 아무것도 모르는 사람도 이해할 수 있도록 돕는”** 도구를 목표로 했습니다.

이 과정을 통해, 단순한 기능 구현을 넘어서 **사용자 중심의 인터페이스를 고민하고,
AI를 통해 사용자의 인지 과정을 설계하는 경험**을 할 수 있었습니다.

## **🌍 배포 정보**

- **배포 플랫폼**: Vercel
- **배포 URL**: 🔗 [https://minitax.vercel.app](https://minitax.vercel.app/)

## **🧑‍💻 개발자 정보**

- 정유진 | Frontend Developer
- GitHub: https://github.com/devyuu08
- 이메일: devyuu08@gmail.com
