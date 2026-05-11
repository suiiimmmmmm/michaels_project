// ratings.js
import { initializeApp } from "https://gstatic.com";
import { getAuth, signInAnonymously } from "https://gstatic.com";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://gstatic.com";

const firebaseConfig = { /* YOUR CONFIG HERE */ };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Attach the function to the global window object so HTML buttons can find it
window.submitRating = async (ratingValue) => {
    const nameInput = document.getElementById('raterName');
    const name = nameInput ? nameInput.value : "";
    
    if (!name) return alert("Please enter your name!");

    const pageId = window.location.pathname.split("/").pop().replace(".html", "") || "home";

    try {
        const { user } = await signInAnonymously(auth);
        const ratingRef = doc(db, 'content', pageId, 'ratings', user.uid);

        await setDoc(ratingRef, {
            displayName: name,
            rating: ratingValue,
            timestamp: serverTimestamp()
        }, { merge: true });

        alert("Rating saved successfully!");
    } catch (e) {
        console.error("Error saving rating:", e);
        alert("Failed to save rating.");
    }
};
