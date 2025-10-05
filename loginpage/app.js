const loginform = document.getElementById("loginform")
const signupform = document.getElementById("Signupform")

const loginBtn = document.getElementById("loginbtn");
const loader = document.getElementById("loader");
const mainContent = document.getElementById("home");
const msg = document.getElementById("msg")

loginform.addEventListener("click", console.log("hello"))


 function submitdata(event) {
  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password1");

  const userdata = {
    name: name.value,
    email: email.value,
    password: password.value
  };

  // Get existing users from localStorage, or initialize with empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user already exists (by email)
  let userExists = users.some(user => user.email === userdata.email);

  if (userExists) {
    alert("User already exists with this email!");
  } else {
    // Add new user
    users.push(userdata);

    // Save updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign up successful!");

    // Optional: clear input fields
    name.value = "";
    email.value = "";
    password.value = "";
  }
}

function gotohomepage(){
      // mainContent.style.display = "none";
      loader.style.display = "flex";

      // Simulate loading for 2 seconds
      setTimeout(() => {
        loader.style.display = "none";
        mainContent.style.display = "block";
        window.location.replace("../index.html");
      }, 1000);


}

function checkuser(event){
    event.preventDefault();

    let name = document.getElementById("loginemail").value;
    let password = document.getElementById("loginpassword").value;

    let users = JSON.parse(localStorage.getItem("users"))|| [];
    let matchuser = users.find(user => user.name === name ||user.email === name && user.password === password)
    if(matchuser){
        msg.innerHTML = "loged in succsecfully"
        console.log("welcome", matchuser.name);
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", "Akshan");
            gotohomepage()
    }else{
        alert("username and password dosent match");
    }

}



  