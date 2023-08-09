function removeResults() {
  const productEl = document.querySelectorAll(".result-item");
  productEl.forEach((prod) => prod.remove());
}

function mostrarResultados(resultados) {
  removeResults();
  const template = document.querySelector("#template");
  const content = document.querySelector(".content");
  document.querySelector(".result-count").textContent =
    "5 de " + resultados.paging.total;

  for (i = 0; i < 5; i++) {
    const clone = document.importNode(template.content, true); // poner content (contenido del template)
    clone.querySelector(".result-item-title").textContent =
      resultados.results[i].title;
    clone.querySelector(".result-item-condition").textContent =
      resultados.results[i].condition;
    clone.querySelector(".result-item-sell-count").textContent =
      "Vendidos: " + resultados.results[i].sold_quantity;
    clone.querySelector(".result-item-price").textContent =
      "$" + resultados.results[i].price;
    clone
      .querySelector(".result-item-img")
      .setAttribute("src", resultados.results[i].thumbnail);
    clone.querySelector(".result-seller").textContent =
      resultados.results[i].seller.nickname;

    content.appendChild(clone);

    console.log(resultados);
  }
}

function main() {
  const formEl = document.querySelector(".search-form");
  formEl.addEventListener("submit", function (e) {
    e.preventDefault();

    const search = e.target.buscar.value; //e.target o formEl

    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + search)
      .then((response) => response.json())
      .then((data) => {
        mostrarResultados(data);
      });
  });
}

main();
