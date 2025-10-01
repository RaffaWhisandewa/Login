// Database user lokal (simulasi)
        const users = {
            'admin@gmail.com': 'admin123',
            // Tambahkan user lain di sini jika perlu
        };

        let currentUser = null;

        // Handle login form
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            // Validasi email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Format email tidak valid');
                return;
            }

            // Mode 1: Cek user terdaftar
            if (users[email]) {
                if (users[email] === password) {
                    loginSuccess(email);
                } else {
                    showError('Password salah');
                }
            } 
            // Mode 2: Terima semua email (untuk demo)
            else {
                // Untuk demo, terima password apapun minimal 6 karakter
                if (password.length >= 6) {
                    loginSuccess(email);
                } else {
                    showError('Password minimal 6 karakter');
                }
            }
        });

        // Login berhasil
        function loginSuccess(email) {
            currentUser = {
                email: email,
                loginTime: new Date().toLocaleString('id-ID')
            };
            
            showSuccess('Login berhasil!');
            
            setTimeout(() => {
                showDashboard();
            }, 1000);
        }

        // Tampilkan dashboard
        function showDashboard() {
            document.getElementById('loginBox').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            
            document.getElementById('userEmail').textContent = currentUser.email;
            document.getElementById('loginTime').textContent = currentUser.loginTime;
        }

        // Handle logout
        document.getElementById('logoutBtn').addEventListener('click', function() {
            currentUser = null;
            document.getElementById('loginBox').style.display = 'block';
            document.getElementById('dashboard').style.display = 'none';
            document.getElementById('loginForm').reset();
            hideMessages();
        });

        // Tampilkan error
        function showError(message) {
            const errorDiv = document.getElementById('errorMessage');
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            document.getElementById('successMessage').style.display = 'none';
            
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 5000);
        }

        // Tampilkan success
        function showSuccess(message) {
            const successDiv = document.getElementById('successMessage');
            successDiv.textContent = message;
            successDiv.style.display = 'block';
            document.getElementById('errorMessage').style.display = 'none';
        }

        // Hide messages
        function hideMessages() {
            document.getElementById('errorMessage').style.display = 'none';
            document.getElementById('successMessage').style.display = 'none';
        }