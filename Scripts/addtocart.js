//Get Id From Main Page
let url = window.location.search;
  let queryString = new URLSearchParams(url);
  console.log(url);
  const id = queryString.get("id");
// findjson lines
window.addEventListener("load", function () {
    getJsonData("../Data/products.json")
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
    document.getElementById('pro-banner').src = pro.banner;
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
  