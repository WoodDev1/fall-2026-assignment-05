
import products from "./data/products.json";

// page elements
const productGrid = document.querySelector("#product-grid");
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");
const pageIndicator = document.querySelector("#page-indicator");

const productsPerPage = 5;
const totalPages = Math.ceil(products.length / productsPerPage);
let currentPage = 1;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// product card mockup
function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.name;
  image.loading = "lazy";

  const details = document.createElement("div");
  details.className = "product-details";

  const category = document.createElement("span");
  category.className = "product-category";
  category.textContent = product.category;

  const name = document.createElement("h3");
  name.textContent = product.name;

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = currency.format(product.price);

  const description = document.createElement("p");
  description.className = "product-description";
  description.textContent = product.description;

  details.append(category, name, price, description);
  card.append(image, details);

  return card;
}

// Dproducts for each page
function renderProducts() {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  const cards = visibleProducts.map(createProductCard);
  productGrid.replaceChildren(...cards);

  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

// event listeners for products
if (productGrid && previousButton && nextButton && pageIndicator) {
  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts();
    }
  });

  renderProducts();
}