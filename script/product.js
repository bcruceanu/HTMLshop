class Product{

    constructor(name, description, price, category){
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.imageUrl = "";
        this.isInStock = true;
        this.discountPercentage = 0;
        this.id = 0;
        this.dateAdded = null;
        this.ratings = [];
    }

    changePrice(newPrice){
        if(newPrice > 0){
            this.price = newPrice;
            console.log(`New price is ${newPrice}`);
        }else{
            console.log("invalid price");
        }
    }

    changeDescription(newDescription){
        if(newDescription){
            this.description = newDescription;
            console.log("Description changed!");
        }else{
            console.log("invalid description");
        }
    }

    changeName(newName){
        if(newName){
            this.name = newName;
            console.log("Name changed!");
        }else{
            console.log("invalid name!");
        }
    }

    setStock(stock){    
        if(stock){
            this.isInStock = true;
        }else{
            this.isInStock = false;
        }
    }

    addDiscount(discount){
        if(discount > 0){
            this.discountPercentage += discount;
            console.log(`Item discounted by ${discount}`);
        }else{
            console.log("invalid discount added");
        }
    }

    changeCategory (newCategory){
        if(newCategory){
            this.category = newCategory;
            console.log("Category changed!");
        }else{
            console.log("invalid category!");
        }
    }

    addUrl(url){
        if(url){
            this.imageUrl = url;
            // console.log("Product image changed!");
        }else{
            console.log("invalid url!");
        }
    }

}