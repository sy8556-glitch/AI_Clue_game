#from fastapi import FastAPI
import json

#app = FastAPI()

# 데이터로드
with open("backend\case_data.json", "r") as f:
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


# chatting 
@app.post("/chat")
def chat_with_ai(message: str):
    # AI 모델과의 대화 로직 구현
    response = f"AI의 응답: {message}"
    return {"response": response}