console.log("hello");

const text = await Deno.readTextFile("../data/hello.json");
console.log(text);
