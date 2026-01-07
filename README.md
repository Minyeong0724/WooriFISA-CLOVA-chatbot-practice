# 🤖 미니 우리금융 챗봇 시스템 (Mini Woori Financial Chatbot)

이 프로젝트는 **Naver Clova Chatbot API**를 활용하여 사용자와 실시간으로 소통하는 웹 기반 상담 챗봇 시스템입니다. 우리금융 아카데미 과정의 일환으로, 비동기 통신 처리와 사용자 경험(UX) 개선을 위한 로딩 상태 관리를 중점적으로 구현했습니다.

---

## 🌟 주요 기능

* **실시간 채팅 인터페이스**: Vanilla JS를 활용하여 사용자 입력과 봇의 응답을 화면에 즉각적으로 렌더링합니다.
* **비동기 로딩 처리**: 서버 응답이 지연되는 동안 "답변 생성 중" 메시지를 표시하여 사용자에게 진행 상황을 알립니다.
* **보안 시그니처 생성**: Clova API 가이드를 준수하여 `HMAC-SHA256` 방식의 보안 시그니처를 생성하고 안전하게 통신합니다.
* **Express 프록시 서버**: 클라이언트의 요청을 받아 Clova API와 중계하며, 테스트를 위한 응답 지연 기능을 포함하고 있습니다.

---

## 🛠 기술 스택

| 분류 | 기술 | 관련 파일 |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) | `app.js` |
| **Backend** | Node.js, Express | `server.js` |
| **API/통신** | Superagent, Clova Chatbot API | `api.js` |
| **Security** | Crypto, Crypto-js | `api.js` |

---

## 📁 프로젝트 구조 및 핵심 로직

### 1. 클라이언트 사이드 (`app.js`)
사용자의 입력 이벤트(클릭, 엔터키)를 감지하고 화면을 업데이트합니다.
* `setLoadingMessage()`: 응답 대기 시 `temp` ID를 가진 로딩 엘리먼트를 생성합니다.
* `setResponseChat()`: 서버 응답이 오면 `temp` 엘리먼트를 제거하고 실제 답변을 출력합니다.

### 2. API 통신 레이어 (`api.js`)
Clova Chatbot API와의 통신을 규격에 맞게 처리합니다.
* `makeChatbotSignature()`: 요청 본문(Body)을 기반으로 보안 서명을 생성하여 헤더에 포함합니다.
* `chat()`: `superagent`를 사용하여 비동기 POST 요청을 보냅니다.

### 3. 서버 사이드 (`server.js`)
Express 서버를 통해 정적 파일을 호스팅하고 API 엔드포인트를 제공합니다.
* **PORT**: 5000번 포트에서 구동됩니다.
* **테스트 모드**: 로딩 상태 확인을 위해 3초(`3000ms`)의 의도적인 응답 지연이 설정되어 있습니다.

---

## 🚀 시작하기

### 1. 의존성 패키지 설치
```bash
npm install express superagent crypto crypto-js
```

### 2. 서버 실행
Bash

node server.js
### 3. 접속 및 테스트
브라우저에서 http://localhost:5000에 접속하여 메시지를 입력하면, 3초간 로딩 메시지가 뜬 후 챗봇의 답변이 나타납니다.

# ⚠️ 주의사항
api.js 내의 CLIENT_SECRET과 API URL은 보안이 중요하므로, 실제 서비스 시에는 .env 파일을 통해 환경 변수로 관리해야 합니다.

현재 코드는 Naver Cloud Platform의 특정 챗봇 서비스에 최적화되어 있습니다.


---

### 💡 주요 구현 사항 요약 (참고용)

* **서버 설정**: `server.js`는 5000번 포트를 사용하며, `setTimeout`을 통해 3초의 응답 지연을 시뮬레이션하고 있습니다.
* **보안**: `api.js`에서 `crypto`를 사용해 `HMAC-SHA256` 시그니처를 생성하여 보안 통신을 보장합니다.
* **UX 개선**: `app.js`는 `setLoadingMessage` 함수로 임시 메시지를 만들고, `setResponseChat`에서 `temp` ID 요소를 삭제하는 방식으로 로딩을 관리합니다.

**추가로 챗봇의 UI를 더 예쁘게 꾸밀 수 있는 CSS 예시 코드가 필요하신가요?**
