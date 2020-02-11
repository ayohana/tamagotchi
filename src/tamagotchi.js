import { Stats } from '../src/stats';

let timer;
let idCount = 0;

export class Tamagotchi {
  constructor(){
    this.id = this.assignID();
    this.energy = new Stats("energy", 100, 0);
    this.hunger = new Stats("hunger", 0, 100);
    this.fatigue = new Stats("fatigue", 0, 100);
    this.happiness = new Stats("happiness", 50, 0);
    this.statsArray = [this.energy, this.hunger, this.fatigue, this.happiness];
    this.isDead = false;
  }

  assignID() {
    this.id = idCount;
    idCount++;
  }

  setStats() {
    timer = setInterval(() => {
      this.energy.value -= 10;
      this.hunger.value += 15;
      this.fatigue.value += 5;
      this.happiness.value -= 5;
      this.statsArray = [this.energy, this.hunger, this.fatigue, this.happiness];
      this.checkStats();
    }, 5000);
  }

  feed(){
    this.hunger.value -= 25;
    this.energy.value += 10;
    this.statsArray[1].value = this.hunger.value;
    this.statsArray[0].value = this.energy.value;
    this.checkStats();
  }

  play(){
    this.happiness.value += 20;
    this.energy.value -= 15;
    this.statsArray[3].value = this.happiness.value;
    this.statsArray[0].value = this.energy.value;
    this.checkStats();
  }

  sleep(){
    this.fatigue.value = 0;
    this.energy.value += 20;
    this.statsArray[2].value = this.fatigue.value;
    this.statsArray[0].value = this.energy.value;
    this.checkStats();
  }

  checkStats(){
    let deathStatCount = 0;
    for (let i = 0; i < this.statsArray.length; i++) {
      this.statsArray[i].value = this.checkRange(this.statsArray[i].value);
      if (this.statsArray[i].value === this.statsArray[i].limit) {
        deathStatCount++;
      } else if (this.statsArray[i].limit === 100 && this.statsArray[i].value >= 90) {
        console.log("low stats!");
      } else if (this.statsArray[i].limit === 0 && this.statsArray[i].value <= 10) {
        console.log("low stats!");
      }
    }
    if (deathStatCount >= 2) {
      this.isDead = true;
      clearInterval(timer);
    } 
  }

  checkRange(value){
    if(value <0){
      return 0;
    } else if (value >100){
      return 100;
    } else {
      return value;
    }
  }
}