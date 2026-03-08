const fs = require("fs"); 

//sync... Blocking request
// fs.writeFileSync("./test.txt","hey there")

// create a text file whoe name is test in same directry with "hey there" in it. If i change the argument then it just over writes the file.


//async... Non blocking request
//fs.writeFile("./asy.txt","hello my self",(err)=>{})


//const result=fs.readFileSync("./contact.txt","utf-8")
// utf-8 is the encoding method.
//console.log(result)

// when you use sync it will directly read the file and store it into result but in readfile it need callback function

// fs.readFile("./contact.txt", "utf-8",(err,result)=> {
//     if(err){
//         console.log("error",err)
//     }else{
//         console.log(result);
//     }
// });

// fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString)
//this will not overwrite the file it add the data to file at the end

// fs.appendFileSync("./test.txt", ` ${Date.now()}hello my self\n`)

// fs.unlinkSync("./contact.txt") // to delete a file


// console.log(fs.statSync("./test.txt").isFile()) // provide the detail of file

// fs.mkdirSync("myfolder")  // to create folder

// fs.mkdirSync("myfolder/a/b",{recursive: true}) // to make folder into a folder

// fs.rmdirSync("myfolder/a/b") // to delete folder

// fs.rmdirSync("myfolder")


//Blocking....
// console.log("1")
// const result=fs.readFileSync("./asy.txt","utf-8")
// console.log(result)
// console.log("2");
// this return 1 then result then 2

//Non-Blocking....
// console.log("1");
// fs.readFile("./asy.txt", "utf-8",(err,result)=> {
//     if(err){
//         console.log("error",err)
//     }else{
//         console.log(result);
//     }
// });
// console.log("2");
// this return 1 then 2 then result 

const os = require("os")
console.log(os.cpus().length)
// to find out cores of cpu