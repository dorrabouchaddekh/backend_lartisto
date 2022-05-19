require("dotenv").config();

// dependencies
const cors = require("cors");

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { MongoClient } = require("mongodb");
const path = require("path");
const {mongoUrl} = require ('./keys');
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.3",
        info: {
            title: 'Customer API',
            description: "Customer API Information",
            contact: {
                name: "Amazing Developper"
            },
            servers: ["http://localhost:8000"]
        }
    },
   // apis: ['${path.join(_dirname, ".routes/*.js")}']
   apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);




const AuthRoute = require  ('./routes/user')

const AuthentificationRoute=require('./routes/authentification')

//const userRoute=require('./routes/user')
const userController=require('./controllers/UserController')
const likesRoute=require('./routes/likes')
const likesController=require('./controllers/LikesController')
const commentsRoute=require('./routes/comments')
const commentsController=require('./controllers/CommentsController')
const publicationRoute=require('./routes/publication')
const publicationController=require('./controllers/PublicationController')
const bidsRoute=require('./routes/bids')
const bidsController=require('./controllers/BidsController')
const enchereRoute=require('./routes/enchere')
const enchereController=require('./controllers/EnchereController')
const categorieRoute=require('./routes/categorie')
const categorieController=require('./controllers/CategorieController')
const linkRoute=require('./routes/link')
const linkController=require('./controllers/LinkController')
const eventController=require('./controllers/EventsController')
const eventRoute=require('./routes/events')


//mongodb+srv://dorra_bouchaddekh:<password>@lartistodb.1w6wr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
/*
const uri = "mongodb://localhost:27017//dorra_bouchaddekh:<password>@lartistodb.1w6wr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = new MongoClient(uri);

async function run(){
    try {
        await client.connect();

        const database = client.db('sample_mflix');
        const movies = database.collection('movies');

        const query = {title: 'Back to the Future'};
        const movie = await movies.findOne(query);
        console.log(movie);
    } finally {
        await client.close();

    }
}
run().catch(console.dir);

*/

//mongoose.connect('mongodb://localhost:27017/lartistodb',{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect(mongoUrl,{
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error',(err) => {
    console.log(err)
    console.log("Error")
})


db.once('open', () => {
    console.log('Database Connection Established!')
})

const app = express();
app.db = db;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//app.use(express.json())
app.use(morgan("dev"))


app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000


app.get('/', (req, res) => res.send('hello TO YOU'));




//app.use('/api/authentification', AuthentificationRoute)
//app.use('/api/user', userRoute)
app.use('/api/likes', likesRoute)
app.use('/api/comments', commentsRoute)
app.use('/api/publication', publicationRoute)
app.use('/api/bids', bidsRoute)
app.use('/api/enchere', enchereRoute)
app.use('/api/categorie', categorieRoute)
app.use('/api/user', AuthRoute)
app.use('/api/link', linkRoute)
app.use('/api/event', eventRoute)


app.use(express.static("public"));

app.use("/uploads", express.static("uploads/"));
app.use("/user", require("./routes/user"))

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});