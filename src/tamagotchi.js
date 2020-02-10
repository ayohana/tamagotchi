import { Stats } from '../src/stats';

export class Tamagotchi {
  constructor(){
    this.energy = new Stats("energy", 100);
    this.hunger = new Stats("hunger", 0);
    this.fatigue = new Stats("fatigue", 0);
    this.happiness = new Stats("happiness", 50);
  }

  setStats() {
    setInterval(() => {
      this.energy.value -= 10;
      this.hunger.value += 15;
      this.fatigue.value += 5;
      this.happiness.value -= 5;
    }, 10000);
  }

  feed(){
    this.hunger.value -= 25;
    if (this.hunger.value < 90){
      this.hunger.status = "normal";
    }
  }

  play(){
    this.happiness.value += 20;
    this.energy.value -= 15;
    if (this.happiness.value > 10){
      this.happiness.status = "normal";
    }
    if (this.energy.value > 10){
      this.energy.status = "normal";
    }
  }

  sleep(){
    this.fatigue.value = 0;
    if (this.fatigue.value < 90){
      this.fatigue.status = "normal";
    }
  }

  checkStats(){
    if(this.energy.value <= 10){
      this.energy.status = "low";
    } else if (this.hunger.value >= 90){
      this.hunger.status = "low";
    } else if (this.fatigue.value >= 90){
      this.fatigue.status = "low";
    } else if (this.happiness.value <= 10){
      this.happiness.status = "low";
    }


    // if (this.lowStats.includes("low")){
    //   let lowStatCount = [];
    //   for(let i=0; i < this.lowStats.length; i++){
    //     if (this.lowStats[i] === "low"){
    //       lowStatCount.push({id: i, value:this.lowStats[i]});
    //     }
    //   }
    //   if (lowStatCount.length == 1){
    //     alert("Warning! Pet may die!");
    //   } else if (lowStatCount.length > 1){
    //     this.lowStats[lowStatCount[0]]
    //   }
      
    // } else if (this.energy === 0 || this.hunger === 100 || this.fatigue >= 90 || this.happiness <= 10)
  }
}