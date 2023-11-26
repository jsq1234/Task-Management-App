const express = require('express');

const app = express();

require('dotenv').config();

app.use(express.json());

app.use((req, res, next) => {
    const currentDate = new Date();
    const options = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }

    const formatedDate = new Intl.DateTimeFormat('en-GB', options).format(currentDate);

    console.log(`[${formatedDate}] ${req.ip} HTTP/${req.httpVersion} ${req.method} ${req.hostname}${req.path}`)
    next()
})
port = process.env.PORT || 3000;

const route = require("./routes/workout")

app.use(route)

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
})
