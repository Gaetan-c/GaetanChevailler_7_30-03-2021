const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/post')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.put("/updatePost", auth, multer, postCtrl.updatePost)
router.post("/createPost", auth, multer, postCtrl.createPost)
router.delete("/deletePost", postCtrl.deletePost)
router.get("/", auth, postCtrl.onTheWall)

module.exports = router 