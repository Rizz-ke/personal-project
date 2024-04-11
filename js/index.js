function renderProducts() {
    const productsContainer = document.getElementById('products-container');

    // Fetch data from db.json
    fetch('db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON data
        })
        .then(data => {
            // Data fetched successfully, now you can work with it
            console.log(data); // Log the fetched data to the console for verification

            // Iterate over each product and create HTML elements to display them
            data.Products.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('product-card');
                card.innerHTML = `
                    <img src="${product.image}" alt="${product['product-name']}">
                    <h3>${product['product-name']}</h3>
                    <p>${product.description}</p>
                    <p>${product['product-price']}</p>
                    <button class="add-to-cart-btn">Add to Cart</button>
                `;

                // Add event listener to the button
                const button = card.querySelector('.add-to-cart-btn');
                button.addEventListener('click', () => {
                    alert(`Product added to cart: ${product['product-name']}`);
                });

                productsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle errors gracefully
        });
}
const navigationLinks = document.querySelectorAll('.navigation a');
navigationLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        const targetSectionId = this.getAttribute('href').slice(1); // Get the ID of the target section
        const targetSection = document.getElementById(targetSectionId); // Get the target section element

        // Hide all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
        });

        // Show only the target section
        targetSection.style.display = 'block';

        event.preventDefault(); // Prevent the default behavior of the link
    });
});


// Call the function to render the products when the DOM content is loaded
document.addEventListener('DOMContentLoaded', renderProducts);
