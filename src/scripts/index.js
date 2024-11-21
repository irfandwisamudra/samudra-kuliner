import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const drawerToggle = document.getElementById("drawer-toggle");
  const navigationDrawer = document.getElementById("navigation-drawer");
  const closeDrawer = document.getElementById("close-drawer");

  drawerToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    navigationDrawer.classList.toggle("active");

    if (navigationDrawer.classList.contains("active")) {
      gsap.fromTo(
        navigationDrawer,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }
      );
    } else {
      gsap.to(navigationDrawer, { x: -300, opacity: 0, duration: 0.5 });
    }
  });

  closeDrawer.addEventListener("click", (event) => {
    event.stopPropagation();
    navigationDrawer.classList.remove("active");

    gsap.to(navigationDrawer, { x: -300, opacity: 0, duration: 0.5 });
  });

  document.addEventListener("click", (event) => {
    if (
      navigationDrawer.classList.contains("active") &&
      !navigationDrawer.contains(event.target)
    ) {
      navigationDrawer.classList.remove("active");

      gsap.to(navigationDrawer, { x: -300, opacity: 0, duration: 0.5 });
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
      restaurants.forEach((restaurant, index) => {
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

        gsap.from(restaurantElement, {
          opacity: 0,
          y: 50,
          duration: 1,
          delay: index * 0.2 + 1,
        });

        restaurantContainer.appendChild(restaurantElement);
      });
    }
  };

  renderRestaurants();
});

// Menambahkan animasi GSAP untuk hero section
gsap.from(".hero-title", { opacity: 0, y: -50, duration: 1 });
gsap.from(".hero-description", { opacity: 0, y: 30, duration: 1, delay: 0.5 });
gsap.from(".hero-buttons", { opacity: 0, y: 20, duration: 1, delay: 1 });
gsap.from(".restaurant-title", { opacity: 0, y: 50, duration: 1, delay: 1 });
gsap.from(".tips-title", { opacity: 0, y: 50, duration: 1, delay: 2.5 });
gsap.from(".tips-item", { opacity: 0, y: 50, duration: 1, delay: 3 });
