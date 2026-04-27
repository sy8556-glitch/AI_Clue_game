from fastapi import FastAPI
from openai import OpenAI
from dotenv import load_dotenv
import os
import json

from fastapi import HTTPException
from game.state import game_state
from game.game_logic import is_current_player, next_turn

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


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


# 데이터로드 - case data
with open("./case_data.json", "r", encoding="utf-8") as f:
    case_data = json.load(f)

# 데이터로드 - user
with open("./user.json", "r", encoding="utf-8") as f:
    user_data = json.load(f)

# 사건 정보 JSON 반환
@app.get("/case")
def get_case_info():
    
    return case_data


# 용의자 리스트 반환
@app.get("/suspects")
def get_suspects():
    return case_data["suspects"]


# 단서 리스트 반환 & 단서를 반영하기
@app.get("/clues")
def get_clues():
    for clue in case_data["clues"] :
        clue_type = clue["type"] 
        for single_case in case_data[clue_type] :
            if single_case["name"] == clue["name"] :
                single_case["importance"] = 0 
            else :
                continue

    return case_data["clues"]


# 요청 형식 : 
# curl.exe -X POST "http://127.0.0.1:8000/chat?message=안녕"
# curl -X POST --get --data-urlencode "message=범인이 누구야" "http://127.0.0.1:8000/chat"
# curl -X POST --get \  --data-urlencode "message=범인이 누구야" \  --data-urlencode "suspect_id=2" \  "http://127.0.0.1:8000/chat"
# 사용자 질문 + 용의자 정보 -> AI 한테 보내서 캐릭터처럼 답하게 만드는 함수
@app.post("/chat")
def chat_with_ai(message: str, suspect_id: int | None = None):
    
    suspect_info = None

    if suspect_id:
        for s in case_data["suspects"]:
            if s["id"] == suspect_id:
                suspect_info = s
                break

    system_prompt = f"""
    너는 AI Clue Game의 용의자 역할을 한다.
    절대 정답을 직접 말하지 마라.
    사용자의 질문에 짧게 답하라.
    한국어로 답하라.

    {case_data["title"]} 사건 
    : {case_data["summary"]}

    용의자 정보:
    {suspect_info if suspect_info else "특정 용의자 없음"}

    말투/성격:
    용의자 성격에 맞게 답하라.
    """
    result = client.responses.create(
    model="gpt-4.1-mini",
    input=[
            {
                "role": "system", 
                "content": system_prompt
            },

            {
                "role": "user", 
                "content": message
            },
        ],
    )

    return {"response" : result.output_text}


# 사용자가 용의자를 선택해서 /guess 로 보내면, 정답인지 아닌지 판단 후 결과 반환
@app.post("/guess")
def check_guess(player_id: int, suspect_id: int, location_id: int, weapon_id: int):

    if not is_current_player(game_state, player_id):
        raise HTTPException(
            status_code=403,
            detail=f"지금은 {game_state.current_player}의 턴입니다."
        )

    players = user_data["players"]
    showing_cards = []

    for player in players:
        if player["player_id"] == player_id:
            continue

        hand = player["hand"]

        if suspect_id in hand["suspect_ids"]:
            showing_cards.append({
                "can_show": True,
                "shown_by": player["name"],
                "card_type": "suspect",
                "card_id": suspect_id
            })

        if location_id in hand["location_ids"]:
            showing_cards.append({
                "can_show": True,
                "shown_by": player["name"],
                "card_type": "location",
                "card_id": location_id
            })

        if weapon_id in hand["weapon_ids"]:
            showing_cards.append({
                "can_show": True,
                "shown_by": player["name"],
                "card_type": "weapon",
                "card_id": weapon_id
            })

    next_player = next_turn(game_state)

    return {
        "message": "추리 완료",
        "guess_by": player_id,
        "shown_cards": showing_cards,
        "next_player": next_player
    }
        

# submit answer 함수
@app.post("/guess_answer")
def submit_answer(suspect_id: int, location_id: int, weapon_id: int):
    answer = case_data["answer"]

    is_correct = (
        suspect_id == answer["suspect_id"]
        and location_id == answer["location_id"]
        and weapon_id == answer["weapon_id"]
    )

    return {
        "correct": is_correct,
        "message": "정답입니다!" if is_correct else "오답입니다. 단서를 더 확인해보세요."
    }

# 턴 상태 확인 
@app.get("/state")
def get_state():
    return {
        "current_player": game_state.current_player,
        "players": game_state.players
    }