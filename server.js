const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express(); // to intiate the express function.

hbs.registerPartials(__dirname + '/views/partials')
// use the tempalating engine.
app.set('view engine', 'hbs');

/*
  * The middlewares are rendered in the order they get defined.
  * setting up the express.static as the last middleware, you can use your maintainance code in all of thee pages.
*/

// make our new middleware
app.use((req, res, next) => {
  var now = new Date() ;
  var log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log(err)
  });
  // if we dont call next, the app will never continue forward.
  // it will stop making requests.
  next();
});

//app.use((req, res, next) => {
//  res.render('maintainance.hbs')
//});


// use express middleware.
app.use(express.static(__dirname + '/public'));

// register the helper funcitons for the items we would need ease to use.
hbs.registerHelper('getFullYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// get the response from the server.
app.get('/', (req, res) => {
  // send the response back. req is to request some data from any other server.
  /*res.send({
    name: 'Divyansh Dwivedi',
    likes: [
      'Programming',
      'Hacking',
      'Gaming',
      'Football'
    ]
  });*/
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Move bitch...! Get out the way, bitch, the out the way...'
  });
})

app.get('/about', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'About Page',
    welcomeMessage: 'About Me...!'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Bad request....!"
  })
});

// create a server to make requests and get back data. Listen to some port.
app.listen(3000, () => {
  console.log('Server is up and running on port 3000')
});
