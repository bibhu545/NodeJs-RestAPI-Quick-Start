const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.signup = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(response => {
        if (response) {
            res.status(500).json({
                message: "Mail exists"
            });
        } else {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    res.status(500).json({
                        message: "Some error occured."
                    })
                } else {
                    let user = new User({
                        email: req.body.email,
                        password: hash
                    })
                    user.save().then(result => {
                        res.status(201).json({
                            message: "User created.",
                            user: user
                        })
                    }).catch(error => {
                        console.log(error);
                        res.status(500).json({
                            error: error
                        })
                    })
                }
            });
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(response => {
        if (response) {
            bcrypt.compare(req.body.password, response.password, function (err, result) {
                if (err) {
                    res.status(401).json({
                        message: 'auth failed'
                    })
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: response.email,
                            id: response._id
                        },
                        "secret",
                        { expiresIn: '1h' }
                    );
                    res.status(200).json({
                        message: "auth passed",
                        data: token
                    })
                }
                else {
                    res.status(401).json({
                        message: 'auth failed'
                    })
                }
            });
        } else {
            console.log(error);
            res.status(401).json({
                message: "Auth failed"
            })
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
}

exports.deleteUser = (req, res, next) => {
    User.findById({ _id: req.params.id }).remove(response => {
        res.status(200).json({
            message: "user deleted",
            data: result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
}