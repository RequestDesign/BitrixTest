import { initializeHeader } from "./header.js";
import { initializeCategories } from "./categories.js";
import { initializeProducts } from "./products.js";
import { initializeFilters } from "./filters.js";
import { initializeBlog } from "./blog.js";

document.addEventListener("DOMContentLoaded", function () {
  initializeHeader();
  initializeCategories();
  initializeProducts();
  initializeFilters();
  initializeBlog()
});

window.addEventListener("load", function () {
  const loaderWrapper = document.querySelector(".loader-wrapper");
  loaderWrapper.style.opacity = "0";
  loaderWrapper.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    loaderWrapper.style.display = "none";
  }, 500);
});

