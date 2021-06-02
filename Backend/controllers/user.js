let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let models = require('../models')
let utils = require('../utils/jwtUtils')

const validEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g
const validPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,200})/ //8 signes (minimum) dont une majuscule, une minuscule, un chiffre et un caractère spécial
const validUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,40}$/

exports.signup = (req, res) => {
   
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password

    if (email == null || username == null || password == null) {
        res.status(400).json({ error: "Remplissez tous les champs : votre nom ne doit pas comporter d'autres signes que des lettres. Mot de passe : 8 signes (minimum) dont une majuscule, une minuscule, un chiffre et un caractère spécial"})
    }

    let verifyEmail = validEmail.test(email)
    let verifyPassword = validPassword.test(password)
    let verifyUsername = validUsername.test(username)
 
    if (verifyEmail == true && verifyPassword == true && verifyUsername == true) {
        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
            .then(user => {
                if (!user) {
                    bcrypt.hash(password, 10, function (err, hash) {
                        const newUser = models.User.create({
                            email: email,
                            username: username,
                            password: hash,
                            isAdmin: false
                        })
                            .then(newUser => { res.status(201).json({ 'id': newUser.id }) })
                            .catch(err => {
                                res.status(500).json({ err })
                            })
                    })
                }
                else {
                    res.status(409).json({ error: 'Cet utilisateur existe déjà ' })
                }
            })
            .catch(err => { res.status(500).json({ err }) })
    } else {
        console.log('You failed !')
    }
}

exports.login = (req, res) => {

    let email = req.body.email
    let password = req.body.password

    if (email == null || password == null) {
        res.status(400).json({ error: "remplissez l'intégralité du formulaire" })
    }

    models.User.findOne({
        where: { email: email }
    })
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                        { userId: user.id },
                        'TOKEN_SECRET',
                        { expiresIn: '24h' }
                        )
                    })
                } else {
                    res.status(403).json({ error: "Erreur de mot de passe" + err })
                }
            })
        } else {
            res.status(404).json({ error: "Cet utilisateur n'est pas enregistré'" })
        }
    })
        .catch(err => { res.status(500).json({ err }) })
}

exports.getOneUser = (req, res) => {
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ["id", "email", "username","isAdmin", "createdAt"],
        where: { id: id }
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json(error))
}

exports.updatePassword = (req, res) => {

    let userId = utils.getUserId(req.headers.authorization)
    const newPassword = req.body.newPassword
   
    if (validPassword.test(newPassword)) {
        models.User.findOne({
            where: { id: userId }
        })
        .then(user => {
            bcrypt.compare(newPassword, user.password, (samePassword) => {
                if (samePassword) {
                    res.status(406).json({ error: 'Vous avez entré le même mot de passe' })
                } else {
                    bcrypt.hash(newPassword, 10, function (err, newHash) {
                        models.User.update(
                            { password: newHash },
                            { where: { id: user.id } }
                        )
                        .then(() => res.status(201).json({ confirm: "Vous avez modifié votre mot de passe" }))
                        .catch(err => res.status(500).json(err))
                    })
                }
            })
        })
        .catch(err => json(err))
    } else {
        res.status(406).json({ error: 'Mot de passe invalide' })
    }
}

exports.deleteUser = (req, res) => {
    let userId = utils.getUserId(req.headers.authorization)
    if (userId != null) {
        models.User.findOne({
            where: { id: userId }
        })
        .then(user => {
            if (user != null) {
                models.Post
                    .destroy({
                        where: { userId: user.id }
                    })
                    .then(() => {
                        models.User
                            .destroy({
                                where: { id: user.id }
                            })
                            .then(() => res.end())
                            .catch(err => console.log(err))
                    })
                    .catch(err => res.status(500).json(err))
            }
            else {
                res.status(401).json({ error: "Cet utilisateur n'existe pas" })
            }
        })
    } else {
        res.status(500).json({ error: "Suppression impossible" })
    }
}