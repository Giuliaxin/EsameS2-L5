const catalogoProdotti = [
  { nome: "Cuffie wireless", categoria: "Elettronica", prezzo: 89.99, rating: 4, immagine: "Cuffie", disponibile: true },
  { nome: "Tablet 10 pollici", categoria: "Elettronica", prezzo: 199.00, rating: 5, immagine: "Tablet", disponibile: true },
  { nome: "Il romanzo dell'anno", categoria: "Libri", prezzo: 14.90, rating: 4, immagine: "Libro", disponibile: true },
  { nome: "Zaino da viaggio", categoria: "Abbigliamento", prezzo: 49.99, rating: 4, immagine: "Zaino", disponibile: true },
  { nome: "Lampada LED", categoria: "Casa", prezzo: 29.50, rating: 3, immagine: "Lampada", disponibile: true },
  { nome: "Smartwatch GPS", categoria: "Elettronica", prezzo: 119.00, rating: 4, immagine: "Smartwatch", disponibile: true },
  { nome: "Mouse ergonomico", categoria: "Elettronica", prezzo: 24.90, rating: 4, immagine: "Mouse", disponibile: true },
  { nome: "Caffettiera moka", categoria: "Casa", prezzo: 22.00, rating: 5, immagine: "Caffettiera", disponibile: true }
];

const convertiPrezzo = (valore) => {
  return `€ ${valore.toFixed(2).replace('.', ',')}`;
};

const generaStelle = (punteggio) => {
  return "★".repeat(punteggio) + "☆".repeat(5 - punteggio);
};

const aggiornaUIREpilogo = () => {
  const carrello = JSON.parse(localStorage.getItem("lista_carrello")) || [];
  const listaUL = document.getElementById("prodotti-carrello");
  const msgVuoto = document.getElementById("lista-carrello-vuoto");
  const boxTotale = document.getElementById("totale-box");
  const spanTotale = document.getElementById("prezzo-totale");

  if (!listaUL) return;

  listaUL.innerHTML = "";
  let totaleEuro = 0;

  if (carrello.length > 0) {
    if (msgVuoto) msgVuoto.style.display = "none";
    if (boxTotale) boxTotale.style.display = "block";
    
    carrello.forEach(item => {
      totaleEuro += item.prezzo;
      const li = document.createElement("li");
      li.style.padding = "10px 0";
      li.style.borderBottom = "1px solid #eee";
      li.innerText = `${item.nome} - ${convertiPrezzo(item.prezzo)}`;
      listaUL.appendChild(li);
    });
    
    if (spanTotale) spanTotale.innerText = convertiPrezzo(totaleEuro);
  } else {
    if (msgVuoto) msgVuoto.style.display = "block";
    if (boxTotale) boxTotale.style.display = "none";
  }
};

const creaGestoreCarrello = () => {
  let conteggio = parseInt(localStorage.getItem("carrello_qty")) || 0;
  const elementoCarrello = document.querySelector('.carrello-box');
  
  if (elementoCarrello) elementoCarrello.innerText = `Carrello (${conteggio})`;
  aggiornaUIREpilogo();
  
  return (prodotto) => {
    conteggio++;
    if (elementoCarrello) elementoCarrello.innerText = `Carrello (${conteggio})`;
    localStorage.setItem("carrello_qty", conteggio);

    const carrello = JSON.parse(localStorage.getItem("lista_carrello")) || [];
    carrello.push(prodotto);
    localStorage.setItem("lista_carrello", JSON.stringify(carrello));
    
    aggiornaUIREpilogo();
  };
};

const aggiungiAlCarrello = creaGestoreCarrello();

const renderProdotti = (lista) => {
  const container = document.getElementById("prodotti"); 
  if (!container) return;
  container.innerHTML = "";

  lista.forEach((prodotto) => {
    const card = document.createElement("article");
    card.className = "product-unit";

    card.innerHTML = `
      <div class="product-img-box">${prodotto.immagine}</div>
      <h3>${prodotto.nome}</h3>
      <div class="star-rating">${generaStelle(prodotto.rating)} <span>(${prodotto.rating}.0)</span></div>
      <p class="price-tag">${convertiPrezzo(prodotto.prezzo)}</p>
      <button type="button" class="add-to-cart" ${!prodotto.disponibile ? 'disabled' : ''}>
        ${prodotto.disponibile ? 'Aggiungi al carrello' : 'Esaurito'}
      </button>
    `;

    const btn = card.querySelector('.add-to-cart');
    if (prodotto.disponibile) {
        btn.addEventListener('click', () => aggiungiAlCarrello(prodotto));
    }

    container.appendChild(card);
  });
};

const ordinaProdotti = (criterio) => {
  let prodottiOrdinati = [...catalogoProdotti];

  if (criterio === "price-asc") {
    prodottiOrdinati.sort((a, b) => a.prezzo - b.prezzo);
  } else if (criterio === "price-desc") {
    prodottiOrdinati.sort((a, b) => b.prezzo - a.prezzo);
  } else if (criterio === "name") {
    prodottiOrdinati.sort((a, b) => a.nome.localeCompare(b.nome));
  } else if (criterio === "rating") {
    prodottiOrdinati.sort((a, b) => b.rating - a.rating);
  }

  renderProdotti(prodottiOrdinati);
};

const selectSort = document.getElementById("sort-select");
if (selectSort) {
  selectSort.addEventListener("change", (e) => {
    ordinaProdotti(e.target.value);
  });
}

const btnSvuotaCarrello = document.getElementById("btn-svuota");
if (btnSvuotaCarrello) {
  btnSvuotaCarrello.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
}

const filtraPerCategoria = (lista, categoria) => {
  return lista.filter(prodotto => prodotto.categoria === categoria);
};

const linksCategorie = document.querySelectorAll('.category-item');
linksCategorie.forEach((card) => {
  card.addEventListener('click', () => {
    const nomeCategoria = card.querySelector('h3').innerText;
    const prodottiFiltrati = filtraPerCategoria(catalogoProdotti, nomeCategoria);
    
    const titoloSezione = document.querySelector('.section-label');
    if (titoloSezione) {
      titoloSezione.innerText = `Risultati per: ${nomeCategoria}`;
    }
    
    renderProdotti(prodottiFiltrati);
  });
});

renderProdotti(catalogoProdotti);