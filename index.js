const express = require('express');
const crypto = require('crypto');
const app = express();
const Worker = require('webworker-threads').Worker;

app.get('/', (req, res) => {
    const worker = new Worker(function () {
        // app向worker发消息时，这个函数会被调用
        this.onmessage = function () {
            let counter = 0;
            while (counter < 1e9) {
                counter ++;
            }
            // worker向app发消息
            postMessage(counter);
        }
    })

    // 当worker向app发消息时，这个函数会被调用
    worker.onmessage = function (msg) {
        console.log(msg.data);
        res.send(msg.data + '');
    }

    // app向worker发消息
    worker.postMessage();
})

app.get('/fast', (req, res) => {
    res.send('it is fast');
})

function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
}
app.listen(3000);
