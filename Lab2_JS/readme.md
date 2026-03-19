# Лабораторная работа №2
## Освоение основных методов работы с массивами

---

##  Цель работы
Изучить принципы реализации основных методов работы с массивами с использованием колбэк-функций, а также закрепить навыки написания функций с корректной обработкой аргументов и возвратом результатов без использования встроенных методов массивов.

---

##  Условия выполнения

###  Запрещено использовать:
forEach  
map  
filter  
find  
some  
every  
reduce  

###  Разрешено использовать:
цикл for  
свойство length  
обращение по индексу  
метод push  

---

##  Реализация функций

---

### 1. printArray
 Описание: выводит элементы массива в формате Element 0: value x

```js
/**
 * Выводит элементы массива в консоль.
 * @param {Array} array - исходный массив
 * @returns {undefined}
 * @throws {TypeError} если аргумент не является массивом
 */
function printArray(array) {
    if (!Array.isArray(array)) {
        throw new TypeError("Аргумент должен быть массивом");
    }

    for (let i = 0; i < array.length; i++) {
        console.log(`Element ${i}: value ${array[i]}`);
    }
}

 Пример:

printArray(["x", "y", "z"]);
// Element 0: value x
// Element 1: value y
// Element 2: value z
2. printArray1

 Описание: выводит элементы массива в формате 0: x

/**
 * Выводит элементы массива в консоль в кратком формате.
 * @param {Array} array - исходный массив
 * @returns {undefined}
 * @throws {TypeError} если аргумент не является массивом
 */
function printArray1(array) {
    if (!Array.isArray(array)) {
        throw new TypeError("Аргумент должен быть массивом");
    }

    for (let i = 0; i < array.length; i++) {
        console.log(`${i}: ${array[i]}`);
    }
}

 Пример:

printArray1(["x", "y", "z"]);
// 0: x
// 1: y
// 2: z
3. forEach

 Описание: выполняет callback для каждого элемента массива. Ничего не возвращает.

/**
 * Выполняет callback для каждого элемента массива.
 * @param {Array} array - исходный массив
 * @param {Function} callback - функция вида (element, index, array)
 * @returns {undefined}
 * @throws {TypeError} если array не массив или callback не функция
 */
function forEach(array, callback) {
    if (!Array.isArray(array)) {
        throw new TypeError("Первый аргумент должен быть массивом");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Второй аргумент должен быть функцией");
    }

    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

 Пример:

forEach([1, 2, 3], (element, index) => {
    console.log(`Element: ${element}, Index: ${index}`);
});
4. map

 Описание: создаёт новый массив из результатов вызова callback

/**
 * Создаёт новый массив из результатов вызова callback.
 */
function map(array, callback) {
    if (!Array.isArray(array)) {
        throw new TypeError("Первый аргумент должен быть массивом");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Второй аргумент должен быть функцией");
    }

    const result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }

    return result;
}

 Пример:

const numbers = [1, 2, 3];
const squared = map(numbers, (element) => element * element);
console.log(squared);
5. filter

 Описание: возвращает новый массив из элементов, для которых callback вернул true

function filter(array, callback) {
    if (!Array.isArray(array)) {
        throw new TypeError("Первый аргумент должен быть массивом");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Второй аргумент должен быть функцией");
    }

    const result = [];

    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }

    return result;
}
6. find

 Описание: возвращает первый элемент, для которого callback вернул true

function find(array, callback) {
    if (!Array.isArray(array)) {
        throw new TypeError("Первый аргумент должен быть массивом");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Второй аргумент должен быть функцией");
    }

    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return array[i];
        }
    }

    return undefined;
}
7. some

 Описание: возвращает true, если хотя бы один элемент прошёл проверку

function some(array, callback) {
    if (!Array.isArray(array)) {
        throw new TypeError("Первый аргумент должен быть массивом");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Второй аргумент должен быть функцией");
    }

    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return true;
        }
    }

    return false;
}
8. every

 Описание: возвращает true, если все элементы прошли проверку

function every(array, callback) {
    if (!Array.isArray(array)) {
        throw new TypeError("Первый аргумент должен быть массивом");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Второй аргумент должен быть функцией");
    }

    for (let i = 0; i < array.length; i++) {
        if (!callback(array[i], i, array)) {
            return false;
        }
    }

    return true;
}
9. reduce

 Описание: сводит массив к одному значению

function reduce(array, callback, initialValue) {
    if (!Array.isArray(array)) {
        throw new TypeError("Первый аргумент должен быть массивом");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Второй аргумент должен быть функцией");
    }

    if (array.length === 0 && initialValue === undefined) {
        return undefined;
    }

    let accumulator;
    let startIndex;

    if (initialValue !== undefined) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        accumulator = array[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }

    return accumulator;
}
 Контрольные вопросы
1. Преимущества использования колбэков при работе с массивами

Гибкость — одна функция может выполнять разную логику
Повторное использование
Уменьшение дублирования
Читаемость

2. Возможные проблемы и способы их избежать

Проблемы:
Ошибки типов
Сложность отладки
Пустые массивы

Решения:
Проверка типов
Обработка граничных случаев
Разделение логики

3. Как реализовать методы без встроенных функций

Все методы реализуются через:

цикл for

callback

массив результата

 Вывод

В ходе лабораторной работы были реализованы основные методы работы с массивами без использования встроенных функций JavaScript.

Были изучены принципы работы колбэк-функций и закреплены навыки работы с массивами.