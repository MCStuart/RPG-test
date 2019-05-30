export class Combat {
  constructor(combattants) {
    this.combattants = combattants;
    this.currentTurn = 0;
    this.turnOrder = [...combattants];
    this.turnOrder.sort((a, b) => b.dexterity - a.dexterity);
    this.status = "Ongoing";
  }

  getCurrentTurn() {
    return this.turnOrder[this.currentTurn];
  }

  advanceTurn() {
    for (let i = 0; i < this.turnOrder.length; i++) {
      this.currentTurn++;
      if (this.currentTurn >= this.turnOrder.length) {
        this.currentTurn = 0;
      }
      if (this.turnOrder[this.currentTurn].healthCurrent > 0) {
        return;
      }
    }
  }

  Attack(targetName) {
    let target = this.combattants.find(c => c.name === targetName);
    if (target.status != "Dead") {
      target.healthCurrent -= this.turnOrder[this.currentTurn].getAttackStrength();
      if (target.healthCurrent <= 0) {
        target.status = target.status === "Unconscious" ? "Dead" : "Unconscious";
      }
      if (target.status == "Dead") {
        this.turnOrder[this.currentTurn].giveXp(Math.ceil(target.getLevelXp() / 4));
        this.CheckForVictory();
      }
    }
  }
  //target.xp

  CheckForVictory() {
    let lastStanding = this.combattants.filter(function (entity) {
      if (entity.status !== "Dead") {
        return true;
      } else {
        return false;
      }
    });
    let allegiances = [];
    lastStanding.forEach(element => {
      if (!allegiances.includes(element.allegiance) || element.allegiance === "None") {
        allegiances.push(element.allegiance);
      }
    })
    if (allegiances.length === 1) {
      this.status = "Finished";
    }
  }
}
