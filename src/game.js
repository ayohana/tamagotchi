export class Game {
  constructor() {
    this.games = [];
    this.gameCount = 0;
  }

  addTamagotchi(tamagotchi) {
    this.games.push(tamagotchi);
    this.gameCount++;
  }

  findTamagotchi(id) {
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].id === parseInt(id)) {
        return this.games[i];
      }
    }
  }

}