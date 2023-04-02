// Other page data show page json lines
window.addEventListener("load", function () {
  getJsonData("/Data/OtherpageData.json")
    .then((res) => {
      const products = res;
      showProducts(res, "phone", "#phoneproducts");
      showProducts(res, "Laptops", "#laptop-pd");
      showProducts(res, "Accessoriesod", "#Accessoryproducts");
      showProducts(res, "Mens", "#menproducts");
      showProducts(res, "Womens", "#womenproducts");
      showProducts(res, "Kidses", "#kidproducts");
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

function showProducts(products, cat, _id) {
  // body...
  const filteredProducts = products.filter(
    (product) => product.category === cat
  );
  let output = generateProductsHtml(filteredProducts);
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
        const product = products.find((item) => item.id === id);
        console.log(product);
        loadProduct(product);
      })
      .catch((err) => console.log(err));
  });
  
  //Showing Product Data
 function loadProduct(pro){
    document.getElementById('pro-name').innerText = pro.name;
    document.getElementById('pro-price').innerText = pro.price;
    document.getElementById('pro-img').src = pro.image;
    document.getElementById('pro-disc').innerText = pro.description;
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
  