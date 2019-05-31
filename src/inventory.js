export class Inventory{
  constructor(items) {
    this.items = [];
        items.forEach(element => {
            this.items.push(new Item(element));
      });    
  }

  addItem(item){
    this.items.push(item);
  }

  removeItem(itemName) {
    for(let i = 0; i < this.items.length; i++)
    {
      if(this.items[i].name === itemName) {
        this.items.splice(i, 1);  
      }
    }
  }

  checkIfPlayerCanHold(item, player) {
    if((player.strength * 2 || player.intelligence * 2) >= item.weight) {
      this.addItem(item);
      return true;
    }
    return false;
  }
}

export class Item {
  constructor(stats){
    this.name = "Garbage";
    this.weight = 1;
    this.value = 0;
    this.damage = 0;
    this.defense = 0;
    this.damageType = "Phyiscal";
    this.weaponTier = "Wooden";
    Object.assign(this, stats);
  }

  woodenItem() {
    this.weight = 20;
    this.value = 10;
    this.damage = 2;
    this.defense = 2;
    this.weaponTier = "Wooden";
  }

  ironItem() {
    this.weight = 30;
    this.value = 20;
    this.damage = 5;
    this.defense = 5;
    this.weaponTier = "Iron";
  }

  steelItem() {
    this.weight = 40;
    this.value = 30;
    this.damage = 10;
    this.defense = 10;
    this.weaponTier = "Steel";
  }

  mithrilItem() {
    this.weight = 50;
    this.value = 40;
    this.damage = 20;
    this.defense = 20;
    this.weaponTier = "Mithril";
  }

  obsidianItem() {
    this.weight = 70;
    this.value = 50;
    this.damage = 30;
    this.defense = 30;
    this.weaponTier = "Obsidian";
  }

  dragonBoneItem() {
    this.weight = 100;
    this.value = 60;
    this.damage = 40;
    this.defense = 40;
    this.weaponTier = "Dragon Bone";
  }

  getWeaponTier() {
    if(this.weaponTier === "Wooden") {
      this.woodenItem();
    } if(this.weaponTier === "Iron") {
      this.ironItem();
    } if(this.weaponTier === "Steel") {
      this.steelItem();
    } if(this.weaponTier === "Mithril") {
      this.mithrilItem();
    } if(this.weaponTier === "Obsidian") {
      this.obsidianItem();
    } if(this.weaponTier === "Dragon Bone") {
      this.dragonBoneItem();
    }
  }
}

