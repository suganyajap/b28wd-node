const awesome=require("os");
console.log("os version",awesome.version());
console.log("Free memory",awesome.freemem());
console.log("total memory",awesome.totalmem());
console.log("CPU",awesome.cpus());