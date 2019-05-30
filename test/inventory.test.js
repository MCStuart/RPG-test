/* eslint-disable no-undef */
import { setBrowserVariable, getBrowserVariable } from '../src/functions';
import { Character, Enemy } from '../src/character';
import { Combat } from '../src/battle';
import { isTSAnyKeyword, exportAllDeclaration } from '@babel/types';
import {Inventory, Item} from '../src/inventory';

describe('Inventory', function () {
  let knight;
  beforeEach(function(){
    knight = new Character({
      inventory: new Inventory([
        {name: "Sword", weight: 12}, 
        {name: "Shield", weight: 20}])
    });
  });
  it('inventory constructor', function(){
    expect(knight.inventory.items[0].name).toEqual("Sword");
    expect(knight.inventory.items[0].damageType).toEqual("Phyiscal");
  });
  
  it('inventory add item', function(){
    knight.inventory.addItem({name: "Sword", weight:12, value:0, damage:1, damageType: "Physical"})
    expect(knight.inventory.items[0].name).toEqual("Sword");
    expect(knight.inventory.items[0].damageType).toEqual("Phyiscal");
  });

  it("inventory remove item", function() {
    knight.inventory.addItem({name: "Sword", weight:12, value:0, damage:1, damageType: "Physical"})
    expect(knight.inventory.items[0].name).toEqual("Sword");
    knight.inventory.removeItem("Shield");
    expect(knight.inventory.items.length).toEqual(2);
  })

  //after implementing checkIfPlayerCanHold()
  it('player gets an item they can hold', function() {
    let woodenSword = new Item({
      name: "Wooden Sword",
      weaponTier: "Wooden",
    });
    woodenSword.getWeaponTier();
    knight.inventory.checkIfPlayerCanHold(woodenSword, knight);
    expect(knight.inventory.items.length).toEqual(3);
  });

  it('player gets a melee item they cant use', function() {
    knight.inventory.addItem({name: "Dragon Bone Spear", weaponTier: "Dragon Bone"});
  });
});
    
describe('Item', function() {
  it('creates a new item', function() {
    let ironArmor = new Item({
      name: "Iron Armor", weight: 40, value: 100
    });
    expect(ironArmor.name).toEqual("Iron Armor");
  });

  it('gets values of an item based on the item tier', function() {
    let treeBranch = new Item({
      name: "Tree Branch", weight: 40, value: 10, weaponTier: "Wooden"
    });
    treeBranch.getWeaponTier();
    expect(treeBranch.damage).toEqual(2);
    expect(treeBranch.defense).toEqual(2);
    expect(treeBranch.weight).toEqual(20);
    expect(treeBranch.weaponTier).toEqual("Wooden");
    expect(treeBranch.value).toEqual(10);
  });

});

