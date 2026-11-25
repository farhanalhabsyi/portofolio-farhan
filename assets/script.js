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
const contactFormStatus = document.getElementById("contactFormStatus");

let contactToastTimer;

function showContactToast(message, type = "success") {
    let toast = document.getElementById("contactToast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "contactToast";
        toast.className = "contact-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");

        document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.classList.remove("success", "error");
    toast.classList.add(type, "show");

    clearTimeout(contactToastTimer);

    contactToastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 4000);
}

if (contactForm && contactFormStatus) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonText = submitButton.textContent;

        const senderName = document
            .getElementById("contactName")
            .value.trim();

        const senderEmail = document
            .getElementById("contactEmail")
            .value.trim();

        const subject = document
            .getElementById("contactSubject")
            .value.trim();

        const body = document
            .getElementById("contactMessage")
            .value.trim();

        function showContactStatus(message, isSuccess) {
            contactFormStatus.hidden = false;
            contactFormStatus.textContent = message;

            contactFormStatus.className = isSuccess
                ? "text-sm text-green-400"
                : "text-sm text-red-400";

            showContactToast(message, isSuccess ? "success" : "error");
        }

        submitButton.disabled = true;
        submitButton.textContent = "Mengirim pesan...";
        contactFormStatus.hidden = true;

        try {
            const response = await fetch(
                `${API_BASE_URL}/messages`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({
                        sender_name: senderName,
                        sender_email: senderEmail,
                        subject: subject,
                        body: body
                    })
                }
            );

            const result = await response.json();

            if (response.status === 422) {
                const validationErrors = result.errors
                    ? Object.values(result.errors).flat().join(" ")
                    : result.message || "Periksa kembali data yang kamu masukkan.";

                showContactStatus(validationErrors, false);
                return;
            }

            if (response.status === 429) {
                showContactStatus(
                    "Terlalu banyak pesan dikirim. Silakan tunggu sebentar sebelum mencoba lagi.",
                    false
                );
                return;
            }

            if (!response.ok) {
                throw new Error(
                    result.message || "Pesan gagal dikirim. Silakan coba lagi."
                );
            }

            showContactStatus(
                result.message || "Pesan berhasil dikirim!",
                true
            );

            contactForm.reset();
        } catch (error) {
            console.error("Error Contact Form:", error);

            showContactStatus(
                error.message || "Terjadi kesalahan. Periksa koneksi dan coba lagi.",
                false
            );
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// =====================================
// 5. FETCH API - SKILLS
// =====================================

const API_BASE_URL = "http://127.0.0.1:8000/api/portfolio";

const skillsDataContainer = document.getElementById("skillsDataContainer");

// Escape HTML agar data API aman ditampilkan sebagai teks
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;",
        };

        return entities[character];
    });
}

async function fetchSkills() {
    if (!skillsDataContainer) return;

    // Loading skeleton
    skillsDataContainer.innerHTML = `
        <div class="skills-container skeleton-container" aria-label="Memuat skills">
            ${Array.from({ length: 6 }, function () {
                return `
                    <div class="skill-card skeleton">
                        <span class="skeleton-line"></span>
                    </div>
                `;
            }).join("")}
        </div>
    `;

    try {
        const response = await fetch(`${API_BASE_URL}/skills`);

        if (!response.ok) {
            throw new Error("Gagal mengambil data skills.");
        }

        const result = await response.json();
        const skills = result.data || [];

        if (skills.length === 0) {
            skillsDataContainer.innerHTML = `
                <p class="section-description">
                    Belum ada data skills yang tersedia.
                </p>
            `;
            return;
        }

        // Kelompokkan skills berdasarkan kategori
        const groupedSkills = skills.reduce(function (groups, skill) {
            const category = skill.category || "Lainnya";

            if (!groups[category]) {
                groups[category] = [];
            }

            groups[category].push(skill);
            return groups;
        }, {});

        skillsDataContainer.innerHTML = Object.entries(groupedSkills)
            .map(function ([category, categorySkills]) {
                return `
                    <div class="skill-group">
                        <h3 class="skill-category-title">
                            ${escapeHTML(category)}
                        </h3>

                        <div class="skills-container">
                            ${categorySkills.map(function (skill) {
                                return `
                                    <div class="skill-card">
                                        ${escapeHTML(skill.name)}
                                    </div>
                                `;
                            }).join("")}
                        </div>
                    </div>
                `;
            })
            .join("");
    } catch (error) {
        console.error("Error Fetch Skills:", error);

        skillsDataContainer.innerHTML = `
            <p class="section-description">
                Data skills gagal dimuat. Silakan coba muat ulang halaman.
            </p>
        `;
    }
}

fetchSkills();

// =====================================
// 6. FETCH API - PROJECTS
// =====================================

const projectsDataContainer = document.getElementById("projectsDataContainer");

async function fetchProjects() {
    if (!projectsDataContainer) return;

    projectsDataContainer.innerHTML = `
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2" aria-label="Memuat proyek">
            ${Array.from({ length: 2 }, function () {
                return `
                    <div class="rounded-2xl border border-purple-500/20 bg-white/5 p-7">
                        <div class="skeleton-line mb-5" style="width: 45%; height: 16px;"></div>
                        <div class="skeleton-line mb-3" style="width: 90%;"></div>
                        <div class="skeleton-line mb-3" style="width: 75%;"></div>
                        <div class="skeleton-line" style="width: 55%;"></div>
                    </div>
                `;
            }).join("")}
        </div>
    `;

    try {
        const response = await fetch(`${API_BASE_URL}/projects`);

        if (!response.ok) {
            throw new Error("Gagal mengambil data projects.");
        }

        const result = await response.json();
        const projects = result.data || [];

        const projectCardTargets = {
            edubridge: "project-edubridge",
            smartstock: "project-smartstock"
        };

        const additionalProjects = [];

        projects.forEach(function (project) {
            const targetId = projectCardTargets[project.slug];

            if (targetId) {
                const targetCard = document.getElementById(targetId);

                if (!targetCard) return;

                const description = targetCard.querySelector(
                    ".project-content > p:not(.project-category)"
                );

                const tags = targetCard.querySelector(".project-tags");

                if (description) {
                    description.textContent = project.description || "";
                }

                if (tags) {
                    tags.innerHTML = (project.skills || [])
                        .map(function (skill) {
                            return `<span>${escapeHTML(skill.name)}</span>`;
                        })
                        .join("");
                }

                return;
            }

            const projectSkills = (project.skills || [])
                .map(function (skill) {
                    return `<span>${escapeHTML(skill.name)}</span>`;
                })
                .join("");

            additionalProjects.push(`
                <div class="project-card">
                    <div class="project-image">
                        <div class="project-fallback">
                            ${escapeHTML(project.title)}
                        </div>
                    </div>

                    <div class="project-content">
                        <p class="project-category">PROJECT · PORTFOLIO</p>

                        <h3>${escapeHTML(project.title)}</h3>

                        <p>${escapeHTML(project.description || "")}</p>

                        <div class="project-tags">
                            ${projectSkills}
                        </div>
                    </div>
                </div>
            `);
        });

        projectsDataContainer.innerHTML = additionalProjects.join("");
    } catch (error) {
        console.error("Error Fetch Projects:", error);

        projectsDataContainer.innerHTML = "";
    }
}

fetchProjects();

// =====================================
// 7. FETCH API - CERTIFICATES
// =====================================

const certificatesDataContainer = document.getElementById(
    "certificatesDataContainer"
);

async function fetchCertificates() {
    if (!certificatesDataContainer) return;

    certificatesDataContainer.innerHTML = `
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2" aria-label="Memuat sertifikat">
            ${Array.from({ length: 2 }, function () {
                return `
                    <div class="rounded-2xl border border-purple-500/20 bg-white/5 p-7">
                        <div class="skeleton-line mb-5" style="width: 55%; height: 16px;"></div>
                        <div class="skeleton-line mb-3" style="width: 70%;"></div>
                        <div class="skeleton-line mb-3" style="width: 45%;"></div>
                        <div class="skeleton-line" style="width: 85%;"></div>
                    </div>
                `;
            }).join("")}
        </div>
    `;

    try {
        const response = await fetch(
            `${API_BASE_URL}/certificates`
        );

        if (!response.ok) {
            throw new Error("Gagal mengambil data sertifikat.");
        }

        const result = await response.json();

        const certificates = Array.isArray(result.data)
            ? result.data
            : [];

        // Abaikan record contoh/dummy dari API
        const realCertificates = certificates.filter(function (certificate) {
            const title = (certificate.title || "").toLowerCase();
            const issuer = (certificate.issuer || "").toLowerCase();
            const description = (
                certificate.description || ""
            ).toLowerCase();

            return !(
                title.includes("contoh") ||
                issuer.includes("dummy") ||
                description.includes("bukan sertifikat asli")
            );
        });

        if (realCertificates.length === 0) {
            certificatesDataContainer.innerHTML = `
                <p class="section-description">
                    Belum ada sertifikat tambahan dari API.
                </p>
            `;
            return;
        }

        certificatesDataContainer.innerHTML = `
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                ${realCertificates.map(function (certificate) {
                    const certificateLink = certificate.credential_url
                        ? `
                            <a
                                href="${escapeHTML(certificate.credential_url)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-purple-400 hover:text-purple-300"
                            >
                                Lihat Sertifikat
                            </a>
                        `
                        : "";

                    return `
                        <div class="rounded-2xl border border-purple-500/20 bg-white/5 p-7">
                            <h3 class="text-xl font-semibold">
                                ${escapeHTML(certificate.title || "Sertifikat")}
                            </h3>

                            <p class="mt-2 text-sm text-gray-400">
                                ${escapeHTML(certificate.issuer || "")}
                            </p>

                            <p class="mt-3 text-sm text-gray-400">
                                ${escapeHTML(
                                    certificate.issued_date
                                        ? new Date(certificate.issued_date)
                                            .toLocaleDateString("id-ID")
                                        : ""
                                )}
                            </p>

                            <p class="mt-3 text-sm text-gray-300">
                                ${escapeHTML(certificate.description || "")}
                            </p>

                            <div class="mt-4">
                                ${certificateLink}
                            </div>
                        </div>
                    `;
                }).join("")}
            </div>
        `;
    } catch (error) {
        console.error("Error Fetch Certificates:", error);

        certificatesDataContainer.innerHTML = `
            <p class="section-description">
                Data sertifikat dari API belum dapat dimuat.
            </p>
        `;
    }
}

fetchCertificates();

// =====================================
// 8. BONUS - GITHUB PROFILE API
// =====================================

const githubDataContainer = document.getElementById(
    "githubDataContainer"
);

async function fetchGitHubProfile() {
    if (!githubDataContainer) return;

    githubDataContainer.innerHTML = `
        <div class="skeleton-line mb-4" style="width: 40%; height: 18px;"></div>
        <div class="skeleton-line mb-3" style="width: 70%;"></div>
        <div class="skeleton-line" style="width: 50%;"></div>
    `;

    try {
        const response = await fetch(
            "https://api.github.com/users/farhanalhabsyi"
        );

        if (!response.ok) {
            if (response.status === 403 || response.status === 429) {
                throw new Error(
                    "Batas permintaan GitHub API tercapai. Coba lagi nanti."
                );
            }

            throw new Error("Gagal mengambil profil GitHub.");
        }

        const profile = await response.json();

        githubDataContainer.innerHTML = `
            <div class="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
                <img
    src="${escapeHTML(profile.avatar_url)}"
    alt="Foto profil GitHub"
    class="h-24 w-24 rounded-full border border-purple-500/30"
    loading="lazy"
    onerror="this.onerror=null; this.src='assets/profile.jpg';"
>

                <div class="flex-1">
                    <h3 class="text-2xl font-semibold">
                        ${escapeHTML(profile.name || profile.login)}
                    </h3>

                    <p class="mt-1 text-purple-400">
                        @${escapeHTML(profile.login)}
                    </p>

                    <p class="mt-3 text-sm leading-relaxed text-gray-400">
                        ${escapeHTML(profile.bio || "Profil GitHub")}
                    </p>

                    <div class="mt-5 flex flex-wrap justify-center gap-5 text-sm text-gray-300 sm:justify-start">
                        <span>
                            <strong>${profile.public_repos}</strong> Repositories
                        </span>

                        <span>
                            <strong>${profile.followers}</strong> Followers
                        </span>

                        <span>
                            <strong>${profile.following}</strong> Following
                        </span>
                    </div>

                    <a
                        href="${escapeHTML(profile.html_url)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="mt-5 inline-block text-purple-400 hover:text-purple-300"
                    >
                        Kunjungi Profil GitHub ↗
                    </a>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error GitHub API:", error);

        githubDataContainer.innerHTML = `
            <p class="section-description">
                Profil GitHub belum dapat dimuat.
                <a
                    href="https://github.com/farhanalhabsyi"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-purple-400 hover:text-purple-300"
                >
                    Buka profil GitHub secara langsung.
                </a>
            </p>
        `;
    }
}

fetchGitHubProfile();

// =====================================
// LATIHAN 6 - DEBOUNCED PROJECT SEARCH
// =====================================

const projectSearch = document.getElementById("projectSearch");
let projectSearchTimer;

if (projectSearch) {
    projectSearch.addEventListener("input", function () {
        clearTimeout(projectSearchTimer);

        projectSearchTimer = setTimeout(function () {
            const searchTerm = projectSearch.value
                .trim()
                .toLowerCase();

            const projectCards = document.querySelectorAll(
                ".projects-container .project-card"
            );

            projectCards.forEach(function (card) {
                const projectText = card.textContent.toLowerCase();

                card.style.display = projectText.includes(searchTerm)
                    ? ""
                    : "none";
            });
        }, 300);
    });
}