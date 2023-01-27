const User = require("../models/user");
const { randomBytes } = require("crypto");
const mailer = require("../config/mail");
const { MAIL_FROM } = require("../config/env");
const { startSession } = require("mongoose");
const { validationResult } = require("express-validator");
const formidable = require("formidable");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { readFileSync } = require("fs");
const { join } = require("path");
const { root_path } = require('../globalConfig');
const { HttpStatusCodes, JWT_ALGORITHM } = require("../utils/constants");




module.exports.Register = async function Register(req, res) {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const valid = validationResult(req)
    if (!valid.isEmpty()) {
        return res.status(409).json({ message: "Invalid fields", errors: valid.array() });
    }

    try {
        await mailer.sendMail({
            to: email,
            from: String(MAIL_FROM),
            subject: "Welcome to jamb portal!",
            text: "Ready for the exam?",
            html: `<b>Ready for the exam? Your password is ${password}`
        })
    } catch (error) {
        console.log(error)
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Registration failed" })
    }

    try {
        await new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
        }).save();


    } catch (error) {
        console.log(error);

        return res.status(400).json({ message: "user failed" })
    }






}

module.exports.Login = async function Login(req, res) {

    // const form = formidable()

    // form.parse(req, (err, fields, files) => {

    //     if (fields.email == "" || fields.password == "") {
    //         return res.redirect("/login")
    //     }
    //     console.log(fields);

    //     User.create({
    //         email: fields.email
    //     })
    // })

    //validation
    const valid = validationResult(req)
    if (!valid.isEmpty()) {

        return res.status(409).json({ message: "Error occured", errors: valid.array()[0] })
    }

    const { email, password } = req.body;


    try {
        //search engine

        const user = await User.findOne({ email });

        if (user == null) {
            res.status(401)
                .json({ message: "User login successful. email error" })
            return;
        }

        //comparison
        const verifyPassword = await bcrypt.compare(password, user.password)
        if (!verifyPassword) {
            res.status(401)
                .json({ message: "User login successful. password error" })
            return;
        }

        //authentication
        let payload = {
            email: user.email,
            id: user._id
        }
        const privateKey = readFileSync(join(root_path, "private.key"))
        const token = jwt.sign(payload, privateKey, { algorithm: JWT_ALGORITHM });

        user.password = null
        res.status(200).json({ message: "Login Sucessful", token, user })
        // res.json({
        //     token,
        //     user
        // })


    } catch (error) {
        console.log(error);
        res.status(500)
            .json({ message: "unexpected error " })
    }
}

module.exports.currentUser = async (req, res) => {
    console.log(req.user);
    res.end("currentUser")
}

//get all users
module.exports.getAllUser = async (req, res) => {
    
}