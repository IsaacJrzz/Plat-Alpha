const mainBtn = document.getElementById('main-btn');

// --- LÓGICA DE CLICS ---
mainBtn.onclick = () => {
    mainBtn.style.transform = "scale(0.95)";
    setTimeout(() => mainBtn.style.transform = "scale(1)", 50);

    state.loc += state.clickPower;
    state.totalLocEver += state.clickPower;
    
    // --- FIX: Solo soltar código si la densidad es mayor a 0 ---
    const density = state.codeDensity || 0;
    if (density > 0 && typeof spawnStreamCode === 'function') {
        // Cuanta más densidad, más probable es que salga código al clickar
        if (Math.random() < (density / 150)) { 
            spawnStreamCode(); 
        }
    }
    
    updateUI();
};

// --- BUCLE PRINCIPAL (10 veces por segundo) ---
setInterval(() => {
    const gain = state.pps / 10;
    state.loc += gain;
    state.totalLocEver += gain;
    
    // --- CONTROL DE DENSIDAD ULTRA ---
    const density = state.codeDensity || 0; 
    
    if (density > 0 && state.pps > 0) {
        // Bajamos el divisor a 150 para que el "100" del slider sea mucho más agresivo
        const spawnChance = density / 150; 
        if (Math.random() < spawnChance) {
            if (typeof spawnStreamCode === 'function') spawnStreamCode();
        }
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
            if (ach.type === 'loc' && state.totalLocEver >= ach.condition) {
                ach.reached = true;
                newlyUnlocked = true;
                logMessage(`LOGRO: ${ach.name}`);
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
    const pointsToEarn = Math.floor(Math.sqrt(state.totalLocEver / 1000000) * 10);
    document.getElementById('deploy-reward-text').innerText = `Puntos a ganar: ${pointsToEarn} PP`;
    document.getElementById('deploy-modal').style.display = 'flex';
}

function executeDeploy() {
    const pointsToEarn = Math.floor(Math.sqrt(state.totalLocEver / 1000000) * 10);
    state.prestigePoints = (state.prestigePoints || 0) + pointsToEarn;
    state.prestigeMultiplier += (pointsToEarn * 0.05); 
    
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
    logMessage(`--- DEPLOY EXITOSO: +${pointsToEarn} PP ---`);
    saveGame();
}

// --- PERSISTENCIA Y AJUSTES ---
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

// --- EVENTOS ALEATORIOS ---
function spawnRandomEvent() {
    const isBug = Math.random() > 0.4;
    const eventDiv = document.createElement('div');
    eventDiv.className = `random-event ${isBug ? 'event-bug' : 'event-boost'}`;
    
    const x = Math.random() * 70 + 15;
    const y = Math.random() * 60 + 20;
    eventDiv.style.left = `${x}vw`;
    eventDiv.style.top = `${y}vh`;

    if (isBug) {
        eventDiv.innerText = "✖ CRITICAL BUG";
        const bugTimer = setTimeout(() => {
            const loss = Math.floor(state.loc * 0.10 + 100);
            state.loc = Math.max(0, state.loc - loss);
            logMessage(`FAILURE: Bug ignorado. -${formatNum(loss)} LoC`);
            document.body.style.backgroundColor = "#440000";
            setTimeout(() => document.body.style.backgroundColor = "", 200);
            eventDiv.remove();
            updateUI();
        }, 4000);

        eventDiv.onclick = () => {
            clearTimeout(bugTimer);
            const reward = Math.floor(state.clickPower * 60);
            state.loc += reward;
            logMessage(`HOTFIX: Bug reparado. +${formatNum(reward)} LoC`);
            eventDiv.remove();
            updateUI();
        };
    } else {
        eventDiv.innerText = "[ SYSTEM OVERCLOCK ]";
        eventDiv.style.color = "#ffffff";
        
        eventDiv.onclick = () => {
            state.isTurbo = true;
            let timeLeft = 10;
            const timerDiv = document.getElementById('turbo-timer');
            const secondsSpan = document.getElementById('turbo-seconds');
            const btn = document.getElementById('main-btn');
            
            if(timerDiv) {
                timerDiv.style.display = 'block';
                timerDiv.innerHTML = `OVERCLOCK: <span id="turbo-seconds">${timeLeft}</span>s`;
            }
            if(btn) btn.classList.add('turbo-glow');
            
            calculatePPS(); 
            logMessage("SISTEMA: Overclock activado. PPS x3");
            eventDiv.remove();
            updateUI();
            
            const countdown = setInterval(() => {
                timeLeft--;
                const s = document.getElementById('turbo-seconds');
                if (s) s.innerText = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    state.isTurbo = false;
                    if(btn) btn.classList.remove('turbo-glow');
                    if(timerDiv) timerDiv.style.display = 'none';
                    calculatePPS();
                    logMessage("SISTEMA: Overclock finalizado.");
                    updateUI();
                }
            }, 1000);
        };
        setTimeout(() => { if(eventDiv.parentNode) eventDiv.remove(); }, 6000);
    }
    document.body.appendChild(eventDiv);
}

// --- INICIO ---
window.onload = () => {
    const saved = localStorage.getItem('DevOpsTycoon_Isaac_vFinal');
    if (saved) state = Object.assign(state, JSON.parse(saved));

    if (state.currentTheme && typeof setTheme === 'function') setTheme(state.currentTheme);

    const slider = document.getElementById('code-density-slider');
    if (slider) {
        slider.value = state.codeDensity !== undefined ? state.codeDensity : 50;
        slider.oninput = (e) => { 
            state.codeDensity = parseInt(e.target.value); 
            saveGame(); // Guardar preferencia al mover
        };
    }

    calculatePPS();
    initShop();
    renderAchievements();
    updateUI();
    logMessage("SISTEMA RESTAURADO...");
};

setInterval(saveGame, 5000);

setInterval(() => {
    if (Math.random() < 0.25) spawnRandomEvent();
}, 60000);