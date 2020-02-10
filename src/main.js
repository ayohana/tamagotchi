import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { Tamagotchi } from '../src/tamagotchi';

function updateStats(pet){
  $("#energy").text(pet.energy.value);
  $("#hunger").text(pet.hunger.value);
  $("#fatigue").text(pet.fatigue.value);
  $("#happiness").text(pet.happiness.value);
  if(pet.isDead){
    $("#petMessage").text("Your pet has died.");
    $("#buttonRow").hide();
    $("#gameOver").show();
  } else{
    $("#petMessage").text("");
    $("#buttonRow").show();
    $("#gameOver").hide();
  }
}

$(document).ready(function(){
  let pet;

  $("#startButton").click(function(event){
    event.preventDefault();
    pet = new Tamagotchi();

    $("#startScreen").hide();
    $("#gameScreen").show();
    $("#buttonRow").show();
    $("#gameOver").hide();

    updateStats(pet);
    pet.setStats();
    setInterval(() => {
      updateStats(pet);
    }, 1000);

  });

  $("#feedButton").click(function(event){
    event.preventDefault();
    pet.feed();
    updateStats(pet);
  });

  $("#playButton").click(function(event){
    event.preventDefault();
    pet.play();
    updateStats(pet);
  });

  $("#sleepButton").click(function(event){
    event.preventDefault();
    pet.sleep();
    updateStats(pet);
  });

  $("#restartGame").click(function(event){
    event.preventDefault();
    $("#startScreen").show();
    $("#gameScreen").hide();
    $("#gameOver").hide();
    pet.isDead = false;
  });  
});