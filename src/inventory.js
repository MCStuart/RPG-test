export class Inventory{
    constructor() {
        this.items = [];
        // items.forEach(element => {
        //     this.items.push(new Item(element));
        // });    
    }

    addItem(item){
        this.items.push(item);
    }
}

export class Item {
    constructor(stats){
        this.name = "Garbage";
        this.weight = 1;
        this.value = 0;
        this.damage = 1;
        this.damageType = "Phyiscal"
        Object.assign(this, stats)
    }


}

