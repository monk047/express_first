const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

//Partials folder setup inside views. contains footer and header and other templates.
hbs.registerPartials(__dirname+'/views/partials');
//tell express which view engine we are using
app.set('view engine','hbs');


//express middleware. Always use -> NEXT(); else server will freeze and wont process requests
app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `|| [URL] : ${req.url} || [Method] : ${req.method}`;
	console.log(`It is ${now} at this moment.`);
	console.log(log);
	fs.appendFile('server.log', '\n' + now + '\n' + log + '\n',(err) => {
		if(err){
			console.log(error);
		}
	});
	next();
});




//
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});


//handler for http get request
app.get('/', (req, res) => {
	res.render('home.hbs',{
		pageTitle: 'Home',
		currentYear : new Date().getFullYear(),
		chick : 'sushi'

	});
});

app.get('/about',(req,res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page',
		currentYear : new Date().getFullYear(),
		chick : 'doner'

	});
});

app.get('/bad',(req, res) => {
	res.send({
		errorMessage : 'Unable to find'
	});
});

app.get('/projects', (req,res)=> {
	res.render('projects.hbs',{
		pageTitle : 'Projects'
	});
});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));

app.listen(port, () => {
	console.log(`server is up at port: ${port}`);
});
