const form = document.getElementById("event-form");
const list = document.getElementById("list");

const filterDate = document.getElementById("filter-date");
const filterCategory = document.getElementById("filter-category");

let events = JSON.parse(localStorage.getItem("events")) || [];
let editId = null;

// сохранить
function save() {
  localStorage.setItem("events", JSON.stringify(events));
}

// отрисовка
function render() {
  list.innerHTML = "";

  let filtered = [...events];

  // фильтр по дате
  if (filterDate.value) {
    filtered = filtered.filter(e => e.date === filterDate.value);
  }

  // фильтр по категории
  if (filterCategory.value !== "all") {
    filtered = filtered.filter(e => e.category === filterCategory.value);
  }

  filtered.forEach(e => {
    const li = document.createElement("li");

    li.innerHTML = `
  <div class="event-info">
    <span class="event-title">${e.title}</span>
    <span class="event-date">${e.date} | ${e.category}</span>
  </div>

  <div class="actions">
    <button onclick="editEvent(${e.id})">✏️</button>
    <button onclick="deleteEvent(${e.id})">❌</button>
  </div>
`;

    list.appendChild(li);
  });
}

// добавление / редактирование
form.addEventListener("submit", e => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;

  if (editId) {
    const event = events.find(e => e.id === editId);
    event.title = title;
    event.date = date;
    event.category = category;
    editId = null;
  } else {
    events.push({
      id: Date.now(),
      title,
      date,
      category
    });
  }

  form.reset();
  save();
  render();
});

// удалить
function deleteEvent(id) {
  events = events.filter(e => e.id !== id);
  save();
  render();
}

// редактировать
function editEvent(id) {
  const event = events.find(e => e.id === id);

  document.getElementById("title").value = event.title;
  document.getElementById("date").value = event.date;
  document.getElementById("category").value = event.category;

  editId = id;
}

// фильтры
filterDate.addEventListener("input", render);
filterCategory.addEventListener("change", render);

// первый запуск
render();