// const mainEl = document.querySelector(".main");
// const wrapper = document.createElement("div");
// // Написать форму
// // Нписать инпут
// // Добавить инпут
// // Добавить форму к main

// const formEl = document.createElement("form");
// formEl.classList.add("search"); // search
// formEl.addEventListener("submit", async (e) => {
//   e.preventDefault(); // сбросить стандарт поведение кнопоки
//   console.log(Object.fromEntries(new FormData(e.target)));
//   const inputsValue = Object.fromEntries(new FormData(e.target)); // значение из inputs

//   // сетевой запрос
//   const response = await fetch(
//     `https://api.github.com/search/issues?q=${inputsValue.name}`
//   );

//   if (response.ok) {
//     const data = await response.json(); // получить данные
//     console.log(data);
//     wrapper.appendChild(createProfileEl(data));
//     mainEl.appendChild(wrapper);
//     // Использовать вункцию для создания карточки
//     // Добавить результат выше исполненой функции в mainEl
//   } else {
//     alert("не удалось найти");
//   }
// });

// // инпут
// const inputEl = document.createElement("input");
// inputEl.classList.add("search-input");
// inputEl.setAttribute("name", "name");

// // кнопка
// // const searchButtonEl = document.createElement("button"); //
// // searchButtonEl.classList.add("search-button");
// // searchButtonEl.setAttribute("type", "submit");
// // searchButtonEl.innerHTML = "Поиск";

// // Добавить
// formEl.appendChild(inputEl);
// // formEl.appendChild(searchButtonEl); //
// mainEl.appendChild(formEl);

// function createProfileEl(profileData) {
//   const element = document.createElement("div");
//   element.classList.add("profile");
//   element.innerHTML = `
//   <p class="search-text"><span>Name: </span>${profileData.name}</p>
    
//   `;
//   element.appendChild(createDeleteBtnEL());
//   return element;
// }

// function createDeleteBtnEL() {
//   const element = document.createElement("button");
//   element.classList.add("delete-btn");
  
//   element.addEventListener("click", () => {
//     wrapper.innerHTML = "";
//   });
//   return element;
// }
