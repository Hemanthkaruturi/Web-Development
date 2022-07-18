const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
const port = 3000;

app.get('/', (req,res) => {
  res.sendFile(__dirname+"/index.html")
})

app.get('/bmicalculator', (req,res) => {
  res.sendFile(__dirname+"/bmiCalculator.html")
})

app.post('/result', (req,res) => {
  console.log(req);
  console.log(req.body);
  inputs = req.body
  output = parseInt(inputs['num1']) + parseInt(inputs['num2'])
  // res.sendFile(__dirname+"/result.html")
  res.send("The result is "+output);
})

app.post('/bmi-result', (req,res) => {
  inputs = req.body;
  height = parseInt(inputs['height'])
  weight = parseInt(inputs['weight'])
  bmi = Math.floor(weight/(height*height))
  res.send("Your BMI is "+bmi)
})

app.listen(port, () => {
  console.log('Go to http://localhost'+port)
})
