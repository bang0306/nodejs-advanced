// 每个子进程的线程池容量为1，即只能运行一个线程，为了测试方便
process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require('cluster');
if (cluster.isMaster) {
    // fork 4 个子进程（线程池）
    // Best practice: 子进程数目 = CPU物理核心数
    cluster.fork();
    cluster.fork();
    // cluster.fork();
    // cluster.fork();
} else {
    // 业务代码只运行在子线程中
    const express = require('express');
    const crypto = require('crypto');
    const app = express();
    
    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Hi there!')  
        })
    })

    app.get('/fast', (req, res) => {
        res.send('it is fast');
    })
    
    function doWork(duration) {
        const start = Date.now();
        while (Date.now() - start < duration) {}
    }
    app.listen(3000);
}
