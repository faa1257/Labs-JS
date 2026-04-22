/**
 * Массив всех транзакций.
 * @type {Array<Object>}
 */
export let transactions = [];

/**
 * Добавляет новую транзакцию в массив.
 * @param {Object} transaction - объект транзакции
 */
export function addTransaction(transaction) {
  transactions.push(transaction);
}

/**
 * Удаляет транзакцию из массива по её ID.
 * @param {string} id - идентификатор транзакции
 */
export function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
}

/**
 * Считает сумму всех транзакций.
 * @returns {number} Итоговая сумма
 */
export function calculateTotal() {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}