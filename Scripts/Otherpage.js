// Other page data show page json lines
window.addEventListener("load", function () {
  getJsonData("../Data/OtherpageData.json")
    .then((res) => {
      const products = res;
      showproducts(res, "phone", "#Phone-pd");
      showproducts(res, "Laptops", "#Laptop-pd");
      showproducts(res, "Accessoriesod", "#Accessories-pd");
      showproducts(res, "Mens", "#Men-pd");
      showproducts(res, "Womens", "#Women-pd");
      showproducts(res, "Kidses", "#Kids-p");
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

function generateproductsHtml(products) {
  let output = `
    <div class="product-container">
  `;
  for (let i = 0; i < products.length; i++) {
    output += `
      <div class="container">
        <div class="content">
          <div class="card">
            <div class="imgBox">
              <img src="${products[i].image}"/>
            </div>
            <div class="contentbox">
              <h3>${products[i].name}</h3>
              <h2 class="price">${products[i].price}</h2>
              <a href="/Pages/addtocart.html?id=${products[i].id}" class="buy">View Details</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  output += `
    </div>
  `;
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

function showproducts(products, cat, _id) {
  // body...
  const filteredproducts = products.filter(
    (product) => product.category === cat
  );
  let output = generateproductsHtml(filteredproducts);
  document.querySelector(_id).innerHTML = output;
}

//Other page data show page json lines end
//Get Id From Main Page
let url = window.location.search;
let queryString = new URLSearchParams(url);
console.log(url);
const id = queryString.get("id");
// findjson lines
window.addEventListener("load", function () {
  getJsonData("/Data/OtherpageData.json")
    .then((res) => {
      const products = res;
      const product = products - pd.find((item) => item.id === id);
      console.log(product);
      loadProduct(product);
    })
    .catch((err) => console.log(err));
});

//Showing Product Data
function loadProduct(pro) {
  document.getElementById("pro-name").innerText = pro.name;
  document.getElementById("pro-price").innerText = pro.price;
  document.getElementById("pro-img").src = pro.image;
  document.getElementById("pro-disc").innerText = pro.description;
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

// find json lines end
