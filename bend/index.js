// Importing necessary modules and packages
const express = require("express");
const app = express();

const userRoutes=require('./routes/user')
const profileRoutes=require('./routes/profile')
const courseRoutes=require('./routes/Course')
const paymentRoutes=require('./routes/Payments')

const database=require('./config/database')
const cookieParser=require('cookie-parser')
const cors=require("cors")
const {cloudinaryConnect}=require('./config/cloudinary')
const fileUpload = require("express-fileupload");

const dotenv=require('dotenv')

// Loading environment variables from .env file
dotenv.config();

// Setting up port number
const PORT = process.env.PORT || 4000;

//Connecting to database
database.connect();

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		origin:process.env.FRONTEND_URL,
		credentials:true,
	})
)


app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connecting to cloudinary
cloudinaryConnect();


//routes
app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/profile',profileRoutes)
app.use('/api/v1/course',courseRoutes)
app.use('/api/v1/payment',paymentRoutes)


app.get("/", (req, res) => {
	res.send("Backend is running...");
});
  

//Listening to the server
app.listen(PORT,()=>{
    console.log(`APP is running at ${PORT}`)
})