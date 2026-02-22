const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');

dotenv.config();

const app = express();

require('./config/passport')(passport);

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

app.get('/', (req, res) => {
    res.send('Auto Service API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
