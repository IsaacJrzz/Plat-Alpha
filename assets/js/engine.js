let state = {
    loc: 0,
    totalLocEver: 0,
    prestigeMultiplier: 0,
    pps: 0,
    clickPower: 1,
    currentTheme: 'default', // <--- NUEVA VARIABLE PARA EL TEMA
    upgrades: [
        { id: 'coffee', name: 'Café de Especialidad', cost: 10, baseCost: 10, yield: 0.2, count: 0, discovered: true },
        { id: 'keyboard', name: 'Teclado Mecánico', cost: 100, baseCost: 100, yield: 0, clickBonus: 3, count: 0, discovered: false },
        { id: 'junior', name: 'Junior Developer', cost: 500, baseCost: 500, yield: 5, count: 0, discovered: false },
        { id: 'server', name: 'Nodo AWS', cost: 4000, baseCost: 4000, yield: 30, count: 0, discovered: false },
        { id: 'script', name: 'Script Bash Isaac', cost: 15000, baseCost: 15000, yield: 80, count: 0, discovered: false },
        { id: 'ai', name: 'IA Auto-Coder', cost: 75000, baseCost: 75000, yield: 350, count: 0, discovered: false }
    ],
    achievements: [
        // Logros de Progresión (LoC)
        { id: 'a1', name: 'Script Inicial', desc: 'Llegar a 50 LoC', condition: 50, type: 'loc', reached: false },
        { id: 'a2', name: 'Primer Deploy', desc: 'Llegar a 1,000 LoC', condition: 1000, type: 'loc', reached: false },
        { id: 'a3', name: 'Programador Junior', desc: 'Llegar a 10,000 LoC', condition: 10000, type: 'loc', reached: false },
        { id: 'a4', name: 'Optimización de Consultas', desc: 'Llegar a 50,000 LoC', condition: 50000, type: 'loc', reached: false },
        { id: 'a5', name: 'Arquitecto de Sistemas', desc: 'Llegar a 100,000 LoC', condition: 100000, type: 'loc', reached: false },
        { id: 'a6', name: 'Infraestructura Escalable', desc: 'Llegar a 250,000 LoC', condition: 250000, type: 'loc', reached: false },
        { id: 'a7', name: 'Maestro de Kubernetes', desc: 'Llegar a 500,000 LoC', condition: 500000, type: 'loc', reached: false },
        { id: 'a8', name: 'Evangelista Tech', desc: 'Llegar a 1,000,000 LoC', condition: 1000000, type: 'loc', reached: false },
        { id: 'a9', name: 'SRE Senior', desc: 'Llegar a 5,000,000 LoC', condition: 5000000, type: 'loc', reached: false },
        { id: 'a10', name: 'Dios del Binario', desc: 'Llegar a 10,000,000 LoC', condition: 10000000, type: 'loc', reached: false },
        
        // Logros de Tienda (Upgrade Achievements)
        { id: 'up_coffee_1', name: 'Cafeína Básica', desc: 'Comprar 1 Café', condition: 1, type: 'upgrade', upgradeId: 'coffee', reached: false },
        { id: 'up_coffee_50', name: 'Adicto al Grano', desc: 'Comprar 50 Cafés', condition: 50, type: 'upgrade', upgradeId: 'coffee', reached: false },
        { id: 'up_coffee_100', name: 'Infarto Programado', desc: 'Comprar 100 Cafés', condition: 100, type: 'upgrade', upgradeId: 'coffee', reached: false },
        
        { id: 'up_keyboard_1', name: 'Click Clack', desc: 'Comprar 1 Teclado', condition: 1, type: 'upgrade', upgradeId: 'keyboard', reached: false },
        { id: 'up_keyboard_50', name: 'Sinfonía Mecánica', desc: 'Comprar 50 Teclados', condition: 50, type: 'upgrade', upgradeId: 'keyboard', reached: false },
        { id: 'up_keyboard_100', name: 'Dedo de Acero', desc: 'Comprar 100 Teclados', condition: 100, type: 'upgrade', upgradeId: 'keyboard', reached: false },

        { id: 'up_junior_1', name: 'Mentor', desc: 'Contratar 1 Junior', condition: 1, type: 'upgrade', upgradeId: 'junior', reached: false },
        { id: 'up_junior_50', name: 'Líder de Equipo', desc: 'Contratar 50 Juniors', condition: 50, type: 'upgrade', upgradeId: 'junior', reached: false },
        { id: 'up_junior_100', name: 'Factoría de Software', desc: 'Contratar 100 Juniors', condition: 100, type: 'upgrade', upgradeId: 'junior', reached: false },

        { id: 'up_server_1', name: 'Hola Nube', desc: 'Tener 1 Nodo AWS', condition: 1, type: 'upgrade', upgradeId: 'server', reached: false },
        { id: 'up_server_50', name: 'Data Center', desc: 'Tener 50 Nodos AWS', condition: 50, type: 'upgrade', upgradeId: 'server', reached: false },
        { id: 'up_server_100', name: 'Dueño de Internet', desc: 'Tener 100 Nodos AWS', condition: 100, type: 'upgrade', upgradeId: 'server', reached: false },

        { id: 'up_script_1', name: 'Automatización', desc: 'Tener 1 Script Isaac', condition: 1, type: 'upgrade', upgradeId: 'script', reached: false },
        { id: 'up_script_50', name: 'DevOps Isaac', desc: 'Tener 50 Scripts Isaac', condition: 50, type: 'upgrade', upgradeId: 'script', reached: false },
        { id: 'up_script_100', name: 'Legado de Isaac', desc: 'Tener 100 Scripts Isaac', condition: 100, type: 'upgrade', upgradeId: 'script', reached: false },

        { id: 'up_ai_1', name: 'Singularidad', desc: 'Activar 1 IA', condition: 1, type: 'upgrade', upgradeId: 'ai', reached: false },
        { id: 'up_ai_50', name: 'Skynet en Proceso', desc: 'Activar 50 IAs', condition: 50, type: 'upgrade', upgradeId: 'ai', reached: false },
        { id: 'up_ai_100', name: 'Mente Colmena', desc: 'Activar 100 IAs', condition: 100, type: 'upgrade', upgradeId: 'ai', reached: false }
    ]
};

/**
 * FORMATEO DE NÚMEROS (k, M)
 */
function formatNum(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return Math.floor(num);
}

/**
 * CÁLCULO DE PRODUCCIÓN POR SEGUNDO Y PODER DE CLIC
 */
function calculatePPS() {
    let basePPS = state.upgrades.reduce((acc, el) => acc + (el.count * (el.yield || 0)), 0);
    
    // Ahora la fórmula es: Base * (1 + multiplicador)
    // Si prestigeMultiplier es 0.5, ganarás un 50% más (x1.5)
    let totalMult = 1 + state.prestigeMultiplier;
    
    state.pps = basePPS * totalMult;
    
    const kb = state.upgrades.find(u => u.id === 'keyboard').count;
    state.clickPower = (1 + (kb * 3)) * totalMult;
}