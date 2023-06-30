document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  loadJSON();
});

window.onscroll = function () {
  console.log("scroll");
  if (window.scrollY > 50) {
    document.querySelector("header").classList.add("active");
  } else {
    document.querySelector("header").classList.remove("active");
  }
};

const burgerOn = document.querySelector("#burgerMenuOn");
const burgerOff = document.querySelector("#burgerMenuOff");
const burgerItems = document.querySelector("#burgerItems");
const header = document.querySelector("header");

burgerOn.addEventListener("click", () => {
  burgerOn.style.display = "none";
  burgerOff.style.display = "inline-block";

  header.classList.add("active");
  burgerItems.style.display = "block";
});

burgerOff.addEventListener("click", () => {
  burgerOn.style.display = "inline-block";
  burgerOff.style.display = "none";

  burgerItems.style.display = "none";

  if (window.scrollY < 51) {
    header.classList.remove("active");
  }
});

let cuisine;

async function loadJSON() {
  const JSONData = await fetch(url, options);
  cuisine = await JSONData.json();
  showCuisine();
}

function showCuisine() {
  console.log("showingCuisine");
  console.log(cuisine);

  cuisine.forEach((dish) => {
    const template = document.querySelector("template");
    let filter = `#cat_${dish.kategori}`;
    let container = document.querySelector(filter);
    let clone = template.cloneNode(true).content;
    clone.querySelector("img").src = media + dish.billede[0];
    clone.querySelector("img").alt = dish.navn;
    clone.querySelector("article").addEventListener("click", () => showDetails(dish));
    clone.querySelector(".name").textContent = dish.navn;
    clone.querySelector(".price").textContent = `${dish.pris},-`;
    clone.querySelector(".description").textContent = dish.kortbeskrivelse;

    container.appendChild(clone);
  });
}

function showDetails(dish) {
  console.log("showingDetails");
  location.href = `dish.html?id=${dish._id}`;
}
