const searchInput = document.getElementById("searchInput");
const countryCards = document.getElementById("countryCards");


// Fetch country data and create cards
fetch("https://restcountries.com/v3.1/all")
  .then(response => response.json())
  .then(data => {
    const countries = data;
    countries.forEach(country => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${country.flags.png}" alt="${country.name.common} Flag">
        <h3>${country.name.common}</h3>
        <p>Capital: ${country.capital}</p>
      `;
      card.addEventListener("click", () => showCountryDetails(country));
      countryCards.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error fetching country data:", error);
  });

function showCountryDetails(country) {
  // Redirect to country-details.html
  window.location.href = `country.html?country=${country.name.common}`;
}

searchInput.addEventListener("input", () => {
  const searchQuery = searchInput.value.toLowerCase();
  const cards = countryCards.getElementsByClassName("card");

  Array.from(cards).forEach(card => {
    const countryName = card.querySelector("h3").textContent.toLowerCase();
    if (countryName.includes(searchQuery)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
