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

const raggruppaPerCategoria = (array, tipo) => {
  return array.filter(item => item.categoria === tipo);
};

const verificaStockERating = (elenco) => {
  return elenco.filter(articolo => articolo.disponibile && articolo.rating >= 4);
};

const creaGestoreCarrello = () => {
  let conteggio = 0;
  const elementoCarrello = document.querySelector('.cart-indicator');
  
  return () => {
    conteggio++;
    elementoCarrello.innerText = `Carrello (${conteggio})`;
  };
};

const aggiungiAlCarrello = creaGestoreCarrello();

const renderProdotti = (lista) => {
  const container = document.querySelector(".product-showcase");
  container.innerHTML = "";

  lista.forEach((prodotto) => {
    const card = document.createElement("article");
    card.className = "product-unit";

    card.innerHTML = `
      <div class="product-img-box">${prodotto.immagine}</div>
      <h3>${prodotto.nome}</h3>
      <div class="star-rating">${generaStelle(prodotto.rating)} <span>(${prodotto.rating}.0)</span></div>
      <p class="price-tag">${convertiPrezzo(prodotto.prezzo)}</p>
      <button type="button" class="add-to-cart">
        Aggiungi al carrello
      </button>
    `;

    const btn = card.querySelector('.add-to-cart');
    btn.addEventListener('click', aggiungiAlCarrello);

    container.appendChild(card);
  });
};

renderProdotti(catalogoProdotti);