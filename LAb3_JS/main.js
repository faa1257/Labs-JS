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
 
 
/**
 * Возвращает массив уникальных типов транзакций.
 * @param {Object[]} transactions - массив транзакций
 * @returns {string[]} массив уникальных типов (debit, credit)
 */
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(t => t.transaction_type))];
}
 
 
/**
 * Вычисляет общую сумму всех транзакций.
 * @param {Object[]} transactions - массив транзакций
 * @returns {number} общая сумма транзакций
 */
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}
 
 
/**
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
 
 
/**
 * Возвращает транзакции указанного типа.
 * @param {Object[]} transactions - массив транзакций
 * @param {string} type - тип транзакции (debit или credit)
 * @returns {Object[]} отфильтрованный массив транзакций
 */
function getTransactionByType(transactions, type) {
  return transactions.filter(t => t.transaction_type === type);
}
 
 
/**
 * Возвращает транзакции в диапазоне дат.
 * @param {Object[]} transactions - массив транзакций
 * @param {string} startDate - начальная дата (YYYY-MM-DD)
 * @param {string} endDate - конечная дата (YYYY-MM-DD)
 * @returns {Object[]} транзакции в диапазоне дат
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  return transactions.filter(t => {
    const date = new Date(t.transaction_date);
    return date >= new Date(startDate) &&
           date <= new Date(endDate);
  });
}
 
 
/**
 * Возвращает транзакции по названию магазина.
 * @param {Object[]} transactions - массив транзакций
 * @param {string} merchantName - название магазина
 * @returns {Object[]} транзакции указанного магазина
 */
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(t =>
    t.merchant_name === merchantName
  );
}
 
 
/**
 * Вычисляет среднюю сумму транзакций.
 * @param {Object[]} transactions - массив транзакций
 * @returns {number} средняя сумма или 0 если массив пустой
 */
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}
 
 
/**
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
 
 
/**
 * Вычисляет общую сумму дебетовых транзакций.
 * @param {Object[]} transactions - массив транзакций
 * @returns {number} сумма всех debit транзакций
 */
function calculateTotalDebitAmount(transactions) {
  return transactions
    .filter(t => t.transaction_type === "debit")
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}
 
 
/**
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
 
  return Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );
}
 
 
/**
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
 
  return Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );
}
 
 
/**
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
 
 
/**
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
 
 
/**
 * Находит транзакцию по ID.
 * @param {Object[]} transactions - массив транзакций
 * @param {number} id - уникальный идентификатор транзакции
 * @returns {Object|undefined} транзакция или undefined если не найдена
 */
function findTransactionById(transactions, id) {
  return transactions.find(t => t.transaction_id === id);
}
 
 
/**
 * Возвращает массив описаний всех транзакций.
 * @param {Object[]} transactions - массив транзакций
 * @returns {string[]} массив описаний транзакций
 */
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