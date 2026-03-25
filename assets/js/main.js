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

    if (state.pps > 0) {
        if (Math.random() < 0.12) {
            spawnStreamCode();
        }
    }

    checkAchievements();
    updateUI();
}, 100);

function checkAchievements() {
    state.achievements.forEach(ach => {
        if (!ach.reached && state.totalLocEver >= ach.condition) {
            ach.reached = true;
            logMessage(`LOGRO: ${ach.name}`);
            renderAchievements();
        }
    });
}

function renderAchievements() {
    const list = document.getElementById('ach-list');
    if (!list) return;
    list.innerHTML = state.achievements.map(ach => `
        <div class="shop-item ${ach.reached ? 'affordable' : ''}" style="cursor: default; filter: none; opacity: ${ach.reached ? '1' : '0.5'}">
            ${ach.reached ? '✅' : '🔒'} ${ach.name}
        </div>
    `).join('');
}

window.onload = () => {
    const saved = localStorage.getItem('DevOpsTycoon_Isaac_vFinal');
    if (saved) state = JSON.parse(saved);
    calculatePPS();
    initShop();
    renderAchievements();
    updateUI();
};

setInterval(() => localStorage.setItem('DevOpsTycoon_Isaac_vFinal', JSON.stringify(state)), 5000);