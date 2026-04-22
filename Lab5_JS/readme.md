# Лабораторная работа №5 — Работа с DOM и событиями в JavaScript

## Цель работы
Ознакомиться с основами взаимодействия JavaScript с DOM-деревом на примере веб-приложения для ведения личного финансового учёта.

---
```
lab5/
├── index.html
├── style.css
└── src/
    ├── index.js
    ├── transactions.js
    ├── ui.js
    └── utils.js
```

---

## Описание работы

Данное веб-приложение представляет собой инструмент для ведения личного
финансового учёта. Пользователь может добавлять транзакции, просматривать
их в таблице, удалять и следить за итоговым балансом.

---

### Форма добавления транзакции

Форма содержит следующие поля:
- **Сумма** — числовое поле. Положительное число означает доход, отрицательное — расход
- **Категория** — выпадающий список (`<select>`) с категориями: Зарплата, Еда, Сигареты, Игры и др.
- **Описание** — текстовое поле для описания транзакции

Перед добавлением транзакции форма проходит **валидацию**:
- Если сумма не введена или введена некорректно — выводится ошибка
- Если категория не выбрана — выводится ошибка
- Если описание пустое — выводится ошибка


```js
const amount = parseFloat(amountInput.value);
const category = categoryInput.value;
const description = descriptionInput.value.trim();

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
```

Только после успешной проверки всех полей создаётся объект транзакции:

```js
const transaction = {
  id: generateId(),
  date: formatDate(new Date()),
  amount,
  category,
  description,
};
```

---

### Таблица транзакций

Таблица содержит следующие столбцы:
- **Дата и время** — автоматически проставляется в момент добавления в формате `ДД.ММ.ГГГГ ЧЧ:ММ`
- **Категория** — категория выбранная пользователем
- **Описание** — отображаются только первые 4 слова (краткий вид)
- **Сумма** — сумма транзакции в рублях
- **Действие** — кнопка "Удалить"

Краткое описание реализовано через функцию `shortDescription()`:

```js
/**
 * Возвращает первые 4 слова из строки описания.
 * @param {string} text - полный текст описания
 * @returns {string} Краткое описание
 */
export function shortDescription(text) {
  return text.split(' ').slice(0, 4).join(' ');
}
```

Строки таблицы окрашиваются в зависимости от типа транзакции:
- 🟢 **Зелёный** — если сумма положительная (доход)
- 🔴 **Красный** — если сумма отрицательная (расход)

```js
row.classList.add(transaction.amount >= 0 ? 'positive' : 'negative');
```

---


### Удаление транзакций

При нажатии на кнопку **"Удалить"** в строке таблицы:
1. Транзакция удаляется из массива `transactions`
2. Строка удаляется из таблицы
3. Пересчитывается итоговая сумма

Для обработки удаления используется **делегирование событий**:

```js
document.getElementById('transactionTable').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    removeTransaction(id);
    e.target.closest('tr').remove();
    updateTotal();
  }
});
```

Функция удаления из массива:

```js
/**
 * Удаляет транзакцию из массива по её ID.
 * @param {string} id - идентификатор транзакции
 */
export function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
}
```

---

### Итоговый баланс

Итоговая сумма пересчитывается автоматически через `calculateTotal()`:

```js
/**
 * Считает сумму всех транзакций.
 * @returns {number} Итоговая сумма
 */
export function calculateTotal() {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}
```

Результат отображается на странице:

```js
export function updateTotal() {
  document.getElementById('total').textContent = calculateTotal();
}
```

---

### Полное описание транзакции

При клике на строку таблицы внизу страницы появляется полная информация:

```js
/**
 * Показывает полное описание транзакции под таблицей.
 * @param {Object} transaction - объект транзакции
 */
export function showDetails(transaction) {
  const details = document.getElementById('details');
  details.innerHTML = `
    Полное описание:
    📅 Дата: ${transaction.date}
    🏷 Категория: ${transaction.category}
    💬 Описание: ${transaction.description}
    💰 Сумма: ${transaction.amount} руб.
  `;
}
```

---

### Генерация ID и форматирование даты

Каждая транзакция получает уникальный ID:

```js
/**
 * Генерирует уникальный идентификатор.
 * @returns {string} Уникальный ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
```

Дата форматируется в читаемый вид:

```js
/**
 * Форматирует дату в вид ДД.ММ.ГГГГ ЧЧ:ММ
 * @param {Date} date - объект даты
 * @returns {string} Отформатированная строка
 */
export function formatDate(date) {
  const day   = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year  = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const mins  = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${mins}`;
}
```

---

## Контрольные вопросы

### 1. Как получить доступ к элементу на веб-странице с помощью JavaScript?

Для доступа к элементам DOM используются методы объекта `document`:

```js
// По ID
document.getElementById('total')

// По классу
document.querySelector('.delete-btn')

// Все элементы по классу
document.querySelectorAll('tr')
```

В данной работе используется `getElementById` для получения элементов формы и таблицы.

---

### 2. Что такое делегирование событий?

**Делегирование событий** — это техника, при которой один обработчик события вешается на родительский элемент, а не на каждый дочерний по отдельности. Это работает благодаря **всплытию событий** (event bubbling) — событие от дочернего элемента поднимается вверх по DOM-дереву.

**Пример из проекта:**

```js
document.getElementById('transactionTable').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    // обработка удаления
  }
});
```

Вместо того чтобы вешать обработчик на каждую кнопку "Удалить", мы вешаем один обработчик на всю таблицу и проверяем `e.target` — на какой именно элемент кликнули.

**Преимущества:**
- Меньше обработчиков → лучше производительность
- Работает для динамически добавленных элементов

---

### 3. Как изменить содержимое DOM-элемента?

После выбора элемента можно изменить его содержимое через:

```js
// Изменить текст
element.textContent = 'Новый текст'

// Изменить HTML внутри элемента
element.innerHTML = '<strong>Жирный текст</strong>'
```

**Пример из проекта:**

```js
document.getElementById('total').textContent = calculateTotal();
```

---

### 4. Как добавить новый элемент в DOM-дерево?

Есть два основных способа:

**Способ 1 — createElement:**
```js
const row = document.createElement('tr')
row.innerHTML = `<td>Данные</td>`
document.getElementById('tableBody').appendChild(row)
```

**Способ 2 — innerHTML:**
```js
tbody.innerHTML += `<tr><td>Данные</td></tr>`
```

**В проекте используется первый способ** — создаём элемент `<tr>`, заполняем через `innerHTML` и добавляем в таблицу через `appendChild`.

---

## Вывод

В ходе лабораторной работы было разработано веб-приложение для учёта личных финансов. Были изучены методы работы с DOM, делегирование событий, модульная структура JS-кода и документирование по стандарту JSDoc