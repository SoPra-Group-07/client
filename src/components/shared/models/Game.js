
class Game {
    constructor(data = {}) {
        this.gameId = null;
        this.gameName = null;
        this.gameStatus = null;
        this.players = null;
        this.numberOfPlayers = null;
        Object.assign(this, data);
    }
}
export default Game;


