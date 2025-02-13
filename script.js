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
});

