const win1 = document.getElementById('win1');
const win2 = document.getElementById('win2');
const win3 = document.getElementById('win3');
const win4 = document.getElementById('win4');
const win5 = document.getElementById('win5');
const win6 = document.getElementById('win6');

const btnStart = document.getElementById('myLink');
const btnEnd = document.getElementById('myLinkend');
const btnTime = document.getElementById('myLinkendX');

const windowConfig = {
    '1': 'http://10.4.16.221/?text=',
    '2': 'http://10.4.16.222/?text=',
    '3': 'http://10.4.16.223/?text=',
    '4': 'http://10.4.16.224/?text=',
    '5': 'http://10.4.16.225/?text=',
    '6': 'http://10.4.16.226/?text='
};

// === 3. Функции localStorage ===
function saveWindowState(windowId, statusText, statusColor) {
    localStorage.setItem(`panel_window_${windowId}_status`, statusText);
    localStorage.setItem(`panel_window_${windowId}_color`, statusColor);
}

function loadWindowState(windowId) {
    return {
        statusText: localStorage.getItem(`panel_window_${windowId}_status`),
        statusColor: localStorage.getItem(`panel_window_${windowId}_color`)
    };
}

function saveActiveWindow(windowId) {
    localStorage.setItem('panel_active_window', windowId);
}

function loadActiveWindow() {
    return localStorage.getItem('panel_active_window');
}

function clearActiveWindow() {
    localStorage.removeItem('panel_active_window');
}

// === 4. Функция статуса ===
function showStatus(text, color) {
    // Ищем элементы КАЖДЫЙ РАН при вызове (не в начале файла!)
    const status = document.getElementById('status-text');
    const statusBox = document.getElementById('statusBox');
    
    // Если элементы есть — обновляем
    if (status && statusBox) {
        status.textContent = text;
        status.className = ''; // сброс старых классов
        statusBox.className = `status-box text-center mb-4 py-3 alert alert-${color}`;
        console.log("✅ Статус обновлён:", text, color);
    } else {
        console.warn("⚠️ Элементы статуса не найдены!", { status, statusBox });
    }
}

function setupWindowHandler(winElement, windowId) {
    if (!winElement) return;
    
    winElement.addEventListener('click', () => {
        const BASE_URL = windowConfig[windowId];
        const isActive = winElement.classList.contains('active');
        document.querySelectorAll('.window-card').forEach(w => w.classList.remove('active'));
        
        if (isActive) {
            winElement.classList.remove('active');
            btnStart.href = "#";
            btnEnd.href = "#";
            btnTime.href = "#";
            clearActiveWindow();
        } else {
            winElement.classList.add('active');
            btnStart.href = BASE_URL + windowId;
            btnEnd.href = BASE_URL;
            btnTime.href = BASE_URL + "X";
            saveActiveWindow(windowId);
            
            const state = loadWindowState(windowId);
            if (state.statusText) {
                showStatus(state.statusText, state.statusColor || 'secondary');
            } else {
                showStatus('Ожидание...', 'secondary');
            }
        }
    });
}

setupWindowHandler(win1, '1');
setupWindowHandler(win2, '2');
setupWindowHandler(win3, '3');
setupWindowHandler(win4, '4');
setupWindowHandler(win5, '5');
setupWindowHandler(win6, '6');

document.addEventListener('DOMContentLoaded', () => {
    const activeWindow = loadActiveWindow();
    
    if (activeWindow && windowConfig[activeWindow]) {
        const winElement = document.getElementById(`win${activeWindow}`);
        if (winElement) {
            winElement.classList.add('active');
            
            const BASE_URL = windowConfig[activeWindow];
            btnStart.href = BASE_URL + activeWindow;
            btnEnd.href = BASE_URL;
            btnTime.href = BASE_URL + "X";
            
            const state = loadWindowState(activeWindow);
            if (state.statusText) {
                showStatus(state.statusText, state.statusColor || 'secondary');
            }
        }
    }
});

document.getElementById('myLink').addEventListener('click', (e) => {
    e.preventDefault();
    const activeWindow = loadActiveWindow();
    if (!activeWindow) {
        showStatus('⚠ Выберите окно', 'warning');
        return;
    }
    navigator.sendBeacon(e.target.href);
    showStatus('✅ В работе', 'success');
    saveWindowState(activeWindow, '✅ В работе', 'success');
});

document.getElementById('myLinkend').addEventListener('click', (e) => {
    e.preventDefault();
    const activeWindow = loadActiveWindow();
    if (!activeWindow) {
        showStatus('⚠ Выберите окно', 'warning');
        return;
    }
    navigator.sendBeacon(e.target.href);
    showStatus('⏹ Выключено', 'danger');
    saveWindowState(activeWindow, '⏹ Выключено', 'danger');
});

document.getElementById('myLinkendX').addEventListener('click', (e) => {
    e.preventDefault();
    const activeWindow = loadActiveWindow();
    if (!activeWindow) {
        showStatus('⚠ Выберите окно', 'warning');
        return;
    }
    navigator.sendBeacon(e.target.href);
    showStatus('⏸ Перерыв', 'warning');
    saveWindowState(activeWindow, '⏸ Перерыв', 'warning');
});


var btnbot = document.getElementById('boot');
var modalSeting = document.getElementById('seting');
let isHidden = true; 

btnbot.addEventListener('click', function() {
    if (isHidden) {
        modalSeting.style.top = '0%';
        isHidden = false;
        console.log('Показано (0%)');
    } else {
        modalSeting.style.top = '-20%';
        isHidden = true;
        console.log('Скрыто (-20%)');
    }
});