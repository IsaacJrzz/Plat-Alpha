let state = {
    loc: 0,
    totalLocEver: 0,
    prestigeMultiplier: 1.0,
    pps: 0,
    clickPower: 1,
    upgrades: [
        { id: 'coffee', name: 'Café de Especialidad', cost: 10, yield: 0.2, count: 0, discovered: true },
        { id: 'keyboard', name: 'Teclado Mecánico', cost: 100, yield: 0, clickBonus: 3, count: 0, discovered: false },
        { id: 'junior', name: 'Junior Developer', cost: 500, yield: 5, count: 0, discovered: false },
        { id: 'server', name: 'Nodo AWS', cost: 4000, yield: 30, count: 0, discovered: false },
        { id: 'script', name: 'Script Bash Isaac', cost: 15000, yield: 80, count: 0, discovered: false },
        { id: 'ai', name: 'IA Auto-Coder', cost: 75000, yield: 350, count: 0, discovered: false }
    ],
    achievements: [
        { id: 'a1', name: 'Hola Mundo', condition: 10, reached: false },
        { id: 'a2', name: 'Full Stack Dev', condition: 10000, reached: false },
        { id: 'a3', name: 'Unicornio Tech', condition: 100000, reached: false }
    ]
};

function formatNum(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return Math.floor(num);
}

function calculatePPS() {
    let basePPS = state.upgrades.reduce((acc, el) => acc + (el.count * (el.yield || 0)), 0);
    state.pps = basePPS * state.prestigeMultiplier;
    const kb = state.upgrades.find(u => u.id === 'keyboard').count;
    state.clickPower = (1 + (kb * 3)) * state.prestigeMultiplier;
}