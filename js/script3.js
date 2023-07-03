class View {
  constructor() {
    this.app = document.getElementById("app");

    this.title = this.createElement("h1", "title");
    this.title.textContent = "Github Search Users";

    this.searchLine = this.createElement("div", "search-line");
    // инпут
    this.searchInput = this.createElement("input", "search-input");
    this.searchCounter = this.createElement("span", "counter");
    this.searchLine.append(this.searchInput);
    this.searchLine.append(this.searchCounter);
    // блоки
    this.usersWrapper = this.createElement("div", "users-wrapper");
    this.usersList = this.createElement("ul", "users");
    this.usersWrapper.append(this.usersList);

    this.main = this.createElement("div", "main");
    this.main.append(this.usersWrapper);

    this.app.append(this.title);
    this.app.append(this.searchLine);
    this.app.append(this.main);
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    }
    return element;
  }
  // отображение 1
  createUser(userData) {
    const userElement = this.createElement("li", "user-prev");
    userElement.innerHTML = `
  <span class="user-prev-name">${userData.login}</span>;`;
    this.usersList.append(userElement);
  }
}

// основная логика и поиск
class Search {
  constructor(View) {
    this.view = View;

    this.view.searchInput.addEventListener(
      "keyup",
      this.searchUsers.bind(this)
    );
  }

  // поиск

  async searchUsers() {
    return await fetch(
      `https://api.github.com/search/users?q=${this.view.searchInput.value}`
    ).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          res.items.forEach((user) => this.view.createUser(user));
        });
      } else {
      }
    });
  }
  // отображение 2
}

new Search(new View());
