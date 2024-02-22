import express from "express"
import dotenv from "dotenv"
import connectDb from "./db/connect_db.js"
import auth from "./routes/auth.js"
import home from "./routes/home.js"
import session from "express-session"
import book from "./routes/book.js"
import connectMongoDBSession from 'connect-mongodb-session';
import path from "path"
const MongoDBStore = connectMongoDBSession(session);

dotenv.config()
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use('/static', express.static(path.join(process.cwd(), 'public')))
app.set('trust proxy', 1)




let store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/esewa',
    databaseName: 'esewa',
    collection: 'sessions',
    expiresAfterSeconds: 60 * 60 * 24 * 14
},
    function (error) {
        console.log("session connection errror", error)
    });

store.on('error', function (error) {
    console.log("cant connect to mongodb", error);
});

app.use(session({
    name: 'sessionId',
    secret: 'keyboard cat',
    resave: false,
    store: store,
    saveUninitialized: false,

    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 14 }
}))


app.use("/account", auth)
app.use("", home)
app.use("/book", book)


//setting view engine
app.set('view engine', 'ejs')

//setting views dir
app.set('views', './views')

const PORT = process.env.PORT || 8000

// app.get("", (req, res) => {
//     res.send("Hello World")
// })


//connect to db
connectDb(process.env.DBURL)

app.listen(PORT, () => { console.log(`Listening on port: ${PORT}`) })

