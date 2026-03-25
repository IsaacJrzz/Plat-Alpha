const mainBtn = document.getElementById('main-btn');

mainBtn.onclick = () => {
    state.loc += state.clickPower;
    state.totalLocEver += state.clickPower;
    spawnStreamCode(); 
    updateUI();
};

setInterval(() => {
    const gain = state.pps / 10;
    state.loc += gain;
    state.totalLocEver += gain;
    if (state.pps > 0 && Math.random() < 0.12) spawnStreamCode();
    checkAchievements();
    updateUI();
}, 100);

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

function checkAchievements() {
    let newlyUnlocked = false;

    state.achievements.forEach(ach => {
        if (!ach.reached) {
            if (ach.type === 'loc') {
                // Comprobar por líneas totales
                if (state.totalLocEver >= ach.condition) {
                    ach.reached = true;
                    newlyUnlocked = true;
                    logMessage(`LOGRO: ${ach.name}`);
                }
            } else if (ach.type === 'upgrade') {
                // Comprobar por cantidad de un item de la tienda
                const upg = state.upgrades.find(u => u.id === ach.upgradeId);
                if (upg && upg.count >= ach.condition) {
                    ach.reached = true;
                    newlyUnlocked = true;
                    logMessage(`LOGRO: ${ach.name}`);
                }
            }
        }
    });

    if (newlyUnlocked) {
        renderAchievements();
    }
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

function showDeployConfirm() {
    if (state.totalLocEver < 1000000) return logMessage("Mínimo 1M de LoC para Deploy.");
    const bonus = (state.totalLocEver / 1000000);
    document.getElementById('deploy-reward-text').innerText = `Bono Acumulado: +x${bonus.toFixed(2)}`;
    document.getElementById('deploy-modal').style.display = 'flex';
}

function executeDeploy() {
    const bonus = (state.totalLocEver / 1000000);
    state.prestigeMultiplier += bonus;
    state.loc = 0;
    state.totalLocEver = 0;
    state.upgrades.forEach(u => {
        u.count = 0;
        u.cost = u.baseCost; 
        if (u.id !== 'coffee') u.discovered = false;
    });
    calculatePPS();
    initShop();
    closeModal();
    updateUI();
    logMessage("--- DEPLOY EXITOSO ---");
    localStorage.setItem('DevOpsTycoon_Isaac_vFinal', JSON.stringify(state));
}

function hardReset() {
    if (confirm("¿BORRAR TODO? No hay marcha atrás.")) {
        localStorage.removeItem('DevOpsTycoon_Isaac_vFinal');
        location.reload();
    }
}

window.onload = () => {
    const saved = localStorage.getItem('DevOpsTycoon_Isaac_vFinal');
    if (saved) state = Object.assign(state, JSON.parse(saved));
    calculatePPS();
    initShop();
    renderAchievements();
    updateUI();
};

setInterval(() => localStorage.setItem('DevOpsTycoon_Isaac_vFinal', JSON.stringify(state)), 5000);