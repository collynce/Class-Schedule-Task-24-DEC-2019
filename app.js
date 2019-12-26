const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const host = 'localhost';
const port = 5050;


const dataArray = [];

class ScheduleData {

  constructor(teacher,subject,venue,date) {
    this.teacher = teacher;
    this.subject = subject;
    this.venue = venue;
    this.date = date;
  }
}

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.post('/add', (req, res) => {
  const data = req.body;
  const  items =new ScheduleData(data.teacher,data.subject,data.venue,data.date);
  dataArray.push(items);
  res.redirect(`${host}:${port}/`);
});

app.get('/add', (req, res) => {
  res.json(dataArray);
});

app.use(express.static(__dirname + '/src'));

app.get('/items', (req, res) => {
  res.sendFile(path.join(__dirname+'/routes/index.js'));
});

app.listen(port, host, () => {
  console.log(`App is running at http://${host}:${port}/`);
});
