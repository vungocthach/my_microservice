const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

// app.use(cors({
//     origin: [
//         "localhost:8000",
//         "localhost:8001",
//         "localhost:8002",
//     ]
// }));
app.use(express.json());

app.use('/todo', proxy('http://localhost:8001'))
app.use('/user', proxy('http://localhost:8002'))


app.listen(8000, () => {
    console.log('Gateway is Listening to Port 8000')
})