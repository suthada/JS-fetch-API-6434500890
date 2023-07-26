let pokemons = {};
const pokemonListDiv = document.getElementById("pokemonlist");

fetch("https://pokeapi.co/api/v2/pokemon/")
  .then((response) => {
    if (response.ok) return response.json();
  })
  .then((data) => {
    pokemons = data.results;
    renderPokemonList();
  })
  .catch((error) => {
    console.log("Can't fetch data from API.");
  });

const renderPokemonList = () => {
  pokemonListDiv.innerHTML = "";
  pokemons.forEach((pokemon) => {
    const { name, url } = pokemon;
    const imageUrl =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
      url.split("/")[6] +
      ".png";

    const card = document.createElement("div");
    card.setAttribute("class", "card col-md-3");

    const imag = document.createElement("img");
    imag.setAttribute("class", "card-img-top");
    imag.setAttribute("src", imageUrl);

    const nameDiv = document.createElement("div");
    nameDiv.setAttribute("class", "card-body");

    const title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.innerText = name;

    const button = document.createElement("button");
    button.setAttribute("class", "btn btn-dark ");
    button.innerText = "รายละเอียด";
    button.addEventListener("click", () => {
      showPokemonDetails(name);
    });

    nameDiv.appendChild(title);
    nameDiv.appendChild(button);

    card.appendChild(imag);
    card.appendChild(nameDiv);

    pokemonListDiv.appendChild(card);
  });
};

const showPokemonDetails = (pokemonName) => {
  const pokemon = pokemons.find((pokemon) => pokemon.name === pokemonName);

  fetch(pokemon.url)
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((pokemonData) => {
      const modal = createModal(pokemonData);
      document.body.appendChild(modal);
      const modalInstance = new bootstrap.Modal(modal);
      modalInstance.show();
    })
    .catch((error) => {
      console.log("Can't fetch data from API.");
    });
};

const createModal = (pokemonData) => {
    const modal = document.createElement("div");
    modal.setAttribute("class", "modal fade");
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-hidden", "true");
  
    const modalDialog = document.createElement("div");
    modalDialog.setAttribute("class", "modal-dialog modal-dialog-centered");
  
    const modalContent = document.createElement("div");
    modalContent.setAttribute("class", "modal-content");
  
    const modalHeader = document.createElement("div");
    modalHeader.setAttribute("class", "modal-header");
    const headerTitle = document.createElement("h5");
    headerTitle.setAttribute("class", "modal-title");
    headerTitle.innerText = "รายละเอียดของ " + pokemonData.name.toUpperCase();
    modalHeader.appendChild(headerTitle);
  
    const modalBody = document.createElement("div");
    modalBody.setAttribute("class", "modal-body");
    const pokemonImage = document.createElement("img");
    pokemonImage.setAttribute("src", pokemonData.sprites.front_default);
    modalBody.appendChild(pokemonImage);
  
    const pokemonName = document.createElement("p");
    pokemonName.innerText = "ชื่อ : " + pokemonData.name.toUpperCase();
    modalBody.appendChild(pokemonName);

    const pokemonID = document.createElement("p");
    pokemonID.innerText = "Id : " + pokemonData.id;
    modalBody.appendChild(pokemonID);

    const pokemonHEIGTH = document.createElement("p");
    pokemonHEIGTH.innerText = "ส่วนสูง : " + pokemonData.height;
    modalBody.appendChild(pokemonHEIGTH);


    const modalFooter = document.createElement("div");
    modalFooter.setAttribute("class", "modal-footer");

    const closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "btn btn-dark");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.innerText = "ปิด";
    modalFooter.appendChild(closeButton);
  
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
  
    modalDialog.appendChild(modalContent);
  
    modal.appendChild(modalDialog);
  
    return modal;
  };