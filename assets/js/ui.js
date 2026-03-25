const locText = document.getElementById('loc-display');
const ppsText = document.getElementById('pps-display-sub');
const shopList = document.getElementById('shop-list');
const consoleDiv = document.getElementById('console');
const streamContainer = document.getElementById('code-stream-container');

// Inicializamos con 5 líneas vacías para que la consola tenga estructura
let logs = ["", "", "", "", ""]; 

/**
 * CAMBIO DE TEMA (SKINS)
 * @param {string} themeName - 'default', 'dracula', 'powershell', 'monokai'
 */
function setTheme(themeName) {
    // 1. Limpiamos clases de temas anteriores del body
    document.body.classList.remove('theme-dracula', 'theme-powershell', 'theme-monokai');
    
    // 2. Aplicamos el nuevo tema si no es el de por defecto (Matrix)
    if (themeName !== 'default') {
        document.body.classList.add(`theme-${themeName}`);
    }
    
    // 3. Guardamos la preferencia en el estado global
    state.currentTheme = themeName;
    
    // 4. Feedback visual en la consola
    logMessage(`SISTEMA: Entorno cambiado a ${themeName.toUpperCase()}`);
    
    // 5. Guardamos en localStorage para que no se pierda al recargar
    if (typeof saveGame === 'function') saveGame();
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    const targetSection = document.getElementById(`${tabId}-section`);
    if (targetSection) targetSection.classList.add('active');

    if (tabId === 'settings') {
        logMessage("ACCEDIENDO A NÚCLEO DEL SISTEMA...");
        logMessage("AUTOR: ISAAC JRZ - VERSIÓN 1.5");
    }
    
    // Resaltar el botón presionado
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

function spawnStreamCode() {
    const snippets = ["git push origin master", "npm install", "docker-compose up", "aws s3 sync", "kubectl get pods", "terraform apply", "brewing coffee...", "chmod +x script.sh", "ping 8.8.8.8"];
    const div = document.createElement("div");
    div.className = "stream-line";
    div.innerText = snippets[Math.floor(Math.random() * snippets.length)];
    div.style.left = Math.floor(Math.random() * 80) + "%";
    
    if (streamContainer) {
        streamContainer.appendChild(div);
        setTimeout(() => div.remove(), 4000);
    }
}

function updateUI() {
    locText.innerText = `${formatNum(state.loc)} LoC`;
    ppsText.innerText = `${state.pps.toFixed(1)} l/s`;
    
    // Mostramos el bono como porcentaje o suma (ejemplo: +170% de bono)
    const bonusPercent = (state.prestigeMultiplier * 100).toFixed(0);
    document.getElementById('multiplier-display').innerText = `Bono de Producción: +${bonusPercent}%`;

    const deployBtn = document.getElementById('deploy-btn-nav');
    const pendingBonus = state.totalLocEver / 1000000;
    
    if (state.totalLocEver >= 1000000) {
        deployBtn.classList.remove('deploy-locked');
        deployBtn.classList.add('deploy-ready');
        // El botón ahora dice cuánto VAS A SUMAR
        deployBtn.innerText = `DEPLOY (+${pendingBonus.toFixed(2)})`;
    } else {
        deployBtn.classList.add('deploy-locked');
        deployBtn.innerText = `LOCKED (${formatNum(state.totalLocEver)}/1M)`;
    }
    
    updateShopButtons();

    // Descubrimiento automático de items
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
            // Estado de compra
            if (state.loc >= upg.cost) {
                btn.classList.add('affordable');
                btn.disabled = false;
            } else {
                btn.classList.remove('affordable');
                btn.disabled = true;
            }
            
            // Barra de progreso hacia el siguiente nivel
            const fill = btn.querySelector('.progress-bar-fill');
            if (fill) {
                const progress = Math.min((state.loc / upg.cost) * 100, 100);
                fill.style.width = `${progress}%`;
            }
        }
    });
}

function initShop() {
    if (!shopList) return;
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

function logMessage(msg) {
    if (!msg || !consoleDiv) return;
    
    logs.push(`> ${msg}`);
    if (logs.length > 5) logs.shift();

    consoleDiv.innerHTML = logs.map((line, index) => {
        const opacityClass = index >= 2 ? 'log-highlight' : 'log-dim';
        return `<div class="console-line ${opacityClass}">${line || '&nbsp;'}</div>`;
    }).join('');
}

function closeModal() { 
    const modal = document.getElementById('deploy-modal');
    if (modal) modal.style.display = 'none'; 
}