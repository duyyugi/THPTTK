let express = require('express');
let app = express();
const sql = require('mssql');

//Set config environment
require('dotenv').config()

//Set public Static Folder
app.use(express.static(__dirname + '/public'));
//Use View Engine
let expressHbs = require('express-handlebars');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
//Register conditon equal for hbs
hbs.handlebars.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 == v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

//Body-parser
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect Database
sql.connect(process.env.CONNECTION_STRING).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
})

//Use session
let session = require('express-session');
app.use(session({
    cookie: { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 },
    secret: 's3cret',
    resave: false,
    saveUninitialized: false
}));
// use locals
require('./middlewares/locals.mdw')(app);

// use route
require('./middlewares/routes.mdw')(app);

app.get('/:page', async (req, res) => {
    let page = req.params.page;
    res.render(page);
})

app.get('/', async (req, res) => {
    res.render("index");
})

app.listen(5000);