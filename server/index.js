const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB (La URL irá en el archivo .env)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/alpha_db')
    .then(() => console.log("ALPHA_SYS: Conexión con MongoDB establecida."))
    .catch(err => console.error("ALPHA_SYS: Error de conexión:", err));

// Modelo de Usuario
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    gameState: { type: Object, default: null }
});

const User = mongoose.model('User', UserSchema);

// --- RUTAS DE LA API ---

// 1. Registro e Inicio de Sesión (Todo en uno para simplicidad del Clicker)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });

        if (!user) {
            // Si el usuario no existe, lo creamos (Registro)
            const hashedPassword = await bcrypt.hash(password, 10);
            user = new User({ username, password: hashedPassword });
            await user.save();
            return res.json({ message: "USER_CREATED", gameState: null });
        }

        // Si existe, verificamos contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "INVALID_CREDENTIALS" });

        res.json({ message: "LOGIN_SUCCESS", gameState: user.gameState });
    } catch (err) {
        res.status(500).json({ message: "SERVER_ERROR" });
    }
});

// 2. Guardar Progreso
app.post('/api/save', async (req, res) => {
    const { username, gameState } = req.body;
    try {
        await User.findOneAndUpdate({ username }, { gameState });
        res.json({ message: "SAVE_SUCCESS" });
    } catch (err) {
        res.status(500).json({ message: "SAVE_ERROR" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ALPHA_SERVER: Operativo en puerto ${PORT}`));