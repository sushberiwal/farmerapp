

var signupForm = document.getElementById("signupForm")
var firstName= document.getElementById("firstName")
var lastName= document.getElementById("lastName")
var role= document.getElementById("role")
var documents= document.getElementById("documents")
var phoneN= document.getElementById("phoneN")
var emailN= document.getElementById("email")
var addressN= document.getElementById("address")
var passwordN= document.getElementById("password")

var loginForm= document.getElementById("loginForm")
var phoneLogin= document.getElementById("phoneLogin")
var passwordLogin= document.getElementById("passwordLogin")


var promise = new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(position => {
      resolve(position);
    });
  })

if(signupForm){
    signupForm.addEventListener("submit", async function(e){
        e.preventDefault();
        const name = firstName.value + lastName.value;
        const phone = parseInt("91"+ phoneN.value);
        const email= emailN.value;
        const position= await promise;
        const latitude = position.coords.latitude;
        const longitude= position.coords.longitude;
        const address= addressN.value;
        const password= passwordN.value;

const response= await axios.post("/signup",{
    name, phone, email, latitude, longitude, address, password

})
console.log(response)
if(response.data.result){
    alert(`${name} have just signed in`)
if(role.value=="buyer")
{
    window.location.assign("/listing")
}
else{
    window.location.assign("/profile")
}

}
else{
alert("Account creation failed!")

}


})
}



if(loginForm){

    loginForm.addEventListener("submit", async function(e){
        e.preventDefault();
        const phone = parseInt(phoneLogin.value);
        const password= passwordLogin.value;

        const response= await axios.post("/login",{
            phone, password
        
        })

        console.log(response)
        if(response.data.result=="undefined")
        {
            alert(`Please enter data`)
        }
        else if(response.data.result=="Wrong Credentials")
        {
            alert(`Wrong credentials`)
        }
        else if(response.data.result=="Logged in")
        {
            alert(`User logged in`)  
            if(response.data.role=="buyer")
{
    window.location.assign("/listing")
}
else{
    window.location.assign("/profile")
}

        }
        else if(response.data.result=="not found!"){
            alert(`User not found!`)
        }
        else{
            alert(`No user found! Please sign in`)
        }
})
}