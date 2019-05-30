import { setBrowserVariable, getBrowserVariable } from '../src/functions';
import { Character, Enemy } from '../src/character';
import { Combat } from '../src/battle';

describe('Character', function () {


  it('gets a variable from the browser', function () {
    setBrowserVariable("name", "Sir knight");
    expect("Sir knight").toEqual(getBrowserVariable("name"));
    setBrowserVariable("name", "");
    //Test content will go here.
  });

  it('creates a character', function () {
    let knight = new Character({
      created: Date.now(),
      name: "Sir Knight",
      class: "Knight",
      race: "Human",
      strength: 15,
      vitality: 12
    });
    expect(knight.name).toEqual("Sir Knight");
    expect(knight.class).toEqual("Knight");
    expect(knight.race).toEqual("Human");
    expect(knight.strength).toEqual(15);
    expect(knight.vitality).toEqual(12);
    expect(knight.intelligence).toEqual(10);
    expect(knight.dexterity).toEqual(10);
    expect(knight.wisdom).toEqual(10);
  });
});

describe('Combat', function () {
  let knight;
  let enemy1, enemy2;

  beforeEach(function() {
    knight = new Character({
      name: "Sir Knight",
      class: "Knight",
      race: "Human",
      strength: 15,
      vitality: 12
    });
    enemy1 = new Enemy({
      name: "Creature1",
      vitality: 5,
      strength: 2,
      dexterity: 8
    });
    enemy2 = new Enemy({
      name: "Creature2",
      vitality: 20,
      strength: 20,
      dexterity: 20
    });
  });

  it('create combat', function () {
    let combat = new Combat([knight, enemy1, enemy2]);
    expect(combat.combattants[0].name).toEqual("Sir Knight");
    expect(combat.combattants[1].name).toEqual("Creature1");
    expect(combat.combattants[2].name).toEqual("Creature2");
  });


  it('combat turn', function () {
    let combat = new Combat([knight, enemy1, enemy2]);
    expect(combat.turnOrder[0].name).toEqual("Creature2");
    expect(combat.turnOrder[1].name).toEqual("Sir Knight");
    expect(combat.turnOrder[2].name).toEqual("Creature1");
    expect(combat.getCurrentTurn().name).toEqual("Creature2");
    combat.advanceTurn();
    expect(combat.getCurrentTurn().name).toEqual("Sir Knight");
    combat.advanceTurn();
    expect(combat.getCurrentTurn().name).toEqual("Creature1");
  });

  it('combat attack', function () {
    let combat = new Combat([knight, enemy1, enemy2]);
    let enemyHpBefore = knight.healthCurrent; 
    combat.Attack("Sir Knight");
    let enemyHpAfter = knight.healthCurrent;
    expect(enemyHpAfter).toEqual(enemyHpBefore - enemy2.getAttackStrength());
  });

  it('you got knocked da fk out', function() {
    let combat = new Combat([knight, enemy1, enemy2]);
    combat.Attack("Sir Knight");
    combat.Attack("Sir Knight");
    combat.Attack("Sir Knight");
    expect(knight.status).toEqual("Unconscious");
  });

  it('killed sir knight', function() {
    let combat = new Combat([knight, enemy1, enemy2]);
    combat.Attack("Sir Knight");
    combat.Attack("Sir Knight");
    combat.Attack("Sir Knight");
    combat.Attack("Sir Knight");
    expect(knight.status).toEqual("Dead");
  });

  it('skipped dead sir knight', function() {
    let combat = new Combat([knight, enemy1, enemy2]);
    combat.Attack("Sir Knight");
    combat.Attack("Sir Knight");
    combat.Attack("Sir Knight");
    combat.Attack("Sir Knight");
    combat.advanceTurn();
    expect(combat.getCurrentTurn().name).toEqual("Creature1");
  });

  it('will give xp after a kill', function() {
    let combat = new Combat([knight, enemy1, enemy2]);
    combat.Attack("Sir Knight");
    combat.Attack("Sir Knight");
    combat.Attack("Sir Knight");
    combat.Attack("Sir Knight");
    enemy1.giveXp(3);
    expect(enemy1.xp).toEqual(3);
  });

  it('will level up', function() {
    let combat = new Combat([knight, enemy1, enemy2]);
    combat.Attack("Sir Knight");
    combat.Attack("Sir Knight");
    combat.Attack("Sir Knight");
    combat.Attack("Sir Knight");
    enemy1.giveXp(10);
    expect(enemy1.level).toEqual(2);
  });

  it('will level up', function() {
    let enemy3 = new Enemy(...enemy2);
    console.log(enemy3);
  });
  // get xp amount = 1/4 of same level enemy
});