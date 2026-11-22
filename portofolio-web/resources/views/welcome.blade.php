<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Identitas Mahasiswa - Laravel</title>

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 24px;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #111827, #312e81);
            color: #f9fafb;
        }

        .card {
            width: 100%;
            max-width: 600px;
            padding: 32px;
            background: #1f2937;
            border: 1px solid #374151;
            border-radius: 20px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }

        .header {
            text-align: center;
            margin-bottom: 28px;
        }

        .header h1 {
            font-size: 28px;
            color: #a5b4fc;
            margin-bottom: 8px;
        }

        .header p {
            color: #9ca3af;
            font-size: 14px;
        }

        .identity {
            display: grid;
            gap: 16px;
        }

        .item {
            padding: 14px 16px;
            background: #111827;
            border-radius: 10px;
            border-left: 4px solid #818cf8;
        }

        .label {
            display: block;
            margin-bottom: 6px;
            font-size: 12px;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .value {
            font-size: 16px;
            font-weight: 600;
            overflow-wrap: anywhere;
        }

        .database {
            margin-top: 24px;
            padding: 18px;
            text-align: center;
            background: #064e3b;
            border: 1px solid #047857;
            border-radius: 12px;
        }

        .database .value {
            color: #6ee7b7;
        }

        .footer {
            margin-top: 24px;
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
        }

        @media (max-width: 480px) {
            .card {
                padding: 22px;
            }

            .header h1 {
                font-size: 23px;
            }
        }
    </style>
</head>

<body>
    <main class="card">
        <header class="header">
            <h1>Identitas Mahasiswa</h1>
            <p>Latihan 4a — Pengenalan Laravel</p>
        </header>

        <section class="identity">
            <div class="item">
                <span class="label">Nama</span>
                <div class="value">M Farhan Alhabsyi</div>
            </div>

            <div class="item">
                <span class="label">NPM</span>
                <div class="value">22312084</div>
            </div>

            <div class="item">
                <span class="label">Program Studi</span>
                <div class="value">Informatika</div>
            </div>

            <div class="item">
                <span class="label">Universitas</span>
                <div class="value">Universitas Teknokrat Indonesia</div>
            </div>

            <div class="item">
                <span class="label">Kelas</span>
                <div class="value">IF 23C</div>
            </div>
        </section>

        <section class="database">
            <span class="label">Database Laravel Aktif</span>
            <div class="value">{{ $databaseName }}</div>
        </section>

        <footer class="footer">
            Dibangun menggunakan Laravel dan Blade Template
        </footer>
    </main>
</body>
</html>