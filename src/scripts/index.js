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
    event.stopPropagation(); // Prevent clicks inside drawer from closing it
  });

  const mediaQuery = window.matchMedia("(min-width: 768px)");
  const handleResize = () => {
    if (mediaQuery.matches) {
      navigationDrawer.classList.remove("active");
    }
  };

  mediaQuery.addEventListener("change", handleResize);
});
