module.exports = function (app) {
  app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.user ? true : false;
    res.locals.role = req.session.user ? req.session.user.VaiTro : '';
    res.locals.username = req.session.user ? req.session.user.username : '';
    next();
  });
};