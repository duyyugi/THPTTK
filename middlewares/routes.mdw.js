module.exports = function (app) {
    app.use('/', require('../routes/index.route'));
    app.use('/nvdangtin', require('../routes/nvdangtin.route'));
    app.use('/quanly', require('../routes/quanly.route'));
    app.use('/thuquy', require('../routes/thuquy.route'));
    app.use('/nvbanhang', require('../routes/nvbanhang.route'));
}