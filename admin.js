const ADMIN_PASS = "хуйвам";
const BASE_URLS = [
    "http://10.4.16.221/?text=",
    "http://10.4.16.222/?text=",
    "http://10.4.16.223/?text=",
    "http://10.4.16.224/?text=",
    "http://10.4.16.225/?text=",
    "http://10.4.16.226/?text="
];

function saveStatusToAllWindows(statusText, statusColor) {
    ['1', '2', '3', '4', '5', '6'].forEach(id => {
        localStorage.setItem(`panel_window_${id}_status`, statusText);
        localStorage.setItem(`panel_window_${id}_color`, statusColor);
    });
    // Также обновляем общий статус
    localStorage.setItem('panel_status_text', statusText);
    localStorage.setItem('panel_status_color', statusColor);
}

const passwordInput = document.getElementById('passwordInput');
const passwordError = document.getElementById('passwordError');
const crashBtn = document.getElementById('crashBtn');
const offBtn = document.getElementById('offBtn');
const settingsModalEl = document.getElementById('settingsModal');
function showError(show) {
    if (show) {
        passwordError.style.display = 'block';
        passwordInput.classList.add('is-invalid');
    } else {
        passwordError.style.display = 'none';
        passwordInput.classList.remove('is-invalid');
    }
}
function sendToAllWindows(text) {
    BASE_URLS.forEach(url => {
        const fullUrl = url + text;
        navigator.sendBeacon(fullUrl);
        console.log("📡 Отправлено:", fullUrl);
    });
}
function checkPasswordAndAction(actionText, actionName) {
    const pass = passwordInput.value;
    
    if (pass === ADMIN_PASS) {
        sendToAllWindows(actionText);
        
        const statusBox = document.getElementById('statusBox');
        if (statusBox) {
            statusBox.className = 'status-box alert alert-warning text-center mb-4 py-3';
            statusBox.innerHTML = `<span id="status-text" class="fw-bold">${actionName}</span>`;
        }
        const modal = bootstrap.Modal.getInstance(settingsModalEl);
        if (modal) {
            modal.hide();
        }
        
        passwordInput.value = '';
        showError(false);
        
        alert(`✅ ${actionName} выполнено`);
        if (actionText === "X") {
            saveStatusToAllWindows('⏸ Перерыв', 'warning');
        } else {
            saveStatusToAllWindows('⏹ Выключено', 'danger');
        };
    } else {
        showError(true);
        passwordInput.value = '';
        passwordInput.focus();
    }
}

if (crashBtn) {
    crashBtn.addEventListener('click', () => {
        checkPasswordAndAction("X", "⏸ Перерыв");
    });
}

if (offBtn) {
    offBtn.addEventListener('click', () => {
        checkPasswordAndAction("", "⏹ Выключить");
    });
}

if (passwordInput) {
    passwordInput.addEventListener('input', () => {
        showError(false);
    });
}
if (settingsModalEl) {
    settingsModalEl.addEventListener('hidden.bs.modal', () => {
        passwordInput.value = '';
        showError(false);
    });
}