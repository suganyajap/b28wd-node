console.log("max.....")

console.log(process.argv);
const[, ,nums]=process.argv;
const arr=JSON.parse(nums);
console.log("Maximum of array is: ",Math.max(...arr));
