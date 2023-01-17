const express = require('express');
const app = express();
const port = 3000;
const {upload, profile} = require('./upload')
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get('/', (req, res) => {
	res.render('index')
})
console.log("profile",profile);
app.post('/upload', (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.render('index', {
				msg: err
			});
		} else {
			if (req.file == undefined) {
				res.render('index', {
					msg: 'Error: No File Selected'
				});
			}
			else {
				res.render('index', {
					msg: 'File Uploaded!',
					file: `uploads/${req.file.filename}`
				});
			}
		}
	});
});

app.post('/profile', (req, res) => {
	profile(req, res, (err) => {
		console.log("req.files profiles",req.file);
		if (err) {
			res.render('index', {
				msgs: err
			});
		} else {
			if (req.file == undefined) {
				res.render('index', {
					msgs: 'Error: No File Selected'
				});
			}
			else {
				res.render('index', {
					msgs: 'Files Uploaded!',
					files: `profile/${req.file.filename}`
				});
			}
		}
	});
});

app.listen(port, () => {
	console.log(`server is ${port}`)
})