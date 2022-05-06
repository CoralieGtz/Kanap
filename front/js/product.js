//contient l'URL complète de la page en cours
let idProduct = new URL(location.href).searchParams.get("id");
//console.log(idProduct);
let article = "";

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

// Récupération des articles de l'API
function getArticle() {
  fetch("http://localhost:3000/api/products/" + idProduct)
    .then((resultat) => {
      return resultat.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) {
      article = await resultatAPI;
      console.table(article);
      if (article) {
        getPost(article);
      }
    })
    .catch((error) => {
      console.log("Erreur requête API");
    });
}

function getPost(article) {
  // Insertion de l'image
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  // Modification du titre "h1"
  let productName = document.getElementById("title");
  productName.innerHTML = article.name;

  // Modification du prix
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  // Modification de la description
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

  // Insertion des options de couleurs
  for (let colors of article.colors) {
    console.table("couleur des produits " + colors);
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
  addToCart(article);
}

//Gestion du panier
function addToCart(article) {
  const btn_sendToBasket = document.querySelector("#addToCart");

  btn_sendToBasket.addEventListener("click", (event) => {
    if (
      quantityPicked.value > 0 &&
      quantityPicked.value <= 100 &&
      quantityPicked.value != 0
    ) {
      //Récupération du choix de la couleur
      let choiceColor = colorPicked.value;

      //Récupération du choix de la quantité
      let choiceQuantity = quantityPicked.value;

      //Récupération des options de l'article à ajouter au panier
      let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: choiceColor,
        quantiteProduit: Number(choiceQuantity),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt,
      };
      console.log(optionsProduit);
      //Voir si quelque chose dans le localStorage
      let productLocalStorage = JSON.parse(localStorage.getItem("produit"));
    
      //Importation dans le localStorage
      //Si panier comporte déjà au moins 1 article
      if (productLocalStorage) {
        const resultFind = productLocalStorage.find(
          (el) =>
            el.idProduit === idProduct && el.couleurProduit === choiceColor
        );
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
          let newQuantity =
            parseInt(optionsProduit.quantiteProduit) +
            parseInt(resultFind.quantiteProduit);
          resultFind.quantiteProduit = newQuantity;
          localStorage.setItem("produit", JSON.stringify(productLocalStorage));
          console.table(productLocalStorage);
        } else {
          productLocalStorage.push(optionsProduit);
          localStorage.setItem("produit", JSON.stringify(productLocalStorage));
          console.table(productLocalStorage);
        }
        //Si le panier est vide
      } else {
        productLocalStorage = [];
        productLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(productLocalStorage));
        console.table(productLocalStorage);
      }
    }
  });
}
