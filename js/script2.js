const mainEl = document.querySelector(".main");
const wrapper = document.createElement("div");

const formEl = document.querySelector(".search");

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputsValue = Object.fromEntries(new FormData(e.target));

  const response = await fetch(
    `https://api.github.com/search/issues?q=${inputsValue.name}`
  );

  if (response.ok) {
    const data = await response.json();
    const firstIssue = data.items[0];

    // Request repository data
    if (firstIssue) {
      const repoResponse = await fetch(firstIssue.repository_url);
      const repoData = await repoResponse.json();

      // Add stargazers_count property to the firstIssue object
      firstIssue.stargazers_count = repoData.stargazers_count;
      // Create and append profile element to wrapper
      wrapper.appendChild(createProfileEl(firstIssue));
    }
    mainEl.appendChild(wrapper);
  } else {
    alert("не удалось найти");
  }
});

const inputEl = document.querySelector(".search-input");
inputEl.setAttribute("name", "name");

formEl.appendChild(inputEl);
mainEl.appendChild(formEl);

function createProfileEl(profileData) {
  const element = document.createElement("div");
  element.classList.add("profile");
  element.innerHTML = `
  <span class="search-text">Name: ${profileData.title}</span>
  <span class="search-text">Owner: ${profileData.user.login}</span>
  <span class="search-text">Stars: ${profileData.stargazers_count}</span>
  `;
  element.appendChild(createDeleteBtnEL());
  return element;
}

// кнопка для удаления элемента

function createDeleteBtnEL() {
  const element = document.createElement("button");
  element.classList.add("delete-btn");
  element.addEventListener("click", () => {
    wrapper.innerHTML = "";
  });
  return element;
}
