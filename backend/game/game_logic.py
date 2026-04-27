# game/game_logic.py

def is_current_player(game_state, player_id: str) -> bool:
    return int (game_state.current_player[-1] )== player_id


def next_turn(game_state):
    game_state.current_player_index = (
        game_state.current_player_index + 1
    ) % len(game_state.players)

    return game_state.current_player