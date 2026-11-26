
'use strict';

const API_BASE = '/api';
const token = localStorage.getItem('admin_token');

const adminName = document.getElementById('adminName');
const messageBox = document.getElementById('dashboardMessage');
const projectsTableBody = document.getElementById('projectsTableBody');

const totalProjects = document.getElementById('totalProjects');
const featuredProjects = document.getElementById('featuredProjects');
const regularProjects = document.getElementById('regularProjects');

const projectModal = document.getElementById('projectModal');
const projectForm = document.getElementById('projectForm');
const projectSkills = document.getElementById('projectSkills');

let projects = [];
let skills = [];

// Jika token tidak tersedia, arahkan kembali ke login.
if (!token) {
    window.location.href = '/admin/login';
}

// Tampilkan nama admin dari localStorage.
adminName.textContent = localStorage.getItem('admin_name') || 'Admin';

// Helper request API dengan autentikasi Sanctum.
async function apiRequest(endpoint, options = {}) {
    const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers
    };

    if (options.body) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
    });

    if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_name');
        window.location.href = '/admin/login';
        throw new Error('Sesi admin berakhir. Silakan login kembali.');
    }

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
        let errorMessage = result.message || 'Terjadi kesalahan pada server.';

        if (result.errors) {
            errorMessage = Object.values(result.errors)
                .flat()
                .join(' ');
        }

        throw new Error(errorMessage);
    }

    return result;
}

// Tampilkan pesan pada dashboard.
function showMessage(message, type = 'success') {
    messageBox.textContent = message;
    messageBox.className = `notice ${type}`;

    window.setTimeout(() => {
        messageBox.className = 'notice';
        messageBox.textContent = '';
    }, 5000);
}

// Ambil data array dari respons API.
function getDataArray(result) {
    if (Array.isArray(result.data)) {
        return result.data;
    }

    return [];
}

// Buat elemen teks dengan aman.
function createTextElement(tagName, text, className = '') {
    const element = document.createElement(tagName);
    element.textContent = text ?? '';

    if (className) {
        element.className = className;
    }

    return element;
}

// Buat tombol aksi.
function createActionButton(label, className, projectId, action) {
    const button = document.createElement('button');

    button.type = 'button';
    button.textContent = label;
    button.className = `button ${className}`;
    button.dataset.action = action;
    button.dataset.id = projectId;

    return button;
}

// Render tabel proyek.
function renderProjects() {
    projectsTableBody.replaceChildren();

    totalProjects.textContent = projects.length;

    const featuredCount = projects.filter(
        project => Boolean(project.is_featured)
    ).length;

    featuredProjects.textContent = featuredCount;
    regularProjects.textContent = projects.length - featuredCount;

    if (projects.length === 0) {
        const row = document.createElement('tr');
        const cell = createTextElement(
            'td',
            'Belum ada data proyek.',
            'muted'
        );

        cell.colSpan = 4;
        row.appendChild(cell);
        projectsTableBody.appendChild(row);
        return;
    }

    projects.forEach(project => {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.appendChild(
            createTextElement('strong', project.title)
        );

        const slugCell = createTextElement('td', project.slug);

        const statusCell = document.createElement('td');
        const status = createTextElement(
            'span',
            project.is_featured ? 'Unggulan' : 'Reguler',
            project.is_featured ? 'status' : 'status inactive'
        );

        statusCell.appendChild(status);

        const actionCell = document.createElement('td');
        const actions = document.createElement('div');
        actions.className = 'actions';

        actions.appendChild(
            createActionButton('Edit', 'secondary', project.id, 'edit')
        );

        actions.appendChild(
            createActionButton('Hapus', 'danger', project.id, 'delete')
        );

        actionCell.appendChild(actions);

        row.append(
            titleCell,
            slugCell,
            statusCell,
            actionCell
        );

        projectsTableBody.appendChild(row);
    });
}

// Ambil proyek dari API.
async function loadProjects() {
    projectsTableBody.replaceChildren();

    const loadingRow = document.createElement('tr');
    const loadingCell = createTextElement(
        'td',
        'Memuat data proyek...',
        'muted'
    );

    loadingCell.colSpan = 4;
    loadingRow.appendChild(loadingCell);
    projectsTableBody.appendChild(loadingRow);

    try {
        const result = await apiRequest('/admin/projects');

        projects = getDataArray(result);
        renderProjects();
    } catch (error) {
        showMessage(error.message, 'error');

        projectsTableBody.replaceChildren();

        const row = document.createElement('tr');
        const cell = createTextElement(
            'td',
            'Gagal memuat data proyek.',
            'muted'
        );

        cell.colSpan = 4;
        row.appendChild(cell);
        projectsTableBody.appendChild(row);
    }
}

// Ambil daftar keahlian dari API publik.
async function loadSkills() {
    try {
        const response = await fetch(`${API_BASE}/portfolio/skills`, {
            headers: {
                Accept: 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Gagal mengambil data keahlian.');
        }

        const result = await response.json();
        skills = getDataArray(result);

        projectSkills.replaceChildren();

        skills.forEach(skill => {
            const option = document.createElement('option');

            option.value = skill.id;
            option.textContent = skill.name;

            projectSkills.appendChild(option);
        });
    } catch (error) {
        projectSkills.replaceChildren();

        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Keahlian gagal dimuat';

        projectSkills.appendChild(option);

        showMessage(error.message, 'error');
    }
}

// Buka modal form.
function openModal(project = null) {
    projectForm.reset();

    document.getElementById('projectId').value = '';

    if (project) {
        document.getElementById('modalTitle').textContent =
            'Edit Proyek';

        document.getElementById('projectId').value = project.id;
        document.getElementById('projectTitle').value =
            project.title || '';
        document.getElementById('projectSlug').value =
            project.slug || '';
        document.getElementById('projectSummary').value =
            project.summary || '';
        document.getElementById('projectDescription').value =
            project.description || '';
        document.getElementById('projectThumbnail').value =
            project.thumbnail_url || '';
        document.getElementById('projectDemo').value =
            project.demo_url || '';
        document.getElementById('projectGithub').value =
            project.github_url || '';
        document.getElementById('projectFeatured').checked =
            Boolean(project.is_featured);

        const selectedSkillIds = (project.skills || []).map(
            skill => String(skill.id)
        );

        Array.from(projectSkills.options).forEach(option => {
            option.selected = selectedSkillIds.includes(option.value);
        });
    } else {
        document.getElementById('modalTitle').textContent =
            'Tambah Proyek';

        Array.from(projectSkills.options).forEach(option => {
            option.selected = false;
        });
    }

    projectModal.classList.add('open');
}

// Tutup modal form.
function closeModal() {
    projectModal.classList.remove('open');
}

// Ambil nilai form untuk dikirim ke API.
function getProjectFormData() {
    const selectedSkillIds = Array.from(projectSkills.selectedOptions)
        .map(option => Number(option.value))
        .filter(Number.isInteger);

    return {
        title: document.getElementById('projectTitle').value.trim(),
        slug: document.getElementById('projectSlug').value.trim(),
        summary: document.getElementById('projectSummary').value.trim(),
        description: document.getElementById('projectDescription').value.trim(),
        thumbnail_url:
            document.getElementById('projectThumbnail').value.trim() || null,
        demo_url:
            document.getElementById('projectDemo').value.trim() || null,
        github_url:
            document.getElementById('projectGithub').value.trim() || null,
        is_featured:
            document.getElementById('projectFeatured').checked,
        skill_ids: selectedSkillIds
    };
}

// Simpan proyek baru atau perubahan proyek.
projectForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const projectId = document.getElementById('projectId').value;
    const saveButton = document.getElementById('saveProjectButton');

    saveButton.disabled = true;
    saveButton.textContent = 'Menyimpan...';

    try {
        const payload = getProjectFormData();

        if (projectId) {
            await apiRequest(`/admin/projects/${projectId}`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            });

            showMessage('Proyek berhasil diperbarui.');
        } else {
            await apiRequest('/admin/projects', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            showMessage('Proyek berhasil ditambahkan.');
        }

        closeModal();
        await loadProjects();
    } catch (error) {
        showMessage(error.message, 'error');
    } finally {
        saveButton.disabled = false;
        saveButton.textContent = 'Simpan Proyek';
    }
});

// Klik tombol tambah proyek.
document.getElementById('addProjectButton').addEventListener(
    'click',
    function () {
        openModal();
    }
);

// Klik tombol tutup atau batal.
document.getElementById('closeModalButton').addEventListener(
    'click',
    closeModal
);

document.getElementById('cancelFormButton').addEventListener(
    'click',
    closeModal
);

// Tutup modal jika klik area di luar form.
projectModal.addEventListener('click', function (event) {
    if (event.target === projectModal) {
        closeModal();
    }
});

// Aksi edit dan hapus pada tabel.
projectsTableBody.addEventListener('click', async function (event) {
    const button = event.target.closest('button[data-action]');

    if (!button) {
        return;
    }

    const projectId = Number(button.dataset.id);
    const action = button.dataset.action;

    const project = projects.find(
        item => Number(item.id) === projectId
    );

    if (!project) {
        showMessage('Data proyek tidak ditemukan.', 'error');
        return;
    }

    if (action === 'edit') {
        openModal(project);
        return;
    }

    if (action === 'delete') {
        const confirmed = window.confirm(
            `Yakin ingin menghapus proyek "${project.title}"?`
        );

        if (!confirmed) {
            return;
        }

        button.disabled = true;

        try {
            await apiRequest(`/admin/projects/${projectId}`, {
                method: 'DELETE'
            });

            showMessage('Proyek berhasil dihapus.');
            await loadProjects();
        } catch (error) {
            showMessage(error.message, 'error');
            button.disabled = false;
        }
    }
});

// Logout admin.
document.getElementById('logoutButton').addEventListener(
    'click',
    async function () {
        const confirmed = window.confirm(
            'Apakah kamu yakin ingin logout?'
        );

        if (!confirmed) {
            return;
        }

        try {
            await apiRequest('/logout', {
                method: 'POST'
            });
        } catch (error) {
            // Token tetap dihapus dari browser meskipun request gagal.
        } finally {
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_name');

            window.location.href = '/admin/login';
        }
    }
);

// Inisialisasi dashboard.
async function initializeDashboard() {
    await Promise.all([
        loadProjects(),
        loadSkills()
    ]);
}

initializeDashboard();
