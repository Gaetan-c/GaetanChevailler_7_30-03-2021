const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')

router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)
router.get("/me", auth, userCtrl.getOneUser)
router.put("/update",auth, userCtrl.updatePassword)
router.delete("/delete", auth, userCtrl.deleteUser)

module.exports = router