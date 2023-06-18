const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.post('/chat', (req, res) => {
    // console.log("zapytanie leci")
    // const userMessage = req.body.content;

    // const python = spawn('python', ['./main.py', userMessage]);

    // python.stdout.on('data', (data) => {
    //     console.log("odpowiedz", data)
    //     res.send({content: data.toString()});
    // });

    // python.stderr.on('data', (data) => {
    //     console.log(`stderr: ${data}`);
    //     res.status(500).send({content: `Error: ${data}`});
    // });

    // python.on('close', (code) => {
    //     if (code !== 0) {
    //         console.log(`python script exited with code ${code}`);
    //     }
    // });

    res.send("Example chat message")
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
