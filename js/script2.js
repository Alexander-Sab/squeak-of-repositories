const mainEl = document.querySelector(".main");

const selectEl = document.createElement("select");
selectEl.classList.add("select-form");
// selectEl.disabled = false; // ��сли включено, то не добавляем класс disabled
mainEl.appendChild(selectEl);
const wrapper = document.createElement("div");
const formEl = document.querySelector(".search");
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputsValue = Object.fromEntries(new FormData(e.target));
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${inputsValue.name}&sort=stars&order=desc`
  );
  if (response.ok) {
    const data = await response.json();
    const firstFiveItems = data.items.slice(0, 3); // выбираем первые пять элементов после сортировки
    // Запросить данные репозитория для каждого элемента
    for (const item of firstFiveItems) {
      const repoResponse = await fetch(item.url);
      const repoData = await repoResponse.json();
      // Добавить свойство stargazers_count к объекту элемента
      item.stargazers_count = repoData.stargazers_count;
      // Добавляем элемент профиля в оболочку
      wrapper.appendChild(createProfileEl(item));
    }

    selectEl.innerHTML = ''; // Очищаем select перед заполнением
    firstFiveItems.forEach(item => {
      const optionEl = document.createElement('option');
      optionEl.value = item.name; // Значение - это имя репозитория
      optionEl.text = item.name; // Текст - это тоже имя репозитория
      selectEl.appendChild(optionEl);
    });




    mainEl.appendChild(wrapper);
  } else {
    alert("Не удалось найти.");
  }
});
// selectEl.disabled = true; // ��сли включено, то не добавляем класс disabled
const inputEl = document.querySelector(".search-input");
inputEl.setAttribute("name", "name");
formEl.appendChild(inputEl);
mainEl.appendChild(formEl);
mainEl.insertBefore(selectEl, formEl.nextSibling); // Перемещение selectEl ниже formEl
function createProfileEl(profileData) {
  console.log(profileData);
  const element = document.createElement("div");
  element.classList.add("profile");
  element.innerHTML = `
  <span class="search-text">Name: ${profileData.name}</span> 
  <span class="search-text">Owner: ${profileData.owner.login}</span> 
  <span class="search-text">Stars: ${profileData.stargazers_count}</span>
  `;
  element.appendChild(createDeleteBtnEL(element));
  element.addEventListener("click", () => {
    const copy = element.cloneNode(true);
    copy.appendChild(createDeleteBtnEL(copy));
    addedRepoList.appendChild(copy);
  });
  return element;
}

// Кнопка для удаления элемента
function createDeleteBtnEL(el) {
  const element = document.createElement("button");
  element.classList.add("delete-btn");
  element.addEventListener("click", (e) => {
    e.stopPropagation();
    el.remove(); // удаление выбранного элемента
  });
  return element;
}