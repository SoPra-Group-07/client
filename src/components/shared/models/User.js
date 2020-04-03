/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.password = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.date = null;
    this.birth = null;
    this.highScore = null;
    this.numberOfGamesPlayed = null;
    Object.assign(this, data);
  }
}
export default User;  



