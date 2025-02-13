document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.createElement("button");
    toggleBtn.innerText = "Dark Mode";
    toggleBtn.style.margin = "10px";
    document.body.insertBefore(toggleBtn, document.body.firstChild);

    toggleBtn.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
    });

    document.body.classList.add("loaded");

    // Form validation
    const form = document.querySelector("form");
    if (form) {
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
                alert(errorMessage); // Show error message
            }
        });
    }

    const quotes = [
        "Believe you can and you're halfway there.",
        "The only limit to our realization of tomorrow is our doubts of today.",
        "Your time is limited, so don't waste it living someone else's life.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Don't watch the clock; do what it does. Keep going."
    ];

    const quoteText = document.getElementById("quote");
    const quoteButton = document.getElementById("new-quote");
    const speechBubble = document.querySelector(".speech-bubble");

    function generateQuote() {
        speechBubble.classList.add("hide"); // Start transition out

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            quoteText.textContent = quotes[randomIndex]; // Display new quote
            speechBubble.classList.remove("hide"); // Transition back in
        }, 400); // Wait for animation to finish before changing text
    }

    // Load a quote immediately when the page loads
    generateQuote();

    // Change quote when the button is clicked
    quoteButton.addEventListener("click", generateQuote);
});
