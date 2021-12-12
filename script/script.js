var userService = new UserService();
var products1 = new ProductService;


// var product1 = new Product("Lovely Tulips", "A lovely bouquet of colorful tulips. At least 21 tulips of various colors, including red, pink, white and violet.", 1000, "Flowers");
// var product2 = new Product("Traditional Carnations", "For all those nostalgics out there, we have this beautiful bouquet of carnations which will undoubtedly transport you back 20 years. At least 7 beautiful carnations", 800, "Flowers");
// var product3 = new Product("Fantastic Freesia", "This fantastic bouquet of freesia will delight with both looks and smell and will melt even the most icy heart. At least 11 fantastic freesia, including white and yellow.", 1500, "Flowers");
// var product4 = new Product("Classic Roses", "Nothing says I love you better than a big bouquet of roses. At least 51 roses either red, pink or assorted.", 5000, "Flowers");
// var product5 = new Product("Immaculate Bride", "A perfect white bouquet for that perfect day. A stylish white flower bouquet with green insertions, fit for the perfect bride.", 6000, "Wedding");
// var product6 = new Product("Pink Bride", "If you love pink you will want to have it in your life even on that most important day. That is why we offer a sweet pink rose bouquet for the perfect bride.", 6000, "Wedding");
// var product7 = new Product("Perfect Birdesmaid", "We also provide the perfect bouquet for the bridesmaids, making that special day even more special. And don't worry, it will not outshine the bride's bouquet but it will awe the guests nevertheless.", 4000, "Wedding");


// product1.addUrl('flowerImages/tulips.jpg');
// product2.addUrl('flowerImages/carnations.png');
// product3.addUrl('flowerImages/freesia.jpg');
// product4.addUrl('flowerImages/roses.jpg');
// product5.addUrl('flowerImages/bride1.jpg');
// product6.addUrl('flowerImages/bride2.jpg');
// product7.addUrl('flowerImages/bridesmaid.jpg');


// products1.addProduct(product1);
// products1.addProduct(product2);
// products1.addProduct(product3);
// products1.addProduct(product4);
// products1.addProduct(product5);
// products1.addProduct(product6);
// products1.addProduct(product7);


function register() {
   let name = document.getElementById('nameId').value;
   let email = document.getElementById('emailId').value;
   let password = document.getElementById('passwordId').value;

   let user = new User(name, email, password);
   userService.registerUser(user);
   
   return window.location.href = 'index.html'
}
   // window.location.href="index.html";


function login() {
   let email = document.getElementById('emailId').value;
   let password = document.getElementById('passwordId').value;

   userService.logInUser(email, password);
   return window.location.href = 'index.html'
}

function showProducts() {
   //transformam lista de produse intr-un string ca sa il putem injecta in pagina 
   let products = products1.getFormatedProducts();
   document.getElementById('productsListId').innerHTML = products;
}

function search(){
   let name = document.getElementById('searchID').value;
   let searchResult = products1.sortProducts(name);
   let concatenatedProducts ='';

   for (let index = 0; index < searchResult.length; index++) {
      const product = searchResult[index];

       //pentru fiecare produs construieste urmatorul html
       concatenatedProducts += 
       `
       <div class="card border m-2" style="width: 18rem;">
           <img class="card-img-top" src="${product.imageUrl}" alt="Card image cap" style="height: 250px;">
           <h5 class="card-title p-1">${product.name}</h5>
           <div class="card-body border border-dark rounded mt-1 mb-1 d-flex flex-column justify-content-between">   
               <p class="card-text">${product.description}</p>
               <p class="card-text">Price: ${product.price}</p>
               <button onclick="openProduct(${product.id})" class="btn btn-outline-success btn-sm">Show Product</button>
           </div>
       </div>`};

   document.getElementById('productsListId').innerHTML = concatenatedProducts;
}

function searchPrice(){
   let price = document.getElementById('searchPriceID').value;
   let searchResult = products1.sortPriceProducts(price);
   let concatenatedProducts ='';

   for (let index = 0; index < searchResult.length; index++) {
      const product = searchResult[index];

       //pentru fiecare produs construieste urmatorul html
       concatenatedProducts += 
       `
       <div class="card border m-2" style="width: 18rem;">
           <img class="card-img-top" src="${product.imageUrl}" alt="Card image cap" style="height: 250px;">
           <h5 class="card-title p-1">${product.name}</h5>
           <div class="card-body border border-dark rounded mt-1 mb-1 d-flex flex-column justify-content-between">   
               <p class="card-text">${product.description}</p>
               <p class="card-text">Price: ${product.price}</p>
               <button onclick="openProduct(${product.id})" class="btn btn-outline-success btn-sm">Show Product</button>
           </div>
       </div>`};

   document.getElementById('productsListId').innerHTML = concatenatedProducts;
}

//functia este apelata cand se da click pe un produs
function openProduct(id){
   window.localStorage.setItem('productId', id);
   document.location.href = "productDetails.html";
}

//funtia este apelata la onload pe pagina productDetails
function showProduct(){
   let productId = window.localStorage.getItem('productId');
   if(productId){
      let productDetail = products1.getFormatedProduct(productId);
      if(productDetail){
         document.getElementById('productDetailId').innerHTML = productDetail;
      }
   }
}

function deleteProduct(id){
   products1.removeProduct(id);
   products1.updateProductsStorage();
   return window.location.href = 'products.html'
}

function productAdd() {
   let name = document.getElementById('nameId').value;
   let description = document.getElementById('descriptionId').value;
   let price = document.getElementById('priceId').value;
   let category = document.getElementById('categoryId').value;
   let url = document.getElementById('urlId').value; 
   let product = new Product(name, description, price, category);
   product.addUrl(url);
   products1.addProduct(product);
   return window.location.href = 'products.html'
}

function addToCart(id){
   let product = products1.getProductByID(id);
 
   if(product){
      products1.addProductToCart(product);
      // updateProductsCount();
   }
}

function showCartCount() {
   //numaram produsele din cos
   document.getElementById('cartProductCount').innerHTML = `Your cart contains ${products1.cartList.length} Items:`;
}

function showCartProducts() {
   //transformam lista de produse din cart intr-un string ca sa il putem injecta in pagina 
   let products = products1.getFormatedCartProducts();
   document.getElementById('cartProducts').innerHTML = products;
}

function showFullPrice() {
   //calculeaza pretul total al produselor din cos 
   let price = products1.getCartProductsPrice();
   document.getElementById('totalPrice').innerHTML = price;
}

function hideButtons(){
   let variable = localStorage.getItem('isLoggedIn');
   if(variable){
      document.getElementById("loginID").style.visibility="hidden";  
      document.getElementById("registerID").style.visibility="hidden";
   }
}

function checkOut(){
   let variable = localStorage.getItem('isLoggedIn');
   if(variable){
      let var2 = products1.cartList.length;
      if(var2 > 0){
      return window.location.href = 'checkout.html'
      }else{
         return alert('Cart is empty!')
      }
   }else{
      return alert('You must be logged in!')
   }
}