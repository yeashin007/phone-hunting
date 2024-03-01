// Selecting elements
const showContainer = document.getElementById("show-container");
const btnShowMore = document.getElementById("btn-show-more");
const loadingSpin = document.getElementById("loading-spin");

showContainer.innerHTML = "";

// Collecting data
const loadPhone = async (searchText, isShowall) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowall);
};

// function for display phones
const displayPhones = (phones, isShowall) => {
  if (phones.length > 12 && !isShowall) {
    phones = phones.slice(0, 12);
    btnShowMore.classList.remove("hidden");
  } else {
    btnShowMore.classList.add("hidden");
  }

  showContainer.innerHTML = "";
  phones.forEach((phone) => {
    const id = phone.slug;

    const phoneCard = document.createElement("div");
    phoneCard.classList =
      "space-y-3 mx-auto text-center bg-gray-100 p-10 rounded-lg w-full";
    const html = `    
        <img src="${phone.image}" alt="" />
        <h2 class="text-2xl font-bold">${phone.phone_name}</h2>
        <p>Phone details</p>
        <p class="text-lg font-bold">Price</p>
        <button onclick="showDetails('${id}')" class="btn bg-green-800 text-white">Show Details</button>    
    `;
    phoneCard.innerHTML = html;
    showContainer.appendChild(phoneCard);
    loadingSpin.classList.add("hidden");
  });
};

// function for search handler
const searchHandler = (isShowall) => {
  const searchField = document.getElementById("search-container");
  const searchText = searchField.value;

  if (!searchText) {
    alert("⛔ Search something!!!");
    return;
  }
  loadingSpin.classList.remove("hidden");
  loadPhone(searchText, isShowall);
};

// function for show-all
const showAll = () => {
  searchHandler(true);
};

// Show details function
const showDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const details = data.data;

  const modalContainer = document.getElementById("details-modal");

  const html = `
  <div class="flex justify-center"><img src="${details.image}"/></div>
  <h3 class="font-bold text-lg">${details.name}</h3>
  <p></p>
  <p><span class="font-bold text-lg">Storage: </span>${details.mainFeatures.storage}</p>
  <p><span class="font-bold text-lg">Display Size: </span>${details.mainFeatures.displaySize}</p>
  <p><span class="font-bold text-lg">Chipset: </span>${details.mainFeatures.chipSet}</p>
  <p><span class="font-bold text-lg">Memory: </span>${details.mainFeatures.memory}</p>
  <p><span class="font-bold text-lg">Slug: </span> ${details.slug}</p>
  <p><span class="font-bold text-lg">Release Date: </span>${details.releaseDate}</p>
  <p><span class="font-bold text-lg">Brand: </span>${details.brand}</p>
  <p><span class="font-bold text-lg">GPS: </span>${details.others.GPS}</p>

  <form method="dialog" class="pb-4" >
    <button class="btn btn-sm bg-green-800 btn-ghost absolute right-4">
      Close
    </button>
  </form>
  `;
  modalContainer.innerHTML = html;
  showDetailsModal();
};

const showDetailsModal = () => {
  show_modal.showModal();
};
