const controllerWraper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next)
    } catch (err) {
      if (err.message.includes('Cast to ObjectID failed')) {
        err.status = 404
      }
      next(err)
    }
  }
}

module.exports = controllerWraper
