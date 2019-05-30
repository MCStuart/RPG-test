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
}

export class Item {
  constructor(stats){
    this.name = "Garbage";
    this.weight = 1;
    this.value = 0;
    this.damage = 1;
    this.damageType = "Phyiscal";
    Object.assign(this, stats);
  }


}

