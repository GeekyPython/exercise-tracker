const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/endpoints');
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/api/users',router);

const startDB = async () => {

  try
  {
    await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  }

  catch(err)
  {
    console.log(err);
  }
}

startDB();


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
