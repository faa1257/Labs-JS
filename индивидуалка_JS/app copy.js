const list = document.getElementById("list");
const emptyMsg = document.getElementById("empty");

let events = JSON.parse(localStorage.getItem("events")) || [];
let editId = null;
let rangeFrom = "";
let rangeTo = "";

function save() {
  localStorage.setItem("events", JSON.stringify(events));
}

function render() {
  list.innerHTML = "";

  const search = document.getElementById("search").value.toLowerCase().trim();
  const checkedCats = [...document.querySelectorAll("#ms-dropdown input:checked")].map(c => c.value);

  let filtered = [...events];

  if (search) {
    filtered = filtered.filter(e => e.title.toLowerCase().includes(search));
  }

  if (checkedCats.length > 0) {
    filtered = filtered.filter(e => checkedCats.includes(e.category));
  }

  if (rangeFrom) {
    filtered = filtered.filter(e => e.date >= rangeFrom);
  }

  if (rangeTo) {
    filtered = filtered.filter(e => e.date <= rangeTo);
  }

  filtered.sort((a, b) => a.date.localeCompare(b.date));

  if (filtered.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }
  emptyMsg.style.display = "none";

  filtered.forEach(e => {
    const li = document.createElement("li");
    const dateFormatted = e.date
      ? new Date(e.date + "T00:00:00").toLocaleDateString("ru-RU")
      : "—";

    li.innerHTML = `
      <div class="event-info">
        <span class="event-title">${escapeHtml(e.title)}</span>
        <span class="event-date">${dateFormatted} | ${e.category}</span>
      </div>
      <div class="actions">
        <button onclick="startEdit(${e.id})">✏️</button>
        <button onclick="deleteEvent(${e.id})">❌</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ─── Добавление / редактирование ───────────────────────────────────────────

function submitForm() {
  const title = document.getElementById("title").value.trim();
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;

  if (!title) {
    document.getElementById("title").focus();
    return;
  }

  if (editId !== null) {
    // Редактирование: находим по id и обновляем поля
    const idx = events.findIndex(e => e.id === editId);
    if (idx !== -1) {
      events[idx].title = title;
      events[idx].date = date;
      events[idx].category = category;
    }
    cancelEdit();
  } else {
    // Новое событие
    events.push({ id: Date.now(), title, date, category });
    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("category").value = "Учёба";
  }

  save();
  render();
}

function startEdit(id) {
  const e = events.find(ev => ev.id === id);
  if (!e) return;

  editId = id;
  document.getElementById("title").value = e.title;
  document.getElementById("date").value = e.date;
  document.getElementById("category").value = e.category;
  document.getElementById("submit-btn").textContent = "Сохранить";
  document.getElementById("cancel-btn").style.display = "";
  document.getElementById("edit-hint").style.display = "block";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelEdit() {
  editId = null;
  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("category").value = "Учёба";
  document.getElementById("submit-btn").textContent = "Добавить";
  document.getElementById("cancel-btn").style.display = "none";
  document.getElementById("edit-hint").style.display = "none";
}

function deleteEvent(id) {
  events = events.filter(e => e.id !== id);
  if (editId === id) cancelEdit();
  save();
  render();
}

// ─── Multiselect ────────────────────────────────────────────────────────────

function toggleMs() {
  document.getElementById("ms-dropdown").classList.toggle("open");
}

function updateMsLabel() {
  const checked = [...document.querySelectorAll("#ms-dropdown input:checked")].map(c => c.value);
  document.getElementById("ms-label").textContent = checked.length ? checked.join(", ") : "Все категории";
}

document.addEventListener("click", e => {
  const wrap = document.getElementById("ms-wrap");
  if (!wrap.contains(e.target)) {
    document.getElementById("ms-dropdown").classList.remove("open");
  }
});

// ─── Модальное окно диапазона дат ──────────────────────────────────────────

function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function handleModalClick(e) {
  if (e.target === document.getElementById("modal")) closeModal();
}

function applyRange() {
  rangeFrom = document.getElementById("range-from").value;
  rangeTo = document.getElementById("range-to").value;

  const display = document.getElementById("range-display");
  if (rangeFrom || rangeTo) {
    const f = rangeFrom ? new Date(rangeFrom + "T00:00:00").toLocaleDateString("ru-RU") : "...";
    const t = rangeTo ? new Date(rangeTo + "T00:00:00").toLocaleDateString("ru-RU") : "...";
    display.style.display = "block";
    display.textContent = `Диапазон: ${f} — ${t}`;
  } else {
    display.style.display = "none";
  }

  closeModal();
  render();
}

// ─── Сброс всех фильтров ────────────────────────────────────────────────────

function clearFilters() {
  document.getElementById("search").value = "";
  document.getElementById("range-from").value = "";
  document.getElementById("range-to").value = "";
  rangeFrom = "";
  rangeTo = "";
  document.querySelectorAll("#ms-dropdown input").forEach(c => c.checked = false);
  document.getElementById("ms-label").textContent = "Все категории";
  document.getElementById("range-display").style.display = "none";
  render();
}

// ─── Старт ──────────────────────────────────────────────────────────────────
render();