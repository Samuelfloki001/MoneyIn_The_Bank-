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

const googleLogin = document.getElementById("googleLogin");
const userBox = document.getElementById("userBox");
const usernameInput = document.getElementById("usernameInput");
const okBtn = document.getElementById("okBtn");

googleLogin.addEventListener("click", async () => {
  try {
    alert("Starting Google login...");
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert(Signed in as ${user.displayName});
    googleLogin.style.display = "none";
    userBox.style.display = "block";
  } catch (err) {
    alert("Login failed: " + err.message);
  }
});

okBtn.addEventListener("click", async () => {
  const username = usernameInput.value.trim();
  if (!username) return alert("Please enter a username");

  const userRef = doc(db, "users", username);
  const existing = await getDoc(userRef);

  if (existing.exists()) {
    alert("Username already taken!");
  } else {
    await setDoc(userRef, { username });
    alert(Welcome ${username}!);
    window.location.href = "../pages/home.html";
  }
});
