const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const host = 'localhost';
const port = 5050;


const dataArray = [];
const teacherArray = [];
const subjectArray = [];

class TeacherData {

  constructor(teacher, select) {
    this.teacher = teacher;
    this.select = select;
  }
}
class SubjectData {

  constructor(subject) {
    this.subject = subject;
  }
}
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
  console.log(data);
  dataArray.push(items);
  res.redirect('back')
});
app.post('/teacher', (req, res) => {
  const data = req.body;
  const  items = new TeacherData(data.teacher,data.subject);
  console.log(data);
  teacherArray.push(items);
  res.redirect('back')

});
app.post('/subject', (req, res) => {
  const data = req.body;
  const  items = new SubjectData(data.subject);
  console.log(data);
  subjectArray.push(items);
  res.redirect('back')
});

app.get('/teacher', (req, res) => {
  res.json(teacherArray);
});
app.get('/subject', (req, res) => {
  res.json(subjectArray);
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
