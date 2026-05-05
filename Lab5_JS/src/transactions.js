/**
 * Загружает транзакции из localStorage.
 * @returns {Array} Массив транзакций
 */
function loadTransactions() {
  const data = localStorage.getItem('transactions');
  return data ? JSON.parse(data) : [];
}

/**
 * Сохраняет транзакции в localStorage.
 */
function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

/**
 * Массив всех транзакций, загружается из localStorage.
 * @type {Array<Object>}
 */
export let transactions = loadTransactions();

/**
 * Добавляет новую транзакцию в массив и сохраняет в localStorage.
 * @param {Object} transaction - объект транзакции
 */
export function addTransaction(transaction) {
  transactions.push(transaction);
  saveTransactions();
}

/**
 * Удаляет транзакцию из массива по её ID и сохраняет в localStorage.
 * @param {string} id - идентификатор транзакции
 */
export function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions();
}

/**
 * Считает сумму всех транзакций.
 * @returns {number} Итоговая сумма
 */
export function calculateTotal() {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}