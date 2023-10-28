const { createAccessToken } = require('../Libs/jwt.js');
const User = require('../Models/user.model.js');
const bcrypt = require('bcryptjs');

const Tecnico = require('../Models/tecnico.models.js');
const { TOKEN_SECRET } = require('../config.js');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        const userFound = await User.findOne({ email });
        if (userFound) return res.status(404).json( ["The Email already in use"] );

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save();

        const token = await createAccessToken({ id: userSaved._id });
        
        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createAt: userSaved.createdAt,
            updateAt: userSaved.updateAt,
        });
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const techRegister = async (req, res) => {
    const { name, email, password, number } = req.body;

    try {
        const techFound = await Tecnico.findOne({email});
        if (techFound) return res.status(406).json([ "The Email already exist, in use" ]);

        const passwordHash = await bcrypt.hash(password, 11);

        const newTech =  new Tecnico({
            name,
            email,
            password: passwordHash,
            number,
        });

        const techSaved = await newTech.save();

        const token = await createAccessToken({ id: techSaved._id });

        res.cookie("token", token);
        res.json({
            id: techSaved._id,
            name: techSaved.name,
            email: techSaved.email,
            createAt: techSaved.createdAt,
            updateAt: techSaved.updateAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const userFound = await User.findOne({email});
        if (!userFound) return res.status(400).json({ message: "User not found" });

        const isMath = await bcrypt.compare(password, userFound.password);
        if (!isMath) return res.status(400).json({ message: "Incorrect Password" });

        const token = await createAccessToken({ id: userFound._id });
        
        res.cookie("token", token);

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createAt: userFound.createdAt,
            updateAt: userFound.updateAt,
        });
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const techLogin = async (req, res) => {
    const { email, password } = req.body;

    try {

        const techFound = await Tecnico.findOne({email});
        if (!techFound) return res.status(400).json({ message: "User not found" });

        const isMath = await bcrypt.compare(password, techFound.password);
        if (!isMath) return res.status(400).json({ message: "Incorrect Password" });

        const token = await createAccessToken({ id: techFound._id });
        
        res.cookie("token", token);

        res.json({
            id: techFound._id,
            username: techFound.username,
            email: techFound.email,
            createAt: techFound.createdAt,
            updateAt: techFound.updateAt,
        });
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
};

const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    if(!userFound) return res.status(400).json({ "Message": "User not found" });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createAt: userFound.createAt,
        updateAt: userFound.updateAt,
    });
};

const techProfile = async (req, res) => {
    const techFound = await Tecnico.findById(req.user.id);

    if(!techFound) return res.status(400).json({ "Message": "User not found" });

    return res.json({
        id: techFound._id,
        username: techFound.username,
        email: techFound.email,
        createAt: techFound.createAt,
        updateAt: techFound.updateAt,
    });
};

const verifyToken = async (req, res) => {
    const {token} = req.cookies;
    if(!token) return res.status(401),json({message: "Inautorizado"});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "Inautorizado" });
        
        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({ message: "Inautorizado" });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};

module.exports = { register, techRegister, login, techLogin, logout, profile, techProfile, verifyToken };