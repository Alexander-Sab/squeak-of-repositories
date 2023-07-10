const inputEl = document.querySelector(".conteiner-search");
inputEl.setAttribute("name", "name");
const inputContainer = document.querySelector(".conteiner-list");
const conteinerRepositories = document.querySelector(".conteiner-repositories");

conteinerRepositories.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.classList.contains("btn-close")) return;
  target.parentElement.remove();
});

inputContainer.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.classList.contains("dropdown-content")) return;

  addBlock(target);
  inputEl.value = "";
  deleteBlock();
});

function deleteBlock() {
  inputContainer.innerHTML = "";
}

function showBlock(repositories) {
  deleteBlock();
  for (
    let repositoryIndex = 0;
    repositoryIndex < Math.min(repositories.items.length, 5);
    repositoryIndex++
  ) {
    const name = repositories.items[repositoryIndex].name;
    const owner = repositories.items[repositoryIndex].owner.login;
    const stars = repositories.items[repositoryIndex].stargazers_count;

    const dropdownContent = `<div class="dropdown-content" data-owner="${owner}" data-stars="${stars}">${name}</div>`;

    inputContainer.insertAdjacentHTML("beforeend", dropdownContent);
  }
}

function addBlock(target) {
  const name = target.textContent;
  const owner = target.dataset.owner;
  const stars = target.dataset.stars;

  const chosenBlock = `<div class="chosen">Name: ${name}<br>Owner: ${owner}<br>Stars: ${stars}<button class="btn-close"></button></div>`;
  conteinerRepositories.insertAdjacentHTML("beforeend", chosenBlock);
}

async function getRepositories() {
  const urlSearchRepositories = new URL(
    "https://api.github.com/search/repositories"
  );
  let repositoriesPart = inputEl.value;
  if (repositoriesPart == "") {
    deleteBlock();
    return;
  }

  urlSearchRepositories.searchParams.append("q", repositoriesPart);
  try {
    let answers = await fetch(urlSearchRepositories);
    if (answers.ok) {
      let repositories = await answers.json();
      showBlock(repositories);
    } else return null;
  } catch (error) {
    console.error("Fetch Error: ", error);
    return null;
  }
}

function debounceTime(callbackFunction, delay) {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callbackFunction(...args);
    }, delay);
  };
}

const debouncedGetRepositories = debounceTime(getRepositories, 500);
inputEl.addEventListener("input", () => debouncedGetRepositories());
