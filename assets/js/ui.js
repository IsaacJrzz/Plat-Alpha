const locText = document.getElementById('loc-display');
const ppsText = document.getElementById('pps-display-sub');
const shopList = document.getElementById('shop-list');
const consoleDiv = document.getElementById('console');
const streamContainer = document.getElementById('code-stream-container');

let logs = ["> [System]: Entorno inicializado."];

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`${tabId}-section`).classList.add('active');
    event.currentTarget.classList.add('active');
}

function spawnStreamCode() {
    const snippets = ["git push origin master", "npm install", "docker-compose up", "aws s3 sync", "kubectl get pods", "terraform apply", "brewing coffee..."];
    const div = document.createElement("div");
    div.className = "stream-line";
    div.innerText = snippets[Math.floor(Math.random() * snippets.length)];
    div.style.left = Math.floor(Math.random() * 80) + "%";
    streamContainer.appendChild(div);
    setTimeout(() => div.remove(), 4000);
}

function updateUI() {
    locText.innerText = `${formatNum(state.loc)} LoC`;
    ppsText.innerText = `${state.pps.toFixed(1)} l/s`;
    document.getElementById('multiplier-display').innerText = `Multiplicador: x${state.prestigeMultiplier.toFixed(1)}`;
    
    state.upgrades.forEach(u => {
        if (!u.discovered && state.loc >= u.cost * 0.7) {
            u.discovered = true;
            initShop();
            logMessage(`NUEVO: ${u.name}`);
        }
    });

    updateShopButtons();

    const deployBtn = document.getElementById('deploy-btn-nav');
    if (state.totalLocEver >= 5000) {
        deployBtn.classList.remove('deploy-locked');
        deployBtn.classList.add('deploy-ready');
    } else {
        deployBtn.classList.add('deploy-locked');
        deployBtn.classList.remove('deploy-ready');
    }
}

function updateShopButtons() {
    const buttons = document.querySelectorAll('.shop-item');
    buttons.forEach((btn, index) => {
        const upg = state.upgrades[index];
        if (upg && upg.discovered) {
            if (state.loc >= upg.cost) {
                btn.classList.add('affordable');
                btn.disabled = false;
            } else {
                btn.classList.remove('affordable');
                btn.disabled = true;
            }
            const fill = btn.querySelector('.progress-bar-fill');
            if (fill) fill.style.width = `${Math.min((state.loc / upg.cost) * 100, 100)}%`;
        }
    });
}

function initShop() {
    shopList.innerHTML = '';
    state.upgrades.forEach((upg, index) => {
        if (!upg.discovered) return;
        const btn = document.createElement('button');
        btn.className = 'shop-item';
        let effect = upg.yield > 0 ? `+${upg.yield} l/s` : `+${upg.clickBonus} click`;
        btn.innerHTML = `
            <strong>${upg.name} (x${upg.count})</strong><br>
            Coste: ${formatNum(upg.cost)} | ${effect}
            <div class="progress-bar-bg"><div class="progress-bar-fill"></div></div>
        `;
        btn.onclick = () => buyUpgrade(index);
        shopList.appendChild(btn);
    });
}

function buyUpgrade(index) {
    const upg = state.upgrades[index];
    if (state.loc >= upg.cost) {
        state.loc -= upg.cost;
        upg.count++;
        upg.cost *= 1.4;
        calculatePPS();
        initShop();
        updateUI();
        logMessage(`UPGRADE: ${upg.name}`);
    }
}

function logMessage(msg) {
    logs.push(`> ${msg}`);
    if (logs.length > 4) logs.shift();
    consoleDiv.innerHTML = logs.map((l, i) => `<div class="console-line ${i===logs.length-1?'new':''}">${l}</div>`).join('');
}

function showDeployConfirm() {
    if (state.totalLocEver < 5000) return logMessage("Falta código para el Deploy.");
    const bonus = (state.totalLocEver / 15000).toFixed(1);
    document.getElementById('deploy-reward-text').innerText = `Bono de Prestigio: +x${bonus}`;
    document.getElementById('deploy-modal').style.display = 'flex';
}

function closeModal() { document.getElementById('deploy-modal').style.display = 'none'; }

function executeDeploy() {
    const bonus = 1.0 + (state.totalLocEver / 15000);
    state.prestigeMultiplier = bonus;
    state.loc = 0;
    state.upgrades.forEach(u => { u.count = 0; if (u.id !== 'coffee') u.discovered = false; });
    calculatePPS();
    initShop();
    closeModal();
    updateUI();
    logMessage("--- DEPLOY EXITOSO ---");
}