const express = require('express');
const cors = require ('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const contactRoute = require('./routes/contact');
app.use('/api/contact', contactRoute);

//Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});