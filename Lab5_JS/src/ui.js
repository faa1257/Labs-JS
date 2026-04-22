import { removeTransaction, calculateTotal } from './transactions.js';
import { shortDescription } from './utils.js';

/**
 * Добавляет строку транзакции в таблицу.
 * @param {Object} transaction - объект транзакции
 */
export function renderTransaction(transaction) {
  const tbody = document.getElementById('tableBody');
  const row = document.createElement('tr');

  // Зелёная строка если доход, красная если расход
  row.classList.add(transaction.amount >= 0 ? 'positive' : 'negative');
  row.dataset.id = transaction.id;

  row.innerHTML = `
    <td>${transaction.date}</td>
    <td>${transaction.category}</td>
    <td>${shortDescription(transaction.description)}</td>
    <td>${transaction.amount} руб.</td>
    <td><button class="delete-btn" data-id="${transaction.id}">Удалить</button></td>
  `;

  tbody.appendChild(row);
}

/**
 * Обновляет отображение итоговой суммы на странице.
 */
export function updateTotal() {
  document.getElementById('total').textContent = calculateTotal();
}

/**
 * Показывает полное описание транзакции под таблицей.
 * @param {Object} transaction - объект транзакции
 */
export function showDetails(transaction) {
  const details = document.getElementById('details');
  details.innerHTML = `
    <strong>Полное описание:</strong><br/>
    📅 Дата: ${transaction.date}<br/>
    🏷 Категория: ${transaction.category}<br/>
    💬 Описание: ${transaction.description}<br/>
    💰 Сумма: ${transaction.amount} руб.
  `;
}