var express  = require('express');
var session = require("express-session");
var bodyParser = require('body-parser');
var stripe = require("stripe")("##############PUT YOUR OWNE KEY##############");


var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(
 session({
  secret: 'a4f8071f-c873-4447-8ee2',
  resave: false,
  saveUninitialized: false,
 })
);

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// });

var movie = [
  {
  title : 'Scarface',
  kind : 'action',
  prix : '10$'
  },
  {
  title : 'Avatar',
  kind : 'SF',
  prix : '10$'
  },
  {
  title : '13 Hours',
  kind : 'action',
  prix : '10$'
  },
  {
  title : 'Lord of the Ring',
  kind : 'heroic fantasy',
  prix : '10$'
  },
  {
  title : 'Mary a tout prix',
  kind : 'comedie',
  prix : '10$'
  }
];

app.get('/', function(req, res){
  if(req.query.movieTitle != undefined){
    req.session.title = req.query.movieTitle;
    req.session.kind = req.query.movieKind;
    console.log('condition ok');
  }
  if(req.session.panier == undefined){
    req.session.panier=[];
  }
  if(req.query.title != undefined){
    req.session.panier.push(
      {title: req.query.title,
      kind : req.query.kind,
      prix : req.query.prix}
    );
  }
    console.log(req.session.panier);
  res.render('index', {movie:movie});

});

app.get('/moviePage', function(req, res){
  var title = req.session.title;
  var kind = req.session.kind;
  res.render('moviePage', {title:title, kind:kind});
});

app.get('/achats', function(req, res){
  var panier = req.session.panier;
  res.render('achats', {panier:panier});
});

app.get('/stripe', function(req, res){
  res.render('stripe');
});

app.post('/charge', function(req, res){
var token = req.body.token;
var charge = stripe.charges.create({
  amount: 1000,
  currency: "eur",
  description: "film",
  source: token,
}, function(err, charge) {
  console.log(charge);
});
  res.render('success');
});

const port = (process.env.PORT || 8080);
app.listen(port, () => {
  console.log('ok ecoute sur port 8080');
});
