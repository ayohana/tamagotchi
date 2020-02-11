export class Game {
  constructor() {
    this.games = [];
    this.gameCount = 0;
  }

  addTamagotchi(tamagotchi) {
    this.games.push(tamagotchi);
    this.gameCount++;
  }

  findTamagotchi(tamagotchi) {
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].id === tamagotchi.id) {
        return this.games[i];
      }
    }
  }

}