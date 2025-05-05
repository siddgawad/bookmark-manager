let API_URL = `http://localhost:${PORT}`;
let PORT = 3000;

document.addEventListener("DOMContentLoaded",()=>{

    const loginForm = document.getElementById("login-form");
    const loginTab = document.getElementById("login-tab");
    const registerTab = document.getElementById("register-tab");
    const registerForm = document.getElementById("register-form");
    
    
    loginTab.addEventListener("click",()=>switchTab("login"));
    registerTab.addEventListener("click",()=>switchTab("register"))


function switchTab(tab){
    loginTab.classList.toggle("active",tab==="login");
    registerTab.classList.toggle("active",tab==="register");
    loginForm.style.display = tab === "login"? "block":"none";
    registerForm.style.display = tab === "register"? "block":"none";
}

document.getElementById("login-button").addEventListener("click",async()=>{
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const message = document.getElementById("login-message");

    try{
        const res = await fetch(API_URL + "/login",{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({username,password}),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        localStorage.setItem("token",data.token);
        localStorage.setItem("username",data.existingUser.username);
        localStorage.setItem("userId",data.existingUser._id);
        window.location.href = "index.html";

    }catch(err){
        message.textContent = err.message;
        

    }
});

document.getElementById("register-button").addEventListener("click",async()=>{
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const confirm = document.getElementById("regitser-confirm-password").value;
    const message = document.getElementById("register-message");

    if(!password===confirm){
        message.textContent = "Passwords do not match";
    }

    try{
        const res = await fetch(API_URL + "/register",{
            method:"POST", "headers":{"Content-Type":"application/json"},
            body:JSON.stringify({username,password})
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.message);
        localStorage.setItem("token",data.token);
        localStorage.setItem("username",data.user.username);
        localStorage.setItem("userId",data.user.id);
        window.location.href="index.html";
    } catch(err){
        message.textContent = err.message;
    }
});


});




