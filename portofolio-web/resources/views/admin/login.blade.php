
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin | Portfolio</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 24px;
            font-family: Arial, sans-serif;
            color: #f8fafc;
            background:
                radial-gradient(circle at top left, #312e81, transparent 40%),
                #0f172a;
        }

        .login-card {
            width: 100%;
            max-width: 420px;
            padding: 36px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 24px;
            background: rgba(30, 41, 59, 0.92);
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3);
        }

        .brand {
            margin-bottom: 28px;
            text-align: center;
        }

        .brand-icon {
            display: inline-grid;
            width: 58px;
            height: 58px;
            place-items: center;
            margin-bottom: 16px;
            border-radius: 18px;
            background: #7c3aed;
            font-size: 26px;
            font-weight: bold;
        }

        h1 {
            margin: 0 0 10px;
            font-size: 28px;
        }

        .subtitle {
            margin: 0;
            color: #94a3b8;
            line-height: 1.6;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 600;
        }

        input {
            width: 100%;
            padding: 14px 16px;
            border: 1px solid #475569;
            border-radius: 12px;
            outline: none;
            color: #f8fafc;
            background: #0f172a;
            font-size: 15px;
        }

        input:focus {
            border-color: #a78bfa;
            box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.15);
        }

        button {
            width: 100%;
            padding: 14px;
            border: 0;
            border-radius: 12px;
            color: white;
            background: #7c3aed;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.2s;
        }

        button:hover {
            background: #6d28d9;
        }

        button:disabled {
            opacity: 0.65;
            cursor: wait;
        }

        .message {
            display: none;
            margin-bottom: 18px;
            padding: 12px 14px;
            border-radius: 10px;
            font-size: 14px;
            line-height: 1.5;
        }

        .message.error {
            display: block;
            color: #fecaca;
            background: rgba(127, 29, 29, 0.35);
            border: 1px solid rgba(248, 113, 113, 0.25);
        }

        .footer {
            margin-top: 24px;
            text-align: center;
            font-size: 13px;
            color: #64748b;
        }

        .footer a {
            color: #c4b5fd;
            text-decoration: none;
        }

        @media (max-width: 480px) {
            .login-card {
                padding: 28px 22px;
            }

            h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <main class="login-card">
        <header class="brand">
            <div class="brand-icon" aria-hidden="true">F</div>
            <h1>Admin Login</h1>
            <p class="subtitle">
                Masuk untuk mengelola proyek portofolio.
            </p>
        </header>

        <div id="loginMessage" class="message" role="alert"></div>

        <form id="loginForm">
            <div class="form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="admin@demo.com"
                    autocomplete="username"
                    required
                >
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Masukkan password"
                    autocomplete="current-password"
                    required
                >
            </div>

            <button type="submit" id="loginButton">
                Masuk ke Dashboard
            </button>
        </form>

        <footer class="footer">
            <a href="/">← Kembali ke portofolio</a>
        </footer>
    </main>

    <script>
        const loginForm = document.getElementById('loginForm');
        const loginMessage = document.getElementById('loginMessage');
        const loginButton = document.getElementById('loginButton');

        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            loginMessage.className = 'message';
            loginMessage.textContent = '';
            loginButton.disabled = true;
            loginButton.textContent = 'Memproses...';

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();

                if (!response.ok || !result.data?.token) {
                    throw new Error(
                        result.message || 'Email atau password tidak valid.'
                    );
                }

                localStorage.setItem('admin_token', result.data.token);
                localStorage.setItem(
                    'admin_name',
                    result.data.user?.name || 'Admin'
                );

                window.location.href = '/admin/dashboard';
            } catch (error) {
                loginMessage.textContent =
                    error.message || 'Tidak dapat terhubung ke server.';
                loginMessage.className = 'message error';
            } finally {
                loginButton.disabled = false;
                loginButton.textContent = 'Masuk ke Dashboard';
            }
        });
    </script>
</body>
</html>
