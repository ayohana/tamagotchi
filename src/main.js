import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { Tamagotchi } from '../src/tamagotchi';
import { Game } from '../src/game';

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

  updateStats(pet);
  pet.setStats();
  setInterval(() => {
    updateStats(pet);
  }, 5000);

  return pet;
}

function generateRandomImage(name) {
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
    $(eval(`${name}petImageDiv`)).append(image);
  };
}

function createGameDiv(name){
  let gameScreenDiv = document.createElement('div');
  gameScreenDiv.id = name;
  gameScreenDiv.className = "gameScreen";

  let gameSectionDiv = document.createElement('div');
  gameSectionDiv.className = "gameSection";
  gameSectionDiv.id = name + "gameSection";
  gameScreenDiv.appendChild(gameSectionDiv);

  let buttonSectionDiv = document.createElement('div');
  buttonSectionDiv.className = "buttonSection row";
  buttonSectionDiv.id = name + "buttonSection";
  gameScreenDiv.appendChild(buttonSectionDiv);

  let imageDiv = document.createElement('div');
  imageDiv.className = "imageDiv";
  imageDiv.id = name + "imageDiv";
  gameSectionDiv.appendChild(imageDiv);

  let petStatsDiv = createStatsElements(name);
  gameSectionDiv.appendChild(petStatsDiv);

  let petImageDiv = document.createElement('div');
  petImageDiv.className = "petImageDiv";
  petImageDiv.id = name + "petImageDiv";
  generateRandomImage(name);
  imageDiv.appendChild(petImageDiv);

  let buttonColDiv = createButtonElements(name);
  buttonSectionDiv.appendChild(buttonColDiv);

  $("#moreGames").append(gameScreenDiv);
}

function createStatsElements(name){
  let petStatsDiv = document.createElement('div');
  petStatsDiv.className = "petStatsDiv col-6";
  petStatsDiv.id = name + "petStatsDiv";

  petStatsDiv.innerHTML = `<h2>PET STATS</h2><hr>
    <h3>Energy: <span id="${name}Energy"></span>/100</h3>
    <h3>Hunger: <span id="${name}Hunger"></span>/100</h3>
    <h3>Fatigue: <span id="${name}Fatigue"></span>/100</h3>
    <h3>Happiness: <span id="${name}Happiness"></span>/100</h3>
    <h3><span id="${name}PetMessage"></span></h3>`;

  return petStatsDiv;
}

function createButtonElements(name){
  let buttonColDiv = document.createElement('div');
  buttonColDiv.className = "col-md-6";

  let feedButton = document.createElement('button');
  feedButton.id = name + "FeedButton";
  feedButton.innerText = "FEED";
  feedButton.className = "btn btn-lg btn-primary";
  feedButton.type = "button";
  buttonColDiv.appendChild(feedButton);

  let playButton = document.createElement('button');
  playButton.id = name + "PlayButton";
  playButton.innerText = "PLAY";
  playButton.className = "btn btn-lg btn-primary";
  playButton.type = "button";
  buttonColDiv.appendChild(playButton);

  let sleepButton = document.createElement('button');
  sleepButton.id = name + "SleepButton";
  sleepButton.innerText = "SLEEP";
  sleepButton.className = "btn btn-lg btn-primary";
  sleepButton.type = "button";
  buttonColDiv.appendChild(sleepButton);

  return buttonColDiv;
}

$(document).ready(function(){
  let pet;
  let game = new Game();

  $("#startButton").click(function(event){
    event.preventDefault();

    const numberOfPets = document.getElementById("numberOfPets");
    const petCount = parseInt($("#numberOfPets").val());

    if (!numberOfPets.checkValidity()) {
      console.error("Enter a valid number!");
    } else {

      $("#startScreen").hide();
      $("#gameScreen").show();
      $("#buttonRow").show();
      $("#gameOver").hide();

      for (let i = 0; i <= petCount-1; i++) {
        let name = `pet${i}`;
        game.addTamagotchi(createPet(name));
        createGameDiv(name);
      }
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