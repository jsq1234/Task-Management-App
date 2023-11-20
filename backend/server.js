const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());

port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
})
