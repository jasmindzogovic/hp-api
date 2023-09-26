"use strict";

const container = document.querySelector(".container");
const input = document.getElementById("form__input");

const renderData = (persons) => {
  container.innerHTML = persons
    .map((person) => {
      if (person.image) {
        return `<div class="character__container">
            <img src="${person.image}" alt="character-image" class="character__img">
              <p class="character__name">${person.name}</p>
              <p class="character__house">${person.house}</p>
          </div>`;
      }
    })
    .join("");
};

const getJSON = async () => {
  try {
    const res = await fetch("https://hp-api.onrender.com/api/characters");
    const data = await res.json();

    renderData(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

getJSON();

input.addEventListener("keyup", async (e) => {
  const inputValue = e.target.value.toLowerCase();
  const data = await getJSON();
  const filter = data.filter((character) => {
    return character.name.toLowerCase().includes(inputValue);
  });
  renderData(filter);
});
