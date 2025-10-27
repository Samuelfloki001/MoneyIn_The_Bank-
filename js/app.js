import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6V2kgHU58J1gcWGSmqxrsly29F56HzDA",
  authDomain: "money-in-the-bank-app.firebaseapp.com",
  projectId: "money-in-the-bank-app",
  storageBucket: "money-in-the-bank-app.firebasestorage.app",
  messagingSenderId: "690852849677",
  appId: "1:690852849677:web:7bd6a3d3f70ee03dbb4d44",
  measurementId: "G-W8P5268HS4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Splash -> Username page -> Homepage/Admin
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("splash").style.display = "none";

    const mainDiv = document.createElement("div");
    mainDiv.id = "main";
    mainDiv.innerHTML = `
      <h2>Sign in with Google</h2>
      <button id="googleLogin">Continue with Google</button>
      <div id="userBox">
        <h3>Enter Username</h3>
        <input type="text" id="usernameInput" placeholder="Enter username" />
        <button id="okBtn">OK</button>
      </div>
      <div id="adminBox" style="display:none;">
        <h2>Admin Page</h2>
        <p>Welcome, Admin!</p>
      </div>
    `;
    document.body.appendChild(mainDiv);
    mainDiv.style.display = "block";

    const googleLogin = document.getElementById("googleLogin");
    const userBox = document.getElementById("userBox");
    const adminBox = document.getElementById("adminBox");

    googleLogin.addEventListener("click", async () => {
      alert("Google Login clicked!");
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        alert(Signed in as ${user.displayName});
        googleLogin.style.display = "none";
        userBox.style.display = "block";
      } catch (err) {
        alert("Login failed: " + err.message);
      }
    });

    document.getElementById("okBtn").addEventListener("click", async () => {
      const username = document.getElementById("usernameInput").value.trim();
      if (!username) return alert("Please enter a username");

      const userRef = doc(db, "users", username);
      const existing = await getDoc(userRef);

      if (existing.exists()) {
        alert("Username already taken!");
      } else {
        await setDoc(userRef, { username });
        alert(Welcome ${username}!);
        userBox.style.display = "none";

        if (username.toLowerCase() -eq "admin") {
          adminBox.style.display = "block";
        } else {
          mainDiv.innerHTML = <h1>🏦 Home Page</h1><p>Hello, ${username}!</p>;
        }
      }
    });
  }, 3000);
});
