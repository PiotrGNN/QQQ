document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', toggleLogin);
    }
    createLoginOverlay();
    if (localStorage.getItem('loggedIn')) {
        enableEditing();
    }
});

function createLoginOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'loginOverlay';
    overlay.innerHTML = `
        <form id="loginForm">
            <label>Hasło: <input type="password" id="password"></label>
            <button type="submit">Zaloguj</button>
        </form>`;
    document.body.appendChild(overlay);
    overlay.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const pass = document.getElementById('password').value;
        if (pass === 'dauksz') {
            localStorage.setItem('loggedIn', '1');
            overlay.style.display = 'none';
            enableEditing();
        } else {
            alert('Błędne hasło');
        }
    });
}

function toggleLogin() {
    const overlay = document.getElementById('loginOverlay');
    if (localStorage.getItem('loggedIn')) {
        localStorage.removeItem('loggedIn');
        window.location.reload();
    } else {
        overlay.style.display = 'flex';
    }
}

function enableEditing() {
    const editable = document.querySelectorAll('[contenteditable="false"]');
    editable.forEach(el => {
        el.contentEditable = 'true';
        el.classList.add('editable');
    });
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Zapisz zmiany';
    saveBtn.style.position = 'fixed';
    saveBtn.style.bottom = '10px';
    saveBtn.style.right = '10px';
    document.body.appendChild(saveBtn);
    saveBtn.addEventListener('click', saveContent);
    loadContent();
}

function saveContent() {
    const pageId = location.pathname.split('/').pop();
    const data = {};
    document.querySelectorAll('[contenteditable="true"]').forEach(el => {
        data[el.id] = el.innerHTML;
    });
    localStorage.setItem('content-' + pageId, JSON.stringify(data));
    alert('Zapisano!');
}

function loadContent() {
    const pageId = location.pathname.split('/').pop();
    const saved = localStorage.getItem('content-' + pageId);
    if (saved) {
        const data = JSON.parse(saved);
        Object.keys(data).forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.innerHTML = data[id];
            }
        });
    }
}
