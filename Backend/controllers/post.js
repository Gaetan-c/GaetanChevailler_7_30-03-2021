let models = require('../models')
let utils = require('../utils/jwtUtils')
const fs = require('fs')

exports.createPost = (req, res) => {
    let URLfichierJoint

    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'username'],
        where: { id: id }
    })
    .then(user => {
        if (user !== null) {
            let content = req.body.content
            if (req.file != undefined) {
                URLfichierJoint = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
            else {
                URLfichierJoint == null
            }
            if (content == '' && URLfichierJoint == null) {
                res.status(400).json({ error: "Vous voulez vraiment envoyer un message vide ?" })
            } else {
                models.Post.create({
                    content: content,
                    fichierJoint: URLfichierJoint,
                    UserId: user.id
                })
                .then((newPost) => {
                    res.status(201).json(newPost)
                })
                .catch((err) => {
                    res.status(500).json(err)
                })
            }
        } else {
            res.status(400).json(error)
        }
    })
    .catch(error => res.status(500).json(error))
}

exports.onTheWall = (req, res) => {
    models.Post.findAll({
        include: [{
            model: models.User,
            attributes: ['username']
        }],
        order: [['createdAt', 'DESC']]
    })
    .then(posts => {
        if (posts.length > null) {
            res.status(200).json(posts)
        } else {
            res.status(404).json({ error: "Il faut d'abord être le créateur du premier Post" })
        }
    })
    .catch(err => res.status(500).json(err))
}
/*
exports.deletePost = (req, res) => {
    let userId = req.body.userId

    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'username'],
        where: { id: id }
    })
    .then(user => {
        if (user && user.id == userId) {
            models.Post.findOne({
                where: { id: req.body.postId }
            })
            .then((post) => {
                if (post.fichierJoint) {
                    const filename = post.fichierJoint.split('/images/')[1]
                    fs.unlink(`images/${filename}`, () => {
                        models.Post.destroy({
                            where: { id: post.id }
                        })
                        .then(() => res.end())
                        .catch(err => res.status(500).json(err))
                    })
                }else {
                    models.Post.destroy({
                        where: { id: post.id }
                    })
                    .then(() => res.end())
                    .catch(err => res.status(500).json(err))
                }
            })
            .catch(error => res.status(500).json(error))
        } else { res.status(403).json('Utilisateur non autorisé à supprimer ce post') }
    })
    .catch(error => res.status(500).json(error))
}*/