# AI Clue Game

## 소개
AI 기반 추리 게임 (Clue 스타일)

## 기능
- 용의자 선택
- 장소 선택
- 무기 선택
- 추리 제출 (/guess API)
- AI 대화 (/chat API)

## 기술 스택
- Frontend: React
- Backend: FastAPI
- AI: LLM 기반 응답

## 🚀 실행 방법

### Backend

cd backend
python -m uvicorn main:app --reload

### Frontend

cd frontend
npm install
npm run dev