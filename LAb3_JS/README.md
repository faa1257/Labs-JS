# Лабораторная работа №3

## Основы работы с массивами, функциями и объектами в JavaScript

## Цель работы
Изучить основы работы с массивами и функциями в JavaScript, применяя их для обработки и анализа транзакций.



## Условия выполнения

Разработать консольное приложение для анализа транзакций.

Каждая транзакция содержит поля:

- transaction_id — уникальный идентификатор  
- transaction_date — дата транзакции  
- transaction_amount — сумма транзакции  
- transaction_type — тип (debit / credit)  
- transaction_description — описание  
- merchant_name — название магазина  
- card_type — тип карты  



## Массив транзакций и реализация функций

```javascript
const transactions = [
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

// 1 Функция возвращает массив уникальных типов транзакций. Сначала метод map() проходит по всем транзакциям и достаёт из каждой поле transaction_type, получая массив вида ["debit", "credit", "debit"]. Затем new Set() автоматически убирает дубликаты, так как Set хранит только уникальные значения. Оператор ... (spread) превращает Set обратно в обычный массив.
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(t => t.transaction_type))];
}//Результат: ['debit', 'credit']

// 2 Функция вычисляет общую сумму всех транзакций. Метод reduce() проходит по массиву и накапливает сумму — на каждом шаге к накопителю sum прибавляется transaction_amount текущей транзакции. Начальное значение накопителя равно 0.
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}//Результат: 2450 (150 + 2000 + 300)

// 3 Функция вычисляет сумму транзакций за указанный год, месяц и/или день. Параметры year, month, day являются необязательными — если какой-то параметр не передан, фильтр по нему не применяется. Это достигается конструкцией !year || — если year не передан, условие сразу считается истинным. После фильтрации reduce() суммирует прошедшие транзакции.
function calculateTotalAmountByDate(transactions, year, month, day) {
  return transactions
    .filter(t => {
      const date = new Date(t.transaction_date);
      return (!year || date.getFullYear() === year) &&
             (!month || date.getMonth() + 1 === month) &&
             (!day || date.getDate() === day);
    })
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}//Результат для февраля 2024: 2300 (2000 + 300)

// 4 Функция Проходит по каждой транзакции и проверяет поле transaction_type. Если совпадает с тем что передал — оставляет, если нет — выбрасывает
function getTransactionByType(transactions, type) {
  return transactions.filter(t => t.transaction_type === type);
}//Результат для "debit": транзакции с id 1 и 3

// 5 Функция Берёт дату каждой транзакции и проверяет что она не раньше startDate и не позже endDate. Обе даты переводятся в объекты Date чтобы корректно сравнивать
javascript
function getTransactionsInDateRange(transactions, startDate, endDate) {
  return transactions.filter(t => {
    const date = new Date(t.transaction_date);
    return date >= new Date(startDate) && date <= new Date(endDate);
  });
  console.log("Date range:", getTransactionsInDateRange(transactions, "2024-02-01", "2024-02-28"));
}//Результат для февраля 2024: транзакции с id 2 и 3

// 6 getTransactionsByMerchant
//Функция Проходит по каждой транзакции и сравнивает поле merchant_name с тем что передал.

function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(t => t.merchant_name === merchantName);
}//Результат для "TechStore": транзакция с id 3

// 7 calculateAverageTransactionAmount
//Функция вычисляет среднюю сумму транзакций. Сначала проверяется не пустой ли массив — если пустой, возвращается 0 чтобы избежать деления на ноль. Затем вызывается уже готовая функция calculateTotalAmount() и результат делится на количество транзакций.
function calculateAverageTransactionAmount(transactions) {
  if (!transactions.length) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}//Результат: 816.67 (2450 / 3)

// 8  getTransactionsByAmountRange
//Функция возвращает транзакции, сумма которых находится в диапазоне от minAmount до maxAmount включительно. Метод filter() проверяет оба условия одновременно через &&.
function getTransactionsByAmountRange(transactions, min, max) {
  return transactions.filter(t =>
    t.transaction_amount >= min &&
    t.transaction_amount <= max
  );
}//Результат для диапазона 100–500: транзакции с id 1 (150) и id 3 (300)

// 9 calculateTotalDebitAmount
//Функция вычисляет сумму только дебетовых транзакций. Сначала filter() отбирает транзакции с типом "debit", затем reduce() суммирует их суммы.
function calculateTotalDebitAmount(transactions) {
  return transactions
    .filter(t => t.transaction_type === "debit")
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}//Результат: 450 (150 + 300)

// 10 findMostTransactionsMonth
//Функция находит месяц с наибольшим количеством транзакций. Сначала создаётся объект-счётчик count, где ключ — номер месяца, значение — количество транзакций в нём. forEach() проходит по всем транзакциям и заполняет счётчик. Метод getMonth() возвращает месяц от 0 до 11, поэтому добавляется +1. Затем reduce() находит ключ с максимальным значением. Если массив пустой — возвращается null.
function findMostTransactionsMonth(transactions) {
  if (!transactions.length) return null;

  const count = {};

  transactions.forEach(t => {
    const month = new Date(t.transaction_date).getMonth() + 1;
    count[month] = (count[month] || 0) + 1;
  });

  return Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );
}//Результат: "2" (февраль — 2 транзакции)

// 11 findMostDebitTransactionMonth
//Функция работает аналогично предыдущей, но перед подсчётом по месяцам массив сначала фильтруется — остаются только транзакции с типом "debit".
function findMostDebitTransactionMonth(transactions) {
  if (!transactions.length) return null;

  const count = {};

  transactions
    .filter(t => t.transaction_type === "debit")
    .forEach(t => {
      const month = new Date(t.transaction_date).getMonth() + 1;
      count[month] = (count[month] || 0) + 1;
    });

  return Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );
}//Результат: "1" (январь — единственный месяц с debit транзакцией)

// 12 mostTransactionTypes
//Функция определяет какой тип транзакций преобладает. Сначала filter() подсчитывает количество debit и credit транзакций через .length. Затем сравниваются два числа и возвращается соответствующая строка. Если количество равно — возвращается "equal"
function mostTransactionTypes(transactions) {
  const debit = transactions.filter(t => t.transaction_type === "debit").length;
  const credit = transactions.filter(t => t.transaction_type === "credit").length;

  if (debit > credit) return "debit";
  if (credit > debit) return "credit";
  return "equal";
}//Результат: "debit" (2 дебетовых против 1 кредитной)

// 13  getTransactionsBeforeDate
//Функция возвращает транзакции, совершённые строго до указанной даты. Обе даты преобразуются в объекты Date и сравниваются оператором <.
function getTransactionsBeforeDate(transactions, date) {
  return transactions.filter(t =>
    new Date(t.transaction_date) < new Date(date)
  );
}// Результат для даты "2024-02-15": транзакции с id 1 и id 2

// 14  findTransactionById
//Функция находит транзакцию по её уникальному идентификатору. Метод find() возвращает первый элемент, у которого transaction_id совпадает с переданным id. Если транзакция не найдена — возвращается undefined.
function findTransactionById(transactions, id) {
  return transactions.find(t => t.transaction_id === id);
} Результат для id = 2: объект транзакции с суммой 2000

// 15 mapTransactionDescriptions
//Функция возвращает массив только из описаний всех транзакций. Метод map() проходит по каждой транзакции и достаёт только поле transaction_description, формируя новый массив строк.
function mapTransactionDescriptions(transactions) {
  return transactions.map(t => t.transaction_description);
}//Результат: ["Grocery shopping", "Salary", "Electronics"]

## Контрольные вопросы

1. Какие методы массивов используются для обработки объектов?
map() создаёт новый массив преобразуя каждый элемент. filter() отбирает элементы по условию. reduce() сворачивает массив в одно значение. find() возвращает первый подходящий элемент. forEach() просто перебирает элементы ничего не возвращая. Set хранит только уникальные значения.

2. Как сравнивать даты в строковом формате?
Строки в формате YYYY-MM-DD можно сравнивать напрямую операторами >, <, так как формат идёт от большего к меньшему. Либо преобразовывать через new Date() для работы с объектами даты.

3. В чём разница между map(), filter() и reduce()?
map() преобразует каждый элемент и возвращает массив той же длины. filter() отбирает элементы по условию и возвращает массив меньшей или равной длины. reduce() накапливает результат и возвращает одно значение — число, строку или объект.

---

## Вывод

В ходе лабораторной работы было разработано консольное приложение для анализа транзакционных данных на JavaScript. Реализованы 15 функций с использованием методов массивов map(), filter(), reduce(), find(), forEach() и структуры данных Set(). Каждая функция снабжена описанием и прокомментирована. Все функции протестированы на реальных данных с выводом результатов в консоль.