/**
 * Генерирует уникальный идентификатор на основе времени и случайного числа.
 * @returns {string} Уникальный ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/**
 * Форматирует дату в читаемый вид: ДД.ММ.ГГГГ ЧЧ:ММ
 * @param {Date} date - объект даты
 * @returns {string} Отформатированная строка даты
 */
export function formatDate(date) {
  const day   = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year  = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const mins  = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${mins}`;
}

/**
 * Возвращает первые 4 слова из строки описания.
 * @param {string} text - полный текст описания
 * @returns {string} Краткое описание (первые 4 слова)
 */
export function shortDescription(text) {
  return text.split(' ').slice(0, 4).join(' ');
}