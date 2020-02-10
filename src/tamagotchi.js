import { Stats } from '../src/stats';

export class Tamagotchi {
  constructor(){
    this.energy = new Stats("energy", 100, 0);
    this.hunger = new Stats("hunger", 0, 100);
    this.fatigue = new Stats("fatigue", 0, 100);
    this.happiness = new Stats("happiness", 50, 0);
    this.statsArray = [this.energy, this.hunger, this.fatigue, this.happiness];
  }

  setStats() {
    setInterval(() => {
      this.energy.value -= 10;
      this.hunger.value += 15;
      this.fatigue.value += 5;
      this.happiness.value -= 5;
      this.statsArray = [this.energy, this.hunger, this.fatigue, this.happiness];
      this.checkStats();
    }, 10000);
  }

  feed(){
    this.hunger.value -= 25;
    this.statsArray[1].value = this.hunger.value;
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
    this.statsArray[2].value = this.fatigue.value;
    this.checkStats();
  }

  checkStats(){
    let deathStatCount = 0;
    for (let i = 0; i < this.statsArray.length; i++) {
      this.statsArray[i].value = this.checkRange(this.statsArray[i].value);
      if (this.statsArray[i].value === this.statsArray[i].limit) {
        console.log("it was low in hunger or fatigue");
        deathStatCount++;
      } else if (this.statsArray[i].limit === 100 && this.statsArray[i].value >= 90) {
        console.log("low stats!");
      } else if (this.statsArray[i].limit === 0 && this.statsArray[i].value <= 10) {
        console.log("low stats!");
      }
    }
    if (deathStatCount >= 2) {
      console.log("Pet's dead");
    } else{
      console.log("all is good");
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