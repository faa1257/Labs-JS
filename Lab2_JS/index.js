
// 1. printArray
// Выводит элементы массива в формате:



function printArray(array) {
    // Проверяем, является ли объект массивом
    if (!Array.isArray(array)) {
        throw new TypeError("Аргумент должен быть массивом");
    }

    // Проходим по массиву циклом
    for (let i = 0; i < array.length; i++) {
        console.log(`Element ${i}: value ${array[i]}`);
    }
}



// 2. printArray1
// Выводит элементы массива в формате:


function printArray1(array) {
    if (!Array.isArray(array)) {
        throw new TypeError("Аргумент должен быть массивом");
    }

    for (let i = 0; i < array.length; i++) {
        console.log(`${i}: ${array[i]}`);
    }
}



// 3. forEach
// Выполняет функцию callback для каждого элемента массива

function forEach(array, callback) {
    // Проверка массива
    if (!Array.isArray(array)) {
        throw new TypeError("Первый аргумент должен быть массивом");
    }

    // Проверка функции callback
    if (typeof callback !== "function") {
        throw new TypeError("Второй аргумент должен быть функцией");
    }

    // Обходим массив и вызываем callback
    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}


// 4. map
// Создает новый массив, изменяя каждый элемент

function map(array, callback) {
    if (!Array.isArray(array)) {
        throw new TypeError("Первый аргумент должен быть массивом");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Второй аргумент должен быть функцией");
    }

    const result = [];

    for (let i = 0; i < array.length; i++) {
        // Добавляем преобразованный элемент в новый массив
        result.push(callback(array[i], i, array));
    }

    return result;
}


// 5. filter
// Оставляет только элементы, которые проходят проверку callback


function filter(array, callback) {
    if (!Array.isArray(array)) {
        throw new TypeError("Первый аргумент должен быть массивом");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Второй аргумент должен быть функцией");
    }

    const result = [];

    for (let i = 0; i < array.length; i++) {
        // Если условие true — добавляем элемент
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }

    return result;
}



// 6. find
// Ищет первый подходящий элемент


function find(array, callback) {
    if (!Array.isArray(array)) {
        throw new TypeError("Первый аргумент должен быть массивом");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Второй аргумент должен быть функцией");
    }

    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return array[i]; // Возвращаем первый найденный элемент
        }
    }

    return undefined;
}



// 7. some
// Проверяет, есть ли хотя бы один подходящий элемент


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


// 8. every
// Проверяет, подходят ли ВСЕ элементы


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



// 9. reduce
// Сводит массив к одному значению


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

    // Если начальное значение задано
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




console.log("========== TESTS ==========");

console.log("printArray:");
printArray(["x", "y", "z"]);

console.log("printArray1:");
printArray1(["x", "y", "z"]);

console.log("forEach:");
forEach([10, 20, 30], (element, index) => {
    console.log(element, index);
});

console.log("map:", map([1,2,3], x => x * 2));
console.log("filter:", filter([1,2,3,4,5], x => x % 2 === 0));
console.log("find:", find([1,3,5,6], x => x % 2 === 0));
console.log("some:", some([1,3,5,6], x => x % 2 === 0));
console.log("every:", every([2,4,6], x => x % 2 === 0));
console.log("reduce:", reduce([1,2,3,4], (acc, el) => acc + el, 0));