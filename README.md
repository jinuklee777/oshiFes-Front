# oshifes(가제)

서브컬처 행사, 팝업스토어, 콜라보 카페, 굿즈 페어 일정을 모아 보여주는 Expo React Native 프론트엔드 앱입니다.

현재는 디자인 시안의 임시 데이터를 기반으로 화면을 구현해 둔 상태이며, 백엔드 API가 준비되면 `src/api/client.js`를 통해 행사 목록/상세/찜/알림 기능을 연결할 수 있습니다.

## 주요 기능

- 월간 캘린더와 행사 일정 dot 표시
- 오늘의 캐릭터 생일 배너
- 오늘 마감 임박 행사 카드
- 다가오는 행사 리스트
- 행사 상세 화면
- 행사 저장하기/찜 탭
- 공유하기
- 백엔드 API 연결용 클라이언트 분리

## 기술 스택

- Expo SDK 54
- React Native
- React
- Expo Vector Icons
- React Native Safe Area Context

## 프로젝트 구조

```text
.
├── App.js
├── app.json
├── assets/
├── src/
│   ├── api/
│   │   └── client.js
│   └── data/
│       └── events.js
├── package.json
└── README.md
```

## 실행 방법

의존성을 설치합니다.

```bash
npm install
```

개발 서버를 실행합니다.

```bash
npx expo start --tunnel --go --clear
```

iPhone에서는 Expo Go 앱을 설치한 뒤 QR 코드를 스캔하거나, 터미널에 표시되는 링크를 Safari에 붙여넣어 열면 됩니다.

## 실행 문제 해결

Metro 실행 중 파일 감시 오류가 나면 Watchman을 설치합니다.

```bash
brew install watchman
```

같은 Wi-Fi에서 접속이 안 되면 tunnel 모드로 실행합니다.

```bash
npx expo start --tunnel --go --clear
```

Expo Go에서 SDK 버전 관련 오류가 나면 의존성 버전을 확인합니다.

```bash
npx expo install --check
```

## 백엔드 연결

백엔드 API 주소는 `.env`에 설정할 수 있습니다.

```bash
EXPO_PUBLIC_API_BASE_URL=https://your-api.example.com
```

API 연결 시작점은 `src/api/client.js`입니다.

```js
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
```

현재 더미 데이터는 `src/data/events.js`에 있습니다. 백엔드가 준비되면 이 데이터를 API 응답으로 교체하면 됩니다.

## GitHub 업로드

GitHub에서 새 repository를 만든 뒤, 이 프로젝트 폴더에서 아래 명령어를 실행합니다.

```bash
git remote add origin https://github.com/<username>/<repo>.git
git add .
git commit -m "Initial Expo frontend"
git branch -M main
git push -u origin main
```

GitHub에서 repository를 만들 때 README, `.gitignore`, license를 추가하지 않으면 충돌 없이 올리기 쉽습니다.
