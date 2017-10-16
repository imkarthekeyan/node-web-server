const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const portNumber = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((request, response, next) => {

	var now = new Date().toString();
	var log = `${now}: ${request.method} ${request.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to Server log.');
		}
	})
	next();
});

// app.use((request, response, next) => {
// 	response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
	response.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my website'
	});
});

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/projects', (request, response) => {
	response.render('projects.hbs', {
		pageTitle: 'Projects'
	});
});

app.get('/bad', (request, response) => {
	response.send({
		errorMessage: 'Bad Request :('
	});
})

app.listen(portNumber, () => {
	console.log(`Server is up on port ${portNumber}`);
});