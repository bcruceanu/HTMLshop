class ProductService {
    constructor(){
        this.products = this.getProductsFromStorage();
        this.cartList = this.getCartProductsFromStorage();
        this.sortedProducts = [];
    }

    getFormatedProducts(){
        var concatenatedProducts ='';

        this.products.forEach(function(product){

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
            </div>`
         });
         return concatenatedProducts;
    }

    getFormatedProduct(id){
        let product = this.getProductByID(id);
        var concatenatedProduct = '';
        if(product){
            concatenatedProduct += `
            <div class="card border m-2" style="width: 50rem;">
                <img class="card-img-top" src="${product.imageUrl}" alt="Card image cap" style="height: 50%; width: 50%; align-self: center;">
                <h5 class="card-title p-1">${product.name}</h5>
                <div class="card-body border border-dark rounded mt-1 mb-1 d-flex flex-column justify-content-between">   
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">Price: ${product.price}</p>
                    <p class="card-text">Category: ${product.category}</p>
                    <p class="card-text">${this.getNumberOfStars(product)}</p>
                    <button class="btn btn-outline-success btn-sm mt-2" onclick="addToCart(${product.id})">Add To Cart</button>
                    <button class="btn btn-outline-success btn-sm mt-2" onclick="deleteProduct(${product.id})">Delete Product</button>
                </div>
            </div>`;  
        }

        return concatenatedProduct;
    }

    getNumberOfStars(product){
        let concatenatedStars ='';
        let avgNumber = this.getAvgRating(product);//3
        if(avgNumber){
            for (let index = 1; index <= 5; index++) {
                if(index <= avgNumber){
                    concatenatedStars += ` <span class="fa fa-star checked" onclick="products1.testCrap(${product.id}, ${index})"></span>`
                }else{
                    concatenatedStars += ` <span class="fa fa-star" onclick="products1.testCrap(${product.id}, ${index})"></span>`
                }
            }
            return concatenatedStars;
        }else{
            return `
            <span class="fa fa-star" onclick="products1.testCrap(${product.id}, 1)"></span>
            <span class="fa fa-star" onclick="products1.testCrap(${product.id}, 2)"></span>
            <span class="fa fa-star" onclick="products1.testCrap(${product.id}, 3)"></span>
            <span class="fa fa-star" onclick="products1.testCrap(${product.id}, 4)"></span>
            <span class="fa fa-star" onclick="products1.testCrap(${product.id}, 5)"></span> `;
           
        }
    }

    getAvgRating(product){
        if(product.ratings){
            let numberOfRatings = product.ratings.length;
            if(numberOfRatings == 0){
                return 0;
            }
            let sum = 0;
            for (let i = 0; i < numberOfRatings; i++) {
                const rating = product.ratings[i];
                sum += parseInt(rating);
            }
            return sum/numberOfRatings;
        }else{
            return 0;
        }
    }

    testCrap(id, rating){
        let product = this.getProductByID(id);
        if(product){
            product.ratings.push(parseInt(rating));
            this.updateProductsStorage();
            alert('Rating added');
            return location.reload(); 
        }else{
            return 'Product not found';
        }
    }

    updateCartStorage(){
        localStorage.setItem('cartProducts', JSON.stringify(this.cartList));
    }

    updateProductsStorage(){
        localStorage.setItem('Products', JSON.stringify(this.products));
    }

    deleteProductsFromCart(){
        this.cartList.splice(0, this.cartList.length);
        alert(`All products removed`);
        this.updateCartStorage();
        return window.location.reload();
    }

    sortProducts(name){
        var sortedProducts = [];
        for (let index = 0; index < this.products.length; index++) {
            const product = this.products[index];
            
            if(product.name.toLowerCase().includes(name.toLowerCase())){
                
                sortedProducts.push(product);
                
            }
            
        }
        return sortedProducts 
    }

    sortPriceProducts(price){
        var sortedPriceProducts = [];
        for (let index = 0; index < this.products.length; index++) {
            const product = this.products[index];
            
            if(product.price <= price){
                
                sortedPriceProducts.push(product);
                
            }
            
        }
        return sortedPriceProducts 
    }

    getCartProductsFromStorage(){
        let cartProducts =  JSON.parse(localStorage.getItem('cartProducts'));
        if(cartProducts){
            return cartProducts
        }else{
            return [];
        }
    }
    
    getProductsFromStorage(){
        let Products =  JSON.parse(localStorage.getItem('Products'));
        if(Products){
            return Products;
        }else{
            return [];
        }
    }

    addProductToCart(product){
        this.cartList.push(product);
        this.updateCartStorage();
        alert('Product was added to cart');
        return window.location.href='products.html';
    }

    removeProductFromCart(id){
        for (let index = 0; index < this.cartList.length; index++) {
            const product = this.cartList[index];
            if(product.id == id){
                this.cartList.splice(index, 1);
                alert(`Product removed`);
                this.updateCartStorage();
                return window.location.reload();
            } 
        }
        
    }

    getCartProductCount(){
        return  this.cartList.length;
    }

    getFormatedCartProducts(){
        var concatenatedCartProducts ='';

        this.cartList.forEach(function(product){

            //pentru fiecare produs construieste urmatorul html
            concatenatedCartProducts += 
            `
            <div class="card border m-2">
                
                <h5 class="card-title p-1">${product.name}</h5>
                <div class="card-body border border-dark rounded mt-1 mb-1 d-flex flex-column justify-content-between">   
                    
                    <p class="card-text">Price: ${product.price}</p>
                    
                </div>
                <button onclick="products1.removeProductFromCart(${product.id})" class="btn btn-outline-success m-3" style="max-width: fit-content;">Delete</button>
            </div>`
         });
         return concatenatedCartProducts;
    }

    getCartProductsPrice(){
        var fullPrice = 0;
        this.cartList.forEach(function(product){
            fullPrice += product.price
        });
        return `The full price of your products is ${fullPrice}`;
    }

    addProduct(product){
        let id = 1;
        let productsLength = this.products.length - 1;
        if(this.products.length > 0){
            id = this.products[productsLength].id + 1;
        }
        product.id = id;
        let today = new Date;
        product.dateAdded = today;
        this.products.push(product);
        this.updateProductsStorage();
    }

    removeProduct(id){
        for (let index = 0; index < this.products.length; index++) {
            const product = this.products[index];
            if(product.id == id){
                this.products.splice(index, 1);
                
            } 
            
            
        }
        return this.products;
    }

    getProductByID(id){
        // return this.products.filter(product => product.id == id);
        for (let index = 0; index < this.products.length; index++) {
            const product = this.products[index];
            if(product.id == id){
                return product;
            }            
        }
        return null;
    }

    addImageToProduct(id, imgurl){
        let product = this.getProductByID(id);
        if(product){
            return product.addUrl(imgurl);
        }
    }

    showProducts(){
        return this.products;
    }

    showProductsInConsole(){
        // for (let index = 0; index < this.products.length; index++) {
        //     const product = this.products[index];
        //     console.log(product);
        // }

        // this.products.forEach(function(product){
        //     console.log(product);
        // })

        // this.products.forEach(function(product, i){
        //     console.log(`Product with index ${i} and name ${product.name}`)
        // });

        // this.products.forEach(product => {
        //     console.log(product);
        // });

        this.products.forEach((product, i) =>{
            console.log(`Product with index ${i} and name ${product.name}`)
        })
    }

    showProductsFromCategory(category){
        return this.products.filter(product => product.category == category);
        // let listByCategory = [];
        // for (let index = 0; index < this.products.length; index++) {
        //     const product = this.products[index];
        //     if(product.category == category){
        //         listByCategory.push(product);
        //     }            
        // }
        // return listByCategory;
    }

    showProductsByPriceRange(from, to){
        return this.products.filter(product => product.price >= from && product.price <= to);
        // let listByPrice = [];
        // for (let index = 0; index < this.products.length; index++) {
        //     const product = this.products[index];
        //     if(from < product.price && product.price < to){
        //         listByPrice.push(product);
        //     }            
        // }
        // return listByPrice;
    }

    showProductsInStock(){
        return this.products.filter(product => product.isInStock);
        // let listInStock = [];
        // for (let index = 0; index < this.products.length; index++) {
        //     const product = this.products[index];
        //     if(product.isInStock){
        //         listInStock.push(product);
        //     }            
        // }
        // return listInStock;
    }

    showProductsNotInStock(){
        let listNotInStock = [];
        for (let index = 0; index < this.products.length; index++) {
            const product = this.products[index];
            if(!product.isInStock){
                listNotInStock.push(product);
            }            
        }
        return listNotInStock;
    }

    discountCampaignForAllProducts(percent){
        for (let index = 0; index < this.products.length; index++) {
            const product = this.products[index];
            product.addDiscount(percent);
        }
    }

    showSortedProductsByPrice(){
        let sortedProducts = this.products;
        for (let i = 0; i < sortedProducts.length; i++) {
            for (let j = 0; j < sortedProducts.length; j++) {
                if(sortedProducts[j+1]){
                    if(sortedProducts[j].price > sortedProducts[j+1].price){
                        let temp = sortedProducts[j];
                        sortedProducts[j] = sortedProducts[j+1];
                        sortedProducts[j+1] = temp;
                    }
                }
            }
        }
        return sortedProducts;
    }
}