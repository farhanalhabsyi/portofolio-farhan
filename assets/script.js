
// =====================================
// 1. MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuToggle.innerHTML = "✕";
    } else {
        menuToggle.innerHTML = "☰";
    }
});

// =====================================
// 2. CLOSE MENU AFTER CLICK
// =====================================

const navigationItems = document.querySelectorAll(".nav-links a");

navigationItems.forEach(function (item) {
    item.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.innerHTML = "☰";
    });
});

// =====================================
// 3. AUTOMATIC COPYRIGHT YEAR
// =====================================

const currentYear = new Date().getFullYear();

console.log("Portfolio Farhan berhasil dimuat!");
console.log("Tahun:", currentYear);
