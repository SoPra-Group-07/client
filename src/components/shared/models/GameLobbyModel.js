

class GameLobbyModel {
    constructor(data = {}) {
        this.adminplayer = null;
        this.lobbyId = null;
        this.players = null;
        Object.assign(this, data);
    }
}

export default GameLobbyModel;