document.querySelector(".loginButton").addEventListener("click", loginUser);

async function loginUser() {
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;

    try {
        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            console.log('Giriş başarılı!');
            window.location.href = 'admin.html';
        } else {
            console.error('Giriş başarısız:', response.statusText);
        }
    } catch (error) {
        console.error('Giriş sırasında bir hata oluştu:', error);
    }
}
