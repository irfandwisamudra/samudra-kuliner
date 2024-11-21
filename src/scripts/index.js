import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  const drawerToggle = document.getElementById("drawer-toggle");
  const navigationDrawer = document.getElementById("navigation-drawer");
  const closeDrawer = document.getElementById("close-drawer");

  drawerToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    navigationDrawer.classList.toggle("active");
  });

  closeDrawer.addEventListener("click", (event) => {
    event.stopPropagation();
    navigationDrawer.classList.remove("active");
  });

  document.addEventListener("click", (event) => {
    if (
      navigationDrawer.classList.contains("active") &&
      !navigationDrawer.contains(event.target)
    ) {
      navigationDrawer.classList.remove("active");
    }
  });

  navigationDrawer.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  const mediaQuery = window.matchMedia("(min-width: 768px)");
  const handleResize = () => {
    if (mediaQuery.matches) {
      navigationDrawer.classList.remove("active");
    }
  };

  mediaQuery.addEventListener("change", handleResize);
});

document.addEventListener("DOMContentLoaded", async () => {
  const restaurantContainer = document.getElementById("restaurants");

  // Fetch data dari file JSON
  const fetchRestaurants = async () => {
    try {
      const response = await fetch("./data/DATA.json");
      const data = await response.json();
      return data.restaurants;
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  // Render daftar restoran
  const renderRestaurants = async () => {
    const restaurants = await fetchRestaurants();
    if (restaurants) {
      restaurants.forEach((restaurant) => {
        const restaurantElement = document.createElement("div");
        restaurantElement.classList.add("restaurant-item");

        restaurantElement.innerHTML = `
          <div class="image-container">
            <img src="${restaurant.pictureId}" alt="${restaurant.name}" />
            <span class="restaurant-city">${restaurant.city}</span>
            <div class="restaurant-rating">
              <img src="./images/star.png" alt="Star Logo" />
              <span>${restaurant.rating}</span>
            </div>
          </div>
          <div class="restaurant-info">
            <h3>${restaurant.name}</h3>
            <p>${restaurant.description}</p>
          </div>
        `;

        restaurantContainer.appendChild(restaurantElement);
      });
    }
  };

  renderRestaurants();
});
