const mainBtn = document.getElementById('main-btn');

// --- LÓGICA DE CLICS ---
mainBtn.onclick = () => {
    // Animación visual rápida al hacer clic
    mainBtn.style.transform = "scale(0.95)";
    setTimeout(() => mainBtn.style.transform = "scale(1)", 50);

    state.loc += state.clickPower;
    state.totalLocEver += state.clickPower;
    if (typeof spawnStreamCode === 'function') spawnStreamCode(); 
    updateUI();
};

// --- BUCLE PRINCIPAL (10 veces por segundo) ---
setInterval(() => {
    const gain = state.pps / 10;
    state.loc += gain;
    state.totalLocEver += gain;
    
    // Efecto visual aleatorio si hay producción
    if (state.pps > 0 && Math.random() < 0.12) {
        if (typeof spawnStreamCode === 'function') spawnStreamCode();
    }
    
    checkAchievements();
    updateUI();
}, 100);

// --- GESTIÓN DE TIENDA ---
function buyUpgrade(index) {
    const upg = state.upgrades[index];
    if (state.loc >= upg.cost) {
        state.loc -= upg.cost;
        upg.count++;
        upg.cost = Math.floor(upg.cost * 1.4); 
        calculatePPS();
        initShop();
        updateUI();
        logMessage(`UPGRADE: ${upg.name}`);
    }
}

// --- SISTEMA DE LOGROS ---
function checkAchievements() {
    let newlyUnlocked = false;
    state.achievements.forEach(ach => {
        if (!ach.reached) {
            if (ach.type === 'loc') {
                if (state.totalLocEver >= ach.condition) {
                    ach.reached = true;
                    newlyUnlocked = true;
                    logMessage(`LOGRO: ${ach.name}`);
                }
            } else if (ach.type === 'upgrade') {
                const upg = state.upgrades.find(u => u.id === ach.upgradeId);
                if (upg && upg.count >= ach.condition) {
                    ach.reached = true;
                    newlyUnlocked = true;
                    logMessage(`LOGRO: ${ach.name}`);
                }
            }
        }
    });
    if (newlyUnlocked) renderAchievements();
}

function renderAchievements() {
    const list = document.getElementById('ach-list');
    if (!list) return;
    list.innerHTML = state.achievements.map(ach => `
        <div class="achievement-card ${ach.reached ? 'unlocked' : 'locked'}">
            <div class="ach-header" style="display: flex; justify-content: space-between; align-items: flex-start;">
                <span class="ach-title">${ach.name}</span>
                ${ach.reached ? '<span class="ach-status">COMPLETADO</span>' : ''}
            </div>
            <div class="ach-desc">${ach.reached ? 'Misión cumplida: ' : 'Objetivo: '}${ach.desc}</div>
        </div>
    `).join('');
}

// --- SISTEMA DE PRESTIGIO (DEPLOY) ---
function showDeployConfirm() {
    if (state.totalLocEver < 1000000) return logMessage("Mínimo 1M de LoC para Deploy.");
    const bonus = (state.totalLocEver / 1000000);
    document.getElementById('deploy-reward-text').innerText = `Bono Acumulado: +${bonus.toFixed(2)}`;
    document.getElementById('deploy-modal').style.display = 'flex';
}

function executeDeploy() {
    // Calculamos cuánto vamos a sumar basándonos en el progreso actual
    const bonusToAdd = (state.totalLocEver / 1000000);
    
    // Sumamos al bono acumulado
    state.prestigeMultiplier += bonusToAdd;
    
    // Reset de progreso estándar
    state.loc = 0;
    state.totalLocEver = 0;
    state.upgrades.forEach(u => {
        u.count = 0;
        u.cost = u.baseCost; 
        if (u.id !== 'coffee') u.discovered = false;
    });

    calculatePPS();
    initShop();
    if (typeof closeModal === 'function') closeModal();
    updateUI();
    logMessage(`--- DEPLOY EXITOSO: +${bonusToAdd.toFixed(2)} Bono ---`);
    saveGame();
}

// --- PERSISTENCIA Y BACKUP ---
function saveGame() {
    localStorage.setItem('DevOpsTycoon_Isaac_vFinal', JSON.stringify(state));
}

function hardReset() {
    if (confirm("¿BORRAR TODO? No hay marcha atrás.")) {
        localStorage.removeItem('DevOpsTycoon_Isaac_vFinal');
        location.reload();
    }
}

function exportSave() {
    try {
        const saveData = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
        const tempInput = document.createElement("input");
        document.body.appendChild(tempInput);
        tempInput.value = saveData;
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        alert("¡Código de guardado copiado!");
        logMessage("SISTEMA: Backup generado.");
    } catch (e) { alert("Error al exportar."); }
}

function importSave() {
    const data = prompt("Pega tu código de backup:");
    if (data) {
        try {
            const newState = JSON.parse(decodeURIComponent(escape(atob(data))));
            if (newState.hasOwnProperty('loc')) {
                state = newState;
                saveGame();
                location.reload();
            }
        } catch (e) { alert("Código corrupto."); }
    }
}

// --- INICIO ---
window.onload = () => {
    const saved = localStorage.getItem('DevOpsTycoon_Isaac_vFinal');
    if (saved) state = Object.assign(state, JSON.parse(saved));

    if (state.currentTheme && typeof setTheme === 'function') setTheme(state.currentTheme);

    calculatePPS();
    initShop();
    renderAchievements();
    updateUI();
    logMessage("SISTEMA RESTAURADO...");
};

setInterval(saveGame, 5000);