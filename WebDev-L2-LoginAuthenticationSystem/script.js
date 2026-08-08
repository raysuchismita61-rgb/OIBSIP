async function hashPassword(password){

const msgUint8 = new TextEncoder().encode(password);

const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);

const hashArray = Array.from(new Uint8Array(hashBuffer));

const hashHex = hashArray.map(b=>b.toString(16).padStart(2,'0')).join('');

return hashHex;

}
const registerForm=document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit",async(e)=>{

e.preventDefault();

const username=document.getElementById("username").value.trim();

const email=document.getElementById("email").value.trim();

const password=document.getElementById("password").value;

const message=document.getElementById("registerMessage");

if(username===""||email===""||password===""){

message.innerHTML="All fields are required.";

return;

}

const pattern=/^(?=.*\d).{8,}$/;

if(!pattern.test(password)){

message.innerHTML="Password must contain at least 8 characters and one number.";

return;

}

let users=JSON.parse(localStorage.getItem("users"))||[];

let exists=users.find(user=>user.username===username||user.email===email);

if(exists){

message.innerHTML="Username or Email already exists.";

return;

}

const hashedPassword=await hashPassword(password);

users.push({

username,

email,

password:hashedPassword

});

localStorage.setItem("users",JSON.stringify(users));

alert("Registration Successful!");

window.location="index.html";

});

}

const loginForm=document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit",async(e)=>{

e.preventDefault();

const username=document.getElementById("loginUsername").value.trim();

const password=document.getElementById("loginPassword").value;

const hashedPassword=await hashPassword(password);

const users=JSON.parse(localStorage.getItem("users"))||[];

const user=users.find(u=>

(u.username===username||u.email===username)

&&

u.password===hashedPassword

);

if(user){

localStorage.setItem("loggedInUser",user.username);

window.location="dashboard.html";

}

else{

document.getElementById("loginMessage").innerHTML="Invalid username/email or password.";

}

});

}

if(window.location.pathname.includes("dashboard.html")){

const loggedIn=localStorage.getItem("loggedInUser");

if(!loggedIn){

window.location="index.html";

}

document.getElementById("welcomeUser").innerHTML=loggedIn;

document.getElementById("logout").addEventListener("click",()=>{

localStorage.removeItem("loggedInUser");

window.location="index.html";

});

}