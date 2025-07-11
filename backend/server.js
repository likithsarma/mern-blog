const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(cors()); // Allow frontend requests
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Atlas connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const postRoutes = require('./routes/Posts');
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});