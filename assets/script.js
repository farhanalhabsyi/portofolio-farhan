
// =====================================
// 1. MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.innerHTML = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
    );
});

// =====================================
// 2. CLOSE MENU AFTER CLICK
// =====================================

const navigationItems = document.querySelectorAll(".nav-links a");

navigationItems.forEach(function (item) {
    item.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.innerHTML = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu navigasi");
    });
});

// =====================================
// 3. AUTOMATIC COPYRIGHT YEAR
// =====================================

const currentYear = new Date().getFullYear();

console.log("Portfolio Farhan berhasil dimuat!");
console.log("Tahun:", currentYear);

// =====================================
// 4. CONTACT FORM
// =====================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        const emailSubject = encodeURIComponent(subject);
        const emailBody = encodeURIComponent(
            `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
        );

        const mailtoLink =
            `mailto:cloudalhabsyi@gmail.com?subject=${emailSubject}&body=${emailBody}`;

        window.location.href = mailtoLink;
    });
}
