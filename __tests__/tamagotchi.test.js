import {Tamagotchi} from './../src/tamagotchi.js';

describe('Tamagotchi', () => {
  jest.useFakeTimers();
  let pet;

  beforeEach(function() {
    pet = new Tamagotchi();
    pet.setStats(); 
  });

  afterEach(function(){
    jest.clearAllTimers();
  });

  test('should create a new tamagotchi pet object', () => {
    expect(pet).toBeInstanceOf(Tamagotchi);
    expect(pet.energy.value).toEqual(100);
    expect(pet.hunger.value).toEqual(0);
    expect(pet.fatigue.value).toEqual(0);
    expect(pet.happiness.value).toEqual(50);
  });

  test('should automatically decrease status levels for pet over time', () => {
    jest.advanceTimersByTime(5001);
    expect(pet.energy.value).toEqual(90);
    expect(pet.hunger.value).toEqual(15);
    expect(pet.fatigue.value).toEqual(5);
    expect(pet.happiness.value).toEqual(45);
  });

  test('feeding pet should decrease hunger level and increase energy level', () => {
    pet.hunger.value = 50;
    pet.energy.value = 30;
    pet.feed();
    expect(pet.hunger.value).toEqual(25);
    expect(pet.energy.value).toEqual(40);
  });

  test('playing should increase happiness level and decrease energy level', () => {
    pet.play();
    expect(pet.happiness.value).toEqual(70);
    expect(pet.energy.value).toEqual(85);
  });

  test('sleeping should reset fatigue level and increase energy level', () => {
    pet.fatigue.value = 80;
    pet.energy.value = 40;
    pet.sleep();
    expect(pet.fatigue.value).toEqual(0);
    expect(pet.energy.value).toEqual(60);
  });

  test('if stat is outside normal range, value changed to the limit for that stat', () => {
    expect(pet.checkRange(-5)).toEqual(0);
    expect(pet.checkRange(105)).toEqual(100);
  });

  test('warn player that pet may die when any of the stats are within 10 points from the limit', () => {
    pet.energy.value = 20;
    pet.hunger.value = 75;
    pet.fatigue.value = 25;
    pet.happiness.value = 45;
    jest.advanceTimersByTime(5001);
    pet.checkStats();
    expect(pet.energy.value).toEqual(10);
    expect(pet.hunger.value).toEqual(90);
    expect(pet.fatigue.value).toEqual(30);
    expect(pet.happiness.value).toEqual(40);
  });

  test('pet dies when any of the stats reaches the limit', () => {
    pet.energy.value = 40;
    pet.hunger.value = 85;
    pet.fatigue.value = 35;
    pet.happiness.value = 5;
    jest.advanceTimersByTime(5001);
    pet.checkStats();
    expect(pet.energy.value).toEqual(30);
    expect(pet.hunger.value).toEqual(100);
    expect(pet.fatigue.value).toEqual(40);
    expect(pet.happiness.value).toEqual(0);
  });

  test.todo('add multiple pets');
  test.todo('sleep disables buttons for set amt of time');
  test.todo('warning for low stats');
  test.todo('exception handling error');
  test.todo('style site');
  test.todo('create items/actions?');
});