import express from 'express';
import dotenv from 'dotenv';
import Url from './model/url.model.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

app.post('/shorten', async (req, res) => {
  const { url, shortcode, validity } = req.body;
    try {
        const newUrl = new Url({
        shortlink: "http://localhost:${PORT}/" + shortcode,
        expiry: Date.now()+validity ? validity : 30 * 60 * 1000
        });
        res.status(201).json({ message: 'URL shortened successfully', data: newUrl });
    } catch (error) {
        console.error('Error creating URL:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}`);
  await connectDB();
});

export default app;