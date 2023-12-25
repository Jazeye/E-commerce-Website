// products json lines
window.addEventListener("load", function () {
  getJsonData("./Data/products.json")
    .then((res) => {
      const products = res;
      showProducts(res, "smartphone", "#phoneproducts");
      showProducts(res, "Laptop", "#laptopproducts");
      showProducts(res, "Accessories", "#Accessoryproducts");
      showProducts(res, "Men", "#menproducts");
      showProducts(res, "Women", "#womenproducts");
      showProducts(res, "Kids", "#kidproducts");
    })
    .catch((err) => console.log(err));
});

function getCategories(products) {
  const categories = [];
  for (let product of products) {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  }
  return categories;
}

function generateProductsHtml(products) {
  let output = "";
  for (let item of products) {
    output += `
        <div class="container">
          <div class="content">
            <div class="card">
              <div class="imgBox">
                <img src="${item.image}"/>
              </div>
              <div class="contentbox">
                <h3>${item.name}</h3>
                <h2 class="price">${item.price}</h2>
                <a href="/Pages/addtocart.html?id=${item.id}" class="buy">View Details</a>
              </div>
            </div>
          </div>
        </div>
      `;
  }
  return output;
}

function getJsonData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = xhr.response;
        resolve(data);
      } else {
        reject(new Error("Error fetching JSON data"));
      }
    };
    xhr.onerror = () => {
      reject(new Error("Error fetching JSON data"));
    };
    xhr.send();
  });
}

function showProducts(products, cat, _id) {
  // body...
  const filteredProducts = products.filter(
    (product) => product.category === cat
  );
  let output = generateProductsHtml(filteredProducts);
  document.querySelector(_id).innerHTML = output;
}

// products json lines end
