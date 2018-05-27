// node script.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// read contents & run
myFile.run();


// determine whether continue to run the event loop or quit
function shouldContinue() {
    // 1. pending setTimeout, setInterval, setImmediate?
    // 2. pending operating system tasks (like listening to port )
    // 3. pending long running operations (like fs module)
    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

// ticks
while (shouldContinue()) {
    // 1. Node looks at pendingTimers and see if any functions are ready to be called (setTimeout setInterval)
    // 2. Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks
    // 3. Pause execution. Continue when ...
    // - a new pendingTask is done
    // - a new pendingOperation is done
    // - a timer is about to complete
    // 4. Look at pendingTimers (setImmediate)
    // handle any 'close' event
}