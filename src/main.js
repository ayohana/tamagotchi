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

function createPet(pet) {
  pet = new Tamagotchi();

  $("#startScreen").hide();
  $("#gameScreen").show();
  $("#buttonRow").show();
  $("#gameOver").hide();

  updateStats(pet);
  pet.setStats();
  setInterval(() => {
    updateStats(pet);
  }, 5000);

  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=tamagotchi&rating=PG-13`;

  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      getElements(response);
    }
  };

  request.open("GET", url, true);
  request.send();

  const getElements = function(response) {
    let image = new Image();
    image.id = "petGif";
    image.src = response.data.images.downsized_large.url;
    $("#pet-image").append(image);
  };
}

$(document).ready(function(){
  let pet;

  $("#startButton").click(function(event){
    event.preventDefault();

    const numberOfPets = document.getElementById("numberOfPets");

    if (!numberOfPets.checkValidity()) {
      console.error("Enter a valid number!");
    } else {
      createPet(pet);
    }

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