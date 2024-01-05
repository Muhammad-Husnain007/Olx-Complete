const express = require('express');
const router = require('./Routing/Routing');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload')
const port = process.env.PORT || 8000;
require('./dbConnect/connectDB');

const App = express();
App.use(express.json());
App.use(cors());

App.use('/user', router)
App.use('/olx', router)
App.use(fileUpload({
  useTempFiles: true,
}))



App.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
