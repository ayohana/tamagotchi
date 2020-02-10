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
});