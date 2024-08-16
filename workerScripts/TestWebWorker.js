onmessage =  (e) => {
    console.log("Message received from main script");

    setTimeout( () => {
        const workerResult = `Result: ${e.data[0] * e.data[1]}`;
        console.log("Posting message back to main script");
        postMessage(workerResult);
    },10_000);

}
