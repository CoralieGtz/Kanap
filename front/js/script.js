section();

async function getProducts() {
  try {
    let response = await fetch("http://localhost:3000/api/products");
    return await response.json();
  } catch (error) {
    alert("Erreur lors de la récupération des produits");
  }
}

async function section() {
  let result = await getProducts()
    .then(function (resultatAPI) {
      const products = resultatAPI;
      console.table(products);
      for (let product in products) {
        //link
        let productLink = document.createElement("a");
        document.querySelector("#items").appendChild(productLink);
        productLink.href = `product.html?id=${resultatAPI[product]._id}`;

        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        let productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = resultatAPI[product].imageUrl;
        productImg.alt = resultatAPI[product].altTxt;

        let productName = document.createElement("h3");
        productArticle.appendChild(productName);
        productName.classList.add("productName");
        productName.innerHTML = resultatAPI[product].name;

        let productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productName");
        productDescription.innerHTML = resultatAPI[product].description;
      }
    })
    .catch(function (error) {
      return error;
    });
}
