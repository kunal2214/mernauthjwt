import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/user.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
const app = express();
dotenv.config();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const PORT = 5000 || 4000;

mongoose.connect("mongodb+srv://kunaljha2214:kunal2214@cluster0.hurramb.mongodb.net/?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`MongoDB Connected & Server running on PORT: ${PORT}`)))
.catch((error) => console.log(error.message));

app.get('/', (req, res) => {
    res.send("server running")
})

app.get('/users', async (req, res) => {
    try {
        const USERs = await User.find();

        res.status(200).json(USERs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        // if no user found
        if (!existingUser) {
            return res.status(404).json({ message: 'User does not exist.' });
        }
        // compare password
        const checkPassword = await bcrypt.compare(password, existingUser.password);
        // if password is not matched
        if (!checkPassword) {
            return res.status(400).json({ message: 'Invalid password!' });
        }
        // get existing user's token and send to front end and set up user's expire time
        const token = jwt.sign({ email: existingUser.email, name: existingUser.name, id: existingUser._id }, '@user', { expiresIn: '1h' });
        res.status(200).json({ userInfo: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'ERROR from user controllers.' });
    }
});

app.post("/signup", async (req, res) => {
    const { name, email,dob, password, confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        // if user found
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }
        // if no existing user with that info then compare passwords
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Reapeat password not match' });
        }
        // hash password
        const hashPassword = await bcrypt.hash(password, 2);
        // create new user
        const newUser = await User.create({ email, password: hashPassword,dob, name:name, role: 'USER' });
        // create user token
        // const token = jwt.sign({ email: newUser.email, name: newUser.name, id: newUser._id }, '@user', { expiresIn: '1h' });
        // console.log(token)
        // send 
        res.status(200).json({ userInfo: newUser });

    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('No User found with that id');
    }

    try {
        await User.findByIdAndRemove(id);

        res.json({ message: 'User by that id is successfully deleted' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});