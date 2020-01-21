var signupForm = document.getElementById("signupForm");
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var rolen = document.getElementById("role");
var documents = document.getElementById("documents");
var phoneN = document.getElementById("phoneN");
var emailN = document.getElementById("email");
var addressN = document.getElementById("address");
var passwordN = document.getElementById("password");
var loginForm = document.getElementById("loginForm");
var phoneLogin = document.getElementById("phoneLogin");
var passwordLogin = document.getElementById("passwordLogin");
var promise = new Promise(function(resolve, reject) {
  navigator.geolocation.getCurrentPosition(position => {
    resolve(position);
  });
});
var cropForm = document.querySelector(".crop-form");

if (signupForm) {
  signupForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const name = firstName.value + lastName.value;
    const phone = parseInt("91" + phoneN.value);
    const email = emailN.value;
    const position = await promise;
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const address = addressN.value;
    const password = passwordN.value;
    const role = rolen.value;

    const response = await axios.post("api/user/signup", {
      name,
      phone,
      email,
      latitude,
      longitude,
      address,
      password
    });
    // console.log(response)
    if (response.data.result) {
      alert(`${name} have just signed in`);
      if (role.value == "buyer") {
        window.location.assign("/listing");
      } else {
        window.location.assign("/profile");
      }
    } else {
      alert("Account creation failed!");
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const phone = parseInt(phoneLogin.value);
    const password = passwordLogin.value;

    const response = await axios.post("api/user/login", {
      phone,
      password
    });

    console.log(response);

    if (response.data.result == "Wrong Credentials") {
      alert(`Wrong credentials`);
    } else if (response.data.result == "User  loggedIn") {
      alert(`User logged in`);
      if (response.data.role == "buyer") {
        window.location.assign("/listing");
      } else {
        window.location.assign("/profile");
      }
    }
  });
}

if (cropForm) {
  cropForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const inputs = document.getElementsByTagName("input");
    const name = inputs[0].value;
    const price = inputs[1].value;
    const quantity = inputs[2].value;

    const res = await axios.post("/api/crops", {
      name,
      price,
      quantity
    });
    if (res.data.success) {
      alert("crop added to listing");
      location.assign("/profile");
    } else {
      alert("crop could not be added some data was missing");
    }
  });
}


