// ===== Registration =====
const registerForm = document.getElementById("registerForm");
if(registerForm){
  registerForm.addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    // Check if email already exists
    if(users.some(u => u.email === email)){
      alert("Email already registered");
      return;
    }

    users.push({name,email,password});
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration Successful!");
    window.location.href = "login.html";
  });
}

// ===== Login =====
const loginForm = document.getElementById("loginForm");
if(loginForm){
  loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if(user){
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password");
    }
  });
}

// ===== Events =====
const events = [
  {id: 1, name: "Music Concert", image: "https://source.unsplash.com/400x200/?concert"},
  {id: 2, name: "Art Exhibition", image: "https://source.unsplash.com/400x200/?art"},
  {id: 3, name: "Football Match", image: "https://source.unsplash.com/400x200/?football"},
  {id: 4, name: "Theatre Play", image: "https://source.unsplash.com/400x200/?theatre"}
];

// ===== Load Events on Dashboard =====
const eventContainer = document.getElementById("eventContainer");
if(eventContainer){
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if(!user){
    window.location.href = "login.html"; // Redirect if not logged in
  }
  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <img src="${event.image}" alt="${event.name}">
      <div class="details">
        <h3>${event.name}</h3>
        <input type="number" min="1" placeholder="Number of tickets" id="tickets-${event.id}">
        <button onclick="bookTicket(${event.id})">Book Now</button>
      </div>
    `;
    eventContainer.appendChild(card);
  });
}

// ===== Booking Function =====
function bookTicket(eventId){
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const tickets = document.getElementById(`tickets-${eventId}`).value;
  if(!tickets || tickets <= 0){
    alert("Enter valid number of tickets");
    return;
  }
  const event = events.find(e => e.id === eventId);
  localStorage.setItem("booking", JSON.stringify({user,eventName:event.name,ticketCount:tickets}));
  window.location.href = "confirmation.html";
}

// ===== Confirmation Page =====
const ticketDetails = document.getElementById("ticketDetails");
if(ticketDetails){
  const booking = JSON.parse(localStorage.getItem("booking"));
  if(!booking){
    window.location.href = "dashboard.html";
  }
  ticketDetails.innerHTML = `
    Hello ${booking.user.name},<br>
    You have successfully booked <b>${booking.ticketCount}</b> tickets for <b>${booking.eventName}</b>.
  `;
}

// ===== Logout =====
const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn){
  logoutBtn.addEventListener("click", function(){
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });
}
