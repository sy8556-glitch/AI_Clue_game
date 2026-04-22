# 함수 하나 만들기

# JSON 데이터에서 suspect_id로 용의자 찾기
# 없으면 None 반환
def find_suspect_by_id(suspect_id):
    # case_data에서 suspect_id로 용의자 찾기
    for suspect in case_data["suspects"]:
        if suspect["id"] == suspect_id:
            return suspect
    return None

def generate_reply(suspect, message):
    message = message.lower() # 메시지를 소문자로 바꾸기
    # 키워드 확인
    

    # suspect의 responses에서 맞는 답 고르기
    
    # 없으면 기본 답 반환