document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.createElement("button");
    toggleBtn.innerText = "Dark Mode";
    toggleBtn.style.margin = "10px";
    document.body.insertBefore(toggleBtn, document.body.firstChild);

    toggleBtn.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
    });

    document.body.classList.add("loaded");

    //form validation

    const form = document.querySelector("form");
    if(form) {
        form.addEventListener("submit", function(event) {
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            let errorMessage = "";

            if (name === "") {
                errorMessage += "Name is required.\n";
            }
            if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
                errorMessage += "Enter a valid email.\n";
            }
            if (message === "") {
                errorMessage += "Message cannot be empty.\n";
            }

            if (errorMessage) {
                event.preventDefault(); // Stop form submission
                alert(errorMessage); // show error message
            }
        });
    }

    const quotes = [
        "Believe you can and you're halfway there.",
        "The only limit to our realization of tomorrow is our doubts of today.",
        "Your time is limited, so don't waste it living someone else's life.",
        "The future belongs to those who belive in the beauty of their dreams.",
        "Don't watch the Clock; do what it does. Keep going."
    ];

    const quoteText = document.getElementById("quote");
    const quoteButton = document.getElementById("new-quote");
    const likeButton = document.getElementById("like-quote");
    const likeCountDisplay = document.getElementById("like-count");
    const speechBubble = document.querySelector(".speech-bubble");

    let currentQuote = ""; // Stores the currently displayed quote
    let likeCounts = JSON.parse(localStorage.getItem("likeCounts")) || {}; // Stores like counts
    let likedQuotes = JSON.parse(localStorage.getItem("likedQuotes")) || {}; // Tracks liked quotes

    function generateQuote() {
        speechBubble.classList.add("hide"); // Start transition out

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            currentQuote = quotes[randomIndex]; // Update the current quote
            quoteText.textContent = currentQuote;

            // Ensure like count is always a number (default to 0 if not set)
            const currentLikes = likeCounts[currentQuote] || 0;
            likeCountDisplay.textContent = currentLikes;

            // Update like button appearance
            if (likedQuotes[currentQuote]) {
                likeButton.classList.add("liked");
                likeButton.innerHTML = ❤️ Like (${currentLikes});
            } else {
                likeButton.classList.remove("liked");
                likeButton.innerHTML = 🤍 Like (${currentLikes});
            }

            speechBubble.classList.remove("hide"); // Transition back in
        }, 400);
    }

    function likeQuote() {
        if (!likeCounts[currentQuote]) {
            likeCounts[currentQuote] = 0; // Initialize if not liked before
        }

        // Toggle like state
        if (likedQuotes[currentQuote]) {
            likeCounts[currentQuote]--; // Decrease like count
            delete likedQuotes[currentQuote]; // Remove from liked list
            likeButton.classList.remove("liked");
        } else {
            likeCounts[currentQuote]++; // Increase like count
            likedQuotes[currentQuote] = true; // Mark as liked
            likeButton.classList.add("liked");
        }

        // Ensure like count is always a number
        const currentLikes = likeCounts[currentQuote] || 0;
        likeButton.innerHTML = likedQuotes[currentQuote] ? ❤️ Like (${currentLikes}) : 🤍 Like (${currentLikes});
        likeCountDisplay.textContent = currentLikes;

        // Save updated data
        localStorage.setItem("likeCounts", JSON.stringify(likeCounts));
        localStorage.setItem("likedQuotes", JSON.stringify(likedQuotes));
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    // Load dark mode preference from localStorage
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    // Load a quote immediately when the page loads
    generateQuote();

    // Change quote when the button is clicked
    quoteButton.addEventListener("click", generateQuote);

    // Like/unlike quote when button is clicked
    likeButton.addEventListener("click", likeQuote);
});
