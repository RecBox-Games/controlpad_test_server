const express = require('express');
const path = require('path');

const app = express();


const controllerPath = path.join(__dirname, 'controller');
app.use(express.static(controllerPath));

// endpoints
app.get('/:endpointName', (req, res) => {
    const endpointName = req.params.endpointName;
    res.sendFile(path.join(controllerPath, endpointName));
});

app.get('/', (req, res) => {
    const endpointName = req.params.endpointName;
    res.sendFile(path.join(controllerPath, 'index.html'));
});

// server
app.listen(3000, () => {
    console.log('listening on *:3000');
});
