const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb');
const port = 5000
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://sinemaHall:sinemaHall@cluster0.ki0s6.mongodb.net/sinemaHall?retryWrites=true&w=majority`;

const app = express()
app.use(cors())
app.use(express.static('servics'));
app.use(bodyParser.json())
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const movieCollection = client.db(`sinemaHall`).collection("movieList");
    
    app.get('/allMovie', (req, res) => {
        movieCollection.find()
            .toArray((err, result) => res.send(result))
    })
      app.patch('/bookSeat/:id',(req, res) => {
          const id = req.params.id

        movieCollection.updateOne({ _id:ObjectId(id) },
            { $set: { seat: req.body.allSeat},
               })
               .then(result =>res.send(result.modifiedCount>0))
      })

});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT||port, () => {
    console.log(`${port} is running`)
})