
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Admin | Portfolio</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: Arial, sans-serif;
            color: #e2e8f0;
            background: #0f172a;
        }

        button, input, textarea, select {
            font: inherit;
        }

        .layout {
            display: flex;
            min-height: 100vh;
        }

        .sidebar {
            width: 250px;
            flex-shrink: 0;
            padding: 28px 20px;
            background: #111827;
            border-right: 1px solid #263244;
        }

        .brand {
            margin-bottom: 38px;
            font-size: 22px;
            font-weight: 700;
            color: #c4b5fd;
        }

        .nav-link {
            display: block;
            padding: 13px 15px;
            margin-bottom: 8px;
            border-radius: 10px;
            color: #cbd5e1;
            text-decoration: none;
        }

        .nav-link.active,
        .nav-link:hover {
            color: white;
            background: #6d28d9;
        }

        .main {
            flex: 1;
            min-width: 0;
            padding: 32px;
        }

        .topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 32px;
        }

        h1 {
            margin: 0 0 8px;
            font-size: 28px;
        }

        .muted {
            color: #94a3b8;
        }

        .button {
            padding: 11px 16px;
            border: 0;
            border-radius: 10px;
            color: white;
            background: #7c3aed;
            font-weight: 600;
            cursor: pointer;
        }

        .button:hover {
            background: #6d28d9;
        }

        .button.secondary {
            background: #334155;
        }

        .button.danger {
            background: #b91c1c;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
            margin-bottom: 28px;
        }

        .stat-card,
        .panel {
            padding: 22px;
            border: 1px solid #263244;
            border-radius: 16px;
            background: #1e293b;
        }

        .stat-card .number {
            display: block;
            margin-top: 12px;
            font-size: 30px;
            font-weight: 700;
        }

        .panel-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 20px;
        }

        .panel-header h2 {
            margin: 0;
            font-size: 20px;
        }

        .table-wrap {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }

        th, td {
            padding: 15px 12px;
            border-bottom: 1px solid #334155;
            vertical-align: middle;
        }

        th {
            color: #94a3b8;
            font-size: 13px;
            font-weight: 600;
        }

        td {
            font-size: 14px;
        }

        .actions {
            display: flex;
            gap: 8px;
        }

        .actions .button {
            padding: 8px 11px;
            font-size: 13px;
        }

        .status {
            display: inline-block;
            padding: 5px 9px;
            border-radius: 999px;
            color: #bbf7d0;
            background: rgba(22, 101, 52, 0.35);
            font-size: 12px;
        }

        .status.inactive {
            color: #cbd5e1;
            background: #334155;
        }

        .notice {
            display: none;
            margin-bottom: 20px;
            padding: 13px 16px;
            border-radius: 10px;
            line-height: 1.5;
        }

        .notice.error {
            display: block;
            color: #fecaca;
            background: #451a1a;
        }

        .notice.success {
            display: block;
            color: #bbf7d0;
            background: #14532d;
        }

        .modal {
            position: fixed;
            inset: 0;
            z-index: 10;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(2, 6, 23, 0.8);
        }

        .modal.open {
            display: flex;
        }

        .modal-content {
            width: 100%;
            max-width: 650px;
            max-height: 90vh;
            overflow-y: auto;
            padding: 28px;
            border: 1px solid #334155;
            border-radius: 18px;
            background: #1e293b;
        }

        .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
        }

        .modal-header h2 {
            margin: 0;
        }

        .close-button {
            border: 0;
            color: #cbd5e1;
            background: transparent;
            font-size: 26px;
            cursor: pointer;
        }

        .form-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
        }

        .form-group {
            min-width: 0;
        }

        .form-group.full {
            grid-column: 1 / -1;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 600;
        }

        input, textarea, select {
            width: 100%;
            padding: 12px 13px;
            border: 1px solid #475569;
            border-radius: 10px;
            outline: none;
            color: #f8fafc;
            background: #0f172a;
        }

        input:focus, textarea:focus, select:focus {
            border-color: #a78bfa;
        }

        textarea {
            min-height: 100px;
            resize: vertical;
        }

        select[multiple] {
            min-height: 120px;
        }

        .checkbox-row {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .checkbox-row input {
            width: auto;
        }

        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 24px;
        }

        @media (max-width: 900px) {
            .sidebar {
                width: 200px;
            }

            .main {
                padding: 24px;
            }

            .stats {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 650px) {
            .layout {
                display: block;
            }

            .sidebar {
                width: 100%;
                padding: 16px;
                border-right: 0;
                border-bottom: 1px solid #263244;
            }

            .brand {
                margin-bottom: 14px;
            }

            .nav-link {
                display: inline-block;
                margin: 0 6px 0 0;
            }

            .main {
                padding: 20px 14px;
            }

            .topbar {
                align-items: flex-start;
                flex-direction: column;
            }

            .form-grid {
                grid-template-columns: 1fr;
            }

            .form-group.full {
                grid-column: auto;
            }

            .modal-content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="layout">
        <aside class="sidebar">
            <div class="brand">Farhan<span>.</span>Admin</div>

            <nav aria-label="Navigasi admin">
                <a href="/admin/dashboard" class="nav-link active">
                    Dashboard
                </a>
                <a href="/" class="nav-link">
                    Lihat Portofolio
                </a>
            </nav>
        </aside>

        <main class="main">
            <header class="topbar">
                <div>
                    <h1>Dashboard</h1>
                    <p class="muted">
                        Selamat datang, <span id="adminName">Admin</span>
                    </p>
                </div>

                <button type="button" class="button danger" id="logoutButton">
                    Logout
                </button>
            </header>

            <div id="dashboardMessage" class="notice" role="status"></div>

            <section class="stats" aria-label="Ringkasan proyek">
                <div class="stat-card">
                    <span class="muted">Total Proyek</span>
                    <span class="number" id="totalProjects">0</span>
                </div>

                <div class="stat-card">
                    <span class="muted">Proyek Unggulan</span>
                    <span class="number" id="featuredProjects">0</span>
                </div>

                <div class="stat-card">
                    <span class="muted">Proyek Lainnya</span>
                    <span class="number" id="regularProjects">0</span>
                </div>
            </section>

            <section class="panel">
                <div class="panel-header">
                    <h2>Manajemen Proyek</h2>

                    <button type="button" class="button" id="addProjectButton">
                        + Tambah Proyek
                    </button>
                </div>

                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Proyek</th>
                                <th>Slug</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="projectsTableBody">
                            <tr>
                                <td colspan="4" class="muted">
                                    Memuat data proyek...
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    </div>

    <div class="modal" id="projectModal" role="dialog"
         aria-modal="true" aria-labelledby="modalTitle">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modalTitle">Tambah Proyek</h2>
                <button type="button" class="close-button" id="closeModalButton"
                        aria-label="Tutup form">&times;</button>
            </div>

            <form id="projectForm">
                <input type="hidden" id="projectId">

                <div class="form-grid">
                    <div class="form-group">
                        <label for="projectTitle">Nama Proyek *</label>
                        <input type="text" id="projectTitle" required maxlength="255">
                    </div>

                    <div class="form-group">
                        <label for="projectSlug">Slug *</label>
                        <input type="text" id="projectSlug" required maxlength="255">
                    </div>

                    <div class="form-group full">
                        <label for="projectSummary">Ringkasan *</label>
                        <textarea id="projectSummary" required maxlength="1000"></textarea>
                    </div>

                    <div class="form-group full">
                        <label for="projectDescription">Deskripsi *</label>
                        <textarea id="projectDescription" required></textarea>
                    </div>

                    <div class="form-group full">
                        <label for="projectThumbnail">URL Thumbnail</label>
                        <input type="url" id="projectThumbnail">
                    </div>

                    <div class="form-group">
                        <label for="projectDemo">URL Demo</label>
                        <input type="url" id="projectDemo">
                    </div>

                    <div class="form-group">
                        <label for="projectGithub">URL GitHub</label>
                        <input type="url" id="projectGithub">
                    </div>

                    <div class="form-group full">
                        <label for="projectSkills">Keahlian</label>
                        <select id="projectSkills" multiple>
                            <option value="">Memuat keahlian...</option>
                        </select>
                        <small class="muted">
                            Gunakan Ctrl untuk memilih beberapa keahlian.
                        </small>
                    </div>

                    <div class="form-group full">
                        <label class="checkbox-row">
                            <input type="checkbox" id="projectFeatured">
                            Jadikan proyek unggulan
                        </label>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="button" class="button secondary" id="cancelFormButton">
                        Batal
                    </button>

                    <button type="submit" class="button" id="saveProjectButton">
                        Simpan Proyek
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script src="{{ asset('js/admin.js') }}" defer></script>
</body>
</html>
