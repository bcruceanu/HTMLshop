class UserService{
    constructor(){
        this.users = this.getUsersFromStorage();
    }

    registerUser(user){
        this.users.push(user);
        this.updateUserStorage();
    }

    updateUserStorage(){
        localStorage.setItem('registeredUsers', JSON.stringify(this.users));
    }

    getUsersFromStorage(){
        let registeredUsers =  JSON.parse(localStorage.getItem('registeredUsers'));
        if(registeredUsers){
            return registeredUsers
        }else{
            return [];
        }
    }

    removeUser(userName){
        for (let index = 0; index < this.users.length; index++) {
            const user = this.users[index];
            if(user.userName == userName){
                this.users.splice(index, 1);
                console.log(`${userName} has been removed`);
                return;
            }
        }
    }

    getUserByUserName(userName){
        for (let index = 0; index < this.users.length; index++) {
            const user = this.users[index];
            if(user.userName == userName){
                return user;
            }
        }
        console.log('User not found');
    }

    showLoggedUsers(){
        console.log('Users that are logged in are:')
        for (let index = 0; index < this.users.length; index++) {
            const user = this.users[index];
            if(user.isLoggedIn){
                console.log(user.userName);
            }
        }
    }

    logInUser(email, password){
        var registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'))
        
        for (let index = 0; index < registeredUsers.length; index++) {
            const user = registeredUsers[index];
            if(user.email == email && user.password == password){
                if(user.isLoggedIn){
                    return alert('You are allready logged in!');
                }else{
                    return localStorage.setItem('isLoggedIn', true);
                }
            }else{
                alert ('Login denied!')
            }
        }    
    }
    
    logOut(userName){
        var user = this.getUserByUserName(userName);
        user.logout();
    }
}
