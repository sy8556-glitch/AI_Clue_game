from fastapi import FastAPI
import json


app = FastAPI()

# CORS 추가
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 데이터로드
with open("./case_data.json", "r") as f:
    case_data = json.load(f)
print(case_data)

print(case_data['case_id'])
# 사건 정보 JSON 반환
@app.get("/case")
def get_case_info():
    
    return case_data


# 용의자 리스트 반환
@app.get("/suspects")
def get_suspects():
    return case_data["suspects"]


# 단서 리스트 반환
@app.get("/clues")
def get_clues():
    return case_data["clues"]


# 요청 형식 : POST /guess?suspect_id=2
# chatting 
@app.post("/chat")
def chat_with_ai(message: str):
    # AI 모델과의 대화 로직 구현 : 이후에 개선될 것임
    response = f"AI의 응답: {message}"
    return {"response": response}

# 사용자가 용의자를 선택해서 /guess 로 보내면, 정답인지 아닌지 판단 후 결과 반환
@app.post("/guess")
def check_guess(suspect_id : int):
    correct_suspect_id = case_data["answer"]["id"]

    if suspect_id == correct_suspect_id :
        return {
            "correct": True,
            "message": "정답입니다! 범인을 맞혔어요."
        }
    else:
        return {
            "correct": False,
            "message": "오답입니다. 단서를 더 확인해보세요."
        }
