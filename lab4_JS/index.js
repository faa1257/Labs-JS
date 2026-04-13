// ==========================
// ЧАСТЬ 1 — КЛАССЫ
// ==========================

// базовый класс предмета
class Item {
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  // вернуть инфу о предмете
  getInfo() {
    return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
  }

  // изменить вес
  setWeight(newWeight) {
    this.weight = newWeight;
  }
}

// класс оружия (наследование)
class Weapon extends Item {
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  // использовать оружие
  use() {
    if (this.durability > 0) {
      this.durability -= 10;
      if (this.durability < 0) this.durability = 0;
    }
  }

  // починить оружие
  repair() {
    this.durability = 100;
  }

  // переопределение метода
  getInfo() {
    return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}`;
  }
}


// ==========================
// ЧАСТЬ 2 — ТЕСТ КЛАССОВ
// ==========================

console.log("=== TEST CLASS ===");

const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());

sword.setWeight(4.0);
console.log("New weight:", sword.weight);

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());

bow.use();
console.log("After use:", bow.durability);

bow.repair();
console.log("After repair:", bow.durability);

// optional chaining
console.log("Damage:", bow?.damage);
console.log("Safe access:", bow?.test?.value);


// ==========================
// ЧАСТЬ 3 — ФУНКЦИИ-КОНСТРУКТОРЫ
// ==========================

// конструктор Item
function ItemFunc(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

// методы через prototype
ItemFunc.prototype.getInfo = function () {
  return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
};

ItemFunc.prototype.setWeight = function (newWeight) {
  this.weight = newWeight;
};

// конструктор Weapon
function WeaponFunc(name, weight, rarity, damage, durability) {
  ItemFunc.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;
}

// наследование
WeaponFunc.prototype = Object.create(ItemFunc.prototype);
WeaponFunc.prototype.constructor = WeaponFunc;

// методы
WeaponFunc.prototype.use = function () {
  if (this.durability > 0) {
    this.durability -= 10;
    if (this.durability < 0) this.durability = 0;
  }
};

WeaponFunc.prototype.repair = function () {
  this.durability = 100;
};

WeaponFunc.prototype.getInfo = function () {
  return `${ItemFunc.prototype.getInfo.call(this)}, Damage: ${this.damage}, Durability: ${this.durability}`;
};


// ==========================
// ЧАСТЬ 4 — ТЕСТ КОНСТРУКТОРОВ
// ==========================

console.log("\n=== TEST FUNCTION CONSTRUCTOR ===");

const axe = new WeaponFunc("Axe", 5, "common", 20, 80);

console.log(axe.getInfo());

axe.use();
console.log("After use:", axe.durability);

axe.repair();
console.log("After repair:", axe.durability);