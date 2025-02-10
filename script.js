// Select HTML elements by their ID
const quoteText = document.getElementById("quote");
const newQuoteButton = document.getElementById("new-quote");
const copyButton = document.getElementById("copy-quote");
const copiedMessage = document.getElementById("copied-message");

/**
 * Function to fetch a random quote from Quotable API.
 * It updates the quoteText with the received quote.
 */
async function fetchQuote() {
    try {
        // Remove the fade-in effect before loading a new quote
        quoteText.classList.remove("show");

        // Fetch a random quote from the Quotable API
        const response = await fetch("https://api.quotable.io/random");

        // Convert the response to JSON format
        const data = await response.json();

        // Update the displayed quote with the fetched quote and author
        quoteText.textContent = `"${data.content}" — ${data.author}`;

        // Add fade-in animation for a smooth transition
        quoteText.classList.add("show");
    } catch (error) {
        // Handle error if API request fails
        quoteText.textContent = "Failed to load quote. Try again!";
    }
}

/**
 * Event listener to copy the quote text to clipboard
 */
copyButton.addEventListener("click", () => {
    // Copy the text inside the quote element to the clipboard
    navigator.clipboard.writeText(quoteText.textContent);

    // Show the "Copied" message
    copiedMessage.classList.remove("hidden");

    // Hide the copied message after 2 seconds
    setTimeout(() => copiedMessage.classList.add("hidden"), 2000);
});

/**
 * Event listener to fetch a new quote when the button is clicked
 */
newQuoteButton.addEventListener("click", fetchQuote);

// Fetch a quote when the page loads for the first time
fetchQuote();
