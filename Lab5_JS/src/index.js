import { transactions, addTransaction, removeTransaction } from './transactions.js';
import { renderTransaction, updateTotal, showDetails } from './ui.js';
import { generateId, formatDate } from './utils.js';

// Кнопка "Добавить"
document.getElementById('addBtn').addEventListener('click', () => {
  const amountInput      = document.getElementById('amount');
  const categoryInput    = document.getElementById('category');
  const descriptionInput = document.getElementById('description');
  const errorEl          = document.getElementById('formError');

  const amount      = parseFloat(amountInput.value);
  const category    = categoryInput.value;
  const description = descriptionInput.value.trim();

  // Валидация
  if (!amount || isNaN(amount)) {
    errorEl.textContent = 'Введите корректную сумму!';
    return;
  }
  if (!category) {
    errorEl.textContent = 'Выберите категорию!';
    return;
  }
  if (!description) {
    errorEl.textContent = 'Введите описание!';
    return;
  }

  errorEl.textContent = '';

  // Создаём объект транзакции
  const transaction = {
    id: generateId(),
    date: formatDate(new Date()),
    amount,
    category,
    description,
  };

  addTransaction(transaction);
  renderTransaction(transaction);
  updateTotal();

  // Очищаем форму
  amountInput.value      = '';
  categoryInput.value    = '';
  descriptionInput.value = '';
});

// Делегирование событий на таблице (удаление + показ деталей)
document.getElementById('transactionTable').addEventListener('click', (e) => {
  // Если нажали кнопку "Удалить"
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    removeTransaction(id);
    e.target.closest('tr').remove();
    updateTotal();
    return;
  }

  // Если нажали на строку — показать детали
  const row = e.target.closest('tr');
  if (row && row.dataset.id) {
    const transaction = transactions.find(t => t.id === row.dataset.id);
    if (transaction) showDetails(transaction);
  }
});