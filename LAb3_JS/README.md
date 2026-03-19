# Лабораторная работа №3
## Основы работы с массивами, функциями и объектами в JavaScript

---

##  Цель работы
Изучить основы работы с массивами и функциями в JavaScript, применяя их для обработки и анализа транзакций.

---

##  Условия выполнения
Разработать консольное приложение для анализа транзакций.
Каждая транзакция содержит поля:

transaction_id — уникальный идентификатор
transaction_date — дата транзакции
transaction_amount — сумма транзакции
transaction_type — тип (debit / credit)
transaction_description — описание
merchant_name — название магазина
card_type — тип карты

---

##  Массив транзакций
jsconst transactions = [
  {
    transaction_id: 1,
    transaction_date: "2024-01-15",
    transaction_amount: 150,
    transaction_type: "debit",
    transaction_description: "Grocery shopping",
    merchant_name: "SuperMarket",
    card_type: "debit"
  },
  {
    transaction_id: 2,
    transaction_date: "2024-02-10",
    transaction_amount: 2000,
    transaction_type: "credit",
    transaction_description: "Salary",
    merchant_name: "Company",
    card_type: "debit"
  },
  {
    transaction_id: 3,
    transaction_date: "2024-02-20",
    transaction_amount: 300,
    transaction_type: "debit",
    transaction_description: "Electronics",
    merchant_name: "TechStore",
    card_type: "credit"
  }
];

---

##  Реализация функций

---

### 1. getUniqueTransactionTypes
 Описание: возвращает массив уникальных типов транзакций с помощью Set.

js/**
 * Возвращает массив уникальных типов транзакций.
 * @param {Object[]} transactions - массив транзакций
 * @returns {string[]} массив уникальных типов (debit, credit)
 */
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(t => t.transaction_type))];
}

 Пример:
jsgetUniqueTransactionTypes(transactions);
// ['debit', 'credit']

---

### 2. calculateTotalAmount
 Описание: вычисляет общую сумму всех транзакций.

js/**
 * Вычисляет общую сумму всех транзакций.
 * @param {Object[]} transactions - массив транзакций
 * @returns {number} общая сумма
 */
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}

 Пример:
jscalculateTotalAmount(transactions);
// 2450

---

### 3. calculateTotalAmountByDate  extra
 Описание: вычисляет сумму транзакций за указанный год, месяц и/или день. Все параметры необязательны.

js/**
 * Вычисляет общую сумму транзакций за указанную дату.
 * @param {Object[]} transactions - массив транзакций
 * @param {number} [year] - год (необязательно)
 * @param {number} [month] - месяц (необязательно)
 * @param {number} [day] - день (необязательно)
 * @returns {number} сумма транзакций за указанную дату
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
  return transactions
    .filter(t => {
      const date = new Date(t.transaction_date);
      return (!year || date.getFullYear() === year) &&
             (!month || date.getMonth() + 1 === month) &&
             (!day || date.getDate() === day);
    })
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}

 Пример:
jscalculateTotalAmountByDate(transactions, 2024, 2);
// 2300 (все транзакции за февраль 2024)

---

### 4. getTransactionByType
 Описание: возвращает массив транзакций указанного типа.

js/**
 * Возвращает транзакции указанного типа.
 * @param {Object[]} transactions - массив транзакций
 * @param {string} type - тип транзакции (debit или credit)
 * @returns {Object[]} отфильтрованный массив транзакций
 */
function getTransactionByType(transactions, type) {
  return transactions.filter(t => t.transaction_type === type);
}

 Пример:
jsgetTransactionByType(transactions, "debit");
// [{id:1, ...}, {id:3, ...}]

---

### 5. getTransactionsInDateRange
 Описание: возвращает транзакции в указанном диапазоне дат (включительно).

js/**
 * Возвращает транзакции в диапазоне дат.
 * @param {Object[]} transactions - массив транзакций
 * @param {string} startDate - начальная дата (YYYY-MM-DD)
 * @param {string} endDate - конечная дата (YYYY-MM-DD)
 * @returns {Object[]} транзакции в диапазоне дат
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  return transactions.filter(t => {
    const date = new Date(t.transaction_date);
    return date >= new Date(startDate) && date <= new Date(endDate);
  });
}

 Пример:
jsgetTransactionsInDateRange(transactions, "2024-02-01", "2024-02-28");
// [{id:2, ...}, {id:3, ...}]

---

### 6. getTransactionsByMerchant
 Описание: возвращает транзакции по названию магазина.

js/**
 * Возвращает транзакции по названию магазина.
 * @param {Object[]} transactions - массив транзакций
 * @param {string} merchantName - название магазина
 * @returns {Object[]} транзакции указанного магазина
 */
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(t => t.merchant_name === merchantName);
}

 Пример:
jsgetTransactionsByMerchant(transactions, "TechStore");
// [{id:3, ...}]

---

### 7. calculateAverageTransactionAmount
 Описание: возвращает среднее значение суммы транзакций.

js/**
 * Вычисляет среднюю сумму транзакций.
 * @param {Object[]} transactions - массив транзакций
 * @returns {number} средняя сумма или 0 если массив пустой
 */
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}

 Пример:
jscalculateAverageTransactionAmount(transactions);
// 816.67

---

### 8. getTransactionsByAmountRange
 Описание: возвращает транзакции с суммой в заданном диапазоне.

js/**
 * Возвращает транзакции в диапазоне сумм.
 * @param {Object[]} transactions - массив транзакций
 * @param {number} minAmount - минимальная сумма
 * @param {number} maxAmount - максимальная сумма
 * @returns {Object[]} транзакции в диапазоне сумм
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(t =>
    t.transaction_amount >= minAmount &&
    t.transaction_amount <= maxAmount
  );
}

 Пример:
jsgetTransactionsByAmountRange(transactions, 100, 500);
// [{id:1, amount:150}, {id:3, amount:300}]

---

### 9. calculateTotalDebitAmount
 Описание: вычисляет общую сумму дебетовых транзакций.

js/**
 * Вычисляет общую сумму дебетовых транзакций.
 * @param {Object[]} transactions - массив транзакций
 * @returns {number} сумма всех debit транзакций
 */
function calculateTotalDebitAmount(transactions) {
  return transactions
    .filter(t => t.transaction_type === "debit")
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}

 Пример:
jscalculateTotalDebitAmount(transactions);
// 450

---

### 10. findMostTransactionsMonth
 Описание: возвращает номер месяца с наибольшим количеством транзакций.

js/**
 * Возвращает месяц с наибольшим количеством транзакций.
 * @param {Object[]} transactions - массив транзакций
 * @returns {string|null} номер месяца или null если массив пустой
 */
function findMostTransactionsMonth(transactions) {
  if (transactions.length === 0) return null;

  const count = {};
  transactions.forEach(t => {
    const month = new Date(t.transaction_date).getMonth() + 1;
    count[month] = (count[month] || 0) + 1;
  });

  return Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
}

 Пример:
jsfindMostTransactionsMonth(transactions);
// "2" (февраль — 2 транзакции)

---

### 11. findMostDebitTransactionMonth
Описание: возвращает месяц с наибольшим количеством дебетовых транзакций.

js/**
 * Возвращает месяц с наибольшим количеством debit транзакций.
 * @param {Object[]} transactions - массив транзакций
 * @returns {string|null} номер месяца или null если массив пустой
 */
function findMostDebitTransactionMonth(transactions) {
  if (transactions.length === 0) return null;

  const count = {};
  transactions
    .filter(t => t.transaction_type === "debit")
    .forEach(t => {
      const month = new Date(t.transaction_date).getMonth() + 1;
      count[month] = (count[month] || 0) + 1;
    });

  return Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
}

 Пример:
jsfindMostDebitTransactionMonth(transactions);
// "1"

---

### 12. mostTransactionTypes
 Описание: возвращает какой тип транзакций преобладает.

js/**
 * Определяет преобладающий тип транзакций.
 * @param {Object[]} transactions - массив транзакций
 * @returns {string} "debit", "credit" или "equal"
 */
function mostTransactionTypes(transactions) {
  const debit = transactions.filter(t => t.transaction_type === "debit").length;
  const credit = transactions.filter(t => t.transaction_type === "credit").length;

  if (debit > credit) return "debit";
  if (credit > debit) return "credit";
  return "equal";
}

 Пример:
jsmostTransactionTypes(transactions);
// "debit"

---

### 13. getTransactionsBeforeDate
 Описание: возвращает транзакции, совершённые до указанной даты.

js/**
 * Возвращает транзакции до указанной даты.
 * @param {Object[]} transactions - массив транзакций
 * @param {string} date - дата в формате YYYY-MM-DD
 * @returns {Object[]} транзакции до указанной даты
 */
function getTransactionsBeforeDate(transactions, date) {
  return transactions.filter(t =>
    new Date(t.transaction_date) < new Date(date)
  );
}

 Пример:
jsgetTransactionsBeforeDate(transactions, "2024-02-15");
// [{id:1, date:"2024-01-15"}, {id:2, date:"2024-02-10"}]

---

### 14. findTransactionById
 Описание: возвращает транзакцию по её уникальному идентификатору.

js/**
 * Находит транзакцию по ID.
 * @param {Object[]} transactions - массив транзакций
 * @param {number} id - уникальный идентификатор транзакции
 * @returns {Object|undefined} транзакция или undefined если не найдена
 */
function findTransactionById(transactions, id) {
  return transactions.find(t => t.transaction_id === id);
}

 Пример:
jsfindTransactionById(transactions, 2);
// {transaction_id: 2, transaction_amount: 2000, ...}

---

### 15. mapTransactionDescriptions
 Описание: возвращает массив только из описаний транзакций.

js/**
 * Возвращает массив описаний всех транзакций.
 * @param {Object[]} transactions - массив транзакций
 * @returns {string[]} массив описаний транзакций
 */
function mapTransactionDescriptions(transactions) {
  return transactions.map(t => t.transaction_description);
}

 Пример:
jsmapTransactionDescriptions(transactions);
// ["Grocery shopping", "Salary", "Electronics"]

---

##  Тестирование
jsconsole.log("Unique types:", getUniqueTransactionTypes(transactions));
// ['debit', 'credit']

console.log("Total amount:", calculateTotalAmount(transactions));
// 2450

console.log("Total by date (2024, Feb):", calculateTotalAmountByDate(transactions, 2024, 2));
// 2300

console.log("Debit transactions:", getTransactionByType(transactions, "debit"));
// [{id:1}, {id:3}]

console.log("Date range:", getTransactionsInDateRange(transactions, "2024-02-01", "2024-02-28"));
// [{id:2}, {id:3}]

console.log("By merchant:", getTransactionsByMerchant(transactions, "TechStore"));
// [{id:3}]

console.log("Average:", calculateAverageTransactionAmount(transactions));
// 816.67

console.log("Amount range:", getTransactionsByAmountRange(transactions, 100, 500));
// [{id:1}, {id:3}]

console.log("Debit total:", calculateTotalDebitAmount(transactions));
// 450

console.log("Most transactions month:", findMostTransactionsMonth(transactions));
// "2"

console.log("Most debit month:", findMostDebitTransactionMonth(transactions));
// "1"

console.log("Most type:", mostTransactionTypes(transactions));
// "debit"

console.log("Before date:", getTransactionsBeforeDate(transactions, "2024-02-15"));
// [{id:1}, {id:2}]

console.log("Find ID=2:", findTransactionById(transactions, 2));
// {transaction_id: 2, ...}

console.log("Descriptions:", mapTransactionDescriptions(transactions));
// ["Grocery shopping", "Salary", "Electronics"]

---

##  Контрольные вопросы

### 1. Какие методы массивов используются для обработки объектов?
map() — создаёт новый массив  
filter() — возвращает только элементы  
reduce() — сводит массив  
find() — ищет элемент  
forEach() — перебор  
Set() — уникальные значения  

---

### 2. Как сравнивать даты в строковом формате?
Строки YYYY-MM-DD можно сравнивать напрямую или через Date.

---

### 3. В чём разница между map(), filter() и reduce()?
map() — преобразует  
filter() — отбирает  
reduce() — накапливает  

---

## ✅ Вывод
В ходе лабораторной работы было разработано консольное приложение для анализа транзакционных данных на JavaScript.
Реализованы 15 функций с использованием методов массивов map(), filter(), reduce(), find(), forEach() и структуры данных Set().
Каждая функция задокументирована в стандарте JSDoc с указанием параметров и возвращаемых значений. Все функции протестированы на реальных данных с выводом результатов в консоль.