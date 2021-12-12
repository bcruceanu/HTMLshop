class User{
    constructor(name, email, password){
        this.name = name;
        this.email = email;
        this.password = password;
        this.isLoggedIn = false;
    }
    
    logIn(){
        if(this.isLoggedIn){
            return alert('You are allready logged in!');
        }else{
            localStorage.setItem('isLoggedIn', true);
        }
    }

    logout(){
        if(!this.isLoggedIn){//  if isNotLoggedIn
            console.log("You're not logged in DUUUDE!");
        }else{
            this.isLoggedIn = false;
            console.log("You're logged out, we're glad!");
        }
    }
}