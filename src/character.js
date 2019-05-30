class Statistics {
  constructor(stats)
  {
    this.level = 1;
    this.xp = 0;
    this.statPoints = 0;
    this.strength = this.vitality = this.dexterity = this.intelligence = this.wisdom = 10;
    this.name = "Nameless";
    this.class = "Nobody";
    this.race = "Blob";
    this.status = "Alive";
    this.allegiance = "None";
    Object.assign(this, stats);
  
    this.healthCurrent = this.healthMax = Math.floor(this.vitality * (0.75 + this.level / 4));
  }

  getAttackStrength() {
    return Math.floor(this.strength  * 0.2);
  }

  giveXp(amount) {
    this.xp += amount;
    while (this.xp >= (Math.pow(this.level, 2) * 10)) {
      this.levelUp();
    }
  }

  getLevelXp() {
    return (Math.pow(this.level, 2) * 10);
  }
  
 
  levelUp() {
    this.level++;
    this.statPoints += 5;
    this.healthMax = Math.floor(this.vitality * (0.75 + this.level / 4));
  }
}


export class Character extends Statistics {
  constructor(stats) {    
    super(stats);
    this.created = Date.now();
    this.race = "Human";
  }
}


export class Enemy extends Statistics {
  constructor(stats) {    
    super(stats);
    this.race = "Beast";
    this.class = "Monster";
  }

}