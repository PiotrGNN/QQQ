let themeToggle;
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        if (localStorage.getItem('loggedIn')) {
            loginBtn.textContent = 'Wyloguj';
        }
        loginBtn.addEventListener('click', toggleLogin);
    }
    createLoginOverlay();
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    themeToggle = document.getElementById('themeToggle');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
        nav.querySelectorAll('a').forEach(link =>
            link.addEventListener('click', () => {
                nav.classList.remove('open');
            })
        );
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        applyTheme();
    }
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
            overlay.classList.remove('active');
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
        requestAnimationFrame(() => overlay.classList.add('active'));
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
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Resetuj zmiany';
    resetBtn.style.position = 'fixed';
    resetBtn.style.bottom = '10px';
    resetBtn.style.left = '10px';
    document.body.appendChild(resetBtn);
    resetBtn.addEventListener('click', resetContent);
    loadContent();
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.textContent = 'Wyloguj';
    }
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

function resetContent() {
    const pageId = location.pathname.split('/').pop();
    localStorage.removeItem('content-' + pageId);
    window.location.reload();
}

function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme();
}

function applyTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        document.body.classList.remove('dark');
        if (themeToggle) themeToggle.textContent = '🌙';
    }
}
const quotes = [
    "Polityk – osoba, która potrafi godzinami mówić bez powiedzenia czegokolwiek istotnego.",
    "Urlop to czas, gdy odpoczywasz tak intensywnie, że potrzebujesz kolejnego urlopu.",
    "W Polsce rzeczy niemożliwe załatwiam od ręki, na cuda trzeba chwilę poczekać.",
    "Najlepsze dowcipy pisze samo życie."
];

function displayRandomQuote() {
    const el = document.getElementById('cytatDnia');
    if (!el) return;
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    el.textContent = q;
}

function filterEvents(category) {
    document.querySelectorAll('#kalendarz li').forEach(li => {
        if (category === 'all' || li.dataset.category === category) {
            li.style.display = 'list-item';
        } else {
            li.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('quoteBtn');
    if (btn) {
        btn.addEventListener('click', displayRandomQuote);
        displayRandomQuote();
    }
    filterEvents("all");
    document.querySelectorAll('.filters button').forEach(b => {
        b.addEventListener('click', () => filterEvents(b.dataset.filter));
    });
});
