const locText = document.getElementById('loc-display');
const ppsText = document.getElementById('pps-display-sub');
const shopList = document.getElementById('shop-list');
const consoleDiv = document.getElementById('console');
const streamContainer = document.getElementById('code-stream-container');

// Inicializamos con 5 líneas vacías para que la consola tenga estructura desde el segundo 1
let logs = ["", "", "", "", ""]; 

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`${tabId}-section`).classList.add('active');
    
    // Resaltar el botón presionado
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
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
    document.getElementById('multiplier-display').innerText = `Bono de Experiencia: x${state.prestigeMultiplier.toFixed(2)}`;

    const deployBtn = document.getElementById('deploy-btn-nav');
    const pendingBonus = state.totalLocEver / 1000000;
    
    if (state.totalLocEver >= 1000000) {
        deployBtn.classList.remove('deploy-locked');
        deployBtn.classList.add('deploy-ready');
        deployBtn.innerText = `DEPLOY (+x${pendingBonus.toFixed(1)})`;
    } else {
        deployBtn.classList.add('deploy-locked');
        deployBtn.innerText = `LOCKED (${formatNum(state.totalLocEver)}/1M)`;
    }

    updateShopButtons();

    state.upgrades.forEach(u => {
        if (!u.discovered && state.loc >= u.cost * 0.7) {
            u.discovered = true;
            initShop();
            logMessage(`NUEVO: ${u.name}`);
        }
    });
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

// NUEVA FUNCIÓN LOGMESSAGE: 5 líneas con resaltado en las 3 últimas
function logMessage(msg) {
    if (!msg) return;
    
    logs.push(`> ${msg}`);
    if (logs.length > 5) logs.shift();

    if (consoleDiv) {
        consoleDiv.innerHTML = logs.map((line, index) => {
            // index 0,1 son DIM (apagadas) | index 2,3,4 son HIGHLIGHT (brillantes)
            const opacityClass = index >= 2 ? 'log-highlight' : 'log-dim';
            return `<div class="console-line ${opacityClass}">${line || '&nbsp;'}</div>`;
        }).join('');
    }
}

function closeModal() { document.getElementById('deploy-modal').style.display = 'none'; }