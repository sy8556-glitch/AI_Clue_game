# game/state.py

class GameState:
    def __init__(self):
        self.players = ["player1", "player2"]
        self.current_player_index = 0

    @property
    def current_player(self):
        return self.players[self.current_player_index]


game_state = GameState()