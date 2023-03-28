// navbar
function navClick() {
  document.getElementById("navbar-menu-text").classList.toggle("show");
}
// navbar-end
// slide
let slideIndex = 1;
showSlides(slideIndex);
setInterval(function () {
  plusSlides(1);
}, 2000);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
// slide-end
// products json lines
// window.addEventListener("load", function () {
//   getJsonData("/data/products.json")
//     .then((res) => {
//       const products = res;
//       let output = "";
//       for (let item of products) {
//         output += `
//           <div class="container">
//             <div class="content">
//               <div class="card">
//                 <div class="imgBox">
//                   <img src="${item.image}"/>
//                 </div>
//                 <div class="contentbox">
//                   <h3>${item.name}</h3>
//                   <h2 class="price">${item.price}</h2>
//                   <a href="#" class="buy">Buy Now</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         `;
//       }
//       document.querySelector("#products").innerHTML = output;
//     })
//     .catch((err) => console.log(err));
// });

// function getJsonData(url) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", url, true);
//     xhr.responseType = "json";
//     xhr.onload = () => {
//       if (xhr.status === 200) {
//         const data = xhr.response;
//         resolve(data);
//       } else {
//         reject(new Error("Error fetching JSON data"));
//       }
//     };
//     xhr.onerror = () => {
//       reject(new Error("Error fetching JSON data"));
//     };
//     xhr.send();
//   });
// }
// products json lines end
window.addEventListener("load", function () {
  getJsonData("/data/products.json")
    .then((res) => {
      const products = res;
      const categories = getCategories(products);
      let output = "";
      for (let category of categories) {
        const filteredProducts = products.filter(
          (product) => product.category === category
        );
        output += `
          <div class="category">
            <h2>${category}</h2>
            <div class="products">
              ${generateProductsHtml(filteredProducts)}
            </div>
          </div>
        `;
      }
      document.querySelector("#products").innerHTML = output;
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
              <a href="#" class="buy">Buy Now</a>
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
