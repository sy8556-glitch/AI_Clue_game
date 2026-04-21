from pydantic import BaseModel 

# 입력 형식 명확해짐
class ChatRequest(BaseModel):
    suspect_id: int
    message: str

class ChatResponse(BaseModel):
    suspect_name : str
    response: str