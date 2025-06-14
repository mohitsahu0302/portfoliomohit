// script.js
// This file contains JavaScript for interactive elements and smooth scrolling.

document.addEventListener('DOMContentLoaded', () => {
    // Select all navigation links
    const navLinks = document.querySelectorAll('nav a.nav-link');

    // Add click event listener to each navigation link for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Prevent the default anchor link behavior
            event.preventDefault();

            // Get the target section's ID from the href attribute
            const targetId = link.getAttribute('href').substring(1); // Remove the '#'
            const targetSection = document.getElementById(targetId);

            // Check if the target section exists
            if (targetSection) {
                // Scroll to the target section smoothly
                // Using scrollIntoView with 'smooth' behavior for a native smooth scroll experience
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                // Optional: For single-page applications, you might want to update the URL hash
                // history.pushState(null, null, `#${targetId}`);
            }
        });
    });

    // Optional: Add a simple "active" class to the navigation link when its section is in view.
    // This is more complex and might require an Intersection Observer API.
    // For this basic setup, we'll keep it simple with just smooth scrolling.

    // Example of how to implement a basic form submission handling (client-side only)
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            // In a real application, you would send this data to a backend server
            // using fetch() or XMLHttpRequest.
            console.log('Form Submitted!');
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Display a message box instead of alert()
            const responseMessage = `Thank you, ${name}! Your message has been received.\nEmail: ${email}\nMessage: ${message}`;
            displayMessageBox(responseMessage);

            // Clear the form fields after submission (optional)
            contactForm.reset();
        });
    }

    /**
     * Displays a custom message box instead of using alert().
     * @param {string} message - The message to display.
     */
    function displayMessageBox(message) {
        // Create message box elements
        const messageBoxOverlay = document.createElement('div');
        messageBoxOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]';
        messageBoxOverlay.style.fontFamily = "'Inter', sans-serif";

        const messageBox = document.createElement('div');
        // Changed bg-white to bg-gray-700 and text-gray-800 to text-gray-100 for dark theme
        messageBox.className = 'bg-gray-700 p-8 rounded-lg shadow-xl text-center max-w-sm mx-4 transform transition-all duration-300 scale-0 opacity-0';

        const messageText = document.createElement('p');
        messageText.className = 'text-gray-100 text-lg mb-6'; // Changed text to gray-100 for dark theme
        messageText.textContent = message;

        const closeButton = document.createElement('button');
        // Changed bg-indigo-600 to bg-teal-400 for dark theme consistency
        closeButton.className = 'bg-teal-400 hover:bg-teal-500 text-gray-900 font-bold py-2 px-6 rounded-full transition duration-300';
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', () => {
            // Animate out before removing
            messageBox.classList.remove('scale-100', 'opacity-100');
            messageBox.classList.add('scale-0', 'opacity-0');
            messageBoxOverlay.classList.add('opacity-0'); // Fade out overlay
            setTimeout(() => {
                document.body.removeChild(messageBoxOverlay);
            }, 300); // Allow time for transition
        });

        messageBox.appendChild(messageText);
        messageBox.appendChild(closeButton);
        messageBoxOverlay.appendChild(messageBox);
        document.body.appendChild(messageBoxOverlay);

        // Animate in the message box
        setTimeout(() => {
            messageBox.classList.remove('scale-0', 'opacity-0');
            messageBox.classList.add('scale-100', 'opacity-100');
            messageBoxOverlay.classList.remove('opacity-0');
        }, 10); // Small delay to ensure transition applies
    }
});