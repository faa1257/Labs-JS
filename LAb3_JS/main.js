// Массив транзакций
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


// Возвращает массив уникальных типов транзакций
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(t => t.transaction_type))];
}


// Вычисляет общую сумму всех транзакций
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}


// Вычисляет общую сумму транзакций за указанный год, месяц и/или день
// Параметры year, month, day - необязательны
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


// Возвращает транзакции указанного типа (debit или credit)
function getTransactionByType(transactions, type) {
  return transactions.filter(t => t.transaction_type === type);
}


// Возвращает транзакции в диапазоне дат (startDate и endDate включительно)
function getTransactionsInDateRange(transactions, startDate, endDate) {
  return transactions.filter(t => {
    const date = new Date(t.transaction_date);
    return date >= new Date(startDate) &&
           date <= new Date(endDate);
  });
}


// Возвращает транзакции по названию магазина
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(t =>
    t.merchant_name === merchantName
  );
}


// Вычисляет среднюю сумму транзакций, возвращает 0 если массив пустой
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}


// Возвращает транзакции с суммой в диапазоне от minAmount до maxAmount
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(t =>
    t.transaction_amount >= minAmount &&
    t.transaction_amount <= maxAmount
  );
}


// Вычисляет общую сумму дебетовых транзакций
function calculateTotalDebitAmount(transactions) {
  return transactions
    .filter(t => t.transaction_type === "debit")
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}


// Возвращает номер месяца с наибольшим количеством транзакций
// Возвращает null если массив пустой
function findMostTransactionsMonth(transactions) {
  if (transactions.length === 0) return null;

  const count = {};
  transactions.forEach(t => {
    const month = new Date(t.transaction_date).getMonth() + 1;
    count[month] = (count[month] || 0) + 1;
  });

  return Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );
}


// Возвращает номер месяца с наибольшим количеством debit транзакций
// Возвращает null если массив пустой
function findMostDebitTransactionMonth(transactions) {
  if (transactions.length === 0) return null;

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
}


// Возвращает "debit", "credit" или "equal" в зависимости от преобладающего типа
function mostTransactionTypes(transactions) {
  const debit = transactions.filter(t => t.transaction_type === "debit").length;
  const credit = transactions.filter(t => t.transaction_type === "credit").length;

  if (debit > credit) return "debit";
  if (credit > debit) return "credit";
  return "equal";
}


// Возвращает транзакции совершённые до указанной даты
function getTransactionsBeforeDate(transactions, date) {
  return transactions.filter(t =>
    new Date(t.transaction_date) < new Date(date)
  );
}


// Находит и возвращает транзакцию по её ID, или undefined если не найдена
function findTransactionById(transactions, id) {
  return transactions.find(t => t.transaction_id === id);
}


// Возвращает массив только из описаний транзакций
function mapTransactionDescriptions(transactions) {
  return transactions.map(t => t.transaction_description);
}


// Тестирование
console.log("Unique types:", getUniqueTransactionTypes(transactions));
console.log("Total amount:", calculateTotalAmount(transactions));
console.log("Average:", calculateAverageTransactionAmount(transactions));
console.log("Debit total:", calculateTotalDebitAmount(transactions));
console.log("Most transaction month:", findMostTransactionsMonth(transactions));
console.log("Most debit month:", findMostDebitTransactionMonth(transactions));
console.log("Most type:", mostTransactionTypes(transactions));
console.log("Find ID=2:", findTransactionById(transactions, 2));