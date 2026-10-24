const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");

function searchCountry() {
  const query = searchInput.value.trim();
  if (!query) return;

  // hide previous results
  resultDiv.classList.add("hidden");
  errorDiv.classList.add("hidden");

  fetch(`https://api.restcountries.com/countries/v5?q=${query}&pretty`, {
    headers: {
      Authorization: "Bearer <YOUR_KEY_HERE>",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      displayCountry(data.data.objects[0]);
    })
    .catch((err) => {
      errorDiv.classList.remove("hidden");
    });
}

function displayCountry(country) {
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => c.name)
        .join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages)
        .map((l) => l.name)
        .join(", ")
    : "N/A";

  resultDiv.innerHTML = `
    <div class="flag">${country.flag.emoji}</div>
    <h2 class="country-name">${country.names.common}</h2>
    
    <div class="info-grid">
      <div class="info-item">
        <span class="info-label">Capital</span>
        <span class="info-value">${country.capitals?.[0].name || "N/A"}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Region</span>
        <span class="info-value">${country.region}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Population</span>
        <span class="info-value">${country.population.toLocaleString()}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Currency</span>
        <span class="info-value">${currencies}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Languages</span>
        <span class="info-value">${languages}</span>
      </div>
    </div>
    `;

  resultDiv.classList.remove("hidden");
}

searchBtn.addEventListener("click", searchCountry);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchCountry();
});

// search for Afghanistan by default on page load
searchInput.value = "Afghanistan";
searchCountry();
