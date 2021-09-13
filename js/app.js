const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  const localdb = 'http://127.0.0.1:5500/db.json';
  const apiupdate = 'https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR1pTCkjwMHUr0aRzeajNsWCevk6pKTBU2VtP60XAIemJ9RSXvUrzeG5eoU'
  fetch(apiupdate)
    .then((response) => response.json())
    .then((data) => showProducts(data))
    .finally(er => console.log(er));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <div class="product-title">
      <p>${product.title}</p>
      </div>
      <p>Category: ${product.category}</p>
      <div class="rating">
      <p>Total Rating: <span class="total-rating-point"> ${product.rating.count}<span></p>
      <p >Rating: <span class="total-rating-point">  ${product.rating.rate} </span></p>
      </div>
      <h3>Price: $ ${product.price}</h3>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn btn-outline-success">add to cart</button>
      <button id="details-btn" class="btn btn-outline-info" >Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Number(parseFloat(total).toFixed(2));
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = Number(getInputValue("price").toFixed(2));
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = Number(grandTotal.toFixed(2));
};
