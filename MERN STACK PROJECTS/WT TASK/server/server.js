import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './db.js';
import EnquiryRoutes from './Routes/EnquiryRoutes.js';
import cors from 'cors'; // Import cors here

dotenv.config();

const app = express();

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.post('/enquiry', EnquiryRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
