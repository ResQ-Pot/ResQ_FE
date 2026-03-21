# ResQ FE

실시간 위치 정보 기반 React Native 앱

# CLAUDE.md — ASSU FE (React Native) Project Collaboration Guide

> Claude Code와 협업할 때 이 파일을 컨텍스트로 제공한다.
> 코드·명령어는 영어 원문 유지, 설명은 한국어로 작성.

---

## 1. Communication Style

- **한국어**로 진행 상황·개념 설명. 코드·명령어·마크다운 파일 본문은 영어 유지.
- 불필요한 인사 생략. **"한 일 / 이유 / 다음 단계"** 위주로 간결하게 보고.
- 기술적 선택지가 있으면 **A vs B + Pros/Cons** 형식으로 제안하고 사용자가 결정.

---

## 2. Execution Process (STRICT)

| Step | Description |
|------|-------------|
| **Step 1 — Plan** | 수정 전 텍스트로 계획 보고 (파일 미수정) |
| **Step 2 — Confirm** | 사용자의 명시적 승인("진행해" / "Proceed") 대기 |
| **Step 3 — Execute** | 승인 후 구현. 에러 발생 시 즉시 중단 → 원인 분석 → 재승인 요청 |

- 검토 요청 시에는 **검토 결과만** 보고하고 코드 수정 금지.
- 의견·제안형 질문("이렇게 하면 어때요?")에는 분석 먼저, 구현은 명시적 "Yes" 이후.

---

## Tech Stack

| 분류 | 기술 |
|------|------|
| Framework | Expo (Expo Router) |
| Language | TypeScript |
| Styling | NativeWind v4 (TailwindCSS v3) |
| Architecture | Feature-Sliced Design (FSD) |
| Package Manager | yarn |
| 전역 상태 | Zustand v5 |
| 서버 상태 / API | TanStack Query v5 + axios |
| 위치 정보 | expo-location |
| Navigation | Expo Router (file-based) |

## 시작하기

```bash
yarn install
yarn start
```

실행 옵션:

```bash
yarn android   # Android 에뮬레이터
yarn ios       # iOS 시뮬레이터 (macOS 필요)
yarn web       # 웹 브라우저
```

## 프로젝트 구조

FSD (Feature-Sliced Design) 아키텍처를 따릅니다.

```
ResQ_FE/
├── app/                        # Expo Router 라우트 파일
│   ├── _layout.tsx             # 루트 레이아웃 (Provider 주입)
│   └── (tabs)/                 # 탭 네비게이션
├── src/
│   ├── app/                    # FSD app 레이어
│   │   └── providers/          # QueryClient 등 글로벌 프로바이더
│   ├── pages/                  # FSD pages 레이어 (화면 컴포넌트)
│   │   ├── home/
│   │   └── map/
│   ├── widgets/                # FSD widgets 레이어 (복합 UI 블록)
│   │   └── location-tracker/
│   ├── features/               # FSD features 레이어 (유저 인터랙션 단위)
│   │   ├── location/
│   │   └── auth/
│   ├── entities/               # FSD entities 레이어 (비즈니스 엔티티)
│   │   ├── location/
│   │   └── user/
│   └── shared/                 # FSD shared 레이어 (공통 유틸/UI)
│       ├── api/                # axios 인스턴스
│       ├── config/             # 환경변수
│       ├── lib/                # 공통 유틸 (location 헬퍼 등)
│       ├── types/              # 공통 타입
│       └── ui/                 # 공통 UI 컴포넌트
├── global.css                  # Tailwind 진입점
├── tailwind.config.js
├── babel.config.js
├── metro.config.js
└── tsconfig.json
```

## Path Aliases

```ts
@/*          → ./  (프로젝트 루트)
@app/*       → src/app/*
@pages/*     → src/pages/*
@widgets/*   → src/widgets/*
@features/*  → src/features/*
@entities/*  → src/entities/*
@shared/*    → src/shared/*
```

## 환경변수

`app.json`의 `extra` 필드에서 설정:

```json
{
  "expo": {
    "extra": {
      "apiBaseUrl": "https://your-api.com"
    }
  }
}
```

## NativeWind 사용법

```tsx
import { View, Text } from 'react-native';

export function Example() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-pbold text-gray-800">Hello ResQ</Text>
    </View>
  );
}
```
