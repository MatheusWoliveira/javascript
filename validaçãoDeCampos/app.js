// app.js
const express = require('express');
const connectDB = require('./database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/model');
const path = require('path');

const app = express();
connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'web')));

// Rota para registro de usuário
app.post('/api/register', async (req, res) => {
    const { nome, email, senha, telefone } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Este email já está sendo usado' });
        }

        user = new User({
            nome,
            email,
            senha,
            telefone
        });

        const salt = await bcrypt.genSalt(10);
        user.senha = await bcrypt.hash(senha, salt);

        await user.save();
        console.log('Usuário registrado com sucesso:', user);
        res.json({ msg: 'Você se cadastrou com sucesso !!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para login de usuário
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Usuário não encontrado');
            return res.status(400).json({ msg: 'Email ou senha incorreto' });
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            console.log('Senha incorreta');
            return res.status(400).json({ msg: 'senha incorreto' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
