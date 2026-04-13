# Лабораторная работа №4  

## Расширенные возможности объектов в JavaScript

## Цель работы

Изучить классы и объекты в JavaScript, научиться создавать классы, использовать конструкторы и методы, а также реализовывать наследование. Изучить функции-конструкторы и необязательную цепочку.

---

## Условия выполнения

Разработать консольное приложение, имитирующее систему учета предметов (инвентаря).

Каждый предмет содержит:
- name — название  
- weight — вес  
- rarity — редкость  

Оружие дополнительно содержит:
- damage — урон  
- durability — прочность  

---

## Реализация классов и методов

```javascript
// ==========================
// 1 КЛАСС Item
// ==========================

/**
 * Класс предмета
 */
class Item {
  /**
   * @param {string} name - название предмета
   * @param {number} weight - вес
   * @param {string} rarity - редкость
   */
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /**
   * Возвращает информацию о предмете
   * @returns {string}
   */
  getInfo() {
    return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
  }

  /**
   * Изменяет вес предмета
   * @param {number} newWeight
   */
  setWeight(newWeight) {
    this.weight = newWeight;
  }
}
// Функция создаёт базовый объект предмета. Используется конструктор для задания значений и методы для работы с объектом.


// ==========================
// 2 КЛАСС Weapon
// ==========================

/**
 * Класс оружия (наследуется от Item)
 */
class Weapon extends Item {
  /**
   * @param {string} name
   * @param {number} weight
   * @param {string} rarity
   * @param {number} damage
   * @param {number} durability
   */
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  /**
   * Использует оружие (уменьшает прочность)
   */
  use() {
    if (this.durability > 0) {
      this.durability -= 10;
      if (this.durability < 0) this.durability = 0;
    }
  }

  /**
   * Ремонтирует оружие
   */
  repair() {
    this.durability = 100;
  }

  /**
   * Возвращает информацию
   * @returns {string}
   */
  getInfo() {
    return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}`;
  }
}
// Класс расширяет Item через extends. Добавляются новые свойства и методы. super() вызывает родительский конструктор.


// ==========================
// 3 ТЕСТИРОВАНИЕ
// ==========================

const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());

sword.setWeight(4.0);
console.log("New weight:", sword.weight);

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());

bow.use();
console.log("Durability after use:", bow.durability);

bow.repair();
console.log("Durability after repair:", bow.durability);
// Здесь проверяется работа методов, изменение свойств и наследование.


// ==========================
// 4 OPTIONAL CHAINING
// ==========================

console.log(bow?.damage);
console.log(bow?.test?.value);
// Оператор ?. позволяет обращаться к свойствам без ошибки если они не существуют.


// ==========================
// 5 ФУНКЦИИ-КОНСТРУКТОРЫ
// ==========================

/**
 * Конструктор Item
 */
function ItemFunc(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

/**
 * Метод получения информации
 */
ItemFunc.prototype.getInfo = function () {
  return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
};

/**
 * Метод изменения веса
 */
ItemFunc.prototype.setWeight = function (newWeight) {
  this.weight = newWeight;
};
// Аналог класса, но реализован через функцию и prototype.


// ==========================
// 6 КОНСТРУКТОР Weapon
// ==========================

function WeaponFunc(name, weight, rarity, damage, durability) {
  ItemFunc.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;
}

// наследование
WeaponFunc.prototype = Object.create(ItemFunc.prototype);
WeaponFunc.prototype.constructor = WeaponFunc;

/**
 * Использование оружия
 */
WeaponFunc.prototype.use = function () {
  if (this.durability > 0) {
    this.durability -= 10;
    if (this.durability < 0) this.durability = 0;
  }
};

/**
 * Ремонт
 */
WeaponFunc.prototype.repair = function () {
  this.durability = 100;
};

/**
 * Информация
 */
WeaponFunc.prototype.getInfo = function () {
  return `${ItemFunc.prototype.getInfo.call(this)}, Damage: ${this.damage}, Durability: ${this.durability}`;
};
// Здесь реализовано наследование через prototype и вызов родительского конструктора.


// ==========================
// 7 ТЕСТ КОНСТРУКТОРОВ
// ==========================

const axe = new WeaponFunc("Axe", 5, "common", 20, 80);

console.log(axe.getInfo());

axe.use();
console.log("After use:", axe.durability);

axe.repair();
console.log("After repair:", axe.durability);
// Проверка работы функций-конструкторов.

---

## Контрольные вопросы

### 1. Насколько важно this?

`this` — это ссылка на текущий объект.  
Он используется внутри методов для доступа к свойствам объекта.  
Если `this` работает неправильно, методы не смогут изменять или получать данные.

---

### 2. Как работает # в JavaScript?

Символ `#` используется для создания приватных полей в классе.  
К таким полям нельзя обратиться снаружи класса — только внутри него.


---

### 3. В чем разница между class и функциями-конструкторами?

 class — современный синтаксис
 функции-конструкторы — более старый способ
 оба используют прототипы
 class делает код более читаемым и удобным

 ---

 ###Вывод

 В ходе лабораторной работы было разработано консольное приложение для работы с объектами.

Я изучил:

создание классов и объектов
наследование через extends
работу методов и this
функции-конструкторы и прототипы
необязательную цепочку ?.
