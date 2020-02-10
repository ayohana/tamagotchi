import {Tamagotchi} from './../src/tamagotchi.js';

describe('Tamagotchi', () => {
  jest.useFakeTimers();
  let pet;

  beforeEach(function() {
    pet = new Tamagotchi();
  });

  afterEach(function(){
    jest.clearAllTimers();
  });

  test('should create a new tamagotchi pet object', () => {
    expect(pet).toBeInstanceOf(Tamagotchi);
    expect(pet.energy).toEqual(100);
    expect(pet.hunger).toEqual(0);
    expect(pet.fatigue).toEqual(0);
    expect(pet.happiness).toEqual(50);
  });

  test('should automatically decrease status levels for pet over time', () => {
    jest.advanceTimersByTime(10001);
    expect(pet.energy).toEqual(90);
    expect(pet.hunger).toEqual(15);
    expect(pet.fatigue).toEqual(5);
    expect(pet.happiness).toEqual(45);
  });

  test('feeding pet should decrease hunger level', () => {
    pet.hunger = 50;
    pet.feed();
    expect(pet.hunger).toEqual(25);
  });

  test('playing should increase happiness level and decrease energy level', () => {
    pet.play();
    expect(pet.happiness).toEqual(70);
    expect(pet.energy).toEqual(85);
  });

  test('sleeping should reset fatigue level', () => {
    pet.fatigue = 80;
    pet.sleep();
    expect(pet.fatigue).toEqual(0);
  });

  test('warn player that pet may die when any of the stats are within 10 points from the limit', () => {
    pet.energy = 20;
    pet.hunger = 75;
    pet.fatigue = 25;
    pet.happiness = 45;
    jest.advanceTimersByTime(10001);
    expect(pet.energy).toEqual(10);
    expect(pet.hunger).toEqual(90);
    expect(pet.fatigue).toEqual(30);
    expect(pet.happiness).toEqual(40);
    pet.checkStats();
  });

  test('pet dies when any of the stats reaches the limit', () => {
    pet.energy = 40;
    pet.hunger = 85;
    pet.fatigue = 35;
    pet.happiness = 5;
    jest.advanceTimersByTime(10001);
    expect(pet.energy).toEqual(30);
    expect(pet.hunger).toEqual(100);
    expect(pet.fatigue).toEqual(40);
    expect(pet.happiness).toEqual(0);
    pet.checkStats();
  });
});