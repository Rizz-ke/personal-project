function renderProducts() {
  // Function to render products on the page
  const productsContainer = document.getElementById("products-container");

  fetch("db.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Logging the fetched data
      console.log(data);

      // Loop through each product and create a card for it
      data.Products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
                    <img src="${product.image}" alt="${product["product-name"]}">
                    <h3>${product["product-name"]}</h3>
                    <p>${product.description}</p>
                    <p>${product["product-price"]}</p>
                    <button class="add-to-cart-btn">Add to Cart</button>
                `;

        // Add click event to each "Add to Cart" button
        const button = card.querySelector(".add-to-cart-btn");
        button.addEventListener("click", () => {
          alert(`Product added to cart: ${product["product-name"]}`);
        });

        productsContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

const navigationLinks = document.querySelectorAll(".navigation a");
navigationLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    // Handle navigation to different sections on link click
    const targetSectionId = this.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetSectionId);

    // Hide all sections except the target section
    document.querySelectorAll("section").forEach((section) => {
      section.style.display = "none";
    });

    // Display the target section
    targetSection.style.display = "block";

    event.preventDefault();
  });
});

// Call renderProducts function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", renderProducts);
