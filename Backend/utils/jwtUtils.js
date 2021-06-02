let jwt = require('jsonwebtoken')

module.exports = {
  tokenSign : 'TOKEN_SECRET',
  getUserId: function (data) {
    if (data.length > 1) {
      let token = data.split(' ')[1]
      try {
        let decodedToken = jwt.verify(token, this.tokenSign)
        userId = decodedToken.userId
        return userId
      }
      catch (error) {
        return error
      }
    }
  }
}