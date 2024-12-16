const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');// for extracting info from .env file
const axios = require('axios');// for fetch API
dotenv.config();
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define User schema and model
const UserSchema = new mongoose.Schema({
    name :     String,
    username: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);

// Insert the sample record (admin) if it does not exist


// Run insert sample record on app startup

// POST route to login
app.post('/login', async (req, res) => {
    const { username, password } = req.body; 
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const name  = user.name;
        return res.json({ token, name });
    }
    res.status(401).send('Invalid credentials');
});

//signup
app.post('/register', async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
        return res.status(400).send({ error: 'Name, username, and password are required' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ error: 'User already exists' });
        }
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,10}$/;
        if(!regex.test(password)){
            return res.status(400).send({ error: '• Follow Password Rule' });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser = new User({
            name, // Save name
            username,
            password: hashedPassword,
        });

        await newUser.save();
        
        res.status(201).send({ message: 'User registered successfully' , token:'hello' });
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    
    }
});



// Fetch paginated news



// Start the server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
