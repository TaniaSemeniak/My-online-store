const items = [
  {
    title: "Золотой шар",
    description: "Большой елочный шар из золотого стекла.",
    tags: ["toys"],
    price: 22,
    img: "./img/1.jpeg",
    rating: 4.4,
  },
  {
    title: "Блестящая снежинка",
    description: "Елочная игрушка в виде снежинки с блестками",
    tags: ["toys"],
    price: 28,
    img: "./img/2.jpeg",
    rating: 3.1,
  },
  {
    title: "Шар-алмаз",
    description: "Елочная игрушка в форме алмаза из стекла",
    tags: ["toys"],
    price: 30,
    img: "./img/3.jpeg",
    rating: 5.0,
  },
  {
    title: "Шар-капля",
    description: "Елочная игрушка в виде капли из стекла с гравировкой",
    tags: ["toys"],
    price: 28,
    img: "./img/4.jpeg",
    rating: 4.7,
  },
  {
    title: "Рождественские звезды",
    description: "В комплекте 3 игрушки",
    tags: ["toys"],
    price: 60,
    img: "./img/5.jpeg",
    rating: 4.9,
  },
  {
    title: "Снежинка",
    description: "Елочная игрушка в виде снежинки с бархатной отделкой",
    tags: ["toys"],
    price: 73,
    img: "./img/6.jpeg",
    rating: 3.2,
  },
  {
    title: "Рождественские огоньки",
    description: "Маленькие светодиодные лампочки, работает на батарейках",
    tags: ["decor"],
    price: 73,
    img: "./img/7.jpeg",
    rating: 2.9,
  },
  {
    title: "Декоративный автомобиль",
    description: "Белый керамический автомобиль с подсветкой, работает на батарейках",
    tags: ["decor"],
    price: 73,
    img: "./img/8.jpeg",
    rating: 3.4,
  },
  {
    title: "Снежный шар",
    description: "Музыкальный снежный шар с белым медведем",
    tags: ["decor"],
    price: 109,
    img: "./img/9.jpeg",
    rating: 4.8,
  },
  {
    title: "Рождественская лампа",
    description: "Круглый светильник в виде елки, работает на батарейках",
    tags: ["decor"],
    price: 209,
    img: "./img/10.jpeg",
    rating: 3.2,
  },
  {
    title: "Рождественский венок",
    description: "Венок среднего размера из листьев натуральной светлой оливы",
    tags: ["decor"],
    price: 100,
    img: "./img/11.jpeg",
    rating: 3.7,
  },
  {
    title: "Свечи Мухоморы",
    description: "Декоративная свеча в виде гриба, в комплекте 6 штук",
    tags: ["decor"],
    price: 38,
    img: "./img/12.jpeg",
    rating: 4.1,
  },
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

const sortControl = document.querySelector("#sort");

function renderItems(arr) {
  nothingFound.textContent = "";
  itemsContainer.innerHTML = "";
  arr.forEach((item) => {
    itemsContainer.append(prepareShopItem(item));
  });
  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }
}

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
  const { title, description, tags, img, price, rating } = shopItem;
  const item = itemTemplate.content.cloneNode(true);
  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price} BYN`;

  const ratingContainer = item.querySelector(".rating");
  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  const tagsHolder = item.querySelector(".tags");

  tags.forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    element.classList.add("tag");
    tagsHolder.append(element);
  });

  return item;
}

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();

  currentState = items.filter((el) =>
    el.title.toLowerCase().includes(searchString)
  );
 
  currentState.sort((a, b) => sortByAlphabet(a, b));
  renderItems(currentState);
  sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case "expensive": {
      currentState.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentState.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
      currentState.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }
  renderItems(currentState);
});
